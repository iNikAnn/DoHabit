/**
 * Fetch the latest donation records.
 */
export const onRequestGet: PagesFunction<Env> = async (context) => {
	const { env } = context;

	try {
		const { results } = await env.DB
			.prepare(`--sql
				  SELECT user_id,
					     username,
						 amount,
						 message
				    FROM donations
				ORDER BY created_at DESC
				   LIMIT 10
			`)
			.all();

		return Response.json(results);
	} catch (error) {
		console.error(error);
		return new Response('Failed to fetch donations', { status: 500 }); // eslint-disable-line
	}
}