export function isEnvBrowser(): boolean {
  return !(window as Window & { invokeNative?: unknown }).invokeNative &&
    !('__cfx_nui' in window)
}
