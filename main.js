/*
 * To do:
 *  - make design look good
 *  - AC % +/- buttons
 *  - cut off really long numbers
 *  - add a limit to length of numbers that can be input
 *  - add a backspace button
 *
 */

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

function makeEventListeners() {
  const buttons = document.querySelectorAll(".button");
  const display = document.querySelector("#display");
  
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      operate(button);
      printDisplay(display);
    });
  });
}

let equation = [];
console.log(equation);
printDisplay(display);

function operate(input) {
  const maxLength = 10;

  let inputType;
  if(input.classList.contains("number")) {
    inputType = "number";
  } else if(input.classList.contains("operator")) {
    inputType = "operator";
  } else if(input.id === "equals") {
    inputType = "equals";
  } else {
    inputType = input.id;
  }

  /*
   * If the second value is defined, add the input to the second value
   * 
   * If the second value is undefined, check if the operator is defined
   *   - If the operator is defined, then add the input to the second value
   *   - If the operator is not defined, then add the input to first value
   *      - If the first value is defined, add input to the first value
   *      - If the first value is undefined, set first value to be the input
   */

  if(inputType === "number") {
    inputNumber(input, maxLength);
  } else if(inputType === "operator") {
    inputOperator(input);
  } else if(inputType === "equals") {
    if(equation[0] !== undefined && equation[1] !== undefined && equation[2] !== undefined) {
      evaluate();
    }
  } else if(inputType === "ac") {
    equation.splice(0, equation.length)
  } else if(inputType === "backspace") {
    backspace();
  }

  console.log(equation);
}

function inputNumber(input, maxLength) {
  if(equation[2] === undefined) {
    if(equation[1] === undefined) {
      if(equation[0] === undefined) {
        equation[0] = input.innerText;
      } else {
        if(equation[0].length < maxLength) equation[0] += input.innerText;
      }
    } else {
      equation[2] = input.innerText;
    }
  } else {
    if(equation[2].length < maxLength) equation[2] += input.innerText;
  }
}

function inputOperator(input) {
  if(equation[0] !== undefined) {
    if(equation[2] === undefined) {
      // only first value has been input
      // set equation[1] to the operator
      equation[1] = input.innerText;
    } else {
      // first and second values have been input
      // evaluate equation, then set answer to first value, and the selected operator to equation[1]
      // do later
      evaluate(equation);
      equation[1] = input.innerText;
    }
  }
}

function evaluate() {

  let answer;
  if(equation[1] === "+") {
    answer = add(equation[0], equation[2]);
  } else if(equation[1] === "-") {
    answer = subtract(equation[0], equation[2]);
  } else if(equation[1] === "*") {
    answer = multiply(equation[0], equation[2]);
  } else if(equation[1] === "/") {
    answer = divide(equation[0], equation[2]);
  }

  equation[0] = answer.toString();
  equation.splice(1, 2);

}

function printDisplay(displayElement) {
  outputStr = "";

  if(equation[0] === undefined && equation[1] === undefined && equation[2] === undefined) {
    outputStr = "0";
    displayElement.innerText = outputStr;
  }

  if(equation[0] !== undefined) outputStr += equation[0];
  outputStr += " ";
  if(equation[1] !== undefined) outputStr += equation[1];
  outputStr += " ";
  if(equation[2] !== undefined) outputStr += equation[2];
  displayElement.innerText = outputStr;
}

//calculator();
makeEventListeners();
