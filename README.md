# 🔐 Hint Unlock — Cinematic Secret Document Experience

A premium, story-driven React + TypeScript + Vite + Tailwind website.

## Quick Start

```bash
npm install
npm run dev
```

## Project Architecture

```
src/
├── assets/                  # Static assets (imported via JS)
├── animations/
│   ├── gearAnimations.ts    # Gear spin + split door variants
│   ├── revealAnimations.ts  # Background zoom, list stagger, fade-in
│   └── cinematicAnimations.ts  # Character scene, cream overlay
├── components/
│   ├── common/
│   │   └── FullscreenBackground.tsx
│   ├── login/
│   │   ├── LoginForm.tsx       # Container for login UI
│   │   ├── LogoDisplay.tsx     # Animated logo/ornament
│   │   ├── StudentInput.tsx    # ID input field
│   │   └── SubmitButton.tsx    # Submit with shimmer effect
│   ├── waiting/
│   │   ├── WaitingScreen.tsx   # Split door scene controller
│   │   ├── GearPair.tsx        # Two interlocked gears
│   │   └── PressHereButton.tsx # Floating click prompt
│   ├── cinematic/
│   │   └── CharacterScene.tsx  # WebM player with cream overlay
│   └── reveal/
│       ├── SecretDocument.tsx  # Final hint document UI
│       └── HintRow.tsx         # Individual hint row
├── config/
│   ├── animationConfig.ts   # ← ALL timings live here
│   └── responsiveConfig.ts  # Breakpoints, asset paths
├── hooks/
│   ├── useResponsiveAsset.ts   # Device type + background selector
│   ├── usePreloadAssets.ts     # Image preloading with progress
│   └── useAnimationTimeline.ts # Imperative timeline runner
├── pages/
│   ├── LoginPage/LoginPage.tsx
│   └── ExperiencePage/ExperiencePage.tsx  # Scene orchestrator
├── animations/              # Framer Motion variants
├── types/index.ts           # Shared TypeScript types
└── utils/studentData.ts     # Mock API (replace with real)
```

## Scene Flow

```
LoginPage (/)
  ↓ submit student ID
ExperiencePage (/experience/:studentId)
  ├── [stage: waiting]  → WaitingScreen
  │     Gears spin → user clicks → split door opens
  ├── [stage: character] → CharacterScene
  │     WebM plays → character scales in → cream flash → fade out
  └── [stage: final]    → SecretDocument
        Background zooms in/out → pixel title → hint rows stagger in
```

## Customizing Animations

Edit **`src/config/animationConfig.ts`** to tune every timing:

```ts
ANIMATION_CONFIG.waiting.gearSpinDuration = 3       // seconds/rotation
ANIMATION_CONFIG.splitDoor.duration = 1.1            // split speed
ANIMATION_CONFIG.character.scaleDuration = 3.8       // character grow
ANIMATION_CONFIG.backgroundZoom.initialScale = 1.18  // border-hiding zoom
ANIMATION_CONFIG.finalReveal.listStaggerDelay = 0.12 // hint row stagger
```

## Adding Your Assets

See `public/ASSETS_README.md` for full details.

1. Place `bg1.jpg`–`bg4.jpg` in each of: `public/backgrounds/desktop|tablet|mobile/`
2. Place `gear.png` in `public/images/`
3. Place `character.webm` (transparent VP9) in `public/videos/`

## Responsive

- **Mobile** `< 768px`: vertical layout, 0.7× gear scale
- **Tablet** `768–1024px`: standard layout
- **Desktop** `> 1024px`: cinematic wide layout

Each device tier loads its own set of background images (see `responsiveConfig.ts`).

## Replace Mock Data

Edit `src/utils/studentData.ts` → replace `fetchStudentData()` with your real API call.
