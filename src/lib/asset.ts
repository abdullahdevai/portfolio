/** Prefix a root-absolute public asset path with the app's base URL (e.g. `/portfolio/`). */
export function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
