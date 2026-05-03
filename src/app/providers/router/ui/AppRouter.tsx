import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { routeConfig } from '../config/routeConfig';

function AppRouter() {
	const location = useLocation();

	return (
		// @ts-ignore
		<AnimatePresence initial={false}>
			<Routes key={location.pathname} location={location}>
				{routeConfig.map(({ path, element, children }) => (
					<Route
						key={path}
						path={path}
						element={element}
					>
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