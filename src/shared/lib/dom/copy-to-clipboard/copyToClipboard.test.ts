
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { copyToClipboard } from './copyToClipboard';

describe('copyToClipboard', () => {
	const writeText = vi.fn();

	beforeEach(() => {
		vi.resetAllMocks();
		vi.stubGlobal('window', {});
		vi.stubGlobal('navigator', {
			clipboard: { writeText }
		});
	});

	afterEach(() => {
		vi.restoreAllMocks();
		vi.unstubAllGlobals();
	});

	test('copies text to clipboard successfully', async () => {
		writeText.mockResolvedValue(undefined);

    const result = await copyToClipboard({
      text: 'Hello world!'
    });

		expect(result).toBe(true);
		expect(writeText).toHaveBeenCalledWith('Hello world!');
	});

	test('returns false when clipboard API is unavailable', async () => {
		vi.stubGlobal('navigator', {});

    const result = await copyToClipboard({
      text: 'Hello!'
    });

		expect(result).toBe(false);
		expect(writeText).not.toHaveBeenCalled();
	});

	test('logs an error and returns false when copying fails', async () => {
		const error = new Error('Clipboard access denied');
		writeText.mockRejectedValue(error);

		const consoleError = vi
			.spyOn(console, 'error')
			.mockImplementation(() => undefined);

    const result = await copyToClipboard({
      text: 'Hello!'
    });

		expect(result).toBe(false);
		expect(writeText).toHaveBeenCalledWith('Hello!');
		expect(consoleError).toHaveBeenCalledWith(
			'Failed to copy text to clipboard:',
			error
		);
	});

	test('returns false when window is unavailable', async () => {
		vi.stubGlobal('window', undefined);

    const result = await copyToClipboard({
      text: 'Hello!'
    });

		expect(result).toBe(false);
		expect(writeText).not.toHaveBeenCalled();
	});
});
