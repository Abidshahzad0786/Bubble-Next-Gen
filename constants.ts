
import { AssetCategory, ArtAsset } from './types';

export const STYLE_LOCK_SUFFIX = "Glossy 3D mobile game art, hyper-casual, vibrant colors, soft reflections, glass-like shine, slight transparency, smooth gradients, clean edges, professional game assets, studio lighting, high resolution, 2k quality, isolated on plain white background for sprite use.";

export const INITIAL_ASSETS: ArtAsset[] = [
  // 1. MAIN BACKGROUND
  {
    id: 'bg-main',
    category: AssetCategory.BACKGROUND,
    name: 'Main Game Background',
    prompt: 'Soft gradient sky with blue, purple, and pink colors, glowing bokeh lights, smooth lighting, clean and bright atmosphere, dreamlike mobile game background.',
    isLoading: false,
    aspectRatio: "9:16"
  },

  // 2. NORMAL BUBBLES
  { id: 'b-red', category: AssetCategory.BUBBLES, name: 'Red Bubble', prompt: 'Single red glossy 3D bubble, shiny glass reflection, perfectly spherical, translucent.', isLoading: false, aspectRatio: "1:1" },
  { id: 'b-blue', category: AssetCategory.BUBBLES, name: 'Blue Bubble', prompt: 'Single blue glossy 3D bubble, shiny glass reflection, perfectly spherical, translucent.', isLoading: false, aspectRatio: "1:1" },
  { id: 'b-yellow', category: AssetCategory.BUBBLES, name: 'Yellow Bubble', prompt: 'Single yellow glossy 3D bubble, shiny glass reflection, perfectly spherical, translucent.', isLoading: false, aspectRatio: "1:1" },
  { id: 'b-green', category: AssetCategory.BUBBLES, name: 'Green Bubble', prompt: 'Single green glossy 3D bubble, shiny glass reflection, perfectly spherical, translucent.', isLoading: false, aspectRatio: "1:1" },
  { id: 'b-purple', category: AssetCategory.BUBBLES, name: 'Purple Bubble', prompt: 'Single purple glossy 3D bubble, shiny glass reflection, perfectly spherical, translucent.', isLoading: false, aspectRatio: "1:1" },
  { id: 'b-pink', category: AssetCategory.BUBBLES, name: 'Pink Bubble', prompt: 'Single pink glossy 3D bubble, shiny glass reflection, perfectly spherical, translucent.', isLoading: false, aspectRatio: "1:1" },
  { id: 'b-orange', category: AssetCategory.BUBBLES, name: 'Orange Bubble', prompt: 'Single orange glossy 3D bubble, shiny glass reflection, perfectly spherical, translucent.', isLoading: false, aspectRatio: "1:1" },

  // 3. SPECIAL BUBBLES
  { id: 's-bomb', category: AssetCategory.SPECIAL_BUBBLES, name: 'Bomb Bubble', prompt: '3D bomb bubble with a glowing fuse and sparks, metallic glossy finish, spherical.', isLoading: false, aspectRatio: "1:1" },
  { id: 's-rainbow', category: AssetCategory.SPECIAL_BUBBLES, name: 'Rainbow Bubble', prompt: '3D rainbow bubble with swirling multicolor gradients, pearlescent finish, magical glow.', isLoading: false, aspectRatio: "1:1" },
  { id: 's-lightning', category: AssetCategory.SPECIAL_BUBBLES, name: 'Lightning Bubble', prompt: '3D glass bubble with electric energy and lightning bolts inside, neon cyan glow.', isLoading: false, aspectRatio: "1:1" },
  { id: 's-fire', category: AssetCategory.SPECIAL_BUBBLES, name: 'Fire Bubble', prompt: '3D fire bubble with internal flame glow, hot embers inside translucent orange glass.', isLoading: false, aspectRatio: "1:1" },
  { id: 's-ice', category: AssetCategory.SPECIAL_BUBBLES, name: 'Ice Bubble', prompt: '3D ice bubble with frosty frozen texture, crystalline edges, cool blue translucent tones.', isLoading: false, aspectRatio: "1:1" },
  { id: 's-changer', category: AssetCategory.SPECIAL_BUBBLES, name: 'Color-Changer Bubble', prompt: '3D bubble with shifting hues, iridescent material, oily sheen, holographic reflections.', isLoading: false, aspectRatio: "1:1" },

  // 4. SHOOTING EFFECTS
  { id: 'fx-trail', category: AssetCategory.EFFECTS, name: 'Shooting Trail FX', prompt: 'Glowing multicolor shooting trail, neon streaks, floating particles, curved motion blur effect, magical.', isLoading: false, aspectRatio: "1:1" },
  
  // 5. AIMING TRAJECTORY
  { id: 'fx-aim', category: AssetCategory.EFFECTS, name: 'Aiming Trajectory', prompt: 'Dotted glowing line trajectory, evenly spaced neon dots, soft glow, curved path sprite.', isLoading: false, aspectRatio: "1:1" },

  // 6. LAUNCHER
  { id: 'ui-launcher', category: AssetCategory.UI, name: 'Bubble Launcher', prompt: 'Cute glossy 3D bubble launcher device, holding one bubble, soft shadows, clean tech-toy look.', isLoading: false, aspectRatio: "1:1" },

  // 7. LEVEL MAP
  { id: 'world-map', category: AssetCategory.WORLD, name: 'World Map', prompt: 'Floating islands world map, cute paths, numbered level nodes, bright cartoon style, volumetric lighting.', isLoading: false, aspectRatio: "9:16" },

  // 8. LEVEL COMPLETE
  { id: 'bg-complete', category: AssetCategory.BACKGROUND, name: 'Victory Screen', prompt: 'Level complete background, confetti, glowing rays, sparkles, empty center for UI, celebratory mood.', isLoading: false, aspectRatio: "9:16" },

  // 9. UI BUTTONS
  { id: 'ui-btn-play', category: AssetCategory.UI, name: 'Play Button', prompt: 'Rounded glossy 3D "Play" button icon, bright green, glass reflection, soft shadow.', isLoading: false, aspectRatio: "1:1" },
  { id: 'ui-btn-pause', category: AssetCategory.UI, name: 'Pause Button', prompt: 'Rounded glossy 3D "Pause" button icon, bright yellow, glass reflection, soft shadow.', isLoading: false, aspectRatio: "1:1" },
  { id: 'ui-btn-settings', category: AssetCategory.UI, name: 'Settings Button', prompt: 'Rounded glossy 3D gear settings icon button, blue, glass reflection, soft shadow.', isLoading: false, aspectRatio: "1:1" },
  { id: 'ui-btn-home', category: AssetCategory.UI, name: 'Home Button', prompt: 'Rounded glossy 3D house home icon button, red, glass reflection, soft shadow.', isLoading: false, aspectRatio: "1:1" },
  { id: 'ui-btn-restart', category: AssetCategory.UI, name: 'Restart Button', prompt: 'Rounded glossy 3D refresh restart icon button, orange, glass reflection, soft shadow.', isLoading: false, aspectRatio: "1:1" },

  // 10. BOOSTER ICONS
  { id: 'boost-bomb', category: AssetCategory.BOOSTERS, name: 'Bomb Booster', prompt: 'Booster icon for bomb, glossy 3D badge with bomb symbol, bright colors.', isLoading: false, aspectRatio: "1:1" },
  { id: 'boost-rainbow', category: AssetCategory.BOOSTERS, name: 'Rainbow Booster', prompt: 'Booster icon for rainbow bubble, glossy 3D badge with swirl symbol, bright colors.', isLoading: false, aspectRatio: "1:1" },
  { id: 'boost-moves', category: AssetCategory.BOOSTERS, name: 'Extra Moves', prompt: 'Booster icon for extra moves, glossy 3D badge with "+5" symbol, bright colors.', isLoading: false, aspectRatio: "1:1" },
  { id: 'boost-lightning', category: AssetCategory.BOOSTERS, name: 'Lightning Booster', prompt: 'Booster icon for lightning, glossy 3D badge with bolt symbol, bright colors.', isLoading: false, aspectRatio: "1:1" },

  // 11. POP / BURST EFFECTS
  { id: 'fx-pop', category: AssetCategory.EFFECTS, name: 'Bubble Pop FX', prompt: 'Bubble burst effect, glowing particles, small sparkles, soft explosion, colorful satisfying sprite.', isLoading: false, aspectRatio: "1:1" },
];
