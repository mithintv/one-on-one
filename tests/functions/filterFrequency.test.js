import { filterFrequency } from "../../src/functions/pairing";

test('filterFrequency w/ valid dates', () => {
  expect(filterFrequency([
    'U04DE8L08R5',
    'U04DRTFB6QM',
    'U04EPTE4TU3',
    'U04ESESV56G',
    'U04FDNKH2L8'
  ], {
    U04DE8L08R5: {
      frequency: '14',
      lastPairing: new Date('2022-12-22T20:33:28.273Z'),
      restrict: [],
      isActive: true
    },
    U04DRTFB6QM: {
      frequency: '14',
      lastPairing: new Date('2022-12-22T20:35:31.584Z'),
      restrict: [],
      isActive: true
    },
    U04EPTE4TU3: {
      frequency: '14',
      lastPairing: new Date('2022-12-22T20:33:28.273Z'),
      restrict: [],
      isActive: true
    },
    U04ESESV56G: {
      frequency: '14',
      lastPairing: new Date('2022-12-22T20:35:31.584Z'),
      restrict: [],
      isActive: true
    },
    U04FDNKH2L8: {
      frequency: '14',
      lastPairing: new Date('2022-12-22T20:33:28.273Z'),
      restrict: [],
      isActive: true
    }
  }))
    .toStrictEqual({
      readyMembers: [
        'U04DE8L08R5',
        'U04DRTFB6QM',
        'U04EPTE4TU3',
        'U04ESESV56G',
        'U04FDNKH2L8'
      ],
      currentDate: new Date()
    });
});

test('filterFrequency w/ invalid dates', () => {
  expect(filterFrequency([
    'U04DE8L08R5',
    'U04DRTFB6QM',
    'U04EPTE4TU3',
    'U04ESESV56G',
    'U04FDNKH2L8'
  ], {
    U04DE8L08R5: {
      frequency: '14',
      lastPairing: new Date(Date.now()),
      restrict: [],
      isActive: true
    },
    U04DRTFB6QM: {
      frequency: '14',
      lastPairing: new Date(Date.now()),
      restrict: [],
      isActive: true
    },
    U04EPTE4TU3: {
      frequency: '14',
      lastPairing: new Date(Date.now()),
      restrict: [],
      isActive: true
    },
    U04ESESV56G: {
      frequency: '14',
      lastPairing: new Date(Date.now()),
      restrict: [],
      isActive: true
    },
    U04FDNKH2L8: {
      frequency: '14',
      lastPairing: new Date(Date.now()),
      restrict: [],
      isActive: true
    }
  }))
    .toStrictEqual({ readyMembers: [], currentDate: new Date() });
});

test('filterFrequency w/ mixed dates', () => {
  expect(filterFrequency([
    'U04DE8L08R5',
    'U04DRTFB6QM',
    'U04EPTE4TU3',
    'U04ESESV56G',
    'U04FDNKH2L8'
  ], {
    U04DE8L08R5: {
      frequency: '14',
      lastPairing: new Date('2022-12-22T20:33:28.273Z'),
      restrict: [],
      isActive: true
    },
    U04DRTFB6QM: {
      frequency: '14',
      lastPairing: new Date(Date.now()),
      restrict: [],
      isActive: true
    },
    U04EPTE4TU3: {
      frequency: '14',
      lastPairing: new Date('2022-12-22T20:33:28.273Z'),
      restrict: [],
      isActive: true
    },
    U04ESESV56G: {
      frequency: '14',
      lastPairing: new Date(Date.now()),
      restrict: [],
      isActive: true
    },
    U04FDNKH2L8: {
      frequency: '14',
      lastPairing: new Date('2022-12-22T20:33:28.273Z'),
      restrict: [],
      isActive: true
    }
  }))
    .toStrictEqual({ readyMembers: ['U04DE8L08R5', 'U04EPTE4TU3', 'U04FDNKH2L8'], currentDate: new Date() });
});
