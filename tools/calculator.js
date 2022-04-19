const calcDisplay = document.querySelector("#calcDisplay");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const clearBtn = document.querySelector("#clear");
const equalBtn = document.querySelector("#equals");
let exp1;
let exp2;
let opType = "";
let operating = false;
let finalOp = false;

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
    return a / b;
}
function operate(operator, num1, num2) {
    switch (operator) {
        case "addition": return add(num1, num2);
        case "subtraction": return subtract(num1, num2);
        case "multiplication": return multiply(num1, num2);
        case "division": return divide(num1, num2);
    }
    exp2 = "";
    operating = false;
}
function setOp(op) {
    switch (op.innerHTML) {
        case "+": opType = "addition"; break;
        case "-": opType = "subtraction"; break;
        case "*": opType = "multiplication"; break;
        case "/": opType = "division"; break;
    }
    operating = true;
}

for (let digit of digits) {
    digit.addEventListener('click', () => {
        if (operating === true) {
            calcDisplay.value = "";
            finalOp = true;
        }
        calcDisplay.value += digit.innerHTML;
    });
};
for (let operator of operators) {
    operator.addEventListener('click', () => {
        if (!opType) {
            exp1 = Number(calcDisplay.value);
        }
        if (finalOp) {
            exp2 = Number(calcDisplay.value);
            exp1 = operate(opType, exp1, exp2);
            calcDisplay.value = exp1;
        }
        finalOp = false;
        setOp(operator);
    });
};
equalBtn.addEventListener('click', () => {
    exp2 = Number(calcDisplay.value);
    calcDisplay.value = operate(opType, exp1, exp2);
})
clearBtn.addEventListener('click', () => {
    calcDisplay.value = "";
    exp1 = "";
    exp2 = "";
})