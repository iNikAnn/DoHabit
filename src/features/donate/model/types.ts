export interface PaymentData {
	orderId: string;
	payAddress: string;
	payAmount: number;
	payCurrency: string;
	expiresAt: number;
}