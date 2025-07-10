
export type Quality = 'Basic' | 'Medium' | 'Premium';

export type MaterialKey = 'cement' | 'flooring' | 'kitchen' | 'wood' | 'paint' | 'roofing';

export interface MaterialOption {
  name: string;
  cost: number;
}

export interface SelectedMaterials {
  cement: MaterialOption;
  flooring: MaterialOption;
  kitchen: MaterialOption;
  wood: MaterialOption;
  paint: MaterialOption;
  roofing: MaterialOption;
}

export interface Feature {
  enabled: boolean;
  area: number;
  type: string;
}

export interface BoundaryWallFeature {
    enabled: boolean;
    length: number;
    type: string;
}

export interface SolarFeature {
    enabled: boolean;
    type: string;
}

export interface AdditionalFeatures {
  landscaping: Feature;
  paving: Feature;
  boundaryWall: BoundaryWallFeature;
  solar: SolarFeature;
}

export type ItemCategoryType = 'furniture' | 'appliances' | 'decor';

export interface Item {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isCustom: boolean;
}

export interface Room {
  id: string;
  name: string;
  type: string;
  width: number;
  length: number;
  area: number;
  hasFalseCeiling: boolean;
  furniture: Item[];
  appliances: Item[];
  decor: Item[];
}

export interface CostBreakdown {
    foundation: number;
    structure: number;
    roofing: number;
    materials: number;
    features: number;
    furniture: number;
    appliances: number;
    decor: number;
    total: number;
}
