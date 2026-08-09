import type { PaymentData } from './types';

const KEY = 'pendingDonation';

/**
 * Retrieve active donation from storage if not expired.
 */
function getStoredDonation(): PaymentData | null {
	const raw = localStorage.getItem(KEY);
	if (!raw) return null;

	try {
		const data: PaymentData = JSON.parse(raw);

		if (Date.now() > data.expiresAt) {
			localStorage.removeItem(KEY);
			return null;
		}

		return data;
	} catch (error) {
		console.error(error);
		localStorage.removeItem(KEY);
		return null;
	}
}

export { getStoredDonation };