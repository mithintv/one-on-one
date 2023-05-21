import { setFrequency } from "../../src/listeners/handlers/commandHandlers";


test('#1 /frequency w/o params for inactive user', () => {
  expect(setFrequency({
    isActive: true,
    installDate: new Date('2022-12-21T16:18:35.654Z'),
    nextPairDate: new Date('2022-12-28T16:19:17.282Z'),
    reinstallDate: new Date('2022-12-21T16:19:17.282Z'),
    members: [
      {
        U04DE8L08R5: {
          id: 'U04DE8L08R5',
          name: 'Mithin',
          frequency: "14",
          lastPairing: '',
          isActive: false,
          restrict: []
        }
      },
      {
        U04DRTFB6QM: {
          id: 'U04DRTFB6QM',
          name: 'Prakash',
          frequency: "14",
          lastPairing: '',
          isActive: true,
          restrict: []
        }
      },
      {
        U04EPTE4TU3: {
          id: 'U04EPTE4TU3',
          name: 'Nannu',
          frequency: "14",
          lastPairing: '',
          isActive: true,
          restrict: []
        }
      },
      {
        U04ESESV56G: {
          id: 'U04ESESV56G',
          name: 'Cuarine',
          frequency: "14",
          lastPairing: '',
          isActive: true,
          restrict: []
        }
      },
    ],
  }, 'C04DUMG5QCT', 'U04DE8L08R5', ''))
    .toStrictEqual(`/ono-frequency can only be called for active users. Set yourself active for pairing with the /ono-active command first.`);
});


test('#2 /frequency w/o params for active user', () => {
  expect(setFrequency({
    isActive: true,
    installDate: new Date('2022-12-21T16:18:35.654Z'),
    nextPairDate: new Date('2022-12-28T16:19:17.282Z'),
    reinstallDate: new Date('2022-12-21T16:19:17.282Z'),
    members: [
      {
        U04DE8L08R5: {
          id: 'U04DE8L08R5',
          name: 'Mithin',
          frequency: "14",
          lastPairing: '',
          isActive: false,
          restrict: []
        }
      },
      {
        U04DRTFB6QM: {
          id: 'U04DRTFB6QM',
          name: 'Prakash',
          frequency: "14",
          lastPairing: '',
          isActive: true,
          restrict: []
        }
      },
      {
        U04EPTE4TU3: {
          id: 'U04EPTE4TU3',
          name: 'Nannu',
          frequency: "14",
          lastPairing: '',
          isActive: true,
          restrict: []
        }
      },
      {
        U04ESESV56G: {
          id: 'U04ESESV56G',
          name: 'Cuarine',
          frequency: "14",
          lastPairing: '',
          isActive: true,
          restrict: []
        }
      },
    ],
  }, 'C04DUMG5QCT', 'U04DRTFB6QM', ''))
    .toStrictEqual(`Your current frequency of one-on-ones in this channel is every 14 days.`);
});


