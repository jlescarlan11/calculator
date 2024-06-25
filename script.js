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

window.addEventListener("keydown", handleKeyboardInput);

function isValidKey(key) {
  const validKeys = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "-",
    "*",
    "/",
    "=",
    "Delete",
    "Enter",
    "Backspace",
  ];
  return validKeys.includes(key);
}

function handleKeyboardInput(event) {
  event.preventDefault();
  const key = event.key;

  if (isValidKey(key)) {
    if (key === "+" || key === "-" || key === "*" || key === "/") {
      handleOperatorInput(key);
    } else if (key === "Enter" || key === "=") {
      console.log();
      handleEqualInput();
    } else if (key === "Backspace") {
      handleBackspaceInput();
    } else if (key === "Delete") {
      handleClearInput();
    } else if (key === ".") {
      handleDecimalInput();
    } else {
      handleNumberInput(key);
    }
  }
}

function handleDecimalInput() {
  if (clickedDecimal === false) displayValue += decimalButton.textContent;

  updateDisplay();
  clickedDecimal = true;
}

function handleClearInput() {
  displayValue = "0";
  updateDisplay();

  clickedDecimal = false;
  let firstNum = null;
  let operator = null;
  let secondNum = null;
  let currentOperator = null;
}

function handleBackspaceInput() {
  displayValue = displayValue.slice(0, -1);
  firstNum = Number(displayValue.split(`${operator}`)[0]);
  secondNum = Number(
    displayValue.split(`${operator}`)[1]
      ? Number(displayValue.split(`${operator}`)[1])
      : "0"
  );

  updateDisplay();
}

function handleNumberInput(num) {
  if (clickedEqual) {
    displayValue = "0";
  }

  displayValue === "0" ? (displayValue = num) : (displayValue += num);
  updateDisplay();

  clickedEqual = false;
}

function handleEqualInput() {
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
}

operatorButton.forEach((button) => {
  button.addEventListener("click", () =>
    handleOperatorInput(button.textContent)
  );
});

function handleOperatorInput(op) {
  clickedEqual = false;
  console.log(op);
  operator = op;

  if (currentOperator) {
    secondNum = Number(displayValue.split(`${currentOperator}`)[1])
      ? Number(displayValue.split(`${currentOperator}`)[1])
      : currentOperator === "*" || currentOperator === "/"
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
  1;
}

equalButton.addEventListener("click", handleEqualInput);

backspaceButton.addEventListener("click", handleBackspaceInput);

function updateDisplay() {
  display.textContent = displayValue;
}

decimalButton.addEventListener("click", handleDecimalInput);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => handleNumberInput(button.textContent));
});

clearButton.addEventListener("click", handleClearInput);

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
    return "lmao, undefined";
  }
  return a / b;
}
