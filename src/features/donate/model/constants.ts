import type { CryptoId, CryptoOption } from './types';

export const PRESET_AMOUNTS = [15, 20, 25];
export const MIN_DONATION_FOR_MESSAGE = 20;

export const SUPPORTED_CURRENCIES: Record<CryptoId, CryptoOption> = {
	usdttrc20: {
		id: 'usdttrc20',
		label: 'USDT',
		network: 'TRC-20',
		minAmount: 15
	},

	usdterc20: {
		id: 'usdterc20',
		label: 'USDT',
		network: 'ERC-20',
		minAmount: 15
	},

	//   usdtsol: {
	//     id: 'usdtsol',
	//     label: 'USDT',
	//     network: 'Solana',
	//     minAmount: 5
	//   },

	usdc: {
		id: 'usdc',
		label: 'USDC',
		network: 'ERC-20',
		minAmount: 15
	},

	usdcsol: {
		id: 'usdcsol',
		label: 'USDC',
		network: 'Solana',
		minAmount: 15
	},
};

export const DEFAULT_CURRENCY_ID: CryptoId = 'usdttrc20';