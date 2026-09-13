import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { writeLocalStorage } from './writeLocalStorage';

describe('writeLocalStorage', () => {
	const setItem = vi.fn();
	let consoleError: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		vi.useFakeTimers();
		vi.stubGlobal('localStorage', {
			setItem
		});

		consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.useRealTimers();
		consoleError.mockRestore();
		vi.unstubAllGlobals();
	});

	test('saves serialized data asynchronously', () => {
		writeLocalStorage('settings', { theme: 'dark', compact: true });

		expect(setItem).not.toHaveBeenCalled();

		vi.runAllTimers();

		expect(setItem).toHaveBeenCalledOnce();
		expect(setItem).toHaveBeenCalledWith(
			'settings',
			'{"theme":"dark","compact":true}'
		);
	});

	test('serializes primitive values before saving them', () => {
		writeLocalStorage('completed', false);

		vi.runAllTimers();

		expect(setItem).toHaveBeenCalledWith('completed', 'false');
	});

	test('logs an error when localStorage rejects the write', () => {
		const storageError = new Error('quota exceeded');
		setItem.mockImplementation(() => {
			throw storageError;
		});

		writeLocalStorage('settings', { theme: 'dark' });

		expect(() => vi.runAllTimers()).not.toThrow();
		expect(consoleError).toHaveBeenCalledWith(
			'Error saving to localStorage:',
			storageError
		);
	});

	test('logs an error when data cannot be serialized', () => {
		const circular: { self?: unknown } = {};
		circular.self = circular;

		writeLocalStorage('circular', circular);

		expect(() => vi.runAllTimers()).not.toThrow();
		expect(setItem).not.toHaveBeenCalled();
		expect(consoleError).toHaveBeenCalledWith(
			'Error saving to localStorage:',
			expect.any(TypeError)
		);
	});
});
