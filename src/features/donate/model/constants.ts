import { NetworkEthereum, NetworkSolana, NetworkTron, TokenUSDC, TokenUSDT } from '@web3icons/react';
import type { CryptoId, NetworkKey, SupportedCurrenciesMap, TokenKey } from './types';
import type { ComponentType } from 'react';

export const PRESET_AMOUNTS = [15, 20, 25];
export const MIN_DONATION_FOR_MESSAGE = 20;

export const TOKEN_ICONS: Record<TokenKey, ComponentType> = {
	USDC: TokenUSDC,
	USDT: TokenUSDT
};

export const NETWORK_ICONS: Record<NetworkKey, ComponentType> = {
	tron: NetworkTron,
	ethereum: NetworkEthereum,
	solana: NetworkSolana
};

export const SUPPORTED_CURRENCIES: SupportedCurrenciesMap = {
	// USDT (Tron)
	usdttrc20: {
		id: 'usdttrc20',
		tokenLabel: 'USDT',
		networkLabel: 'TRC-20',
		minAmount: 15,
		tokenKey: 'USDT',
		networkKey: 'tron'
	},

	// USDT (Ethereum)
	usdterc20: {
		id: 'usdterc20',
		// Переименовать в лейблы
		tokenLabel: 'USDT',
		networkLabel: 'ERC-20',
		minAmount: 15,
		tokenKey: 'USDT',
		networkKey: 'ethereum'
	},

	// USDT (Solana)
	//   usdtsol: {
	//     id: 'usdtsol',
	//     tokenLabel: 'USDT',
	//     networkLabel: 'Solana',
	//     minAmount: 5
	//   },

	// USDC (Ethereum)
	usdc: {
		id: 'usdc',
		tokenLabel: 'USDC',
		networkLabel: 'ERC-20',
		minAmount: 15,
		tokenKey: 'USDC',
		networkKey: 'ethereum'
	},

	// USDC (Solana)
	usdcsol: {
		id: 'usdcsol',
		tokenLabel: 'USDC',
		networkLabel: 'Solana',
		minAmount: 15,
		tokenKey: 'USDC',
		networkKey: 'solana'
	}
};

export const DEFAULT_CURRENCY_ID: CryptoId = 'usdttrc20';