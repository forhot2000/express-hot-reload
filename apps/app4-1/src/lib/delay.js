console.log('[module] src/lib/delay');

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
