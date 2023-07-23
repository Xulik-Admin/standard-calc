"use strict"

let currentValue = '0', previousValue = '', operator = '', point = false;

const resultLine = document.getElementById('resultLine');
const expressionLine = document.getElementById('expressionLine');

//действия пользователя
let userActions = ['0'];

function inputNumber(number) {

//обнулить значение если, происходит ввод после расчетов
    if(userActions.at(-1) === '='){
        clearAll()
    }

    if(currentValue === '0'){
        if(number === '00'){
            return;
        }
        currentValue = number;
        userActions = [number]
    } else {
        currentValue += number;
        userActions.push(number)
    }
    resultLine.textContent = currentValue;
}

function decimalPoint() {
    if(userActions.at(-1) === '='){
        clearAll()
        currentValue += '.';

        resultLine.textContent = currentValue;
        return;
    }

    if (!point){
        currentValue += '.';
        resultLine.textContent = currentValue;

        userActions.push('.')
        point = true;
    }
}


function inputSign(sign) {
    if(operator && currentValue){
        currentValue = equalsOperator(operator);

        expressionLine.textContent = currentValue + sign;
        resultLine.textContent = currentValue;
        operator = sign;

        userActions.push(sign)
        currentValue = '0';
    } else {
        operator = sign;

        expressionLine.textContent = currentValue + operator;
        previousValue = currentValue;
        currentValue = '0';

        userActions.push(sign)
        point = false;
    }
}

function equals() {
    if(currentValue === '') currentValue = previousValue;

    expressionLine.textContent = previousValue + operator + currentValue + '=';

    equalsOperator(operator);

    if(!operator) {
        resultLine.textContent = currentValue;
    } else {
        resultLine.textContent = previousValue;
    }

    userActions.push('=')
    point = false;
    console.log(userActions)
}

function equalsOperator(operator) {
    if(userActions.at(-1) !== '=' || userActions.at(-2) === '='){
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
            case '':
                previousValue = currentValue;
        }

        addHistory(expressionLine.textContent, previousValue, operator)
    }
    return previousValue;
}

function clearAll() {
    currentValue = '0';
    previousValue = '';
    operator = '';
    userActions = [];
    point = false;

    expressionLine.textContent = '';
    resultLine.textContent = currentValue;
}

function deleteSymbol() {

    if(currentValue.length === 1){
        currentValue = '0'
    }

    if(currentValue.length > 1){
        currentValue = currentValue.slice(0, -1);
    }

    resultLine.textContent = currentValue;
}

const history = document.getElementById('history-calculator');

function addHistory(expression, result, sing, current) {
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