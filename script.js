let firstNum = null;
let operator = null;
let secondNum = null;
let currentOperator = null;
let result = null;
let secondNumActive = false;
let clickedDecimal = false;
let clickedEqual = false;

let display = document.querySelector(".display-container");
let numberButtons = document.querySelectorAll(".numbers");
let clearButton = document.querySelector(".clear");
let equalButton = document.querySelector(".equals");
let operatorButton = document.querySelectorAll(".operators");
let decimalButton = document.querySelector(".decimal");
let backspaceButton = document.querySelector(".backspace");

let displayValue = "0";

backspaceButton.addEventListener("click", () => {
  displayValue = displayValue.slice(0, -1);
  firstNum = Number(displayValue.split(`${operator}`)[0]);
  secondNum = Number(
    displayValue.split(`${operator}`)[1]
      ? Number(displayValue.split(`${operator}`)[1])
      : "0"
  );

  // displayValue.join("");
  updateDisplay();
});

function updateDisplay() {
  display.textContent = displayValue;
}

decimalButton.addEventListener("click", () => {
  if (clickedDecimal === false) displayValue += decimalButton.textContent;

  updateDisplay();
  clickedDecimal = true;
});

equalButton.addEventListener("click", () => {
  secondNum = Number(displayValue.split(`${operator}`)[1]);
  // displayValue.join("");

  if (operator === null) {
    result = displayValue;
  } else {
    result = Number.isInteger(operate(operator, firstNum, secondNum))
      ? operate(operator, firstNum, secondNum)
      : Math.round(operate(operator, firstNum, secondNum) * 100) / 100;
  }

  if (String(result).length > 10) {
    result = Number(result).toExponential(2);
  }

  displayValue = result;
  firstNum = null;
  secondNum = null;
  currentOperator = null;

  updateDisplay();

  displayValue = Number(displayValue) ? displayValue : "0";
  if (!Number.isInteger(result)) {
    clickedDecimal = true;
  } else {
    clickedDecimal = false;
  }

  clickedEqual = true;
});

operatorButton.forEach((button) => {
  button.addEventListener("click", () => {
    clickedEqual = false;
    operator = button.textContent;

    if (currentOperator) {
      secondNum = Number(displayValue.split(`${currentOperator}`)[1])
        ? Number(displayValue.split(`${currentOperator}`)[1])
        : currentOperator === "×" || currentOperator === "÷"
        ? 1
        : 0;

      result = Number.isInteger(operate(operator, firstNum, secondNum))
        ? operate(operator, firstNum, secondNum)
        : Math.round(operate(operator, firstNum, secondNum) * 100) / 100;

      if (String(result).length > 10) {
        result = Number(result).toExponential(2);
      }

      firstNum = result;

      displayValue = result;
    }

    if (firstNum === null) {
      firstNum = Number(displayValue) ? Number(displayValue) : 0;
    }

    currentOperator = operator;
    displayValue += currentOperator;

    updateDisplay();
    clickedDecimal = false;
  });
});

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (clickedEqual) {
      displayValue = "0";
    }

    displayValue === "0"
      ? (displayValue = button.textContent)
      : (displayValue += button.textContent);
    updateDisplay();

    clickedEqual = false;
  });
});

clearButton.addEventListener("click", () => {
  displayValue = "0";
  updateDisplay();

  clickedDecimal = false;
  let firstNum = null;
  let operator = null;
  let secondNum = null;
  let currentOperator = null;
});

function operate(operator, firstNum, secondNum) {
  switch (operator) {
    case "+":
      return add(firstNum, secondNum);
    case "-":
      return subtract(firstNum, secondNum);
    case "×":
      return multiply(firstNum, secondNum);
    case "÷":
      return divide(firstNum, secondNum);
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error: Division by zero";
  }
  return a / b;
}
