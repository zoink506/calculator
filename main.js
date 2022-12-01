function add(value1, value2) {
  return parseFloat(value1) + parseFloat(value2);
}

function subtract(value1, value2) {
  return parseFloat(value1) - parseFloat(value2);
}

function multiply(value1, value2) {
  return parseFloat(value1) * parseFloat(value2);
}

function divide(value1, value2) {
  return parseFloat(value1) / parseFloat(value2);
}

let equation = [];
function calculator() {
  let answer;
  let value1;

  if(equation.length === 0) {
    value1 = prompt("Enter first number");
  } else {
    value1 = equation[0];
  }

  const operator = prompt("Enter operator");
  const value2 = prompt("Enter second number");
  equation[0] = value1;
  equation[1] = operator;
  equation[2] = value2;

  if(equation[1] === "+") {
    answer = add(equation[0], equation[2]);
  } else if(equation[1] === "-") {
    answer = subtract(equation[0], equation[2]);
  } else if(equation[1] === "*") {
    answer = multiply(equation[0], equation[2])
  } else if(equation[1] === "/") {
    answer = divide(equation[0], equation[2]);
  } else {
    answer = "ERROR";
  }

  console.log(equation);
  equation[0] = answer;
  equation.splice(1, 2);

  
  console.log("test");
  console.log(equation);
  calculator();
}


//console.log(add(3, 5));      // 8
//console.log(subtract(5, 2)); // 3
//console.log(multiply(3, 4)); // 12
//console.log(divide(8, 2));   // 4


calculator();
//makeEventListeners();
