export interface CreateDonationPayload {
	clientId: string;
	username?: string;
	amount: number;
	message?: string;
	isAnonymous: boolean;
}

export interface CreateDonationResponse {
	orderId: string;
	payAddress: string;
	payAmount: number;
	payCurrency: string;
}

/**
 * Send donation creation request to backend API.
 */
async function createDonation(payload: CreateDonationPayload): Promise<CreateDonationResponse> {
	const res = await fetch('/api/donations/create', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});

	if (!res.ok) {
		throw new Error('Failed to create donation invoice');
	}

	return res.json();
}

export { createDonation };