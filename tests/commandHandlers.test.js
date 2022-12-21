import commandHandler, { isActive } from "../src/listeners/handlers/commandHandlers.js";

test('/pair command fired for inactive user', () => {
  expect(isActive({
    isActive: true,
    installDate: new Date('2022-12-21T16:18:35.654Z'),
    nextPairDate: new Date('2022-12-28T16:19:17.282Z'),
    reinstallDate: new Date('2022-12-21T16:19:17.282Z'),
    members: {
      U04DE8L08R5: { frequency: '14', lastPairing: '', restrict: [], isActive: false },
      U04DRTFB6QM: { frequency: '14', lastPairing: '', restrict: [], isActive: true },
      U04EPTE4TU3: { frequency: '14', lastPairing: '', restrict: [], isActive: true },
      U04ESESV56G: { frequency: '14', lastPairing: '', restrict: [], isActive: true }
    },
  }, 'C04DUMG5QCT', 'U04DE8L08R5'))
    .toStrictEqual({
      $set: {
        C04DUMG5QCT: {
          isActive: true,
          installDate: new Date('2022-12-21T16:18:35.654Z'),
          nextPairDate: new Date('2022-12-28T16:19:17.282Z'), reinstallDate: new Date('2022-12-21T16:19:17.282Z'),
          members: {
            U04DE8L08R5: { frequency: '14', lastPairing: '', restrict: [], isActive: true },
            U04DRTFB6QM: { frequency: '14', lastPairing: '', restrict: [], isActive: true },
            U04EPTE4TU3: { frequency: '14', lastPairing: '', restrict: [], isActive: true },
            U04ESESV56G: { frequency: '14', lastPairing: '', restrict: [], isActive: true }
          },
        }
      },
    });
});

test('/pair command fired for active user', () => {
  expect(isActive({
    isActive: true,
    installDate: new Date('2022-12-21T16:18:35.654Z'),
    nextPairDate: new Date('2022-12-28T16:19:17.282Z'),
    reinstallDate: new Date('2022-12-21T16:19:17.282Z'),
    members: {
      U04DE8L08R5: { frequency: '14', lastPairing: '', restrict: [], isActive: true },
      U04DRTFB6QM: { frequency: '14', lastPairing: '', restrict: [], isActive: true },
      U04EPTE4TU3: { frequency: '14', lastPairing: '', restrict: [], isActive: true },
      U04ESESV56G: { frequency: '14', lastPairing: '', restrict: [], isActive: true }
    },
  }, 'C04DUMG5QCT', 'U04DE8L08R5'))
    .toStrictEqual(null);
});
