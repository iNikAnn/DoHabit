import { ReactNode } from 'react';
import { ButtonProps } from '@shared/ui/button/types';

export type ItemIconSize = 'sm' | 'md' | 'lg';

export interface MenuItemProps extends ButtonProps {
	title: string;
	description: string;
	iconSize?: ItemIconSize;
	truncateDescription?: boolean;
	extra?: ReactNode;
}