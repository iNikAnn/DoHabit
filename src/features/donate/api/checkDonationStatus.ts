interface StatusResponse {
	status: string;
}

/**
 * Fetch current payment status from backend API.
 */
async function checkDonationStatus(orderId: string): Promise<StatusResponse> {
	const res = await fetch(`/api/donations/status?order_id=${encodeURIComponent(orderId)}`);

	if (!res.ok) {
		throw new Error('Failed to fetch status');
	}

	return res.json();
}

export { checkDonationStatus };