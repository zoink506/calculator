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
  
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      operate(button);
    });
  });
}

let equation = [];
console.log(equation);
function operate(input) {

  let inputType;
  if(input.classList.contains("number")) {
    inputType = "number";
  } else if(input.classList.contains("operator")) {
    inputType = "operator";
  } else if(input.id === "=") {
    inputType = "equals";
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
    if(equation[2] === undefined) {
      if(equation[1] === undefined) {
        if(equation[0] === undefined) {
          equation[0] = input.innerText;
        } else {
          equation[0] += input.innerText;
        }
      } else {
        equation[2] = input.innerText;
      }
    } else {
      equation[2] += input.innerText;
    }

  } else if(inputType === "operator") {
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

  } else if(inputType === "equals") {

    if(equation[0] !== undefined && equation[1] !== undefined && equation[2] !== undefined) {
      evaluate();
    }

  }

  console.log(equation);
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

//calculator();
makeEventListeners();
