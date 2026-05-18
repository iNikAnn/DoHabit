import { CSSProperties, ReactNode } from 'react';
import { ButtonProps } from '@shared/ui/button/types';

export type ItemIconSize = 'sm' | 'md' | 'lg';

export interface ListItemProps extends ButtonProps {
	title: string;
	description: string;
	iconSize?: ItemIconSize;
	truncateDescription?: boolean;
	extra?: ReactNode;
}

export interface ListProps {
	title?: string;
	action?: ReactNode;
	categoryStyle?: CSSProperties;
	titleStyle?: CSSProperties;
	listStyle?: CSSProperties;
	iconSize?: ItemIconSize;
	truncateDescription?: boolean;
	items: ListItemProps[];
}