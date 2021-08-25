export interface Trip extends Record<string, any> {
    name: string
    email: string
    phone: string
    passengers: number
    departureAirportId: string 
    departureDate: string
    arrivalAirportId: string
}
 