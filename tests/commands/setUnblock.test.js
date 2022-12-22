import { setUnblock } from "../../src/listeners/handlers/commandHandlers";
import { allMembers, channelMembers } from "../testVariables";

test('/unblock command fired w/o params for active user w/ no restrictions', () => {
  expect(setUnblock({
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', '', allMembers, channelMembers)).toStrictEqual({ updateDoc: null, response: "The /unblock command must be called with a user in the channel or a list of users in the channel you wish to unblock. You are currently being paired with everyone on this channel for one-on-one's with no restrictions." });
});

test('/unblock command fired w/o params for inactive user w/ no restrictions', () => {
  expect(setUnblock({
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', '', allMembers, channelMembers)).toStrictEqual({ updateDoc: null, response: "/unblock can only be called for active users. Set yourself active for pairing with the /pair command first." });
});

test('/unblock command fired w/o params for active user w/ restrictions', () => {
  expect(setUnblock({
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', '', allMembers, channelMembers)).toStrictEqual({ updateDoc: null, response: "The /unblock command must be called with a user in the channel or a list of users in the channel you wish to unblock. You are currently not being paired with the following members in this channel for one-on-one's:\n<@U04DRTFB6QM>\n" });
});
