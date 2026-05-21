import { createElement, ReactNode } from 'react';
import { IconType } from 'react-icons';

type Icon = ReactNode | IconType;

interface IconProps {
	[key: string]: unknown
}

/**
 * Renders an icon component.
 */
function renderIcon(icon: Icon, props?: IconProps): ReactNode {
	if (typeof icon === 'function') {
		return createElement(icon, props);
	}

	return icon;
}

export { renderIcon };