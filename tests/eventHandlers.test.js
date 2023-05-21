import { installDate, oldChannel, newChannel, memberJoins, memberLeaves, leaveChannel, updateLastPairingDate } from "../src/listeners/handlers/eventHandlers";

import { allMembers } from "./testVariables";

const { currentDate, nextPairDate, firstPairDate } = installDate();
const { currentDate: memberPairDate } = installDate();
memberPairDate.setDate(memberPairDate.getDate() - 28);

test('Bot joins new channel', () => {
  expect(newChannel([
    'U04DE8L08R5',
    'U04DRTFB6QM',
    'U04EHD34KGW',
    'U04EMKFLADB',
    'U04EPTE4TU3',
    'U04ESESV56G'
  ], allMembers, 'C04DX8MV1EY'))
    .toStrictEqual({
      $set: {
        C04DX8MV1EY: {
          members: [
            {
              U04DE8L08R5: {
                id: 'U04DE8L08R5',
                name: 'Mithin',
                frequency: "14",
                lastPairing: memberPairDate,
                isActive: true,
                restrict: []
              }
            },
            {
              U04DRTFB6QM: {
                id: 'U04DRTFB6QM',
                name: 'Prakash',
                frequency: "14",
                lastPairing: memberPairDate,
                isActive: true,
                restrict: []
              }
            },
            {
              U04EHD34KGW: {
                id: 'U04EHD34KGW',
                name: 'Offereop',
                frequency: "14",
                lastPairing: memberPairDate,
                isActive: true,
                restrict: []
              }
            },
            {
              U04EMKFLADB: {
                id: 'U04EMKFLADB',
                name: 'Bob',
                frequency: "14",
                lastPairing: memberPairDate,
                isActive: true,
                restrict: []
              }
            },
            {
              U04EPTE4TU3: {
                id: 'U04EPTE4TU3',
                name: 'Nannu',
                frequency: "14",
                lastPairing: memberPairDate,
                isActive: true,
                restrict: []
              }
            },
            {
              U04ESESV56G: {
                id: 'U04ESESV56G',
                name: 'Cuarine',
                frequency: "14",
                lastPairing: memberPairDate,
                isActive: true,
                restrict: []
              }
            },
          ],
          isActive: true,
          installDate: currentDate,
          nextPairDate: firstPairDate
        }
      },
    });
});

