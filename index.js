let currentValue = '', previousValue = '', operator = '', counted = false;

const resultLine = document.getElementById('resultLine');
const expressionLine = document.getElementById('expressionLine');

function inputNumber(number) {

    //обнулить значение если, происходит ввод после расчетов
    if(counted){
        clearAll()
    }

    currentValue += number;
    resultLine.textContent = currentValue;
}


function inputSign(sign) {

    //если пример продолжается считаться после первого действия
    if(previousValue !== ''){
        currentValue = previousValue;
    }

    switch (sign) {

        case '﹢':
            operator = '﹢';
            break;

        case '﹣':
            operator = '﹣';
            break;

        case '×':
            operator = '×';
            break;

        case '÷':
            operator = '÷';
            break;
    }

    expressionLine.textContent = currentValue + operator;
    previousValue = currentValue;
    currentValue = ''

}

function equals() {
    if(currentValue === '') currentValue = previousValue;

    expressionLine.textContent = previousValue + operator + currentValue + '=';

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
    }

    resultLine.textContent = previousValue;
    counted = true;
}

function clearResultLine() {
    currentValue = '';

    resultLine.textContent = '0';
}
function clearAll() {
    currentValue = '';
    previousValue = '';
    operator = '';
    counted = '';

    expressionLine.textContent = '';
    resultLine.textContent = '0';
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