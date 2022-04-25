const calcDisplay = document.querySelector("#calcDisplay");
const calcHistory = document.querySelector("#calcHistory");
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
let usingResult = false;

function operate(operator, a, b) {
    switch (operator) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return a / b;
    }
}
function useExp() {
    exp2 = Number(calcDisplay.value);
    exp1 = operate(opType, exp1, exp2);
    exp2 = "";
    choosingOp = false;
    calcDisplay.value = exp1; //allow the use of result as exp1 if operator is chosen after equals
}
function updateCalcScreen() {
    calcDisplay.value = "";
    calcHistory.value = `${exp1} ${opType}`;
}
for (let digit of digits) {
    digit.addEventListener('click', () => {
        if (choosingOp === true) { //if no longer switching ops, prepare display for exp2
            calcDisplay.value = "";
            choosingOp = false;
            finalOp = true;
        }
        if (usingResult) {
            calcDisplay.value += digit.innerHTML;
            return;
        } else if (exp1 && !calcHistory.value) { //don't use result as exp1 if digit is chosen after equals
            exp1 = "";
            calcDisplay.value = "";
        }
        if (digit.innerHTML === "." && calcDisplay.value.includes(".")) {
            return;
        }
        if (digit.innerHTML === "." && calcDisplay.value === "") {
            calcDisplay.value = "0.";
        } else {
            calcDisplay.value += digit.innerHTML;
        }
    });
};
for (let operator of operators) {
    operator.addEventListener('click', () => {
        if (!calcDisplay.value) {
            exp1 = 0;
        }
        if (!opType) {
            exp1 = Number(calcDisplay.value);
        }
        if (finalOp) {
            useExp();
        }
        finalOp = false;
        usingResult = false;
        switch (operator.innerHTML) {
            case "+": opType = "+"; break;
            case "-": opType = "-"; break;
            case "*": opType = "*"; break;
            case "/": opType = "/"; break;
        }
        updateCalcScreen();
        choosingOp = true;
    });
};
equalBtn.addEventListener('click', () => {
    if (!finalOp) return;
    useExp();
    opType = "";
    finalOp = false;
    calcHistory.value = "";
})
function clearAll() {
    calcDisplay.value = "";
    exp1 = "";
    exp2 = "";
    opType = "";
    finalOp = false;
}
clearBtn.addEventListener('click', () => {
    clearAll();
    updateCalcScreen();
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
    usingResult = true;
})