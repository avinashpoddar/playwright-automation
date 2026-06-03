import type { Locator } from '@playwright/test';

const FLASH_MS = 420;

/**
 * Flashes an element (red outline, yellow background) then restores inline styles.
 * Timing runs in the browser to avoid arbitrary sleeps on the Node side.
 */
export async function flashHighlight(locator: Locator): Promise<void> {
    try {
        await locator.first().scrollIntoViewIfNeeded({ timeout: 5000 });
    } catch {
        // Element may be detached; still attempt highlight on resolved handle
    }

    await locator.first().evaluate(
        (el, ms) =>
            new Promise<void>((resolve) => {
                const node = el as HTMLElement;
                const prev = {
                    outline: node.style.outline,
                    backgroundColor: node.style.backgroundColor,
                    transition: node.style.transition,
                };
                node.style.transition = 'all 0.3s ease';
                node.style.outline = '3px solid red';
                node.style.backgroundColor = 'yellow';
                window.setTimeout(() => {
                    node.style.outline = prev.outline;
                    node.style.backgroundColor = prev.backgroundColor;
                    node.style.transition = prev.transition;
                    resolve();
                }, ms);
            }),
        FLASH_MS,
    );
}
