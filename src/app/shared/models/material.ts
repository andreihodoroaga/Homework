export enum Material {
  Wood,
  Bronze,
  Platinum,
}

export const materialPriceMultipliers: Record<Material, number> = {
  [Material.Wood]: 1,
  [Material.Bronze]: 2,
  [Material.Platinum]: 18,
};

export const materialWeightMultipliers: Record<Material, number> = {
  [Material.Wood]: 1,
  [Material.Bronze]: 12.4,
  [Material.Platinum]: 30.3,
};
