import { setBlock } from "../../src/listeners/handlers/commandHandlers";
import { channelMembers } from "../testVariables";


test('#1 /block w/o params for active user', () => {
  expect(setBlock({
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', '', channelMembers)).toStrictEqual({ updateDoc: null, response: "You are currently being paired with everyone on this channel for one-on-ones with no restrictions." });
});


test('#2 /block w/o params for inactive user', () => {
  expect(setBlock({
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

  }, 'C04DUMG5QCT', 'U04DE8L08R5', '', channelMembers)).toStrictEqual({ updateDoc: null, response: '/ono-block can only be called for active users. Set yourself active for pairing with the /ono-active command first.' });
});


test('#3 /block w/o params for active user w/ restrictions', () => {
  expect(setBlock({
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', '', channelMembers)).toStrictEqual({ updateDoc: null, response: "You are currently not being paired with the following members in this channel for one-on-ones:\n<@U04EPTE4TU3>\n" });
});


test('#4 /block w/ single params for active user w/ restrictions', () => {
  expect(setBlock({
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
                restrict: ['U04EPTE4TU3', 'U04DRTFB6QM']
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
    }, response: "You are currently not being paired with the following members in this channel for one-on-ones:\n<@U04EPTE4TU3>\n<@U04DRTFB6QM>\n"
  });
});


test('#5 /block w/ single params for active user w/o restrictions', () => {
  expect(setBlock({
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
        }
      }
    }, response: "You are currently not being paired with the following members in this channel for one-on-ones:\n<@U04DRTFB6QM>\n"
  });
});


test('#6 /block w/ multi params for active user w/ restrictions', () => {
  expect(setBlock({
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', 'U04DRTFB6QM U04ESESV56G', channelMembers)).toStrictEqual({
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
                restrict: ['U04EPTE4TU3', 'U04DRTFB6QM', 'U04ESESV56G']
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
    }, response: "You are currently not being paired with the following members in this channel for one-on-ones:\n<@U04EPTE4TU3>\n<@U04DRTFB6QM>\n<@U04ESESV56G>\n"
  });
});


test('#7 /block w/ multi params for active user w/o restrictions', () => {
  expect(setBlock({
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', 'U04DRTFB6QM U04ESESV56G', channelMembers)).toStrictEqual({
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
                restrict: ['U04DRTFB6QM', 'U04ESESV56G']
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
    }, response: "You are currently not being paired with the following members in this channel for one-on-ones:\n<@U04DRTFB6QM>\n<@U04ESESV56G>\n"
  });
});


test('#8 /block w/ invalid single params for active user w/ restrictions', () => {
  expect(setBlock({
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', 'U04EHD34KGW', channelMembers)).toStrictEqual({
    updateDoc: null, response: "The /ono-block command must be called with a user in the channel or a list of users in the channel you wish to block.\nThe following members are not in this channel and were ignored for the command:\n<@U04EHD34KGW>\n"
  });
});


test('#9 /block w/ invalid single params for active user w/o restrictions', () => {
  expect(setBlock({
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
    updateDoc: null, response: "You are currently being paired with everyone on this channel for one-on-ones with no restrictions.\nThe following members are not in this channel and were ignored for the command:\n<@U04EHD34KGW>\n"
  });
});


test('#10 /block w/ invalid multi params for active user w/ restrictions', () => {
  expect(setBlock({
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', 'U04EHD34KGW U04EMKFLADB', channelMembers)).toStrictEqual({
    updateDoc: null, response: "The /ono-block command must be called with a user in the channel or a list of users in the channel you wish to block.\nThe following members are not in this channel and were ignored for the command:\n<@U04EHD34KGW>\n<@U04EMKFLADB>\n"
  });
});


test('#11 /block w/ invalid multi params for active user w/o restrictions', () => {
  expect(setBlock({
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', 'U04EHD34KGW U04EMKFLADB', channelMembers)).toStrictEqual({
    updateDoc: null, response: "You are currently being paired with everyone on this channel for one-on-ones with no restrictions.\nThe following members are not in this channel and were ignored for the command:\n<@U04EHD34KGW>\n<@U04EMKFLADB>\n"
  });
});


test('#12 /block w/ valid duplicate params for active user w/o restrictions', () => {
  expect(setBlock({
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', '@Prakash @Prakash', channelMembers)).toStrictEqual({
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
        }
      }
    }, response: "You are currently not being paired with the following members in this channel for one-on-ones:\n<@U04DRTFB6QM>\n"
  });
});


test('#13 /block w/ invalid duplicate params for active user w/o restrictions', () => {
  expect(setBlock({
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
  }, 'C04DUMG5QCT', 'U04DE8L08R5', '@Offereop @Offereop', channelMembers)).toStrictEqual({
    updateDoc: null, response: "You are currently being paired with everyone on this channel for one-on-ones with no restrictions.\nThe following members are not in this channel and were ignored for the command:\n<@Offereop>\n"
  });
});
