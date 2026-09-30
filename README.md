# FiveM React NUI

A production-oriented, framework-agnostic FiveM NUI foundation built with React, TypeScript, Vite and Tailwind CSS.

## Features

- React 19 + TypeScript
- Vite development/build pipeline
- Tailwind CSS 4
- FiveM Lua client/server/shared layout
- Browser-safe NUI development mode
- NUI callbacks with `fetchNui`
- Incoming NUI events with `useNuiEvent`
- Reusable `useNuiCallback` hook
- NUI close/message helpers
- Zustand state management
- Reusable UI primitives
- ESLint + Prettier
- GitHub Actions CI
- MIT licensed

## Structure

```
.
├── client/
├── server/
├── shared/
├── web/
│   └── src/
│       ├── components/ui/
│       ├── hooks/
│       ├── lib/
│       ├── nui/
│       ├── stores/
│       └── types/
└── fxmanifest.lua
```

## Development

```bash
cd web
npm install
npm run dev
```

Build the NUI for FiveM:

```bash
npm run build
```

Then place the resource in your FiveM resources directory and add:

```
ensure fivem-react-nui
```

Use `/nui` in-game to open the example interface.

## NUI callback

React:

```ts
const response = await fetchNui('nui:ping', { value: 123 })
```

Lua:

```lua
RegisterNUICallback('nui:ping', function(data, cb)
    cb({ ok = true, message = 'pong', received = data })
end)
```

## Philosophy

The core stays independent of QBox, QBCore, ESX and other frameworks. Framework-specific adapters can be added by individual resources without coupling the base UI architecture.

Built to be reused across banking, MDT, phone, inventory, HUD, administration and other FiveM resources.
