const calcDisplay = document.querySelector("#calcDisplay");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const clearBtn = document.querySelector("#clear");
const equalBtn = document.querySelector("#equals");
const signBtn = document.querySelector("#sign");
const delBtn = document.querySelector("#backspace");
let exp1;
let exp2;
let opType = "";
let choosingOp = false;
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
}
function useExp() {
    exp2 = Number(calcDisplay.value);
    exp1 = operate(opType, exp1, exp2);
    exp2 = "";
    choosingOp = false;
    calcDisplay.value = exp1;
}
for (let digit of digits) {
    digit.addEventListener('click', () => {
        if (choosingOp === true) { //if no longer switching ops, prepare display for exp2
            calcDisplay.value = "";
            choosingOp = false;
            finalOp = true;
        }
        if (digit.innerHTML === "." && calcDisplay.value === "") {
            calcDisplay.value += 0.;
        } else {
            calcDisplay.value += digit.innerHTML;
        }
    });
};
for (let operator of operators) {
    operator.addEventListener('click', () => {
        if (!calcDisplay.value) {
            return;
        }
        if (!opType) {
            exp1 = Number(calcDisplay.value);
        }
        if (finalOp) {
            useExp();
        }
        finalOp = false;
        switch (operator.innerHTML) {
            case "+": opType = "addition"; break;
            case "-": opType = "subtraction"; break;
            case "*": opType = "multiplication"; break;
            case "/": opType = "division"; break;
        }
        choosingOp = true;
    });
};
equalBtn.addEventListener('click', () => {
    if (!finalOp) {
        return;
    }
    useExp();
    opType = "";
    finalOp = false;
})
clearBtn.addEventListener('click', () => {
    calcDisplay.value = "";
    exp1 = "";
    exp2 = "";
    opType = "";
})
signBtn.addEventListener('click', () => {
    if (!calcDisplay.value) {
        return;
    }
    if (calcDisplay.value > 0) {
        calcDisplay.value = -Math.abs(calcDisplay.value);
    } else {
        calcDisplay.value = Math.abs(calcDisplay.value);
    }
})
delBtn.addEventListener('click', () => {
    calcDisplay.value = calcDisplay.value.substring(0, calcDisplay.value.length - 1);
})