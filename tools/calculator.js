const calcDisplay = document.querySelector("#calcDisplay");
const fullDisplay = document.querySelector("#fullDisplay");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const clearBtn = document.querySelector("#clear");
const equalBtn = document.querySelector("#equals");
let exp1;
let exp2;
let opType = "";

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
}
function setOpType(op) {
    switch (op.innerHTML) {
        case "+": opType = "addition"; break;
        case "-": opType = "subtraction"; break;
        case "*": opType = "multiplication"; break;
        case "/": opType = "division"; break;
    }
}

for (let digit of digits) {
    digit.addEventListener('click', () => {
        if (isNaN(fullDisplay.value.charAt(fullDisplay.value.length - 1))) {
            calcDisplay.value = ""; //if exp1 has op, reset calcDisplay to prepare for exp2
        }
        calcDisplay.value += digit.innerHTML;
        fullDisplay.value += digit.innerHTML;
    });
};
for (let operator of operators) {
    operator.addEventListener('click', () => {
        if (!exp1) {
            exp1 = Number(calcDisplay.value);
        } else {
            exp2 = Number(calcDisplay.value);
            exp1 = operate(opType, exp1, exp2);
        }
        if (isNaN(fullDisplay.value.charAt(fullDisplay.value.length - 1))) { //if already operator at end, replace
            calcDisplay.value = calcDisplay.value.substring(0, calcDisplay.value.length - 1) + operator.innerHTML;
            fullDisplay.value = fullDisplay.value.substring(0, fullDisplay.value.length - 1) + operator.innerHTML;
        } else {
            calcDisplay.value += operator.innerHTML;
            fullDisplay.value += operator.innerHTML;
        }
        setOpType(operator)
    });
};

equalBtn.addEventListener('click', () => {
    exp2 = Number(calcDisplay.value);
    calcDisplay.value = operate(opType, exp1, exp2);
})
clearBtn.addEventListener('click', () => {
    calcDisplay.value = "";
    fullDisplay.value = "";
    exp1 = "";
    exp2 = "";
})