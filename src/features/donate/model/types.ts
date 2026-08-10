export type CryptoId =
	| 'usdttrc20'
	| 'usdterc20'
	| 'usdc'
	| 'usdcsol';

export interface CryptoOption {
	id: CryptoId;      // usdttrc20
	label: string;     // USDT
	network: string;   // TRC-20
	minAmount: number; // 15
}

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
	payCurrency: CryptoId;
	expiresAt: number;
}