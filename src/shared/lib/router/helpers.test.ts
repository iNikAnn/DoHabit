import { afterEach, describe, expect, test, vi } from 'vitest';
import { getInitialRouteState, getModalPath, getNavigationTarget } from './helpers';

describe('router helpers', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    describe('getInitialRouteState', () => {
        test('should return undefined when history state is empty', () => {
            vi.stubGlobal('window', {
                history: { state: null }
            });

            expect(getInitialRouteState()).toBeUndefined();
        });

        test('should return state from router usr wrapper', () => {
            const state = {
                modalTitle: 'Diary',
                habitId: 'habit-1'
            };

            vi.stubGlobal('window', {
                history: { state: { usr: state } }
            });

            expect(getInitialRouteState<'DIARY'>()).toEqual(state);
        });

        test('should fall back to native history state', () => {
            const state = {
                modalTitle: 'Menu'
            };

            vi.stubGlobal('window', {
                history: { state }
            });

            expect(getInitialRouteState<'MENU'>()).toEqual(state);
        });
    });

    describe('getModalPath', () => {
        test('should return the correct modal path', () => {
            expect(getModalPath('MENU')).toBe('/modal/menu');
            expect(getModalPath('STATISTICS')).toBe('/modal/habit-statistics');
        });
    });

    describe('getNavigationTarget', () => {
        test('should return navigation path and state', () => {
            const state = {
                modalTitle: 'Diary',
                habitId: 'habit-1'
            };

            expect(getNavigationTarget('DIARY', state)).toEqual({
                to: '/modal/diary',
                state
            });
        });
    });
});