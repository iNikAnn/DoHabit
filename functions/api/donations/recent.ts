/**
 * Fetch the latest donation records.
 */
export const onRequestGet: PagesFunction<Env> = async (context) => {
	const { env } = context;

	try {
		const { results } = await env.DB
			.prepare(`--sql
				  SELECT username,
						 amount,
						 message,
						 created_at
				    FROM donations
				   WHERE status = 'finished'
				ORDER BY created_at DESC
				   LIMIT 10
			`)
			.run();

		return Response.json(results);
	} catch (error) {
		console.error(error);
		return Response.json({ error: 'Failed to fetch donations' }, { status: 500 });
	}
};