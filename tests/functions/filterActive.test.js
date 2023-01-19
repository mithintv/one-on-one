import { filterActive } from "../../src/functions/pairing";

test('#1 filterActive w/ only active users', () => {
  expect(filterActive([
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
    .toStrictEqual([
      'U04DE8L08R5',
      'U04DRTFB6QM',
      'U04EPTE4TU3',
      'U04ESESV56G'
    ]);
});

test('#2 filterActive w/ only inactive users', () => {
  expect(filterActive([
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
          isActive: false,
          restrict: []
        }
      },
      {
        U04DRTFB6QM: {
          id: 'U04DRTFB6QM',
          name: 'Prakash',
          frequency: "14",
          lastPairing: new Date('2022-12-22T20:33:28.273Z'),
          isActive: false,
          restrict: []
        }
      },
      {
        U04EPTE4TU3: {
          id: 'U04EPTE4TU3',
          name: 'Nannu',
          frequency: "14",
          lastPairing: new Date('2022-12-22T20:33:28.273Z'),
          isActive: false,
          restrict: []
        }
      },
      {
        U04ESESV56G: {
          id: 'U04ESESV56G',
          name: 'Cuarine',
          frequency: "14",
          lastPairing: new Date('2022-12-22T20:33:28.273Z'),
          isActive: false,
          restrict: []
        }
      },
    ],
  ))
    .toStrictEqual([]);
});

test('#3 filterActive w/ mixed users', () => {
  expect(filterActive([
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
          restrict: []
        }
      },
      {
        U04DRTFB6QM: {
          id: 'U04DRTFB6QM',
          name: 'Prakash',
          frequency: "14",
          lastPairing: new Date('2022-12-22T20:33:28.273Z'),
          isActive: false,
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
          isActive: false,
          restrict: []
        }
      },
    ],
  ))
    .toStrictEqual([
      'U04DE8L08R5',
      'U04EPTE4TU3',
    ]);
});
