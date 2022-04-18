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
        case "addition":
            return add(num1, num2);
        case "subtraction":
            return subtract(num1, num2);
        case "multiplication":
            return multiply(num1, num2);
        case "division":
            return divide(num1, num2);
    }
}

const calcDisplay = document.querySelector("#calcDisplay");
const fullDisplay = document.querySelector("#fullDisplay");

const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const clearBtn = document.querySelector("#clear");
const equalBtn = document.querySelector("#equals");

for (let digit of digits) {
    digit.addEventListener('click', () => {
        calcDisplay.value += digit.innerHTML;
        fullDisplay.value = calcDisplay.value;
    })
};
for (let operator of operators) {
    operator.addEventListener('click', () => {
        if (isNaN(calcDisplay.value.charAt(calcDisplay.value.length - 1))) { //if already operator, replace
            calcDisplay.value = calcDisplay.value.substring(0, calcDisplay.value.length - 1) + operator.innerHTML;
            fullDisplay.value = calcDisplay.value;
        } else {
            calcDisplay.value += operator.innerHTML
            fullDisplay.value = calcDisplay.value;
        }
    })
};
clearBtn.addEventListener('click', () => {
    calcDisplay.value = "";
    fullDisplay.value = "";
})