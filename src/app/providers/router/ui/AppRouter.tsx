import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation, useNavigationType } from 'react-router';
import { routeConfig } from '../config/routeConfig';
import { DirectionContext, type Direction } from '@shared/lib/router';

/**
 * Main application router with transition animations.
 * Renders routes from routeConfig.
 */
function AppRouter() {
	const location = useLocation();
	const navigationType = useNavigationType();

	const direction: Direction = navigationType === 'POP' ? 'backward' : 'forward';

	return (
		/**
		 * Provide navigation direction to children.
		 * Used by ModalLayout to determine transition variant.
		 */
		<DirectionContext value={direction}>
			<AnimatePresence initial={false}>
				{/*
                key & location are required for AnimatePresence
                to detect route changes and trigger exit animations.
            	*/}
				<Routes key={location.pathname} location={location}>
					{routeConfig.map(({ path, element, children }) => (
						<Route
							key={path}
							path={path}
							element={element}
						>
							{/* Nested routes for ModalLayout */}
							{children?.map(({ path, element }) => (
								<Route
									key={path}
									path={path}
									element={element}
								/>
							))}
						</Route>
					))}
				</Routes>
			</AnimatePresence>
		</DirectionContext>
	);
}

export { AppRouter };