test('Bot joins previously joined channel', () => {
  expect(oldChannel([
    'U04DE8L08R5',
    'U04DRTFB6QM',
    'U04EHD34KGW',
    'U04EMKFLADB',
    'U04ESESV56G'
  ], allMembers, 'C04DX8MV1EY', {
    members: [
      {
        U04DE8L08R5: {
          id: 'U04DE8L08R5',
          name: 'Mithin',
          frequency: "14",
          lastPairing: new Date('2022-12-20T15:44:39.390Z'),
          isActive: true,
          restrict: []
        }
      },
      {
        U04DRTFB6QM: {
          id: 'U04DRTFB6QM',
          name: 'Prakash',
          frequency: "14",
          lastPairing: new Date('2022-12-20T15:44:39.390Z'),
          isActive: true,
          restrict: []
        }
      },
      {
        U04EHD34KGW: {
          id: 'U04EHD34KGW',
          name: 'Offereop',
          frequency: "14",
          lastPairing: new Date('2022-12-20T15:44:39.390Z'),
          isActive: true,
          restrict: []
        }
      },
      {
        U04EMKFLADB: {
          id: 'U04EMKFLADB',
          name: 'Bob',
          frequency: "14",
          lastPairing: new Date('2022-12-20T15:44:39.390Z'),
          isActive: true,
          restrict: []
        }
      },
      {
        U04ESESV56G: {
          id: 'U04ESESV56G',
          name: 'Cuarine',
          frequency: "14",
          lastPairing: new Date('2022-12-20T15:44:39.390Z'),
          isActive: true,
          restrict: []
        }
      },
      {
        U04EPTE4TU3: {
          id: 'U04EPTE4TU3',
          name: 'Nannu',
          frequency: "14",
          lastPairing: new Date('2022-12-20T15:44:39.390Z'),
          isActive: true,
          restrict: []
        }
      },
    ],
    isActive: false,
    installDate: new Date('2022-12-20T15:44:39.390Z'),
    nextPairDate: new Date('2022-12-27T15:44:39.390Z')
  })).toStrictEqual({
    $set: {
      C04DX8MV1EY: {
        members: [
          {
            U04DE8L08R5: {
              id: 'U04DE8L08R5',
              name: 'Mithin',
              frequency: "14",
              lastPairing: new Date('2022-12-20T15:44:39.390Z'),
              isActive: true,
              restrict: []
            }
          },
          {
            U04DRTFB6QM: {
              id: 'U04DRTFB6QM',
              frequency: "14",
              name: 'Prakash',
              lastPairing: new Date('2022-12-20T15:44:39.390Z'),
              isActive: true,
              restrict: []
            }
          },
          {
            U04EHD34KGW: {
              id: 'U04EHD34KGW',
              frequency: "14",
              name: 'Offereop',
              lastPairing: new Date('2022-12-20T15:44:39.390Z'),
              isActive: true,
              restrict: []
            }
          },
          {
            U04EMKFLADB: {
              id: 'U04EMKFLADB',
              frequency: "14",
              name: 'Bob',
              lastPairing: new Date('2022-12-20T15:44:39.390Z'),
              isActive: true,
              restrict: []
            }
          },
          {
            U04ESESV56G: {
              id: 'U04ESESV56G',
              name: 'Cuarine',
              frequency: "14",
              lastPairing: new Date('2022-12-20T15:44:39.390Z'),
              isActive: true,
              restrict: []
            }
          },
          {
            U04EPTE4TU3: {
              id: 'U04EPTE4TU3',
              frequency: "14",
              name: 'Nannu',
              lastPairing: new Date('2022-12-20T15:44:39.390Z'),
              isActive: false,
              restrict: []
            }
          }],
        isActive: true,
        installDate: new Date('2022-12-20T15:44:39.390Z'),
        nextPairDate: nextPairDate,
        reinstallDate: currentDate,
      }
    },
  });
});

test('Bot leaves channel', () => {
  expect(leaveChannel("C04DX8MV1EY",
    {
      members: [
        {
          U04DE8L08R5: {
            id: 'U04DE8L08R5',
            name: 'Mithin',
            frequency: "14",
            lastPairing: "",
            isActive: true,
            restrict: []
          },
        },
        {
          U04DRTFB6QM: {
            id: 'U04DRTFB6QM',
            name: 'Prakash',
            frequency: "14",
            lastPairing: "",
            isActive: true,
            restrict: []
          }
        },
        {
          U04EHD34KGW: {
            id: 'U04EHD34KGW',
            name: 'Offereop',
            frequency: "14",
            lastPairing: "",
            isActive: true,
            restrict: []
          }
        },
        {
          U04EMKFLADB: {
            id: 'U04EMKFLADB',
            name: 'Bob',
            frequency: "14",
            lastPairing: "",
            isActive: true,
            restrict: []
          }
        },
        {
          U04EPTE4TU3: {
            id: 'U04EPTE4TU3',
            name: 'Nannu',
            frequency: "14",
            lastPairing: "",
            isActive: true,
            restrict: []
          }
        },
        {
          U04ESESV56G: {
            id: 'U04ESESV56G',
            name: 'Curaine',
            frequency: "14",
            lastPairing: "",
            isActive: true,
            restrict: []
          }
        }
      ],
      isActive: true,
      installDate: new Date('2022-12-20T15:44:39.390Z'),
      nextPairDate: new Date('2022-12-27T15:44:39.390Z')
    }
  )
  ).toStrictEqual({
    $set: {
      C04DX8MV1EY: {
        members: [
          {
            U04DE8L08R5: {
              id: 'U04DE8L08R5',
              name: 'Mithin',
              frequency: "14",
              lastPairing: "",
              isActive: true,
              restrict: []
            },
          },
          {
            U04DRTFB6QM: {
              id: 'U04DRTFB6QM',
              name: 'Prakash',
              frequency: "14",
              lastPairing: "",
              isActive: true,
              restrict: []
            }
          },
          {
            U04EHD34KGW: {
              id: 'U04EHD34KGW',
              name: 'Offereop',
              frequency: "14",
              lastPairing: "",
              isActive: true,
              restrict: []
            }
          },
          {
            U04EMKFLADB: {
              id: 'U04EMKFLADB',
              name: 'Bob',
              frequency: "14",
              lastPairing: "",
              isActive: true,
              restrict: []
            }
          },
          {
            U04EPTE4TU3: {
              id: 'U04EPTE4TU3',
              name: 'Nannu',
              frequency: "14",
              lastPairing: "",
              isActive: true,
              restrict: []
            }
          },
          {
            U04ESESV56G: {
              id: 'U04ESESV56G',
              name: 'Curaine',
              frequency: "14",
              lastPairing: "",
              isActive: true,
              restrict: []
            }
          }
        ],
        isActive: false,
        installDate: new Date('2022-12-20T15:44:39.390Z'),
        nextPairDate: new Date('2022-12-27T15:44:39.390Z'),
        uninstallDate: currentDate
      }
    }
  });
});

