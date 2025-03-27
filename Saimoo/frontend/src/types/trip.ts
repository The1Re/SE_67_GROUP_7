
export type Location = {
    id: string;
    name?: string;
    address?: string;
    lat?: number;
    lng?: number;
    images: string[];
    thumbnail?: string | null;
    description?: string;
    time?: string;
  };
  
  export type Day = {
    id: number;
    locations: Location[];
  };
  