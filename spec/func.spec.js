const { pow } = require('../functions.js');
const { sum } = require('../functions.js');
const { difference } = require('../functions.js');
const { multiplication } = require('../functions.js');
const { division } = require('../functions.js');

describe('Функция pow()', () => {
  it ('должна возвращать 9 при аргументах (3, 2)', () => {
    expect(pow(3, 2)).toBe(9);
  })

  it ('должна возвращать 0.04 при аргументах (5, -2)', () => {
    expect(pow(5, -2)).toBe(0.04);
  })

  it ('должна возвращать 1 при аргументах (5, 0)', () => {
    expect(pow(5, 0)).toBe(1);
  })

  it ('должна возвращать 0 при аргументах (0, 4)', () => {
    expect(pow(0, 4)).toBe(0);
  })

  it ('должна возвращать null при аргументах (null, 2)', () => {
    expect(pow(null, 2)).toBeNull();
  })

  it ('должна возвращать null при аргументах (5, null)', () => {
    expect(pow(5, null)).toBeNull();
  })
});

describe('Функция sum()', () => {
  it ('должна возвращать 5 при аргументах (3, 2)', () => {
    expect(sum(3, 2)).toBe(5);
  })

  it ('должна возвращать 3 при аргументах (5, -2)', () => {
    expect(sum(5, -2)).toBe(3);
  })

  it ('должна возвращать 5 при аргументах (5, 0)', () => {
    expect(sum(5, 0)).toBe(5);
  })

  it ('должна возвращать 4 при аргументах (0, 4)', () => {
    expect(sum(0, 4)).toBe(4);
  })

  it ('должна возвращать null при аргументах (null, 2)', () => {
    expect(sum(null, 2)).toBeNull();
  })

  it ('должна возвращать null при аргументах (5, null)', () => {
    expect(sum(5, null)).toBeNull();
  })

  it ('должна возвращать null при аргументах (NaN, 2)', () => {
    expect(sum(NaN, 2)).toBeNull();
  })
  
  it ('должна возвращать null при аргументах (2, NaN)', () => {
    expect(sum(2, NaN)).toBeNull();
  })

  it ('должна возвращать null при аргументах (строка, 2)', () => {
    expect(sum('строка', 2)).toBeNull();
  })
  
  it ('должна возвращать null при аргументах (2, word)', () => {
    expect(sum(2, 'word')).toBeNull();
  })

  it ('должна возвращать null при аргументах (5, undefined)', () => {
    expect(sum(5, undefined)).toBeNull();
  })
  
  it ('должна возвращать null при аргументах (undefined, 7)', () => {
    expect(sum(undefined, 7)).toBeNull();
  })
});

describe('Функция difference()', () => {
  it ('должна возвращать 3 при аргументах (5, 2)', () => {
    expect(difference(5, 2)).toBe(3);
  })

  it ('должна возвращать 7 при аргументах (5, -2)', () => {
    expect(difference(5, -2)).toBe(7);
  })

  it ('должна возвращать 5 при аргументах (5, 0)', () => {
    expect(difference(5, 0)).toBe(5);
  })

  it ('должна возвращать -4 при аргументах (0, 4)', () => {
    expect(difference(0, 4)).toBe(-4);
  })

  it ('должна возвращать null при аргументах (null, 2)', () => {
    expect(difference(null, 2)).toBeNull();
  })

  it ('должна возвращать null при аргументах (5, null)', () => {
    expect(difference(5, null)).toBeNull();
  })

  it ('должна возвращать null при аргументах (NaN, 2)', () => {
    expect(difference(NaN, 2)).toBeNull();
  })
  
  it ('должна возвращать null при аргументах (2, NaN)', () => {
    expect(difference(2, NaN)).toBeNull();
  })

  it ('должна возвращать null при аргументах (строка, 2)', () => {
    expect(difference('строка', 2)).toBeNull();
  })
  
  it ('должна возвращать null при аргументах (2, word)', () => {
    expect(difference(2, 'word')).toBeNull();
  })

  it ('должна возвращать null при аргументах (5, undefined)', () => {
    expect(difference(5, undefined)).toBeNull();
  })
  
  it ('должна возвращать null при аргументах (undefined, 7)', () => {
    expect(difference(undefined, 7)).toBeNull();
  })
});

describe('Функция multiplication()', () => {
  it ('должна возвращать 10 при аргументах (5, 2)', () => {
    expect(multiplication(5, 2)).toBe(10);
  })

  it ('должна возвращать -10 при аргументах (5, -2)', () => {
    expect(multiplication(5, -2)).toBe(-10);
  })

  it ('должна возвращать 0 при аргументах (5, 0)', () => {
    expect(multiplication(5, 0)).toBe(0);
  })

  it ('должна возвращать 0 при аргументах (0, 4)', () => {
    expect(multiplication(0, 4)).toBe(0);
  })

  it ('должна возвращать null при аргументах (null, 2)', () => {
    expect(multiplication(null, 2)).toBeNull();
  })

  it ('должна возвращать null при аргументах (5, null)', () => {
    expect(multiplication(5, null)).toBeNull();
  })

  it ('должна возвращать null при аргументах (NaN, 2)', () => {
    expect(multiplication(NaN, 2)).toBeNull();
  })
  
  it ('должна возвращать null при аргументах (2, NaN)', () => {
    expect(multiplication(2, NaN)).toBeNull();
  })

  it ('должна возвращать null при аргументах (строка, 2)', () => {
    expect(multiplication('строка', 2)).toBeNull();
  })
  
  it ('должна возвращать null при аргументах (2, word)', () => {
    expect(multiplication(2, 'word')).toBeNull();
  })

  it ('должна возвращать null при аргументах (5, undefined)', () => {
    expect(multiplication(5, undefined)).toBeNull();
  })
  
  it ('должна возвращать null при аргументах (undefined, 7)', () => {
    expect(multiplication(undefined, 7)).toBeNull();
  })
});

describe('Функция division()', () => {
  it ('должна возвращать 2.5 при аргументах (5, 2)', () => {
    expect(division(5, 2)).toBe(2.5);
  })

  it ('должна возвращать 3.5 при аргументах (7, -2)', () => {
    expect(division(7, -2)).toBe(-3.5);
  })

  it ('должна возвращать Infinity при аргументах (5, 0)', () => {
    expect(division(5, 0)).toBe(Infinity);
  })

  it ('должна возвращать 0 при аргументах (0, 4)', () => {
    expect(division(0, 4)).toBe(0);
  })

  it ('должна возвращать 0 при аргументах (null, 2)', () => {
    expect(division(null, 2)).toBe(0);
  })

  it ('должна возвращать Infinity при аргументах (5, null)', () => {
    expect(division(5, null)).toBe(Infinity);
  })

  it ('должна возвращать null при аргументах (NaN, 2)', () => {
    expect(division(NaN, 2)).toBeNull();
  })
  
  it ('должна возвращать null при аргументах (2, NaN)', () => {
    expect(division(2, NaN)).toBeNull();
  })

  it ('должна возвращать null при аргументах (строка, 2)', () => {
    expect(division('строка', 2)).toBeNull();
  })
  
  it ('должна возвращать null при аргументах (2, word)', () => {
    expect(division(2, 'word')).toBeNull();
  })

  it ('должна возвращать null при аргументах (5, undefined)', () => {
    expect(division(5, undefined)).toBeNull();
  })
  
  it ('должна возвращать null при аргументах (undefined, 7)', () => {
    expect(division(undefined, 7)).toBeNull();
  })
});