test('Member joins channel that bot has joined', () => {
  expect(memberJoins("U04ESESV56G", allMembers, "C04DX8MV1EY",
    {
      members: [
        {
          U04DE8L08R5: {
            id: 'U04DE8L08R5',
            name: 'Mithin',
            frequency: "14",
            lastPairing: new Date('2022-12-20T15:44:39.390Z'),
            isActive: true,
            restrict: []
          }
        },
        {
          U04DRTFB6QM: {
            id: 'U04DRTFB6QM',
            name: 'Prakash',
            frequency: "14",
            lastPairing: new Date('2022-12-20T15:44:39.390Z'),
            isActive: true,
            restrict: []
          }
        },
        {
          U04EHD34KGW: {
            id: 'U04EHD34KGW',
            name: 'Offereop',
            frequency: "14",
            lastPairing: new Date('2022-12-20T15:44:39.390Z'),
            isActive: true,
            restrict: []
          }
        },
        {
          U04EMKFLADB: {
            id: 'U04EMKFLADB',
            name: 'Bob',
            frequency: "14",
            lastPairing: new Date('2022-12-20T15:44:39.390Z'),
            isActive: true,
            restrict: []
          }
        },
        {
          U04EPTE4TU3: {
            id: 'U04EPTE4TU3',
            name: 'Nannu',
            frequency: "14",
            lastPairing: new Date('2022-12-20T15:44:39.390Z'),
            isActive: true,
            restrict: []
          }
        },
      ],
      isActive: true,
      installDate: new Date('2022-12-20T15:44:39.390Z'),
      nextPairDate: new Date('2022-12-27T15:44:39.390Z')
    }
  )).toStrictEqual({
    $set: {
      C04DX8MV1EY: {
        members: [
          {
            U04DE8L08R5: {
              id: 'U04DE8L08R5',
              name: 'Mithin',
              frequency: "14",
              lastPairing: new Date('2022-12-20T15:44:39.390Z'),
              isActive: true,
              restrict: []
            }
          },
          {
            U04DRTFB6QM: {
              id: 'U04DRTFB6QM',
              name: 'Prakash',
              frequency: "14",
              lastPairing: new Date('2022-12-20T15:44:39.390Z'),
              isActive: true,
              restrict: []
            }
          },
          {
            U04EHD34KGW: {
              id: 'U04EHD34KGW',
              name: 'Offereop',
              frequency: "14",
              lastPairing: new Date('2022-12-20T15:44:39.390Z'),
              isActive: true,
              restrict: []
            }
          },
          {
            U04EMKFLADB: {
              id: 'U04EMKFLADB',
              name: 'Bob',
              frequency: "14",
              lastPairing: new Date('2022-12-20T15:44:39.390Z'),
              isActive: true,
              restrict: []
            }
          },
          {
            U04EPTE4TU3: {
              id: 'U04EPTE4TU3',
              name: 'Nannu',
              frequency: "14",
              lastPairing: new Date('2022-12-20T15:44:39.390Z'),
              isActive: true,
              restrict: []
            }
          },
          {
            U04ESESV56G: {
              id: 'U04ESESV56G',
              name: 'Cuarine',
              frequency: "14",
              lastPairing: memberPairDate,
              isActive: true,
              restrict: []
            }
          },
        ],
        isActive: true,
        installDate: new Date('2022-12-20T15:44:39.390Z'),
        nextPairDate: new Date('2022-12-27T15:44:39.390Z')
      },
    }
  });
});

