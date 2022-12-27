import { filterRestriction } from "../../src/functions/pairing";

test('filterRestriction w/ no restrictions', async () => {
  await expect(filterRestriction([
    'U04DE8L08R5',
    'U04DRTFB6QM',
    'U04EPTE4TU3',
    'U04ESESV56G',
    'U04FDNKH2L8',
    'U04DE8L08R5'
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
    .resolves.toStrictEqual(
      [
        'U04DE8L08R5',
        'U04DRTFB6QM',
        'U04EPTE4TU3',
        'U04ESESV56G',
        'U04FDNKH2L8',
        'U04DE8L08R5'
      ]);
});

test('filterRestriction w/ restrictions', async () => {
  await expect(filterRestriction([
    'U04DE8L08R5',
    'U04DRTFB6QM',
    'U04EPTE4TU3',
    'U04ESESV56G',
    'U04FDNKH2L8',
    'U04DE8L08R5'
  ], {
    U04DE8L08R5: {
      frequency: '14',
      lastPairing: new Date('2022-12-22T20:33:28.273Z'),
      restrict: ['U04DRTFB6QM'],
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
    .resolves.toHaveLength(6);
});
