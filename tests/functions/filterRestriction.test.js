import { filterRestriction } from "../../src/functions/pairing";

test('#1 filterRestriction w/ no restrictions', () => {
  expect(filterRestriction([
    'U04DE8L08R5',
    'U04DRTFB6QM',
    'U04EPTE4TU3',
    'U04ESESV56G'
  ],
    [
      {
        U04DE8L08R5: {
          id: 'U04DE8L08R5',
          name: 'Mithin',
          frequency: "14",
          lastPairing: new Date('2022-12-22T20:33:28.273Z'),
          isActive: true,
          restrict: []
        }
      },
      {
        U04DRTFB6QM: {
          id: 'U04DRTFB6QM',
          name: 'Prakash',
          frequency: "14",
          lastPairing: new Date('2022-12-22T20:33:28.273Z'),
          isActive: true,
          restrict: []
        }
      },
      {
        U04EPTE4TU3: {
          id: 'U04EPTE4TU3',
          name: 'Nannu',
          frequency: "14",
          lastPairing: new Date('2022-12-22T20:33:28.273Z'),
          isActive: true,
          restrict: []
        }
      },
      {
        U04ESESV56G: {
          id: 'U04ESESV56G',
          name: 'Cuarine',
          frequency: "14",
          lastPairing: new Date('2022-12-22T20:33:28.273Z'),
          isActive: true,
          restrict: []
        }
      },
    ],
  ))
    .resolves.toStrictEqual(
      [
        'U04DE8L08R5',
        'U04DRTFB6QM',
        'U04EPTE4TU3',
        'U04ESESV56G'
      ]);
});

test('#2 filterRestriction w/ restrictions', () => {
  expect(filterRestriction([
    'U04DE8L08R5',
    'U04DRTFB6QM',
    'U04EPTE4TU3',
    'U04ESESV56G',
  ],
    [
      {
        U04DE8L08R5: {
          id: 'U04DE8L08R5',
          name: 'Mithin',
          frequency: "14",
          lastPairing: new Date('2022-12-22T20:33:28.273Z'),
          isActive: true,
          restrict: ['U04DRTFB6QM']
        }
      },
      {
        U04DRTFB6QM: {
          id: 'U04DRTFB6QM',
          name: 'Prakash',
          frequency: "14",
          lastPairing: new Date('2022-12-22T20:33:28.273Z'),
          isActive: true,
          restrict: []
        }
      },
      {
        U04EPTE4TU3: {
          id: 'U04EPTE4TU3',
          name: 'Nannu',
          frequency: "14",
          lastPairing: new Date('2022-12-22T20:33:28.273Z'),
          isActive: true,
          restrict: []
        }
      },
      {
        U04ESESV56G: {
          id: 'U04ESESV56G',
          name: 'Cuarine',
          frequency: "14",
          lastPairing: new Date('2022-12-22T20:33:28.273Z'),
          isActive: true,
          restrict: []
        }
      },
    ],
  ))
    .resolves.toHaveLength(4);
});
