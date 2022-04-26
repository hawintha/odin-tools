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

function addDigit(digit) {
    if (choosingOp === true) { //no longer switching ops, prepare display for exp2
        calcDisplay.value = "";
        choosingOp = false;
        finalOp = true;
    }
    if (usingResult) {
        calcDisplay.value += digit;
        return;
    } else if (exp1 && !calcHistory.value) { //don't use result as exp1 if digit is chosen after equals
        exp1 = "";
        calcDisplay.value = "";
    }
    if (digit === "." && calcDisplay.value.includes(".")) {
        return;
    }
    if (digit === "." && calcDisplay.value === "") {
        calcDisplay.value = "0.";
    } else {
        calcDisplay.value += digit;
    }
}
function addOp(op) {
    if (!calcDisplay.value && !choosingOp) {
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
    opType = op;
    updateCalcScreen();
    choosingOp = true;
}
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
    calcDisplay.value = exp1;
}
function updateCalcScreen() {
    calcDisplay.value = "";
    calcHistory.value = `${exp1} ${opType}`;
}
function showResult() {
    if (!finalOp) return;
    useExp();
    opType = "";
    finalOp = false;
    calcHistory.value = "";
}
function clearAll() {
    exp1 = "";
    exp2 = "";
    opType = "";
    choosingOp = false;
    finalOp = false;
    updateCalcScreen();
}
function delChar() {
    calcDisplay.value = calcDisplay.value.substring(0, calcDisplay.value.length - 1);
    usingResult = true;
}

for (const digit of digits) {
    digit.addEventListener('click', e => {
        addDigit(e.target.innerText);
    });
}
for (const operator of operators) {
    operator.addEventListener('click', e => {
        addOp(e.target.innerText);
    });
}
window.addEventListener('keydown', e => {
    for (const digit of digits) {
        if (e.key === digit.innerText) {
            addDigit(e.key);
        }
    }
    for (const operator of operators) {
        if (e.key === operator.innerText) {
            addOp(e.key);
        }
    }
    if (e.key === 'Escape') {
        clearAll();
    } else if (e.key === 'Backspace') {
        delChar();
    } else if (e.key === 'Enter' || e.key === '=') {
        showResult();
    }
});

equalBtn.addEventListener('click', () => {
    showResult();
});
clearBtn.addEventListener('click', () => {
    clearAll();
});
signBtn.addEventListener('click', () => {
    if (!calcDisplay.value) {
        return;
    } else if (calcDisplay.value > 0) {
        calcDisplay.value = -Math.abs(calcDisplay.value);
    } else {
        calcDisplay.value = Math.abs(calcDisplay.value);
    }
});
delBtn.addEventListener('click', () => {
    delChar();
});