test('Member leaves channel that bot has joined', () => {
  expect(memberLeaves(
    'U04ESESV56G', "C04DX8MV1EY", {
    members: [
      {
        U04DE8L08R5: {
          id: 'U04DE8L08R5',
          name: 'Mithin',
          frequency: "14",
          lastPairing: "",
          isActive: true,
          restrict: []
        }
      },
      {
        U04DRTFB6QM: {
          id: 'U04DRTFB6QM',
          name: 'Prakash',
          frequency: "14",
          lastPairing: "",
          isActive: true,
          restrict: []
        }
      },
      {
        U04EHD34KGW: {
          id: 'U04EHD34KGW',
          name: 'Offereop',
          frequency: "14",
          lastPairing: "",
          isActive: true,
          restrict: []
        }
      },
      {
        U04EMKFLADB: {
          id: 'U04EMKFLADB',
          name: 'Bob',
          frequency: "14",
          lastPairing: "",
          isActive: true,
          restrict: []
        }
      },
      {
        U04EPTE4TU3: {
          id: 'U04EPTE4TU3',
          name: 'Nannu',
          frequency: "14",
          lastPairing: "",
          isActive: true,
          restrict: []
        }
      },
      {
        U04ESESV56G: {
          id: 'U04ESESV56G',
          name: 'Cuarine',
          frequency: "14",
          lastPairing: "",
          isActive: true,
          restrict: []
        }
      },
    ],
    isActive: true,
    installDate: new Date('2022-12-20T15:44:39.390Z'),
    nextPairDate: new Date('2022-12-27T15:44:39.390Z')
  })).toStrictEqual({
    $set: {
      C04DX8MV1EY: {
        members: [
          {
            U04DE8L08R5: {
              id: 'U04DE8L08R5',
              name: 'Mithin',
              frequency: "14",
              lastPairing: "",
              isActive: true,
              restrict: []
            }
          },
          {
            U04DRTFB6QM: {
              id: 'U04DRTFB6QM',
              name: 'Prakash',
              frequency: "14",
              lastPairing: "",
              isActive: true,
              restrict: []
            }
          },
          {
            U04EHD34KGW: {
              id: 'U04EHD34KGW',
              name: 'Offereop',
              frequency: "14",
              lastPairing: "",
              isActive: true,
              restrict: []
            }
          },
          {
            U04EMKFLADB: {
              id: 'U04EMKFLADB',
              name: 'Bob',
              frequency: "14",
              lastPairing: "",
              isActive: true,
              restrict: []
            }
          },
          {
            U04EPTE4TU3: {
              id: 'U04EPTE4TU3',
              name: 'Nannu',
              frequency: "14",
              lastPairing: "",
              isActive: true,
              restrict: []
            }
          },
          {
            U04ESESV56G: {
              id: 'U04ESESV56G',
              name: 'Cuarine',
              frequency: "14",
              lastPairing: "",
              isActive: false,
              restrict: []
            }
          },
        ],
        isActive: true,
        installDate: new Date('2022-12-20T15:44:39.390Z'),
        nextPairDate: new Date('2022-12-27T15:44:39.390Z')
      }
    },
  });
});

