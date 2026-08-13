import { createElement, isValidElement, type ComponentType, type ReactNode } from 'react';
import { type IconType } from 'react-icons';

type Icon = ReactNode | IconType | ComponentType | string;

type IconProps = {
	[key: string]: unknown;
};

/**
 * Renders an icon component.
 */
function renderIcon(icon: Icon, props?: IconProps): ReactNode {
	// Return directly if already a rendered React element
	if (isValidElement(icon)) {
		return icon;
	}

	// Render image tag if URL string
	if (typeof icon === 'string') {
		return <img src={icon} alt={String(props?.alt ?? '')} {...props} />;
	}

	// Handle function components and forwardRef objects
	if (typeof icon === 'function' || (typeof icon === 'object' && icon !== null)) {
		return createElement(icon as ComponentType<IconProps>, props);
	}

	return null;
}

export { renderIcon };