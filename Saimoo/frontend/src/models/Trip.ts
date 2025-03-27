export type Location = {
    id?: number,
    name: string,
    latitude: number | string | null,
    longitude: number | string | null,
    type: 'temple' | 'place',
    provinceId?: number | null
    Provice?: Provice
}

export type Provice = {
    id?: number,
    name: string
}

export type Trip = {
    id?: number,
    title: string,
    description: string | null,
    dateStart: Date,
    dateEnd: Date,
    vehicle: 'van' | 'bus',
    maxPerson: number,
    status: "waiting" | "incoming" | "ongoing" | "complete" | "cancel",
    ownerTripId: number,
    type: 'paid' | 'free',
    price: number,
    TripPicture?: {
        imagePath: string | null,
    }
    TripDetail?: TripDetail[]
}

export type TripDetail = {
    id: number,
    tripId?: number,
    arriveTime: Date | null, 
    day: number,
    order?: number,
    description: string | null,
    locationId?: number,
    TripDetailPicture?: {
        imagePath: string[] | null,
    }
    Location?: Location
}
