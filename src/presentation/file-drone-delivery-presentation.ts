import fs from 'fs'
import { Squad } from '../domain/data/squad'
import { Drone } from '../domain/data/drone'
import { DeliveryLocation } from '../domain/data/delivery-location'
import droneDeliveryDomainService from '../domain/service/drone-delivery-domain-service'
import {
  DroneTrip,
  Trip,
  TripDeliveryLocation
} from '../domain/data/drone-trips'

const outputDataToFile = (
  outputFile: string,
  droneTrips: DroneTrip[]
): Promise<boolean> => {
  return new Promise((resolve, _reject) => {
    const outputDeliveryLocations = (
      deliveryLocations: TripDeliveryLocation[]
    ) =>
      deliveryLocations.map((deliveryLocation) => `[${deliveryLocation.name}]`)

    const outputTrip = (trips: Trip[]) =>
      trips.map(
        (trip) =>
          `###Trip #${trips.indexOf(trip) + 1}\n${outputDeliveryLocations(
            trip.deliveryLocations
          )}\n`
      )

    const outputDrones = droneTrips.map(
      (droneTrip) =>
        `###[${droneTrip.drone.name}]\n${outputTrip(droneTrip.trips)}`
    )

    const randomNumber = Math.floor(Math.random() * 10)
    const outputString =
      `***BEGIN OUTPUT FILE #${randomNumber}***\n${outputDrones}\n***END OUTPUT FILE #${randomNumber}***`
        .replaceAll(',###', '')
        .replaceAll('###', '')

    fs.writeFile(outputFile, outputString, (err) => {
      if (err) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

https: const fileDroneDeliveryPresentation = (
  inputFile = './src/presentation/input.txt',
  outputFile = './src/presentation/output.txt'
): Promise<boolean> => {
  return new Promise((resolve, _reject) => {
    fs.createReadStream(inputFile)
      .on('data', (fileBuffer) => {
        const fileStringContent = fileBuffer.toString()
        const fileStringContentLines = fileStringContent.split(/\r?\n/)

        const squad = [] as Squad
        let combinedDeliveryLocationsInString = ''
        const deliveryLocations = [] as DeliveryLocation[]

        while (fileStringContentLines.length > 0) {
          const line = fileStringContentLines[0]

          if (line.includes('BEGIN INPUT FILE')) {
            const index = fileStringContentLines.indexOf(line)
            const squadLineContentsInArray =
              fileStringContentLines[index + 1].split(',')

            for (
              let count = 0;
              count < squadLineContentsInArray.length;
              count += 2
            ) {
              squad.push({
                name: squadLineContentsInArray[count]
                  .trim()
                  .replace('[', '')
                  .replace(']', ''),
                maximumWeightCapacity: Number(
                  squadLineContentsInArray[count + 1]
                    .trim()
                    .replace('[', '')
                    .replace(']', '')
                )
              } as Drone)
            }

            fileStringContentLines.splice(index, 1)
            fileStringContentLines.splice(index, 1)
          } else if (line.includes('END INPUT FILE')) {
            const index = fileStringContentLines.indexOf(line)
            fileStringContentLines.splice(index, 1)
          } else {
            const index = fileStringContentLines.indexOf(line)
            combinedDeliveryLocationsInString =
              combinedDeliveryLocationsInString +
              fileStringContentLines[index].trim()
            fileStringContentLines.splice(index, 1)
          }
        }

        const combinedDeliveryLocationsInArray =
          combinedDeliveryLocationsInString.trim().split('[')
        combinedDeliveryLocationsInArray.splice(0, 1)

        for (
          let count = 0;
          count < combinedDeliveryLocationsInArray.length;
          count += 2
        ) {
          deliveryLocations.push({
            name: combinedDeliveryLocationsInArray[count]
              .trim()
              .replace(',', '')
              .replace(']', ''),
            totalDeliveryWeight: Number(
              combinedDeliveryLocationsInArray[count + 1]
                .trim()
                .replace(',', '')
                .replace(']', '')
            )
          } as DeliveryLocation)
        }

        const droneTrips = droneDeliveryDomainService(squad, deliveryLocations)

        return outputDataToFile(outputFile, droneTrips)
      })
      .on('error', (error) => {
        resolve(false)
      })
      .on('end', () => {
        resolve(true)
      })
  })
}

export default fileDroneDeliveryPresentation
