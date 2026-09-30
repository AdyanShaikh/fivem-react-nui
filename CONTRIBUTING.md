# Contributing

Thanks for contributing to FiveM React NUI.

## Development

1. Fork the repository.
2. Clone your fork.
3. Run `cd web && npm install`.
4. Run `npm run dev` while developing the UI.
5. Run `npm run lint` and `npm run build` before opening a pull request.

Keep the core framework-agnostic. Do not add QBox, QBCore, ESX, or other framework-specific dependencies to the base.

## Pull requests

- Keep changes focused.
- Use TypeScript for web code.
- Prefer reusable primitives over resource-specific components.
- Keep FiveM communication typed and explicit.
- Update documentation when behavior or public APIs change.
