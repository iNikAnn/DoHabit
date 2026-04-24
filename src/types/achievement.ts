export interface Achievement {
	id: number;
	title: string;
	desc: string;
	criteria?: {
		streak?: number;
		gap?: number;
		count?: number;
		length?: number;
		hours?: number;
	};
	isSecret: boolean;
	isUnlocked?: boolean;
	unlockDate?: string;
}