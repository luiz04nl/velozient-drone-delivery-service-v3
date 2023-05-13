# Velozient Coding Challenge

Velozient Coding Challeng

## Algorithm

- I dont know no one very good algorithm known to solve this kind of problem, so I thinked empirically in a way to solve, i searched for some applicable theory but everithing that i finded was very complex i seems to me that must exist a more easy way, anyway
  my ideia was order the drones with the most capacity first and the locations by the with more delivery wheigt, this way a can priorize the most able drone to try reduce that times of trevel to the base, however my soliction was not so good like the sugestion in instrucoes, but i dont stey so far, the tests will make it very clear, I opted to delivery in this way to no take too long with the test.

## Implementation Approach

- I started trying understand the problem and creating a domain model of envolved entities.
- After that, I created the Drone Delivery Domain Service tests, that guided the Drone Delivery Domain Service implementantion, disregarding that presentation interaction by file, once that presentation is important, but is still an detail that would be thinked latter.
- After I add the presentation by file interaction to interact with domain script.
- And by end I make some refactorings, with suport of tests.

## Nodejs Version

For this version I used Node 16.13, any later LTS version should be ok.
For VSCode users IDE, I added the .devcontainer folder that allows the initialization of the whole environment via docker.
The .devcontainer/alpine.debug.dockerfile file allows the same container in other ways.

## Technical Dependencies and Libraries

- lodash - to create a group by to map in other data struct more convenient
- jest - like test runner
- node - Node 16.13 or latter

## Installation of dependence packages:

```bash
yarn
```

## Run tests

```bash
yarn test
```

## Run tests including the HTML coverage report

```bash
yarn clean
yarn test:coverage
```

## If you want to transpilate the project to JavaScript

```bash
yarn clean
yarn build
```
