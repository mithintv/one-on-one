import { filterFrequency } from "../../src/functions/pairing";

test('#1 filterFrequency w/ valid dates', () => {
  expect(filterFrequency([
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
    .toStrictEqual({
      readyMembers: [
        'U04DE8L08R5',
        'U04DRTFB6QM',
        'U04EPTE4TU3',
        'U04ESESV56G'
      ],
      currentDate: new Date()
    });
});

test('#2 filterFrequency w/ invalid dates', () => {
  expect(filterFrequency([
    'U04DE8L08R5',
    'U04DRTFB6QM',
    'U04EPTE4TU3',
    'U04ESESV56G',
    'U04FDNKH2L8'
  ],
    [
      {
        U04DE8L08R5: {
          id: 'U04DE8L08R5',
          name: 'Mithin',
          frequency: "14",
          lastPairing: new Date(),
          isActive: true,
          restrict: []
        }
      },
      {
        U04DRTFB6QM: {
          id: 'U04DRTFB6QM',
          name: 'Prakash',
          frequency: "14",
          lastPairing: new Date(),
          isActive: true,
          restrict: []
        }
      },
      {
        U04EPTE4TU3: {
          id: 'U04EPTE4TU3',
          name: 'Nannu',
          frequency: "14",
          lastPairing: new Date(),
          isActive: true,
          restrict: []
        }
      },
      {
        U04ESESV56G: {
          id: 'U04ESESV56G',
          name: 'Cuarine',
          frequency: "14",
          lastPairing: new Date(),
          isActive: true,
          restrict: []
        }
      },
    ],
  ))
    .toStrictEqual({ readyMembers: [], currentDate: new Date() });
});

test('#3 filterFrequency w/ mixed dates', () => {
  expect(filterFrequency([
    'U04DE8L08R5',
    'U04DRTFB6QM',
    'U04EPTE4TU3',
    'U04ESESV56G',
    'U04FDNKH2L8'
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
          lastPairing: new Date(Date.now()),
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
          lastPairing: new Date(Date.now()),
          isActive: true,
          restrict: []
        }
      },
    ],

  ))
    .toStrictEqual({ readyMembers: ['U04DE8L08R5', 'U04EPTE4TU3'], currentDate: new Date() });
});
