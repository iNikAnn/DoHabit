import React, { JSX } from 'react';

// declare module '*.css';

declare global {
	declare module '*.css';

	declare module '*.svg' {
		export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
	}
}


declare module 'react-icons' {
	interface IconProps extends React.SVGAttributes<SVGAElement> {

	}

	export type IconType = (props: IconProps) => JSX.Element;
}