test('Last pairings date logic', () => {
  expect(updateLastPairingDate(
    ['U04DE8L08R5', 'U04DRTFB6QM', 'U04EHD34KGW', 'U04EMKFLADB', 'U04EPTE4TU3', 'U04ESESV56G',
    ],
    {
      members: [
        {
          U04DE8L08R5: {
            id: 'U04DE8L08R5',
            name: 'Mithin',
            frequency: "14",
            lastPairing: "2022-12-27T22:42:08.300Z",
            isActive: true,
            restrict: []
          }
        },
        {
          U04DRTFB6QM: {
            id: 'U04DRTFB6QM',
            name: 'Prakash',
            frequency: "14",
            lastPairing: "2022-12-27T22:42:08.300Z",
            isActive: true,
            restrict: []
          }
        },
        {
          U04EHD34KGW: {
            id: 'U04EHD34KGW',
            name: 'Offereop',
            frequency: "14",
            lastPairing: "2022-12-27T22:42:08.300Z",
            isActive: true,
            restrict: []
          }
        },
        {
          U04EMKFLADB: {
            id: 'U04EMKFLADB',
            name: 'Bob',
            frequency: "14",
            lastPairing: "2022-12-27T22:42:08.300Z",
            isActive: true,
            restrict: []
          }
        },
        {
          U04EPTE4TU3: {
            id: 'U04EPTE4TU3',
            name: 'Nannu',
            frequency: "14",
            lastPairing: "2022-12-27T22:42:08.300Z",
            isActive: true,
            restrict: []
          }
        },
        {
          U04ESESV56G: {
            id: 'U04ESESV56G',
            name: 'Cuarine',
            frequency: "14",
            lastPairing: "2022-12-27T22:42:08.300Z",
            isActive: true,
            restrict: []
          }
        },
      ],
      isActive: true,
      installDate: new Date('2023-01-24T22:42:08.301Z'),
      nextPairDate: new Date('2023-01-31T22:42:08.301Z')
    },
    currentDate
  )).toStrictEqual(
    {
      members: [
        {
          U04DE8L08R5: {
            id: 'U04DE8L08R5',
            name: 'Mithin',
            frequency: "14",
            lastPairing: new Date(currentDate),
            isActive: true,
            restrict: []
          }
        },
        {
          U04DRTFB6QM: {
            id: 'U04DRTFB6QM',
            name: 'Prakash',
            frequency: "14",
            lastPairing: new Date(currentDate),
            isActive: true,
            restrict: []
          }
        },
        {
          U04EHD34KGW: {
            id: 'U04EHD34KGW',
            name: 'Offereop',
            frequency: "14",
            lastPairing: new Date(currentDate),
            isActive: true,
            restrict: []
          }
        },
        {
          U04EMKFLADB: {
            id: 'U04EMKFLADB',
            name: 'Bob',
            frequency: "14",
            lastPairing: new Date(currentDate),
            isActive: true,
            restrict: []
          }
        },
        {
          U04EPTE4TU3: {
            id: 'U04EPTE4TU3',
            name: 'Nannu',
            frequency: "14",
            lastPairing: new Date(currentDate),
            isActive: true,
            restrict: []
          }
        },
        {
          U04ESESV56G: {
            id: 'U04ESESV56G',
            name: 'Cuarine',
            frequency: "14",
            lastPairing: new Date(currentDate),
            isActive: true,
            restrict: []
          }
        },
      ],
      isActive: true,
      installDate: new Date('2023-01-24T22:42:08.301Z'),
      nextPairDate: new Date('2023-01-31T22:42:08.301Z')
    }
  );
});
