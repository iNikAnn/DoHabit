interface Env {
	DB: D1Database;
	NOWPAYMENTS_API_KEY: string;
	NOWPAYMENTS_IPN_URL: string;
}

interface CreateDonationBody {
	clientId: string;
	username?: string;
	amount: number;
	message?: string;
	isAnonymous: boolean;
}

interface NpRes {
	pay_address: string;
	pay_amount: number;
	pay_currency: string;
}

const NOWPAYMENTS_API_URL = 'https://api.nowpayments.io/v1';

/**
 * Handle donation creation.
 */
export const onRequestPost: PagesFunction<Env> = async (context) => {
	const { request, env } = context;

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 10_000);

	try {
		console.log('Calling NOWPayments', `${NOWPAYMENTS_API_URL}/payment`);

		const body: CreateDonationBody = await request.json();
		const { clientId, username, amount, message, isAnonymous } = body;

		// Validate payload
		if (!clientId || !amount || amount <= 0) {
			return Response.json({ error: 'Invalid payload' }, { status: 400 });
		}

		// Payment metadata
		const orderId = crypto.randomUUID();
		const donorName = isAnonymous ? 'Anonymous' : (username || 'Anonymous');

		// Create payment in NOWPayments
		const npRes = await fetch(`${NOWPAYMENTS_API_URL}/payment`, {
			method: 'POST',
			signal: controller.signal,
			headers: {
				'x-api-key': env.NOWPAYMENTS_API_KEY,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				price_amount: amount,
				price_currency: 'usd',
				pay_currency: 'usdttrc20',
				order_id: orderId,
				order_description: `Donation: ${donorName}`,
				ipn_callback_url: env.NOWPAYMENTS_IPN_URL
			})
		});

		console.log('NOWPayments status:', npRes.status);

		if (!npRes.ok) {
			const text = await npRes.text();
			console.error('NOWPayments error body:', text);
			return Response.json({ error: 'NOWPayments error' }, { status: 502 });
		}

		const npData: NpRes = await npRes.json();

		// Insert pending record into D1
		await env.DB.prepare(`--sql
			INSERT INTO donations (client_id, order_id, username, amount, message, status)
			VALUES (?, ?, ?, ?, ?, 'pending')
		`)
			.bind(
				clientId,
				orderId,
				donorName,
				amount,
				message || null
			)
			.run();

		// Return payment details to client
		return Response.json(
			{
				orderId,
				payAddress: npData.pay_address,
				payAmount: npData.pay_amount,
				payCurrency: npData.pay_currency,
			},
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	} catch (error) {
		console.error(error);
		return Response.json({ error: 'Internal Server Error' }, { status: 500 });
	} finally {
		clearTimeout(timeoutId);
	}
};