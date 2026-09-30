# FiveM React NUI

Production-ready, framework-agnostic FiveM NUI foundation built with React, TypeScript, Vite and Tailwind CSS.

Use it as the base for anything from a small interaction UI to banking, inventory, MDT, phone, HUD and admin interfaces.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Zustand
- React Hook Form + Zod
- Lucide React
- FiveM Lua
- ESLint + Prettier
- GitHub Actions

## Why this template

- Typed React ↔ Lua NUI callbacks and events
- Browser development without FiveM
- Production build plus continuous in-game watch mode
- Reusable UI primitives
- Centralized UI state with Zustand
- Request timeouts and useful NUI errors
- Error boundary for unexpected UI crashes
- Framework-agnostic client/server structure
- No QBox, QBCore or ESX dependency

The NUI bridge follows FiveM's callback/message model: UI callbacks use JSON requests/responses, while Lua can push messages to the browser UI. FiveM requires NUI callbacks to always invoke their callback to avoid stalled requests.

## Structure

```
.
├── client/
│   └── main.lua
├── server/
│   └── main.lua
├── shared/
│   └── config.lua
├── web/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   └── ErrorBoundary.tsx
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── nui/
│   │   ├── stores/
│   │   └── types/
│   ├── package.json
│   └── vite.config.ts
├── .github/
│   └── workflows/
│       └── ci.yml
└── fxmanifest.lua
```

## Installation

### 1. Clone

```bash
git clone https://github.com/AdyanShaikh/fivem-react-nui.git
cd fivem-react-nui/web
```

### 2. Install

```bash
npm install
```

### 3. Browser development

```bash
npm run dev
```

### 4. Live build for FiveM

```bash
npm run start:game
```

Vite continuously writes the production build to `web/dist`. Restart the resource when needed.

### 5. Production build

```bash
npm run build
```

### 6. Install the resource

Place the repository in your FiveM resources directory and add:

```cfg
ensure fivem-react-nui
```

Use `/nui` or the default F2 key to open the example UI.

## Typed NUI API

Add resource-specific contracts in `web/src/nui/contracts.ts`.

```ts
export interface NuiCallbacks {
  'bank:getBalance': {
    request: { account: string }
    response: { balance: number }
  }
}

export interface NuiEvents {
  'player:update': {
    id: number
    name: string
  }
}
```

Then the compiler knows the payload and response types:

```ts
const result = await fetchNui('bank:getBalance', {
  account: 'checking',
})
```

```ts
useNuiEvent('player:update', (player) => {
  console.log(player.id, player.name)
})
```

This keeps NUI contracts close to the resource instead of scattering untyped strings throughout the application.

## NUI Communication

### React → Lua

```ts
const response = await fetchNui('nui:ping', {
  name: 'FiveM',
  timestamp: Date.now(),
})
```

```lua
RegisterNUICallback('nui:ping', function(data, cb)
    cb({
        ok = true,
        message = 'pong',
        received = data,
    })
end)
```

### Lua → React

```lua
SendNUIMessage({
    action = 'ui:open',
})
```

```ts
useNuiEvent('ui:open', () => {
  // handle event
})
```

## Scripts

Run from `web/`:

| Command | Description |
|---|---|
| `npm run dev` | Browser development server |
| `npm run start:game` | Continuous production build for FiveM |
| `npm run build` | Type-check and production build |
| `npm run typecheck` | Type-check only |
| `npm run lint` | Run ESLint |
| `npm run format` | Format source |
| `npm run format:check` | Check formatting |

## Framework Support

The boilerplate is intentionally framework-agnostic. It works as a UI foundation for standalone resources and can sit on top of QBox, QBCore, ESX or a custom framework without changing the React architecture.

## License

MIT
