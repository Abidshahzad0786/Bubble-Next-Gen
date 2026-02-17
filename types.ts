
export enum AssetCategory {
  BACKGROUND = 'Backgrounds',
  BUBBLES = 'Normal Bubbles',
  SPECIAL_BUBBLES = 'Special Bubbles',
  UI = 'UI Elements',
  EFFECTS = 'Effects & FX',
  BOOSTERS = 'Booster Icons',
  WORLD = 'Level Maps'
}

export interface ArtAsset {
  id: string;
  category: AssetCategory;
  name: string;
  prompt: string;
  imageUrl?: string;
  isLoading: boolean;
  aspectRatio: "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
}

export interface ArtPackState {
  assets: ArtAsset[];
}
