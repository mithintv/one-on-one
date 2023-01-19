import { setUnblock } from "../../src/listeners/handlers/commandHandlers";
import { channelMembers } from "../testVariables";

test('#1 /unblock w/o params for active user w/ no restrictions', () => {
  expect(setUnblock({
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
          isActive: true,
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', '', channelMembers)).toStrictEqual({ updateDoc: null, response: "The /unblock command must be called with a user in the channel or a list of users in the channel you wish to unblock. You are currently being paired with everyone on this channel for one-on-one's with no restrictions." });
});

test('#2 /unblock w/o params for inactive user w/ no restrictions', () => {
  expect(setUnblock({
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', '', channelMembers)).toStrictEqual({ updateDoc: null, response: "/unblock can only be called for active users. Set yourself active for pairing with the /pair command first." });
});

test('#3 /unblock w/o params for active user w/ restrictions', () => {
  expect(setUnblock({
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
          isActive: true,
          restrict: ['U04DRTFB6QM']
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', '', channelMembers)).toStrictEqual({ updateDoc: null, response: "The /unblock command must be called with a user in the channel or a list of users in the channel you wish to unblock. You are currently not being paired with the following members in this channel for one-on-one's:\n<@U04DRTFB6QM>\n" });
});

test('#4 /unblock w/o params for inactive user w/ restrictions', () => {
  expect(setUnblock({
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
          restrict: ['U04DRTFB6QM']
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', '', channelMembers)).toStrictEqual({ updateDoc: null, response: "/unblock can only be called for active users. Set yourself active for pairing with the /pair command first." });
});


test('#5 /unblock fired w/ "all" params for active user w/ no restrictions', () => {
  expect(setUnblock({
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
          isActive: true,
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', 'all', channelMembers)).toStrictEqual({ updateDoc: null, response: "You are already being paired with everyone on this channel for one-on-one's with no restrictions." });
});


test('#6 /unblock w/ "all" params for active user w/ restrictions', () => {
  expect(setUnblock({
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
          isActive: true,
          restrict: ['U04DRTFB6QM']
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', 'all', channelMembers)).toStrictEqual({
    updateDoc: {
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
                isActive: true,
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
        }
      }
    }, response: "You have removed all restrictions and are currently being paired with everyone on this channel for one-on-ones."
  });
});


test('#7 /unblock w/ params for active user w/ no restrictions', () => {
  expect(setUnblock({
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
          isActive: true,
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', 'U04DRTFB6QM', channelMembers)).toStrictEqual({
    updateDoc: null, response: "You are already being paired with everyone on this channel for one-on-one's with no restrictions."
  });
});


test('#8 /unblock w/ params for active user w/ restrictions', () => {
  expect(setUnblock({
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
          isActive: true,
          restrict: ['U04DRTFB6QM']
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', 'U04DRTFB6QM', channelMembers)).toStrictEqual({
    updateDoc: {
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
                isActive: true,
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
        }
      }
    }, response: "You have succesfully removed the following members from your one-on-one restrictions list for this channel:\n<@U04DRTFB6QM>\nYou have removed all restrictions and are currently being paired with everyone on this channel for one-on-ones.\n"
  });
});


test('#9 /unblock w/ invalid params for active user w/o restrictions', () => {
  expect(setUnblock({
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
          isActive: true,
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', 'U04EHD34KGW', channelMembers)).toStrictEqual({
    updateDoc: null, response: "You are already being paired with everyone on this channel for one-on-one's with no restrictions."
  });
});


test('#10 /unblock w/ invalid params for active user w/ restrictions', () => {
  expect(setUnblock({
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
          isActive: true,
          restrict: ['U04DRTFB6QM']
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', 'U04EHD34KGW', channelMembers)).toStrictEqual({
    updateDoc: null, response: "The /unblock command must be called with a user in the channel or a list of users in the channel you wish to unblock.\nThe following members are not in this channel and were ignored for the /unblock command:\n<@U04EHD34KGW>\n"
  });
});


test('#11 /unblock w/ mixed params for active user w/ restrictions', () => {
  expect(setUnblock({
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
          isActive: true,
          restrict: ['U04DRTFB6QM']
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', 'U04EHD34KGW U04DRTFB6QM', channelMembers)).toStrictEqual({
    updateDoc: {
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
                isActive: true,
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
        }
      }
    }, response: "You have succesfully removed the following members from your one-on-one restrictions list for this channel:\n<@U04DRTFB6QM>\nYou have removed all restrictions and are currently being paired with everyone on this channel for one-on-ones.\nThe following members are not in this channel and were ignored for the /unblock command:\n<@U04EHD34KGW>\n"
  });
});


test('#12 /unblock w/ mixed params for active user w/ multiple restrictions', () => {
  expect(setUnblock({
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
          isActive: true,
          restrict: ['U04DRTFB6QM', 'U04EPTE4TU3']
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', 'U04EHD34KGW, U04DRTFB6QM', channelMembers)).toStrictEqual({
    updateDoc: {
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
                isActive: true,
                restrict: ['U04EPTE4TU3']
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
        }
      }
    }, response: "You have succesfully removed the following members from your one-on-one restrictions list for this channel:\n<@U04DRTFB6QM>\nYou are currently not being paired with the following members in this channel:\n<@U04EPTE4TU3>\nThe following members are not in this channel and were ignored for the /unblock command:\n<@U04EHD34KGW>\n"
  });
});
