export interface TripPoint {
    airportId: string
    date: string
}

export interface Trip extends Record<string, any> {
    departure: TripPoint
    arrival: TripPoint
    passengers: number
}