import commandHandler, { isActive } from "../src/listeners/handlers/commandHandlers.js";

const { currentDate, nextPairDate } = installDate();

test('Bot joins new channel', () => {
  expect(isActive([
    'U04DE8L08R5',
    'U04DRTFB6QM',
    'U04EHD34KGW',
    'U04EMKFLADB',
    'U04EPTE4TU3',
    'U04ESESV56G'
  ], 'C04DX8MV1EY'))
    .toStrictEqual({
      $set: {
        C04DX8MV1EY: {
          members: {
            U04DE8L08R5: {
              frequency: "14",
              lastPairing: "",
              isActive: true,
              restrict: []
            },
            U04DRTFB6QM: {
              frequency: "14",
              lastPairing: "",
              isActive: true,
              restrict: []
            },
            U04EHD34KGW: {
              frequency: "14",
              lastPairing: "",
              isActive: true,
              restrict: []
            },
            U04EMKFLADB: {
              frequency: "14",
              lastPairing: "",
              isActive: true,
              restrict: []
            },
            U04EPTE4TU3: {
              frequency: "14",
              lastPairing: "",
              isActive: true,
              restrict: []
            },
            U04ESESV56G: {
              frequency: "14",
              lastPairing: "",
              isActive: true,
              restrict: []
            },
          },
          isActive: true,
          installDate: currentDate,
          nextPairDate: nextPairDate
        }
      },
    });
});
