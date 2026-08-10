import type { CryptoId, PaymentData } from '../model/types';

export interface CreateDonationPayload {
	clientId: string;
	username?: string;
	currency: CryptoId;
	amount: number;
	message?: string;
	isAnonymous: boolean;
}

/**
 * Send donation creation request to backend API.
 */
async function createDonation(payload: CreateDonationPayload): Promise<PaymentData> {
	const res = await fetch('/api/donations/create', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});

	if (!res.ok) {
		throw new Error('Failed to create donation invoice');
	}

	const data: PaymentData = await res.json();

	localStorage.setItem('pendingDonation', JSON.stringify(data));

	return data;
}

export { createDonation };