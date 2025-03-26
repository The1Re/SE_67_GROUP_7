export type Trip = {
    id: number;
    title: string;
    description: string;
    dateStart: string;
    dateEnd: string;
    vehicle: "van" | "bus",
    maxPerson: number;
    status: string;
    ownerTripId: number;
    type: string;
    price: number;
  }

  export interface Location {
    id: number;
    name: string;
    latitude: number | null;
    longitude: number | null;
    type: 'temple' | 'place';
    provinceId: number | null;
  }
  