import { setFrequency } from "../../src/listeners/handlers/commandHandlers";

test('/frequency command fired w/o params for inactive user', () => {
  expect(setFrequency({
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', ''))
    .toStrictEqual(`/frequency can only be called for active users. Set yourself active for pairing with the /pair command first.`);
});

test('/frequency command fired w/o params for active user', () => {
  expect(setFrequency({
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
  }, 'C04DUMG5QCT', 'U04DRTFB6QM', ''))
    .toStrictEqual(`Your current frequency of one-on-one's in this channel is every 14 days.`);
});

test('/frequency command fired w/ params for active user', () => {
  expect(setFrequency({
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
  }, 'C04DUMG5QCT', 'U04DRTFB6QM', '21'))
    .toStrictEqual({
      $set: {
        C04DUMG5QCT: {
          isActive: true,
          installDate: new Date('2022-12-21T16:18:35.654Z'),
          nextPairDate: new Date('2022-12-28T16:19:17.282Z'),
          reinstallDate: new Date('2022-12-21T16:19:17.282Z'),
          members: {
            U04DE8L08R5: { frequency: '14', lastPairing: '', restrict: [], isActive: false },
            U04DRTFB6QM: { frequency: '21', lastPairing: '', restrict: [], isActive: true },
            U04EPTE4TU3: { frequency: '14', lastPairing: '', restrict: [], isActive: true },
            U04ESESV56G: { frequency: '14', lastPairing: '', restrict: [], isActive: true }
          }
        }
      }
    });
});

test('/frequency command fired w/ params for inactive user', () => {
  expect(setFrequency({
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', '21'))
    .toStrictEqual(`/frequency can only be called for active users. Set yourself active for pairing with the /pair command first.`);
});

test('/frequency command fired w/ invalid params for active user', () => {
  expect(setFrequency({
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
  }, 'C04DUMG5QCT', 'U04DRTFB6QM', '91'))
    .toStrictEqual(`You inputted an invalid value for frequency of one-on-one's. Only numeric values from 1 to 90 are accepted. Your current frequency of one-on-one's in this channel is every 14 days.`);
});

test('/frequency command fired w/ invalid params for inactive user', () => {
  expect(setFrequency({
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', '91'))
    .toStrictEqual(`/frequency can only be called for active users. Set yourself active for pairing with the /pair command first.`);
});
