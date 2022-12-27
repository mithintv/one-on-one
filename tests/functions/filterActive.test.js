import { filterActive } from "../../src/functions/pairing";

test('filterActive w/ only active users', () => {
  expect(filterActive([
    'U04DE8L08R5',
    'U04DRTFB6QM',
    'U04EPTE4TU3',
    'U04ESESV56G',
    'U04FDNKH2L8'
  ], {
    U04DE8L08R5: {
      frequency: '1',
      lastPairing: new Date('2022-12-22T20:33:28.273Z'),
      restrict: [],
      isActive: true
    },
    U04DRTFB6QM: {
      frequency: '1',
      lastPairing: new Date('2022-12-22T20:35:31.584Z'),
      restrict: [],
      isActive: true
    },
    U04EPTE4TU3: {
      frequency: '1',
      lastPairing: new Date('2022-12-22T20:33:28.273Z'),
      restrict: [],
      isActive: true
    },
    U04ESESV56G: {
      frequency: '1',
      lastPairing: new Date('2022-12-22T20:35:31.584Z'),
      restrict: [],
      isActive: true
    },
    U04FDNKH2L8: {
      frequency: '1',
      lastPairing: new Date('2022-12-22T20:33:28.273Z'),
      restrict: [],
      isActive: true
    }
  }))
    .toStrictEqual([
      'U04DE8L08R5',
      'U04DRTFB6QM',
      'U04EPTE4TU3',
      'U04ESESV56G',
      'U04FDNKH2L8'
    ]);
});

test('filterActive w/ only inactive users', () => {
  expect(filterActive([
    'U04DE8L08R5',
    'U04DRTFB6QM',
    'U04EPTE4TU3',
    'U04ESESV56G',
    'U04FDNKH2L8'
  ], {
    U04DE8L08R5: {
      frequency: '1',
      lastPairing: new Date('2022-12-22T20:33:28.273Z'),
      restrict: [],
      isActive: false
    },
    U04DRTFB6QM: {
      frequency: '1',
      lastPairing: new Date('2022-12-22T20:35:31.584Z'),
      restrict: [],
      isActive: false
    },
    U04EPTE4TU3: {
      frequency: '1',
      lastPairing: new Date('2022-12-22T20:33:28.273Z'),
      restrict: [],
      isActive: false
    },
    U04ESESV56G: {
      frequency: '1',
      lastPairing: new Date('2022-12-22T20:35:31.584Z'),
      restrict: [],
      isActive: false
    },
    U04FDNKH2L8: {
      frequency: '1',
      lastPairing: new Date('2022-12-22T20:33:28.273Z'),
      restrict: [],
      isActive: false
    }
  }))
    .toStrictEqual([]);
});

test('filterActive w/ mixed users', () => {
  expect(filterActive([
    'U04DE8L08R5',
    'U04DRTFB6QM',
    'U04EPTE4TU3',
    'U04ESESV56G',
    'U04FDNKH2L8'
  ], {
    U04DE8L08R5: {
      frequency: '1',
      lastPairing: new Date('2022-12-22T20:33:28.273Z'),
      restrict: [],
      isActive: true
    },
    U04DRTFB6QM: {
      frequency: '1',
      lastPairing: new Date('2022-12-22T20:35:31.584Z'),
      restrict: [],
      isActive: false
    },
    U04EPTE4TU3: {
      frequency: '1',
      lastPairing: new Date('2022-12-22T20:33:28.273Z'),
      restrict: [],
      isActive: true
    },
    U04ESESV56G: {
      frequency: '1',
      lastPairing: new Date('2022-12-22T20:35:31.584Z'),
      restrict: [],
      isActive: true
    },
    U04FDNKH2L8: {
      frequency: '1',
      lastPairing: new Date('2022-12-22T20:33:28.273Z'),
      restrict: [],
      isActive: false
    }
  }))
    .toStrictEqual([
      'U04DE8L08R5',
      'U04EPTE4TU3',
      'U04ESESV56G',
    ]);
});
