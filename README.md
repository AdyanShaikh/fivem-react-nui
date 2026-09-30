# FiveM React NUI

Reusable FiveM NUI boilerplate using React, TypeScript, Vite and Tailwind CSS.

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
│   │   ├── components/ui/
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

### 1. Clone the repository

```bash
git clone https://github.com/AdyanShaikh/fivem-react-nui.git
cd fivem-react-nui/web
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development

```bash
npm run dev
```

### 4. Build for FiveM

```bash
npm run build
```

The build is generated in `web/dist`.

### 5. Install the resource

Place the repository in your FiveM resources directory and add:

```cfg
ensure fivem-react-nui
```

Use `/nui` in-game to open the example UI.

## NUI Communication

### React → Lua

```ts
const response = await fetchNui('nui:ping', { value: 123 })
```

```lua
RegisterNUICallback('nui:ping', function(data, cb)
    cb({ ok = true, message = 'pong', received = data })
end)
```

### Lua → React

```lua
SendNUIMessage({
    action = 'ui:open'
})
```

```ts
useNuiEvent('ui:open', (data) => {
    // handle event
})
```

## Scripts

Run from `web/`:

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check and build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format source |
| `npm run format:check` | Check formatting |

## Framework Support

The boilerplate is framework-agnostic and does not depend on QBox, QBCore or ESX. Framework-specific logic can be added on top of the base resource.