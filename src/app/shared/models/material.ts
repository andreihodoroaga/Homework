enum Material {
  Wood,
  Bronze,
  Platinum,
}

const materialPriceMultipliers: Record<Material, number> = {
  [Material.Wood]: 1,
  [Material.Bronze]: 2,
  [Material.Platinum]: 18,
};

const materialWeightMultipliers: Record<Material, number> = {
  [Material.Wood]: 1,
  [Material.Bronze]: 12.4,
  [Material.Platinum]: 30.3,
};
