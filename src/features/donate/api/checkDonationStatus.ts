/* eslint-disable i18next/no-literal-string */

import type { PaymentStatus } from '../model/types';

interface StatusResponse {
	status: PaymentStatus;
}

/**
 * Fetch current payment status from backend API.
 */
async function checkDonationStatus(orderId: string): Promise<PaymentStatus> {
	const res = await fetch(`/api/donations/status?order_id=${encodeURIComponent(orderId)}`);

	if (!res.ok) {
		throw new Error('Failed to fetch status');
	}

	const { status }: StatusResponse = await res.json();

	const terminalStatuses: PaymentStatus[] = ['confirmed', 'finished', 'failed', 'expired'];

	if (terminalStatuses.includes(status)) {
		localStorage.removeItem('pendingDonation');
	}

	return status;
}

export { checkDonationStatus };