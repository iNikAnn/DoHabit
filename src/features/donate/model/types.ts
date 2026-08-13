export type CryptoId =
	| 'usdttrc20'
	| 'usdterc20'
	| 'usdc'
	| 'usdcsol';

export type TokenKey =
	| 'USDT'
	| 'USDC';

export type NetworkKey =
	| 'tron'
	| 'ethereum'
	| 'solana';

export interface CryptoOption {
	id: CryptoId;           // usdttrc20
	tokenLabel: string;     // USDT
	networkLabel: string;   // TRC-20
	minAmount: number;      // 15
	tokenKey: TokenKey;     // USDT
	networkKey: NetworkKey; // tron
}

export type SupportedCurrenciesMap = Record<CryptoId, CryptoOption>;

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