export interface UserProfile {
	clientId: string;
	username?: string;
	avatarUrl?: string;
	createdAt: number;
}

export interface UserState {
	user: UserProfile;
	updateUser: (data: Partial<UserProfile>) => void;

	_hasHydrated: boolean;
	setHasHydrated: (state: boolean) => void;
}