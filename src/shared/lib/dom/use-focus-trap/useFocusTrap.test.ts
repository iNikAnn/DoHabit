import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { useFocusTrap } from './useFocusTrap';

describe('useFocusTrap', () => {
	let rootElement: HTMLDivElement;
	let container: HTMLDivElement;
	let input1: HTMLInputElement;
	let input2: HTMLInputElement;
	let button: HTMLButtonElement;

	beforeEach(() => {
		vi.useFakeTimers();

		rootElement = document.createElement('div');
		rootElement.id = 'root';
		document.body.appendChild(rootElement);

		container = document.createElement('div');
		input1 = document.createElement('input');
		input1.id = 'input-1';
		input2 = document.createElement('input');
		input2.id = 'input-2';
		button = document.createElement('button');
		button.id = 'button-1';

		container.appendChild(input1);
		container.appendChild(input2);
		container.appendChild(button);
		document.body.appendChild(container);
	});

	afterEach(() => {
		vi.useRealTimers();
		document.body.innerHTML = '';
	});

	it('should apply inert attribute to #root when active and remove on deactivation', () => {
		const { rerender, unmount } = renderHook(
			({ isActive }) => {
				const containerRef = useRef<HTMLDivElement>(container);
				return useFocusTrap({ isActive, containerRef });
			},
			{ initialProps: { isActive: true } }
		);

		expect(rootElement.hasAttribute('inert')).toBe(true);

		rerender({ isActive: false });
		expect(rootElement.hasAttribute('inert')).toBe(false);

		rerender({ isActive: true });
		expect(rootElement.hasAttribute('inert')).toBe(true);

		unmount();
		expect(rootElement.hasAttribute('inert')).toBe(false);
	});

	it('should auto-focus first focusable element inside container on activation', () => {
		const outsideButton = document.createElement('button');
		document.body.appendChild(outsideButton);
		outsideButton.focus();
		expect(document.activeElement).toBe(outsideButton);

		renderHook(() => {
			const containerRef = useRef<HTMLDivElement>(container);
			return useFocusTrap({ isActive: true, containerRef });
		});

		vi.advanceTimersByTime(50);
		expect(document.activeElement).toBe(input1);
	});

	it('should restore focus to previously active element on deactivation', () => {
		const triggerButton = document.createElement('button');
		document.body.appendChild(triggerButton);
		triggerButton.focus();
		expect(document.activeElement).toBe(triggerButton);

		const { unmount } = renderHook(() => {
			const containerRef = useRef<HTMLDivElement>(container);
			return useFocusTrap({ isActive: true, containerRef });
		});

		vi.advanceTimersByTime(50);
		expect(document.activeElement).toBe(input1);

		unmount();
		expect(document.activeElement).toBe(triggerButton);
	});

	it('should wrap focus from last element to first element on Tab', () => {
		renderHook(() => {
			const containerRef = useRef<HTMLDivElement>(container);
			return useFocusTrap({ isActive: true, containerRef });
		});

		vi.advanceTimersByTime(50);
		button.focus();
		expect(document.activeElement).toBe(button);

		const event = new KeyboardEvent('keydown', {
			key: 'Tab',
			bubbles: true,
			cancelable: true
		});
		document.dispatchEvent(event);

		expect(event.defaultPrevented).toBe(true);
		expect(document.activeElement).toBe(input1);
	});

	it('should wrap focus from first element to last element on Shift+Tab', () => {
		renderHook(() => {
			const containerRef = useRef<HTMLDivElement>(container);
			return useFocusTrap({ isActive: true, containerRef });
		});

		vi.advanceTimersByTime(50);
		input1.focus();
		expect(document.activeElement).toBe(input1);

		const event = new KeyboardEvent('keydown', {
			key: 'Tab',
			shiftKey: true,
			bubbles: true,
			cancelable: true
		});
		document.dispatchEvent(event);

		expect(event.defaultPrevented).toBe(true);
		expect(document.activeElement).toBe(button);
	});
});
