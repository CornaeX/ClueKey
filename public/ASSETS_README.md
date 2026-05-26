# Public Assets — Hint Unlock

## Folder Structure

Place your actual image/video assets in these folders.

### Backgrounds
```
public/
  backgrounds/
    desktop/
      bg1.jpg  ← Login page background (desktop)
      bg2.jpg  ← Waiting screen background (desktop)
      bg3.jpg  ← Cinematic scene background (desktop)
      bg4.jpg  ← Final reveal background (desktop)
    tablet/
      bg1.jpg  ... same scenes, tablet-optimized crops
      bg2.jpg
      bg3.jpg
      bg4.jpg
    mobile/
      bg1.jpg  ... same scenes, mobile-optimized crops
      bg2.jpg
      bg3.jpg
      bg4.jpg

  images/
    gear.png     ← Your single gear image (used for both gears)
    logo.png     ← (Optional) Replace SVG in LogoDisplay.tsx

  videos/
    character.webm  ← Transparent character running animation
```

### Scene Index
| Scene  | bg index | Notes |
|--------|----------|-------|
| login  | bg1.jpg  | Login page fullscreen bg |
| waiting| bg2.jpg  | Shown in split door panels |
| cinematic | bg3.jpg | Behind character webm |
| reveal | bg4.jpg  | Final Secret Document bg |

### Gear PNG Tips
- The gear image is reused for both gears.
- Large gear: ~140px (desktop), rotates clockwise.
- Small gear: ~96px (desktop), rotates counterclockwise at proportional speed.
- The teeth interlock based on size ratio. Ensure your gear PNG has visible teeth.
- `filter: invert(1)` is applied to make it work on dark backgrounds — remove if your gear is light-colored.

### Character WEBM Tips
- Must be a transparent WebM (VP9 codec with alpha channel).
- The character should start small (far back) and move toward the camera.
- Duration: ~4 seconds (configurable in `src/config/animationConfig.ts`).
