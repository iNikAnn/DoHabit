/**
 * Fetch top 10 donors aggregated by total amount.
 */
export const onRequestGet: PagesFunction<Env> = async (context) => {
	const { env } = context;

	try {
		const { results } = await env.DB
			.prepare(`--sql
				  SELECT user_id,
					     username,
					     SUM(amount) as amount
				    FROM donations
				GROUP BY user_id
				ORDER BY amount DESC
				   LIMIT 10
			`)
			.all();

		return Response.json(results);
	} catch (error) {
		console.error(error);
		return Response.json({ error: 'Failed to fetch donations' }, { status: 500 });
	}
};