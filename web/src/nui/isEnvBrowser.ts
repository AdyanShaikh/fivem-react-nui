export function isEnvBrowser(): boolean {
  return typeof GetParentResourceName === 'undefined'
}
