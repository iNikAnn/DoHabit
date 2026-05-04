import '@app/styles/index.css';
import { createRoot } from 'react-dom/client';
import { App } from '@app/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration.js';
import { BrowserRouter } from 'react-router-dom';

// @ts-ignore
const PUBLIC_URL = process.env.PUBLIC_URL ?? '/';

const root = createRoot(document.getElementById('root')!);
root.render(
	// <React.StrictMode>
	<BrowserRouter basename={PUBLIC_URL}>
		<App />
	</BrowserRouter>
	// </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
