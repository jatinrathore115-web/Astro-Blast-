# Space Defender

An endless, dependency-free Canvas 2D arcade game based on the supplied 1920×1080 artwork.

## Run

From this directory, start any static server, for example:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`. The space scene uses edge-to-edge cover scaling, so every screen is filled without letterbox bars. A non-interactive 10-second tutorial plays exactly once per page session and uses the supplied `handNudge.webp` artwork to demonstrate the complete 0°–180° aiming sweep, alignment with an incoming meteor, and the BLAST action. Music is requested as the tutorial begins and continues seamlessly into gameplay; browsers that enforce autoplay unlock it on the first permitted gesture. **Tap to Start** appears only after the tutorial finishes; tapping it begins live gameplay. Grab and drag the missile barrel itself to aim, then tap **BLAST** to fire. Dragging elsewhere does not change the angle. The angle scale runs from 0° at the far left through 90° straight up to 180° at the far right. Space remains available for firing and M toggles mute; keyboard arrows do not control aim. Meteors spawn only from the top, left, and right in the repeating sequence Green → Pink → Orange → Neon Green → Yellow → Purple. As each meteor crosses onto the visible screen, the next color immediately starts entering from another direction, maintaining a continuous stream of up to six active meteors. Smoke is produced only when a meteor reaches the center target; off-target meteors continue through and leave the screen cleanly.

Audio unlocks on the first tap. The game includes a layered, synthesized Blast effect and the CC0 **Space Flight** music loop by wipics, loaded through Web Audio with a smooth fade-in.

## Responsive behavior

- The background uses an independent aspect-preserving cover pass with no letterboxing or stretching.
- Gameplay uses visible virtual safe-area bounds, bottom-aligning the cannon on short landscape screens while keeping it centered in portrait.
- HUD, tutorial text, HandNudge, meteor entry edges, mute hit target, and entity cleanup adapt to the current viewport.
- Device pixel ratio is capped at 2 for low-end GPU performance, while compact-screen text retains a minimum physical size.
- Touch scrolling, browser zoom gestures, selection, overscroll, and callouts are disabled on the play surface.
- Resize, orientation change, mobile visual-viewport changes, and iOS safe-area insets are handled automatically.

## Asset pipeline

The supplied transparent 1920×1080 layers are kept as overlays in `assets/images`. `tools/gif_to_spritesheet.py` converts the source GIF with Pillow and writes the horizontal sheet and JSON metadata. The checked-in sheet was generated from all 36 supplied frames.

## Tuning

Gameplay constants live in `src/config.js`: aim clamp/speed, bullet speed/cooldown, meteor speed and hit radius, impact point, virtual resolution, and particle-pool size.

## Intentional deviations

- The supplied `SCREEN.png` already contains the authored stars and HUD strip, so it is used as the background plate with a subtle procedural star layer over it.
- No licensed audio files were supplied. Small cues are synthesized with Web Audio; `assets/audio/CREDITS.md` records that there are no third-party audio assets.
- The source art provides full-frame transparent overlays rather than cropped sprites. They are kept full-frame to preserve exact alignment and soft glows.
