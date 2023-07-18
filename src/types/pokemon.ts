export interface Pokemon {
    abilities: Array<[]>;
    base_experience: number;
    forms: Array<[]>;
    game_indices: Array<[]>;
    height: number;
    held_items: Array<[]>;
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Array<[]>;
    name: string;
    order: number;
    past_types: Array<[]>;
    species: [];
    speciesDetail: [] | null;
    sprites: Sprites;
    stats: Array<[]>;
    types: Array<Type>;
    weight: number;
    hasBookMarked: boolean;
  }

  export interface Sprites {
    back_default: string;
    back_female?: string | null;
    back_shiny: string;
    back_shiny_female?: string | null;
    front_default: string;
    front_female?: string | null;
    front_shiny: string;
    front_shiny_female?: string | null;
    other: {
      home: {
        front_default: string;
      },
      'official-artwork': {
        front_default: string;
      },
      dream_world: {
        front_default: string;
      }
    }
  }

  export interface Type {
    slot: number;
    type: NamedResource;
  }

  export interface NamedResource {
    name: string;
    url: string;
  }
