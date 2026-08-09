export type PaymentStatus =
	| 'waiting'
	| 'confirming'
	| 'confirmed'
	| 'partially_paid'
	| 'finished'
	| 'failed'
	| 'expired';

export interface PaymentData {
	orderId: string;
	payAddress: string;
	payAmount: number;
	payCurrency: string;
	expiresAt: number;
}