import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { routeConfig } from '../config/routeConfig';

/**
 * Main application router with transition animations.
 * Renders routes from routeConfig.
 */
function AppRouter() {
	const location = useLocation();

	return (
		// @ts-ignore
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
	);
}

export { AppRouter };