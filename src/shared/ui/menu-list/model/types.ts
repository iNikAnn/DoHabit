import type { CSSProperties, ReactNode } from 'react';
import type { ButtonProps } from '@shared/ui/button/types';

export type ItemIconSize = 'sm' | 'md' | 'lg';

export interface ListItemProps extends ButtonProps {
	title: string;
	description?: string;
	descriptionStyle?: CSSProperties;
	iconSize?: ItemIconSize;
	truncateDescription?: boolean;
	extra?: ReactNode;
}

export interface ListProps {
	title?: string;
	extra?: ReactNode;
	categoryStyle?: CSSProperties;
	titleStyle?: CSSProperties;
	listStyle?: CSSProperties;
	iconSize?: ItemIconSize;
	truncateDescription?: boolean;
	items: ListItemProps[];
}