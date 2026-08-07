/* eslint-disable i18next/no-literal-string */

interface Env {
	DB: D1Database;
	NOWPAYMENTS_IPN_KEY: string;
}

interface WebhookPayload {
	payment_status: string;
	order_id: string;
}

const sortObject = <T extends Record<string, any>>(obj: T): T => {
	return Object.keys(obj).sort().reduce<Record<string, any>>(
		(result, key) => {
			const v = obj[key];
			result[key] = (v && typeof v === 'object') ? sortObject(v) : v;
			return result;
		},
		{}
	) as T;
}

// https://documenter.getpostman.com/view/7907941/2s93JusNJt#api-documentation
const verifySignature = async (
	payload: Record<string, any>,
	signatureHeader: string | null,
	secretKey: string
): Promise<boolean> => {
	if (!signatureHeader) return false;

	// 1. Sort object keys and convert to JSON string
	const sortedObj = sortObject(payload);
	const jsonString = JSON.stringify(sortedObj);

	// 2. Encode string data to Uint8Array
	const encoder = new TextEncoder();

	// 3. Import secret key for Web Crypto API
	const cryptoKey = await crypto.subtle.importKey(
		'raw',
		encoder.encode(secretKey),
		{ name: 'HMAC', hash: 'SHA-512' },
		false,
		['sign']
	);

	// 4. Sign JSON string with secret key
	const signatureBuffer = await crypto.subtle.sign(
		'HMAC',
		cryptoKey,
		encoder.encode(jsonString)
	);

	// 5. Convert buffer to hex string
	const computedSignature = Array.from(new Uint8Array(signatureBuffer))
		.map((byte) => byte.toString(16).padStart(2, '0'))
		.join('');

	// 6. Compare computed signature with header
	return computedSignature.toLowerCase() === signatureHeader.toLowerCase();
};

/**
 * Handle NOWPayments IPN webhook notification.
 */
export const onRequestPost: PagesFunction<Env> = async (context) => {
	const { request, env } = context;

	try {
		const signature = request.headers.get('x-nowpayments-sig');
		const payload: WebhookPayload = await request.json();

		const isValid = await verifySignature(
			payload,
			signature,
			env.NOWPAYMENTS_IPN_KEY
		);

		if (!isValid) {
			return Response.json({ error: 'Invalid signature' }, { status: 400 });
		}

		const { order_id, payment_status } = payload;

		if (!order_id || !payment_status) {
			return Response.json({ error: 'Missing required fields' }, { status: 400 });
		}

		// Update donation status and payment_id in D1
		const result = await env.DB.prepare(`--sql
			UPDATE donations
			   SET status   = ?
			 WHERE order_id = ?
		`)
			.bind(payment_status, order_id)
			.run();

		if (!result.success) {
			return Response.json({ error: 'Database update failed' }, { status: 500 });
		}

		if (result.meta.changes === 0) {
			console.error(`IPN for unknown order_id: ${order_id}`);
			return Response.json({ error: 'Order not found' }, { status: 404 });
		}

		return Response.json('OK', { status: 200 });
	} catch (error) {
		console.error(error);
		return Response.json({ error: 'Webhook processing error' }, { status: 500 });
	}
};