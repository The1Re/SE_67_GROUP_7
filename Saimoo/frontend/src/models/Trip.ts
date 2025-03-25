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