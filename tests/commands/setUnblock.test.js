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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', '', allMembers)).toStrictEqual({ updateDoc: null, response: "The /unblock command must be called with a user in the channel or a list of users in the channel you wish to unblock. You are currently being paired with everyone on this channel for one-on-one's with no restrictions." });
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', '', allMembers)).toStrictEqual({ updateDoc: null, response: "/unblock can only be called for active users. Set yourself active for pairing with the /pair command first." });
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', '', allMembers)).toStrictEqual({ updateDoc: null, response: "The /unblock command must be called with a user in the channel or a list of users in the channel you wish to unblock. You are currently not being paired with the following members in this channel for one-on-one's:\n<@U04DRTFB6QM>\n" });
});

test('/unblock command fired w/o params for inactive user w/ restrictions', () => {
  expect(setUnblock({
    isActive: true,
    installDate: new Date('2022-12-21T16:18:35.654Z'),
    nextPairDate: new Date('2022-12-28T16:19:17.282Z'),
    reinstallDate: new Date('2022-12-21T16:19:17.282Z'),
    members: {
      U04DE8L08R5: { frequency: '14', lastPairing: '', restrict: ['U04DRTFB6QM'], isActive: false },
      U04DRTFB6QM: { frequency: '14', lastPairing: '', restrict: [], isActive: true },
      U04EPTE4TU3: { frequency: '14', lastPairing: '', restrict: [], isActive: true },
      U04ESESV56G: { frequency: '14', lastPairing: '', restrict: [], isActive: true }
    },
  }, 'C04DUMG5QCT', 'U04DE8L08R5', '', allMembers)).toStrictEqual({ updateDoc: null, response: "/unblock can only be called for active users. Set yourself active for pairing with the /pair command first." });
});


test('/unblock command fired w/ "all" params for active user w/ no restrictions', () => {
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', 'all', allMembers)).toStrictEqual({ updateDoc: null, response: "You are already being paired with everyone on this channel for one-on-one's with no restrictions." });
});


test('/unblock command fired w/ "all" params for active user w/ restrictions', () => {
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', 'all', allMembers, channelMembers)).toStrictEqual({
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
    }, response: "You have removed all restrictions and are currently being paired with everyone on this channel for one-on-ones."
  });
});


test('/unblock command fired w/ params for active user w/ no restrictions', () => {
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', 'U04DRTFB6QM', allMembers, channelMembers)).toStrictEqual({
    updateDoc: null, response: "You are already being paired with everyone on this channel for one-on-one's with no restrictions."
  });
});


test('/unblock command fired w/ params for active user w/ restrictions', () => {
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', 'U04DRTFB6QM', allMembers, channelMembers)).toStrictEqual({
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
    }, response: "You have succesfully removed the following members from your one-on-one restrictions list for this channel:\n<@U04DRTFB6QM>\nYou have removed all restrictions and are currently being paired with everyone on this channel for one-on-ones.\n"
  });
});


test('/unblock command fired w/ invalid params for active user w/o restrictions', () => {
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', 'U04EHD34KGW', allMembers, channelMembers)).toStrictEqual({
    updateDoc: null, response: "You are already being paired with everyone on this channel for one-on-one's with no restrictions."
  });
});


test('/unblock command fired w/ invalid params for active user w/ restrictions', () => {
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', 'U04EHD34KGW', allMembers, channelMembers)).toStrictEqual({
    updateDoc: null, response: "The /unblock command must be called with a user in the channel or a list of users in the channel you wish to unblock.\nThe following members are not in this channel and were ignored for the /unblock command:\n<@U04EHD34KGW>\n"
  });
});


test('/unblock command fired w/ mixed params for active user w/ restrictions', () => {
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', 'U04EHD34KGW, U04DRTFB6QM', allMembers, channelMembers)).toStrictEqual({
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
    }, response: "You have succesfully removed the following members from your one-on-one restrictions list for this channel:\n<@U04DRTFB6QM>\nYou have removed all restrictions and are currently being paired with everyone on this channel for one-on-ones.\nThe following members are not in this channel and were ignored for the /unblock command:\n<@U04EHD34KGW>\n"
  });
});


test('/unblock command fired w/ mixed params for active user w/ multiple restrictions', () => {
  expect(setUnblock({
    isActive: true,
    installDate: new Date('2022-12-21T16:18:35.654Z'),
    nextPairDate: new Date('2022-12-28T16:19:17.282Z'),
    reinstallDate: new Date('2022-12-21T16:19:17.282Z'),
    members: {
      U04DE8L08R5: { frequency: '14', lastPairing: '', restrict: ['U04DRTFB6QM', 'U04EPTE4TU3'], isActive: true },
      U04DRTFB6QM: { frequency: '14', lastPairing: '', restrict: [], isActive: true },
      U04EPTE4TU3: { frequency: '14', lastPairing: '', restrict: [], isActive: true },
      U04ESESV56G: { frequency: '14', lastPairing: '', restrict: [], isActive: true }
    },
  }, 'C04DUMG5QCT', 'U04DE8L08R5', 'U04EHD34KGW, U04DRTFB6QM', allMembers, channelMembers)).toStrictEqual({
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
    }, response: "You have succesfully removed the following members from your one-on-one restrictions list for this channel:\n<@U04DRTFB6QM>\nYou are currently not being paired with the following members in this channel:\n<@U04EPTE4TU3>\nThe following members are not in this channel and were ignored for the /unblock command:\n<@U04EHD34KGW>\n"
  });
});
