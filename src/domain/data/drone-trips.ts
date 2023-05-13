type Drone = {
  name: string
}

export type TripDeliveryLocation = {
  name: string
}

export type Trip = {
  deliveryLocations: TripDeliveryLocation[]
}

export type DroneTrip = {
  drone: Drone
  trips: Trip[]
}
