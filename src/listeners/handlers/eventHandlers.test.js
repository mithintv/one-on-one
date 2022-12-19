import { leaveChannel, newChannel, memberJoins, oldChannel, memberLeaves } from "./eventHandlers.js";

test('Bot joins new channel', () => {
  expect(newChannel([
    'U04DE8L08R5',
    'U04DRTFB6QM',
    'U04EHD34KGW',
    'U04EMKFLADB',
    'U04EPTE4TU3',
    'U04ESESV56G'
  ], 'C04DX8MV1EY')).toStrictEqual({
    $set: {
      "C04DX8MV1EY": {
        "U04DE8L08R5": {
          "frequency": "14",
          "lastPairing": "",
          "isActive": true,
          "restrict": []
        },
        "U04DRTFB6QM": {
          "frequency": "14",
          "lastPairing": "",
          "isActive": true,
          "restrict": []
        },
        "U04EHD34KGW": {
          "frequency": "14",
          "lastPairing": "",
          "isActive": true,
          "restrict": []
        },
        "U04EMKFLADB": {
          "frequency": "14",
          "lastPairing": "",
          "isActive": true,
          "restrict": []
        },
        "U04EPTE4TU3": {
          "frequency": "14",
          "lastPairing": "",
          "isActive": true,
          "restrict": []
        },
        "U04ESESV56G": {
          "frequency": "14",
          "lastPairing": "",
          "isActive": true,
          "restrict": []
        },
        "isActive": true
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
    "U04ESESV56G"
  ], 'C04DX8MV1EY', {
    "U04DE8L08R5": {
      "frequency": "14",
      "lastPairing": "",
      "isActive": true,
      "restrict": []
    },
    "U04DRTFB6QM": {
      "frequency": "14",
      "lastPairing": "",
      "isActive": true,
      "restrict": []
    },
    "U04EHD34KGW": {
      "frequency": "14",
      "lastPairing": "",
      "isActive": true,
      "restrict": []
    },
    "U04EMKFLADB": {
      "frequency": "14",
      "lastPairing": "",
      "isActive": true,
      "restrict": []
    },
    "U04EPTE4TU3": {
      "frequency": "14",
      "lastPairing": "",
      "isActive": true,
      "restrict": []
    },
    "isActive": true
  })).toStrictEqual({
    $set: {
      C04DX8MV1EY: {
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
        isActive: true
      },
    }
  });
});

test('Bot leaves channel', () => {
  expect(leaveChannel("C04DX8MV1EY",
    {
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
      isActive: true
    }
  )
  ).toStrictEqual({
    $set: {
      C04DX8MV1EY: {
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
        isActive: false
      }
    }
  });
});

test('Member joins channel that bot has joined', () => {
  expect(memberJoins("U04ESESV56G", "C04DX8MV1EY",
    {
      "U04DE8L08R5": {
        "frequency": "14",
        "lastPairing": "",
        "isActive": true,
        "restrict": []
      },
      "U04DRTFB6QM": {
        "frequency": "14",
        "lastPairing": "",
        "isActive": true,
        "restrict": []
      },
      "U04EHD34KGW": {
        "frequency": "14",
        "lastPairing": "",
        "isActive": true,
        "restrict": []
      },
      "U04EMKFLADB": {
        "frequency": "14",
        "lastPairing": "",
        "isActive": true,
        "restrict": []
      },
      "U04EPTE4TU3": {
        "frequency": "14",
        "lastPairing": "",
        "isActive": true,
        "restrict": []
      },
      isActive: true
    }
  )).toStrictEqual({
    $set: {
      C04DX8MV1EY: {
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
        isActive: true
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
    isActive: true
  })).toStrictEqual({
    $set: {
      C04DX8MV1EY: {
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
          "isActive": false,
          "restrict": []
        },
        isActive: true
      }
    },
  });
});
