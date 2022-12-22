import { setBlock } from "../../src/listeners/handlers/commandHandlers";
import { allMembers, channelMembers } from "../testVariables";

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

test('/block command fired with w/o params for active user w/ restrictions', () => {
  expect(setBlock({
    isActive: true,
    installDate: new Date('2022-12-21T16:18:35.654Z'),
    nextPairDate: new Date('2022-12-28T16:19:17.282Z'),
    reinstallDate: new Date('2022-12-21T16:19:17.282Z'),
    members: {
      U04DE8L08R5: { frequency: '14', lastPairing: '', restrict: ['U04EPTE4TU3'], isActive: true },
      U04DRTFB6QM: { frequency: '14', lastPairing: '', restrict: [], isActive: true },
      U04EPTE4TU3: { frequency: '14', lastPairing: '', restrict: [], isActive: true },
      U04ESESV56G: { frequency: '14', lastPairing: '', restrict: [], isActive: true }
    },

  }, 'C04DUMG5QCT', 'U04DE8L08R5', '', allMembers, channelMembers)).toStrictEqual({ updateDoc: null, response: "You are currently not being paired with the following members in this channel for one-on-one's:\n<@U04EPTE4TU3>\n" });
});

test('/block command fired with w/ params for active user w/ restrictions', () => {
  expect(setBlock({
    isActive: true,
    installDate: new Date('2022-12-21T16:18:35.654Z'),
    nextPairDate: new Date('2022-12-28T16:19:17.282Z'),
    reinstallDate: new Date('2022-12-21T16:19:17.282Z'),
    members: {
      U04DE8L08R5: { frequency: '14', lastPairing: '', restrict: ['U04EPTE4TU3'], isActive: true },
      U04DRTFB6QM: { frequency: '14', lastPairing: '', restrict: [], isActive: true },
      U04EPTE4TU3: { frequency: '14', lastPairing: '', restrict: [], isActive: true },
      U04ESESV56G: { frequency: '14', lastPairing: '', restrict: [], isActive: true }
    },
  }, 'C04DUMG5QCT', 'U04DE8L08R5', 'U04DRTFB6QM', allMembers, channelMembers)).toStrictEqual({
    updateDoc: {
      $set: {
        C04DUMG5QCT: {
          isActive: true,
          installDate: new Date('2022-12-21T16:18:35.654Z'),
          nextPairDate: new Date('2022-12-28T16:19:17.282Z'),
          reinstallDate: new Date('2022-12-21T16:19:17.282Z'),
          members: {
            U04DE8L08R5: { frequency: '14', lastPairing: '', restrict: ['U04EPTE4TU3', 'U04DRTFB6QM'], isActive: true },
            U04DRTFB6QM: { frequency: '14', lastPairing: '', restrict: [], isActive: true },
            U04EPTE4TU3: { frequency: '14', lastPairing: '', restrict: [], isActive: true },
            U04ESESV56G: { frequency: '14', lastPairing: '', restrict: [], isActive: true }
          },
        }
      }
    }, response: "You are currently not being paired with the following members in this channel for one-on-one's:\n<@U04EPTE4TU3>\n<@U04DRTFB6QM>\n"
  });
});

test('/block command fired with w/ params for active user w/o restrictions', () => {
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', 'U04DRTFB6QM', allMembers, channelMembers)).toStrictEqual({
    updateDoc: {
      $set: {
        C04DUMG5QCT: {
          isActive: true,
          installDate: new Date('2022-12-21T16:18:35.654Z'),
          nextPairDate: new Date('2022-12-28T16:19:17.282Z'),
          reinstallDate: new Date('2022-12-21T16:19:17.282Z'),
          members: {
            U04DE8L08R5: { frequency: '14', lastPairing: '', restrict: ['U04DRTFB6QM'], isActive: true },
            U04DRTFB6QM: { frequency: '14', lastPairing: '', restrict: [], isActive: true },
            U04EPTE4TU3: { frequency: '14', lastPairing: '', restrict: [], isActive: true },
            U04ESESV56G: { frequency: '14', lastPairing: '', restrict: [], isActive: true }
          },
        }
      }
    }, response: "You are currently not being paired with the following members in this channel for one-on-one's:\n<@U04DRTFB6QM>\n"
  });
});

test('/block command fired with w/ invalid params for active user w/ restrictions', () => {
  expect(setBlock({
    isActive: true,
    installDate: new Date('2022-12-21T16:18:35.654Z'),
    nextPairDate: new Date('2022-12-28T16:19:17.282Z'),
    reinstallDate: new Date('2022-12-21T16:19:17.282Z'),
    members: {
      U04DE8L08R5: { frequency: '14', lastPairing: '', restrict: ['U04EPTE4TU3'], isActive: true },
      U04DRTFB6QM: { frequency: '14', lastPairing: '', restrict: [], isActive: true },
      U04EPTE4TU3: { frequency: '14', lastPairing: '', restrict: [], isActive: true },
      U04ESESV56G: { frequency: '14', lastPairing: '', restrict: [], isActive: true }
    },
  }, 'C04DUMG5QCT', 'U04DE8L08R5', 'U04EHD34KGW', allMembers, channelMembers)).toStrictEqual({
    updateDoc: {
      $set: {
        C04DUMG5QCT: {
          isActive: true,
          installDate: new Date('2022-12-21T16:18:35.654Z'),
          nextPairDate: new Date('2022-12-28T16:19:17.282Z'),
          reinstallDate: new Date('2022-12-21T16:19:17.282Z'),
          members: {
            U04DE8L08R5: { frequency: '14', lastPairing: '', restrict: ['U04EPTE4TU3'], isActive: true },
            U04DRTFB6QM: { frequency: '14', lastPairing: '', restrict: [], isActive: true },
            U04EPTE4TU3: { frequency: '14', lastPairing: '', restrict: [], isActive: true },
            U04ESESV56G: { frequency: '14', lastPairing: '', restrict: [], isActive: true }
          },
        }
      }
    }, response: "You are currently not being paired with the following members in this channel for one-on-one's:\n<@U04EPTE4TU3>\nThe following members are not in this channel and were ignored for this command:\n<@U04EHD34KGW>\n"
  });
});

test('/block command fired with w/ invalid params for active user w/o restrictions', () => {
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', 'U04EHD34KGW', allMembers, channelMembers)).toStrictEqual({
    updateDoc: {
      $set: {
        C04DUMG5QCT: {
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
        }
      }
    }, response: "You are currently being paired with everyone on this channel for one-on-one's with no restrictions.\nThe following members are not in this channel and were ignored for this command:\n<@U04EHD34KGW>\n"
  });
});
