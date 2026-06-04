import '@app/styles/index.css';
import { createRoot } from 'react-dom/client';
import { App } from '@app/App';
import '@app/providers/i18n';
import ErrorFallback from '@app/components/error-fallback/ErrorFallback';
import { BrowserRouter } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';

const root = createRoot(document.getElementById('root')!);
root.render(
	// <React.StrictMode>
	<BrowserRouter basename={import.meta.env.BASE_URL}>
		<ErrorBoundary fallback={<ErrorFallback />}>
			<App />
		</ErrorBoundary>
	</BrowserRouter>
	// </React.StrictMode>
);