test('#3 /frequency w/ params for active user', () => {
  expect(setFrequency({
    isActive: true,
    installDate: new Date('2022-12-21T16:18:35.654Z'),
    nextPairDate: new Date('2022-12-28T16:19:17.282Z'),
    reinstallDate: new Date('2022-12-21T16:19:17.282Z'),
    members: [
      {
        U04DE8L08R5: {
          id: 'U04DE8L08R5',
          name: 'Mithin',
          frequency: "14",
          lastPairing: '',
          isActive: false,
          restrict: []
        }
      },
      {
        U04DRTFB6QM: {
          id: 'U04DRTFB6QM',
          name: 'Prakash',
          frequency: "14",
          lastPairing: '',
          isActive: true,
          restrict: []
        }
      },
      {
        U04EPTE4TU3: {
          id: 'U04EPTE4TU3',
          name: 'Nannu',
          frequency: "14",
          lastPairing: '',
          isActive: true,
          restrict: []
        }
      },
      {
        U04ESESV56G: {
          id: 'U04ESESV56G',
          name: 'Cuarine',
          frequency: "14",
          lastPairing: '',
          isActive: true,
          restrict: []
        }
      },
    ],
  }, 'C04DUMG5QCT', 'U04DRTFB6QM', '21'))
    .toStrictEqual({
      $set: {
        C04DUMG5QCT: {
          isActive: true,
          installDate: new Date('2022-12-21T16:18:35.654Z'),
          nextPairDate: new Date('2022-12-28T16:19:17.282Z'),
          reinstallDate: new Date('2022-12-21T16:19:17.282Z'),
          members: [
            {
              U04DE8L08R5: {
                id: 'U04DE8L08R5',
                name: 'Mithin',
                frequency: "14",
                lastPairing: '',
                isActive: false,
                restrict: []
              }
            },
            {
              U04DRTFB6QM: {
                id: 'U04DRTFB6QM',
                name: 'Prakash',
                frequency: "21",
                lastPairing: '',
                isActive: true,
                restrict: []
              }
            },
            {
              U04EPTE4TU3: {
                id: 'U04EPTE4TU3',
                name: 'Nannu',
                frequency: "14",
                lastPairing: '',
                isActive: true,
                restrict: []
              }
            },
            {
              U04ESESV56G: {
                id: 'U04ESESV56G',
                name: 'Cuarine',
                frequency: "14",
                lastPairing: '',
                isActive: true,
                restrict: []
              }
            },
          ],
        }
      }
    });
});


test('#4 /frequency w/ params for inactive user', () => {
  expect(setFrequency({
    isActive: true,
    installDate: new Date('2022-12-21T16:18:35.654Z'),
    nextPairDate: new Date('2022-12-28T16:19:17.282Z'),
    reinstallDate: new Date('2022-12-21T16:19:17.282Z'),
    members: [
      {
        U04DE8L08R5: {
          id: 'U04DE8L08R5',
          name: 'Mithin',
          frequency: "14",
          lastPairing: '',
          isActive: false,
          restrict: []
        }
      },
      {
        U04DRTFB6QM: {
          id: 'U04DRTFB6QM',
          name: 'Prakash',
          frequency: "14",
          lastPairing: '',
          isActive: true,
          restrict: []
        }
      },
      {
        U04EPTE4TU3: {
          id: 'U04EPTE4TU3',
          name: 'Nannu',
          frequency: "14",
          lastPairing: '',
          isActive: true,
          restrict: []
        }
      },
      {
        U04ESESV56G: {
          id: 'U04ESESV56G',
          name: 'Cuarine',
          frequency: "14",
          lastPairing: '',
          isActive: true,
          restrict: []
        }
      },
    ],
  }, 'C04DUMG5QCT', 'U04DE8L08R5', '21'))
    .toStrictEqual(`/ono-frequency can only be called for active users. Set yourself active for pairing with the /ono-active command first.`);
});


test('#5 /frequency w/ invalid params for active user', () => {
  expect(setFrequency({
    isActive: true,
    installDate: new Date('2022-12-21T16:18:35.654Z'),
    nextPairDate: new Date('2022-12-28T16:19:17.282Z'),
    reinstallDate: new Date('2022-12-21T16:19:17.282Z'),
    members: [
      {
        U04DE8L08R5: {
          id: 'U04DE8L08R5',
          name: 'Mithin',
          frequency: "14",
          lastPairing: '',
          isActive: false,
          restrict: []
        }
      },
      {
        U04DRTFB6QM: {
          id: 'U04DRTFB6QM',
          name: 'Prakash',
          frequency: "14",
          lastPairing: '',
          isActive: true,
          restrict: []
        }
      },
      {
        U04EPTE4TU3: {
          id: 'U04EPTE4TU3',
          name: 'Nannu',
          frequency: "14",
          lastPairing: '',
          isActive: true,
          restrict: []
        }
      },
      {
        U04ESESV56G: {
          id: 'U04ESESV56G',
          name: 'Cuarine',
          frequency: "14",
          lastPairing: '',
          isActive: true,
          restrict: []
        }
      },
    ],
  }, 'C04DUMG5QCT', 'U04DRTFB6QM', '91'))
    .toStrictEqual(`You inputted an invalid value for frequency of one-on-ones. Only numeric values from 14 to 90 are accepted. Your current frequency of one-on-one's in this channel is every 14 days.`);
});


