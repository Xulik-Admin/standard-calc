"use strict"

let currentValue = '';
let previousValue = '';
let operator = '';
let point = false;

const resultLine = document.getElementById('resultLine');
const expressionLine = document.getElementById('expressionLine');

//действия пользователя
let userActions = [];

function inputNumber(number) {
    if(userActions.at(-1) === '='){
        clearAll();
    }

    if(number === '0' || number === '00') {
        if(currentValue === '') {
            return;
        }
    }

    currentValue += number;

    resultLine.textContent = currentValue;

    userActions.push(number);
}

function decimalPoint() {
    if(userActions.at(-1) === '='){
        clearAll();
    }

    if(!point){
        if(currentValue === '') {
            currentValue += 0;

            userActions.push('0')
        }

        currentValue += '.';
        point = true;

        resultLine.textContent = currentValue;

        userActions.push('.')
    }
}

function inputSign(sign) {
    //если после '=' нажили один из операторов
    if(operator && currentValue && userActions.at(-1) === '=') {
        operator = sign;

        expressionLine.textContent = previousValue + operator;
    }
    //если нажимаются только операторы, автоматически считает
    else if(operator && currentValue && previousValue) {
        currentValue = equalsOperator(operator);

        operator = sign;

        expressionLine.textContent = currentValue + operator;
        resultLine.textContent = currentValue;
    }
    //если меняются операторы после введения первого значения
    else if(operator && previousValue) {
        operator = sign;

        expressionLine.textContent = previousValue + operator;
    } else {
        previousValue = currentValue;

        operator = sign;

        expressionLine.textContent = previousValue + operator;
    }

    currentValue = '';
    point = false;

    userActions.push(sign)
}

function equals() {
    //написание '23 + ='
    if(currentValue === '') {
        currentValue = previousValue;
    }

    expressionLine.textContent = previousValue + operator + currentValue + '=';
    resultLine.textContent = equalsOperator(operator);

    point = false;

    userActions.push('=');

    console.table(userActions)
}

function equalsOperator(operator) {
    switch (operator) {
        case '﹢':
            previousValue = +previousValue + +currentValue;
            break;

        case '﹣':
            previousValue = +previousValue - +currentValue;
            break;

        case '×':
            previousValue = +previousValue * +currentValue;
            break;

        case '÷':
            previousValue = +previousValue / +currentValue;
            break;

        case '%':
            previousValue = +previousValue * (+currentValue * 0.01);
            break;
           //для коректной обработки '23 ='
        case '':
            previousValue = currentValue;
            break;
    }

    addHistory(expressionLine.textContent, previousValue, operator)

    return previousValue;
}

function clearAll() {
    currentValue = '';
    previousValue = '';
    operator = '';
    point = false;

    expressionLine.textContent = '';
    resultLine.textContent = '0';

    userActions = [];
}

function deleteSymbol() {

    if(currentValue.length === 1){
        currentValue = '';

        resultLine.textContent = '0';
    }

    if(currentValue.length > 1){
        currentValue = currentValue.slice(0, -1);

        resultLine.textContent = currentValue;
    }
}

const history = document.getElementById('history-calculator');

function addHistory(expression, result, sing) {
    const button = document.createElement('div');
    const spanExpression = document.createElement('span');
    const spanResult = document.createElement('span');

    button.className = 'history-calculator__button';
    spanExpression.className = 'history-calculator__expression';
    spanResult.className = 'history-calculator__result';

    spanExpression.textContent = expression;
    spanResult.textContent = result;

    button.appendChild(spanExpression);
    button.appendChild(spanResult);

    history.appendChild(button);

    button.addEventListener('click', ()=> {
        expressionLine.textContent = spanExpression.textContent;
        resultLine.textContent = spanResult.textContent;
        operator = sing;
        previousValue = spanResult.textContent;
    })
}

function clearHistory() {
    history.textContent = '';
}