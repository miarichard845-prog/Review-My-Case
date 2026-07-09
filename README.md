# Review My Case — Expo App

## Setup
```
npm install
npx expo start
```
Scan the QR code with the Expo Go app, or press `i` / `a` for iOS/Android simulators.

## Folder structure
```
App.js
package.json
app.json
babel.config.js
assets/            → app icons & splash image
src/
  theme.js         → color tokens
  data/            → mock data (cases, lawyers, user)
  context/         → global app state (role-agnostic: intake modal, analysis)
  components/      → shared UI building blocks (Card, Pill, ScoreRing, IntakeModal, etc.)
  navigation/       → RootNavigator + per-role bottom tab navigators
  screens/
    user/
    lawyer/
    admin/
```

## Note on the AI case-analysis call
`src/context/AppContext.js` calls `https://api.anthropic.com/v1/messages` directly from
the client. That endpoint requires an `x-api-key` header — it works inside Claude's
artifact preview (which injects the key for you) but will **not** authenticate from a
standalone app. For production use, proxy this call through your own backend that holds
the API key server-side, and point the `fetch` at your backend instead. Until then, the
`catch` block returns a realistic mock result so the UI keeps working end-to-end.
