import { type IconType } from 'react-icons';

export interface NavItem {
	to: string;
	state: Record<string, unknown>;
	icon: IconType;
}