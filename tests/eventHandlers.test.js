import { leaveChannel, newChannel, memberJoins, oldChannel, memberLeaves, installDate } from "../src/listeners/handlers/eventHandlers.js";

const { currentDate, nextPairDate } = installDate();

test('Bot joins new channel', () => {
  expect(newChannel([
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

test('Bot joins previously joined channel', () => {
  expect(oldChannel([
    'U04DE8L08R5',
    'U04DRTFB6QM',
    'U04EHD34KGW',
    'U04EMKFLADB',
    'U04ESESV56G'
  ], 'C04DX8MV1EY', {
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
    },
    isActive: false,
    installDate: new Date('2022-12-20T15:44:39.390Z'),
    nextPairDate: new Date('2022-12-27T15:44:39.390Z')
  })).toStrictEqual({
    $set: {
      C04DX8MV1EY: {
        members: {
          U04DE8L08R5: {
            "frequency": "14",
            "lastPairing": "",
            "isActive": true,
            "restrict": []
          },
          U04DRTFB6QM: {
            "frequency": "14",
            "lastPairing": "",
            "isActive": true,
            "restrict": []
          },
          U04EHD34KGW: {
            "frequency": "14",
            "lastPairing": "",
            "isActive": true,
            "restrict": []
          },
          U04EMKFLADB: {
            "frequency": "14",
            "lastPairing": "",
            "isActive": true,
            "restrict": []
          },
          U04EPTE4TU3: {
            "frequency": "14",
            "lastPairing": "",
            "isActive": false,
            "restrict": []
          },
          U04ESESV56G: {
            "frequency": "14",
            "lastPairing": "",
            "isActive": true,
            "restrict": []
          },
        },
        isActive: true,
        installDate: new Date('2022-12-20T15:44:39.390Z'),
        nextPairDate: nextPairDate,
        reinstallDate: currentDate,
      },
    }
  });
});

test('Bot leaves channel', () => {
  expect(leaveChannel("C04DX8MV1EY",
    {
      members: {
        U04DE8L08R5: {
          "frequency": "14",
          "lastPairing": "",
          "isActive": true,
          "restrict": []
        },
        U04DRTFB6QM: {
          "frequency": "14",
          "lastPairing": "",
          "isActive": true,
          "restrict": []
        },
        U04EHD34KGW: {
          "frequency": "14",
          "lastPairing": "",
          "isActive": true,
          "restrict": []
        },
        U04EMKFLADB: {
          "frequency": "14",
          "lastPairing": "",
          "isActive": true,
          "restrict": []
        },
        U04EPTE4TU3: {
          "frequency": "14",
          "lastPairing": "",
          "isActive": true,
          "restrict": []
        },
        U04ESESV56G: {
          "frequency": "14",
          "lastPairing": "",
          "isActive": true,
          "restrict": []
        },
      },
      isActive: true,
      installDate: new Date('2022-12-20T15:44:39.390Z'),
      nextPairDate: new Date('2022-12-27T15:44:39.390Z')
    }
  )
  ).toStrictEqual({
    $set: {
      C04DX8MV1EY: {
        members: {
          U04DE8L08R5: {
            "frequency": "14",
            "lastPairing": "",
            "isActive": true,
            "restrict": []
          },
          U04DRTFB6QM: {
            "frequency": "14",
            "lastPairing": "",
            "isActive": true,
            "restrict": []
          },
          U04EHD34KGW: {
            "frequency": "14",
            "lastPairing": "",
            "isActive": true,
            "restrict": []
          },
          U04EMKFLADB: {
            "frequency": "14",
            "lastPairing": "",
            "isActive": true,
            "restrict": []
          },
          U04EPTE4TU3: {
            "frequency": "14",
            "lastPairing": "",
            "isActive": true,
            "restrict": []
          },
          U04ESESV56G: {
            "frequency": "14",
            "lastPairing": "",
            "isActive": true,
            "restrict": []
          },
        },
        isActive: false,
        installDate: new Date('2022-12-20T15:44:39.390Z'),
        nextPairDate: new Date('2022-12-27T15:44:39.390Z'),
        uninstallDate: currentDate
      }
    }
  });
});

test('Member joins channel that bot has joined', () => {
  expect(memberJoins("U04ESESV56G", "C04DX8MV1EY",
    {
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
      },
      isActive: true,
      installDate: new Date('2022-12-20T15:44:39.390Z'),
      nextPairDate: new Date('2022-12-27T15:44:39.390Z')
    }
  )).toStrictEqual({
    $set: {
      C04DX8MV1EY: {
        members: {
          U04DE8L08R5: {
            "frequency": "14",
            "lastPairing": "",
            "isActive": true,
            "restrict": []
          },
          U04DRTFB6QM: {
            "frequency": "14",
            "lastPairing": "",
            "isActive": true,
            "restrict": []
          },
          U04EHD34KGW: {
            "frequency": "14",
            "lastPairing": "",
            "isActive": true,
            "restrict": []
          },
          U04EMKFLADB: {
            "frequency": "14",
            "lastPairing": "",
            "isActive": true,
            "restrict": []
          },
          U04EPTE4TU3: {
            "frequency": "14",
            "lastPairing": "",
            "isActive": true,
            "restrict": []
          },
          U04ESESV56G: {
            "frequency": "14",
            "lastPairing": "",
            "isActive": true,
            "restrict": []
          },
        },
        isActive: true,
        installDate: new Date('2022-12-20T15:44:39.390Z'),
        nextPairDate: new Date('2022-12-27T15:44:39.390Z')
      },
    }
  });
});

test('Member leaves channel that bot has joined', () => {
  expect(memberLeaves(
    'U04ESESV56G',
    {
      frequency: "14",
      lastPairing: "",
      isActive: true,
      restrict: []
    }, "C04DX8MV1EY", {
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
    installDate: new Date('2022-12-20T15:44:39.390Z'),
    nextPairDate: new Date('2022-12-27T15:44:39.390Z')
  })).toStrictEqual({
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
            isActive: false,
            restrict: []
          },
        },
        isActive: true,
        installDate: new Date('2022-12-20T15:44:39.390Z'),
        nextPairDate: new Date('2022-12-27T15:44:39.390Z')
      }
    },
  });
});
