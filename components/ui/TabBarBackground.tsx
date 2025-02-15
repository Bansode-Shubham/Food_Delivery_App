// This is a shim for web and Android where the tab bar is generally opaque.
export default undefined;

/**
 * Calculates the overflow of the bottom tab bar by subtracting the bottom
 * safe area inset from the tab bar height. This is useful for adjusting
 * layouts when the tab bar is visible.
 *
 * @returns The overflow value of the bottom tab bar.
 */

export function useBottomTabOverflow() {
  return 0;
}
