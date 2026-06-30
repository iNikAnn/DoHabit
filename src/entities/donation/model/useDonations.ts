import type { Donation } from './types';
import { useQuery } from '@tanstack/react-query';

const ONE_HOUR = 1000 * 60 * 60;

/**
 * Fetch donation data based on the requested type.
 */
function useDonations(type: 'top' | 'recent') {
	return useQuery({
		queryKey: ['donations', type],
		queryFn: async () => {
			const res = await fetch(`/api/donations/${type}`);
			if (!res.ok) throw new Error('Fetch failed');
			return await res.json() as Partial<Donation>[];
		},
		staleTime: ONE_HOUR,
		gcTime: ONE_HOUR,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});
}

export { useDonations };