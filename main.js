function add(value1, value2) {
  return value1 + value2;
}

function subtract(value1, value2) {
  return value1 - value2;
}

function multiply(value1, value2) {
  return value1 * value2;
}

function divide(value1, value2) {
  return value1 / value2;
}

console.log(add(3, 5));      // 8
console.log(subtract(5, 2)); // 3
console.log(multiply(3, 4)); // 12
console.log(divide(8, 2));   // 4

function makeEventListeners() {
  const buttons = document.querySelector("#buttons").children;
  console.log(buttons);
  const display = document.querySelector("#display");

  for(let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    console.log(button);
    button.addEventListener("click", () => {
      let text = display.innerText;
      text += button.id;
      display.innerText = text;
    });
  }
}

makeEventListeners();
