/* eslint-disable i18next/no-literal-string */

/**
 * Get donation payment status by order_id.
 */
export const onRequestGet: PagesFunction<Env> = async (context) => {
	const { request, env } = context;

	const url = new URL(request.url);
	const orderId = url.searchParams.get('order_id');

	if (!orderId || orderId.length > 36) {
		return Response.json({ error: 'Missing order_id' }, { status: 400 });
	}

	try {
		const row = await env.DB.prepare(`--sql
			SELECT status
			  FROM donations
			 WHERE order_id = ?
		`)
			.bind(orderId)
			.first<{ status: string }>();

		if (!row) {
			return Response.json({ error: 'Donation not found' }, { status: 404 });
		}

		return Response.json(
			{ status: row.status },
			{ headers: { 'Cache-Control': 'no-store' } }
		);
	} catch (error) {
		console.error('Failed to fetch donation status', { orderId, error });
		return Response.json({ error: 'Internal Server Error' }, { status: 500 });
	}
};