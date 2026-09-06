import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { clearLocalStorage } from './clearLocalStorage';

describe('clearLocalStorage', () => {
    const removeItem = vi.fn();
    const clear = vi.fn();

    beforeEach(() => {
        vi.stubGlobal('localStorage', {
            removeItem,
            clear,
        });

        removeItem.mockClear();
        clear.mockClear();
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    test('should remove a single key', () => {
        clearLocalStorage('user');

        expect(removeItem).toHaveBeenCalledWith('user');
    });

    test('should remove multiple keys', () => {
        clearLocalStorage(['user', 'settings']);

        expect(removeItem).toHaveBeenCalledTimes(2);
        expect(removeItem).toHaveBeenCalledWith('user');
        expect(removeItem).toHaveBeenCalledWith('settings');
    });

    test('should clear all local storage when no keys are provided', () => {
        clearLocalStorage();

        expect(clear).toHaveBeenCalledOnce();
    });
});