test('#6 /frequency w/ invalid params for inactive user', () => {
  expect(setFrequency({
    isActive: true,
    installDate: new Date('2022-12-21T16:18:35.654Z'),
    nextPairDate: new Date('2022-12-28T16:19:17.282Z'),
    reinstallDate: new Date('2022-12-21T16:19:17.282Z'),
    members: [
      {
        U04DE8L08R5: {
          id: 'U04DE8L08R5',
          name: 'Mithin',
          frequency: "14",
          lastPairing: '',
          isActive: false,
          restrict: []
        }
      },
      {
        U04DRTFB6QM: {
          id: 'U04DRTFB6QM',
          name: 'Prakash',
          frequency: "14",
          lastPairing: '',
          isActive: true,
          restrict: []
        }
      },
      {
        U04EPTE4TU3: {
          id: 'U04EPTE4TU3',
          name: 'Nannu',
          frequency: "14",
          lastPairing: '',
          isActive: true,
          restrict: []
        }
      },
      {
        U04ESESV56G: {
          id: 'U04ESESV56G',
          name: 'Cuarine',
          frequency: "14",
          lastPairing: '',
          isActive: true,
          restrict: []
        }
      },
    ],
  }, 'C04DUMG5QCT', 'U04DE8L08R5', '91'))
    .toStrictEqual(`/ono-frequency can only be called for active users. Set yourself active for pairing with the /ono-active command first.`);
});


test('#7 /frequency w/ duplicate params for active user', () => {
  expect(setFrequency({
    isActive: true,
    installDate: new Date('2022-12-21T16:18:35.654Z'),
    nextPairDate: new Date('2022-12-28T16:19:17.282Z'),
    reinstallDate: new Date('2022-12-21T16:19:17.282Z'),
    members: [
      {
        U04DE8L08R5: {
          id: 'U04DE8L08R5',
          name: 'Mithin',
          frequency: "14",
          lastPairing: '',
          isActive: false,
          restrict: []
        }
      },
      {
        U04DRTFB6QM: {
          id: 'U04DRTFB6QM',
          name: 'Prakash',
          frequency: "14",
          lastPairing: '',
          isActive: true,
          restrict: []
        }
      },
      {
        U04EPTE4TU3: {
          id: 'U04EPTE4TU3',
          name: 'Nannu',
          frequency: "14",
          lastPairing: '',
          isActive: true,
          restrict: []
        }
      },
      {
        U04ESESV56G: {
          id: 'U04ESESV56G',
          name: 'Cuarine',
          frequency: "14",
          lastPairing: '',
          isActive: true,
          restrict: []
        }
      },
    ],
  }, 'C04DUMG5QCT', 'U04DRTFB6QM', '21 21'))
    .toStrictEqual({
      $set: {
        C04DUMG5QCT: {
          isActive: true,
          installDate: new Date('2022-12-21T16:18:35.654Z'),
          nextPairDate: new Date('2022-12-28T16:19:17.282Z'),
          reinstallDate: new Date('2022-12-21T16:19:17.282Z'),
          members: [
            {
              U04DE8L08R5: {
                id: 'U04DE8L08R5',
                name: 'Mithin',
                frequency: "14",
                lastPairing: '',
                isActive: false,
                restrict: []
              }
            },
            {
              U04DRTFB6QM: {
                id: 'U04DRTFB6QM',
                name: 'Prakash',
                frequency: "21",
                lastPairing: '',
                isActive: true,
                restrict: []
              }
            },
            {
              U04EPTE4TU3: {
                id: 'U04EPTE4TU3',
                name: 'Nannu',
                frequency: "14",
                lastPairing: '',
                isActive: true,
                restrict: []
              }
            },
            {
              U04ESESV56G: {
                id: 'U04ESESV56G',
                name: 'Cuarine',
                frequency: "14",
                lastPairing: '',
                isActive: true,
                restrict: []
              }
            },
          ],
        }
      }
    });
});
