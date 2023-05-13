import { DeliveryLocation } from '../data/delivery-location'
import { DroneTrip } from '../data/drone-trips'
import { Squad } from '../data/squad'
import lodash from 'lodash'

const droneDeliveryDomainService = (
  squad: Squad,
  deliveryLocations: DeliveryLocation[]
): DroneTrip[] => {
  const orderedDrones = squad.sort(
    // for the big first
    (a, b) => (a.maximumWeightCapacity > b.maximumWeightCapacity ? -1 : 1)
  )

  const orderedDeliveryLocations = deliveryLocations.sort((a, b) =>
    // for the big first
    a.totalDeliveryWeight > b.totalDeliveryWeight ? -1 : 1
  ) as [DeliveryLocation | null]

  const locationsInTripMap = {} as Record<
    number,
    {
      droneName: string
      maximumWeightCapacityInTrip: number
      locations: { name: string }[]
    }
  >

  let currentTripIndex = 0

  while (orderedDeliveryLocations.length > 0) {
    for (const drone of orderedDrones) {
      for (const location of orderedDeliveryLocations) {
        const maximumWeightCapacityInTrip =
          locationsInTripMap[currentTripIndex]?.maximumWeightCapacityInTrip ??
          drone.maximumWeightCapacity

        const index = orderedDeliveryLocations.indexOf(location)

        if (
          location &&
          location.totalDeliveryWeight <= maximumWeightCapacityInTrip
        ) {
          locationsInTripMap[currentTripIndex] = {
            droneName: drone.name,

            locations: locationsInTripMap[currentTripIndex]?.locations ?? [],

            maximumWeightCapacityInTrip:
              maximumWeightCapacityInTrip - location.totalDeliveryWeight
          }
          orderedDeliveryLocations.splice(index, 1)

          locationsInTripMap[currentTripIndex].locations.push({
            name: location.name
          })
        }

        if (index === orderedDeliveryLocations.length - 1) {
          currentTripIndex++
        }
      }
    }
  }

  const droneTrips = lodash
    .chain(Object.values(locationsInTripMap))
    .groupBy('droneName')
    .map((items) => {
      const trips = items.map((item) => {
        return {
          deliveryLocations: item.locations.map((location) => {
            return {
              name: location.name
            }
          })
        }
      })

      return {
        drone: {
          name: items[0].droneName
        },
        trips: trips
      } as DroneTrip
    })
    .value()

  return droneTrips
}

export default droneDeliveryDomainService
