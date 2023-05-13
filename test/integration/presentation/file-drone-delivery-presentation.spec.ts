import fileDroneDeliveryPresentation from '../../../src/presentation/file-drone-delivery-presentation'

describe('Presentation By Input File To Drone Delivery Service', () => {
  test(`When supplied the first input data file should process and export to output file with true return`, async () => {
    // Arrange
    const doubleInputFile = './test/integration/presentation/input-1.txt'
    const doubleoutputFile = './test/integration/presentation/test-output-1.txt'

    // Act
    const value = await fileDroneDeliveryPresentation(
      doubleInputFile,
      doubleoutputFile
    )

    // Assert
    expect(value).toBeTruthy()
  })

  test(`When supplied a second input data file should process and export to output file with true return`, async () => {
    // Arrange
    const doubleInputFile = './test/integration/presentation/input-2.txt'
    const doubleoutputFile = './test/integration/presentation/test-output-2.txt'

    // Act
    const value = await fileDroneDeliveryPresentation(
      doubleInputFile,
      doubleoutputFile
    )

    // Assert
    expect(value).toBeTruthy()
  })
})
