import { DeliveryLocation } from '../../../../src/domain/data/delivery-location'
import { Drone } from '../../../../src/domain/data/drone'
import { DroneTrip } from '../../../../src/domain/data/drone-trips'
import { Squad } from '../../../../src/domain/data/squad'
import droneDeliveryDomainService from '../../../../src/domain/service/drone-delivery-domain-service'

describe('Drone Delivery Domain Service', () => {
  test(`Given a first drone squad and many delivere locations, should return a collection of trips of each drone`, () => {
    // Arrange
    const doubleSquad = [
      {
        name: 'DroneA',
        maximumWeightCapacity: 200
      } as Drone,
      {
        name: 'DroneB',
        maximumWeightCapacity: 250
      } as Drone,
      {
        name: 'DroneC',
        maximumWeightCapacity: 100
      } as Drone
    ] as Squad

    const doubleDeliveryLocations = [
      {
        name: 'LocationA',
        totalDeliveryWeight: 200
      } as DeliveryLocation,
      {
        name: 'LocationB',
        totalDeliveryWeight: 150
      } as DeliveryLocation,
      {
        name: 'LocationC',
        totalDeliveryWeight: 50
      } as DeliveryLocation,
      {
        name: 'LocationD',
        totalDeliveryWeight: 150
      } as DeliveryLocation,
      {
        name: 'LocationE',
        totalDeliveryWeight: 100
      } as DeliveryLocation,
      {
        name: 'LocationF',
        totalDeliveryWeight: 200
      } as DeliveryLocation,
      {
        name: 'LocationG',
        totalDeliveryWeight: 50
      } as DeliveryLocation,
      {
        name: 'LocationH',
        totalDeliveryWeight: 80
      } as DeliveryLocation,
      {
        name: 'LocationI',
        totalDeliveryWeight: 70
      } as DeliveryLocation,
      {
        name: 'LocationJ',
        totalDeliveryWeight: 50
      } as DeliveryLocation,
      {
        name: 'LocationK',
        totalDeliveryWeight: 30
      } as DeliveryLocation,
      {
        name: 'LocationL',
        totalDeliveryWeight: 20
      } as DeliveryLocation,
      {
        name: 'LocationM',
        totalDeliveryWeight: 50
      } as DeliveryLocation,
      {
        name: 'LocationN',
        totalDeliveryWeight: 30
      } as DeliveryLocation,
      {
        name: 'LocationO',
        totalDeliveryWeight: 20
      } as DeliveryLocation,
      {
        name: 'LocationP',
        totalDeliveryWeight: 90
      } as DeliveryLocation
    ] as DeliveryLocation[]

    const expectedDroneTrips = [
      {
        drone: {
          name: 'DroneA'
        },
        trips: [
          {
            deliveryLocations: [
              {
                name: 'LocationI'
              },
              {
                name: 'LocationJ'
              },
              {
                name: 'LocationM'
              },
              {
                name: 'LocationN'
              }
            ]
          }
        ]
      } as DroneTrip,
      {
        drone: {
          name: 'DroneB'
        },
        trips: [
          {
            deliveryLocations: [
              {
                name: 'LocationA'
              }
            ]
          },
          {
            deliveryLocations: [
              {
                name: 'LocationB'
              },
              {
                name: 'LocationC'
              }
            ]
          },
          {
            deliveryLocations: [
              {
                name: 'LocationD'
              },
              {
                name: 'LocationE'
              }
            ]
          },
          {
            deliveryLocations: [
              {
                name: 'LocationF'
              },
              {
                name: 'LocationG'
              }
            ]
          },
          {
            deliveryLocations: [
              {
                name: 'LocationH'
              },
              {
                name: 'LocationK'
              },
              {
                name: 'LocationL'
              },
              {
                name: 'LocationO'
              },
              {
                name: 'LocationP'
              }
            ]
          }
        ]
      } as DroneTrip,
      {
        drone: {
          name: 'DroneC'
        },
        trips: []
      } as DroneTrip
    ] as DroneTrip[]

    // Act
    const expectedDroneTripCount = expectedDroneTrips.reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue.trips.length
      },
      0
    )

    // Act
    const value = droneDeliveryDomainService(
      doubleSquad,
      doubleDeliveryLocations
    )
    const droneTripCount = value.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.trips.length
    }, 0)

    // Assert
    expect(droneTripCount).toStrictEqual(expectedDroneTripCount)
    // expect(value).toStrictEqual(expectedDroneTrips)
  })

  test(`Given a second drone squad and many delivere locations, should return a collection of trips of each drone`, () => {
    // Arrange
    const doubleSquad = [
      {
        name: 'DroneA',
        maximumWeightCapacity: 300
      } as Drone,
      {
        name: 'DroneB',
        maximumWeightCapacity: 350
      } as Drone,
      {
        name: 'DroneC',
        maximumWeightCapacity: 200
      } as Drone
    ] as Squad

    const doubleDeliveryLocations = [
      {
        name: 'LocationA',
        totalDeliveryWeight: 200
      } as DeliveryLocation,
      {
        name: 'LocationB',
        totalDeliveryWeight: 150
      } as DeliveryLocation,
      {
        name: 'LocationC',
        totalDeliveryWeight: 50
      } as DeliveryLocation,
      {
        name: 'LocationD',
        totalDeliveryWeight: 150
      } as DeliveryLocation,
      {
        name: 'LocationE',
        totalDeliveryWeight: 100
      } as DeliveryLocation,
      {
        name: 'LocationF',
        totalDeliveryWeight: 200
      } as DeliveryLocation,
      {
        name: 'LocationG',
        totalDeliveryWeight: 50
      } as DeliveryLocation,
      {
        name: 'LocationH',
        totalDeliveryWeight: 80
      } as DeliveryLocation,
      {
        name: 'LocationI',
        totalDeliveryWeight: 70
      } as DeliveryLocation,
      {
        name: 'LocationJ',
        totalDeliveryWeight: 50
      } as DeliveryLocation
    ] as DeliveryLocation[]

    const expectedDroneTrips = [
      {
        drone: {
          name: 'DroneA'
        },
        trips: [
          {
            deliveryLocations: [
              {
                name: 'LocationF'
              },
              {
                name: 'LocationI'
              }
            ]
          }
        ]
      } as DroneTrip,
      {
        drone: {
          name: 'DroneB'
        },
        trips: [
          {
            deliveryLocations: [
              {
                name: 'LocationA'
              },
              {
                name: 'LocationD'
              }
            ]
          },
          {
            deliveryLocations: [
              {
                name: 'LocationE'
              },
              {
                name: 'LocationG'
              },
              {
                name: 'LocationH'
              },
              {
                name: 'LocationJ'
              }
            ]
          }
        ]
      } as DroneTrip,
      {
        drone: {
          name: 'DroneC'
        },
        trips: [
          {
            deliveryLocations: [
              {
                name: 'LocationB'
              },
              {
                name: 'LocationC'
              }
            ]
          }
        ]
      } as DroneTrip
    ] as DroneTrip[]

    const expectedDroneTripCount = expectedDroneTrips.reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue.trips.length
      },
      0
    )

    // Act
    const value = droneDeliveryDomainService(
      doubleSquad,
      doubleDeliveryLocations
    )
    const droneTripCount = value.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.trips.length
    }, 0)

    // Assert
    expect(droneTripCount).toStrictEqual(expectedDroneTripCount)
    // expect(value).toStrictEqual(expectedDroneTrips)
  })
})
