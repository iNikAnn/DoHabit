import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { readLocalStorage } from './readLocalStorage';

describe('readLocalStorage', () => {
	const getItem = vi.fn();
	let consoleError: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		vi.stubGlobal('localStorage', {
			getItem
		});

		consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
		vi.clearAllMocks();
	});

	afterEach(() => {
		consoleError.mockRestore();
		vi.unstubAllGlobals();
	});

	test('parses and returns a stored JSON value', () => {
		getItem.mockReturnValue('{"theme":"dark","compact":true}');

		const result = readLocalStorage<{ theme: string; compact: boolean }>('settings');

		expect(getItem).toHaveBeenCalledWith('settings');
		expect(result).toEqual({ theme: 'dark', compact: true });
	});

	test('returns the initial value when the key is missing', () => {
		getItem.mockReturnValue(null);

		const result = readLocalStorage('settings', { theme: 'light' });

		expect(result).toEqual({ theme: 'light' });
	});

	test('returns undefined when the key is missing and no initial value is provided', () => {
		getItem.mockReturnValue(null);

		expect(readLocalStorage('missing')).toBeUndefined();
	});

	test('returns the initial value and logs an error when stored JSON is invalid', () => {
		getItem.mockReturnValue('{invalid-json');

		const result = readLocalStorage('settings', { theme: 'light' });

		expect(result).toEqual({ theme: 'light' });
		expect(consoleError).toHaveBeenCalledOnce();
		expect(consoleError).toHaveBeenCalledWith(
			'Error retrieving data from localStorage:',
			expect.any(SyntaxError)
		);
	});
});
