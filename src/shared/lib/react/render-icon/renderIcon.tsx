import { createElement, type ReactNode } from 'react';
import { type IconType } from 'react-icons';

type Icon = ReactNode | IconType | string;

type IconProps = {
	[key: string]: unknown
};

/**
 * Renders an icon component.
 */
function renderIcon(icon: Icon, props?: IconProps): ReactNode {
	if (typeof icon === 'string') {
		return <img src={icon} alt={String(props?.alt ?? '')} {...props} />
	}

	if (typeof icon === 'function') {
		return createElement(icon, props);
	}

	return icon;
}

export { renderIcon };