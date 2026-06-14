import '@app/styles/index.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';
import { App } from '@app/App';
import '@app/providers/i18n';
import ErrorFallback from '@app/components/error-fallback/ErrorFallback';
import { pwaStore } from '@features/pwa-install';

/**
 * Intercept native PWA install prompt to handle it via application UI.
 */
window.addEventListener('beforeinstallprompt', (e) => {
	e.preventDefault();
	pwaStore.getState().setDeferredPrompt(e as any);
});

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