//* *Дополнить тесты функции возведения в степень (например, возведением в отрицательную степень, нулевую степень).
//*3. *Написать приложение-калькулятор, используя подход BDD. Приложение должно состоять из четырёх методов для сложения, вычитания, умножения и деления. Каждый метод принимает на вход два аргумента и выполняет действие. При написании тестов учесть случаи, когда на вход подаются не числа, а строки, null или undefined.

module.exports = {
  pow,
  sum,
  difference,
  multiplication,
  division
}

function pow(a, b) {
  if((!a && a !== 0) || (!b && b !== 0)) return null;
  if(b < 0) return 1 / (a**(-b));
  let result = 1;
  for (let i = 0; i < b; i++) {
    result *= a;
  }
  return result;
}

function sum(a, b) {
  if((!a && a !== 0) || (!b && b !== 0) || isNaN(a) || isNaN(b)) return null;
  return a + b;
}

function difference(a, b) {
  if((!a && a !== 0) || (!b && b !== 0) || isNaN(a) || isNaN(b)) return null;
  return a - b;
}

function multiplication(a, b) {
  if((!a && a !== 0) || (!b && b !== 0) || isNaN(a) || isNaN(b)) return null;
  return a * b;
}

function division(x, y) {
  if(isNaN(x) || isNaN(y)) return null;
  return x / y;
}