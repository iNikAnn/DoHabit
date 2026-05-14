import { ReactNode } from 'react';
import { ButtonProps } from '@shared/ui/button/types';

export interface MenuItemProps extends ButtonProps {
	title: string;
	description: string;
	extra?: ReactNode;
}