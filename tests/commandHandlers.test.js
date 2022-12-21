import { setFrequency, setBlock, isActive, isInactive } from "../src/listeners/handlers/commandHandlers.js";
import { allMembers, channelMembers } from "./testVariables.js";

describe('commands', () => {
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

  test('/frequency command fired with params for active user', () => {
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

  test('/frequency command fired with params for inactive user', () => {
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

  test('/frequency command fired with invalid params for active user', () => {
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

  test('/frequency command fired with invalid params for inactive user', () => {
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

  test('/block command fired with w/o params for active user', () => {
    expect(setBlock({
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

    }, 'C04DUMG5QCT', 'U04DE8L08R5', '', allMembers, channelMembers)).toStrictEqual({ updateDoc: null, response: "You are currently being paired with everyone on this channel for one-on-one's with no restrictions." });
  });

  test('/block command fired with w/o params for inactive user', () => {
    expect(setBlock({
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

    }, 'C04DUMG5QCT', 'U04DE8L08R5', '', allMembers, channelMembers)).toStrictEqual({ updateDoc: null, response: '/block can only be called for active users. Set yourself active for pairing with the /pair command first.' });
  });

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

  test('/unpair command fired for active user', () => {
    expect(isInactive({
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
      .toStrictEqual({
        $set: {
          C04DUMG5QCT: {
            isActive: true,
            installDate: new Date('2022-12-21T16:18:35.654Z'),
            nextPairDate: new Date('2022-12-28T16:19:17.282Z'), reinstallDate: new Date('2022-12-21T16:19:17.282Z'),
            members: {
              U04DE8L08R5: { frequency: '14', lastPairing: '', restrict: [], isActive: false },
              U04DRTFB6QM: { frequency: '14', lastPairing: '', restrict: [], isActive: true },
              U04EPTE4TU3: { frequency: '14', lastPairing: '', restrict: [], isActive: true },
              U04ESESV56G: { frequency: '14', lastPairing: '', restrict: [], isActive: true }
            },
          }
        },
      });
  });

  test('/unpair command fired for inactive user', () => {
    expect(isInactive({
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
      .toStrictEqual(null);
  });
});
