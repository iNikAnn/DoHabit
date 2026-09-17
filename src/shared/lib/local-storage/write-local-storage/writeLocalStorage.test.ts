import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { writeLocalStorage } from './writeLocalStorage';

describe('writeLocalStorage', () => {
	const setItem = vi.fn();

	beforeEach(() => {
		vi.useFakeTimers();
		vi.stubGlobal('localStorage', { setItem });
		vi.spyOn(console, 'error').mockImplementation(() => undefined);
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
		vi.unstubAllGlobals();
		vi.useRealTimers();
	});

	test('saves serialized data asynchronously', () => {
		writeLocalStorage('settings', { theme: 'dark', compact: true });

		expect(setItem).not.toHaveBeenCalled();

		vi.runAllTimers();

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
		setItem.mockImplementation(() => {
			throw new Error('quota exceeded');
		});

		writeLocalStorage('settings', { theme: 'dark' });
		vi.runAllTimers();

		expect(console.error).toHaveBeenCalledOnce();
	});

	test('logs an error when data cannot be serialized', () => {
		const circular: { self?: unknown } = {};
		circular.self = circular;

		writeLocalStorage('circular', circular);
		vi.runAllTimers();

		expect(setItem).not.toHaveBeenCalled();
		expect(console.error).toHaveBeenCalledOnce();
	});
});
