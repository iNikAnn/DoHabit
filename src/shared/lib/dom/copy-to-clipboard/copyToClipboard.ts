interface CopyToClipboardParams {
	text: string;
}

/**
 * Copies text to the system clipboard.
 */
async function copyToClipboard({ text }: CopyToClipboardParams) {
	if (typeof window === 'undefined' || !navigator?.clipboard) {
		return false;
	}

	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch (error) {
		console.error('Failed to copy text to clipboard:', error);
		return false;
	}
}

export { copyToClipboard };