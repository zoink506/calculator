/*
 * To do:
 * - Fix bug after a value is divided by 0, and the next value is overridde when it shouldn't be
 * - Doesn't happen when operator is used, happens when equals is used
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
      //printDisplay(display, false);
    });
  });
}

let equation = [];
let pressedEquals = false;
console.log(equation);
printDisplay(display, false);

function operate(input) {
  const maxLength = 10;
  let dividebyZero = false;

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
    pressedEquals = false;
    dividebyZero = inputOperator(input);
  } else if(inputType === "equals") {
    if(equation[0] !== undefined && equation[1] !== undefined && equation[2] !== undefined) {
      dividebyZero = evaluate();
      pressedEquals = true;
    }
  } else if(inputType === "ac") {
    equation.splice(0, equation.length)
  } else if(inputType === "backspace") {
    backspace();
  } else if(inputType === "negative") {
    // Make the most recent number the opposite charge (name???) 
    negative();
  } else if(inputType === "percent") {
    // Turn the most recent number into a percentage
    percentage();
  }

  if(dividebyZero) {
    printDisplay(display, "Divide by zero");
  } else {
    printDisplay(display);
  }

  console.log(equation);
}

function backspace() {
  if(equation[0] !== undefined) {
    const latestEntry = equation[equation.length-1];
    console.log(`Latest entry: ${latestEntry}`);

    if(latestEntry.length > 1) {
      let str = removeStrIndex(latestEntry, latestEntry.length-1);
      equation[equation.length-1] = str;
    } else {
      // delete latestEntry
      equation.splice(equation.length-1, equation.length);
    }
  }
}

function removeStrIndex(str, index) {
  // "doggy", 1
  // "d" + "ggy"
  str = str.slice(0, index) + str.slice(index+1, str.length);
  return str;
}

function inputNumber(input, maxLength) {
  if(equation[2] === undefined) {
    if(equation[1] === undefined) {
      if(equation[0] === undefined) {
        equation[0] = input.innerText;
      } else {
        if(!pressedEquals) {
          if(input.id === "dot" && equation[0].includes(".")) return;

          if(equation[0].length < maxLength) equation[0] += input.innerText;
        } else {
          equation[0] = input.innerText;
          pressedEquals = false;
        }
      }
    } else {
      equation[2] = input.innerText;
    }
  } else {
    if(input.id === "dot" && equation[2].includes(".")) return;

    if(equation[2].length < maxLength) equation[2] += input.innerText;
  }
}

function inputOperator(input) {
  if(equation[0] !== undefined) {

    if(equation[1] === "/" && equation[2] === "0") {
      // dividing by zero, do not allow
      evaluate();
      return true;
    }

    if(equation[2] === undefined) {
      // only first value has been input
      // set equation[1] to the operator
      equation[1] = input.innerText;
    } else {
      // first and second values have been input
      // evaluate equation, then set answer to first value, and the selected operator to equation[1]
      evaluate();
      equation[1] = input.innerText;
    }
  }
}

function evaluate() {
  let dividedByZero = false;

  let answer;
  if(equation[1] === "+") {
    answer = add(equation[0], equation[2]);
  } else if(equation[1] === "-") {
    answer = subtract(equation[0], equation[2]);
  } else if(equation[1] === "*") {
    answer = multiply(equation[0], equation[2]);
  } else if(equation[1] === "/") {
    if(equation[2] === "0") {
      // Clear the array
      // Print cranky message about dividing by 0
      equation.splice(0, equation.length);
      dividedByZero = true;
    } else {
      answer = divide(equation[0], equation[2]);
    }
  }

  if(!dividedByZero) {
    equation[0] = answer.toString();
    equation.splice(1, 2);
  }

  return dividedByZero;
}

function negative() {
  const index = findLastIndex(equation);

  if(index !== 1 && index !== undefined) {
    let number = parseFloat(equation[index]);
    number -= (number * 2);
    equation[index] = number.toString();
  } else {
    return;
  }
}

function percentage() {
  const index = findLastIndex(equation);
  let number = parseFloat(equation[index]);
  if(index !== 1 && index !== undefined) {
    number /= 100;
  }
  equation[index] = number.toString();
}

function findLastIndex(arr) {
  // returns undefined if the array is empty
  let lastIndex;
  if(arr[0] !== undefined) {
    lastIndex = 0;
    if(arr[1] !== undefined) {
      lastIndex = 1;
      if(arr[2] !== undefined) {
        lastIndex = 2;
      }
    }
  }

  return lastIndex;
}

function printDisplay(displayElement, customMessage) {
  outputStr = "";

  if(customMessage !== false && customMessage !== undefined) {
    outputStr = customMessage;
  } else {
    if(equation[0] === undefined && equation[1] === undefined && equation[2] === undefined) {
      outputStr = "0";
      displayElement.innerText = outputStr;
    }

    if(equation[0] !== undefined) outputStr += equation[0];
    outputStr += " ";
    if(equation[1] !== undefined) outputStr += equation[1];
    outputStr += " ";
    if(equation[2] !== undefined) outputStr += equation[2];
  }

  displayElement.innerText = outputStr;
}

//calculator();
makeEventListeners();
