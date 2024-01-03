let calculation = '';
let numbers = [''];
let operators = [];

let calcHistory = [''];

const tooltip = document.querySelector('.history-tooltip');


function toggleHistory () {
  if (tooltip.classList.contains('history-tooltip-toggled')) {
    tooltip.classList.remove('history-tooltip-toggled');
  }
  tooltip.innerHTML = tooltip.innerHTML.trimEnd();
}

calculationText = document.querySelector('.calculation-text');

// Display the current number or 0 if numbers array is empty
function updateDisplay() {
  calculationText.innerHTML = numbers.length > 0 ? Number(numbers[numbers.length - 1]).toString() : '0';
}

updateDisplay(); // Call updateDisplay initially

function updateNumber(number) {
  turnOffButton();
  toggleHistory();
  if (numbers[numbers.length - 1].length < 7) {
    calculationText.style.fontSize = '64px';
    calculationText.style.top = '90px';
  } else if ((numbers[numbers.length - 1].length === 8)) {
    calculationText.style.fontSize = '58px';
    calculationText.style.top = '96px';
  } else if (numbers[numbers.length - 1].length === 9) {
    calculationText.style.fontSize = '52px';
    calculationText.style.top = '102px';
  } else if (numbers[numbers.length - 1].length > 9){
    return;
  }

  if (number === '0' && numbers[numbers.length - 1] === '0' && !numbers[numbers.length - 1].includes('.') && !operators[operators.length - 1]) {
    return;
  }

  numbers[numbers.length - 1] += number;
  calculation += number;

  if  (numbers[numbers.length - 1].includes('.')) {
    calculationText.innerHTML = (numbers[numbers.length - 1]);
  } else {
    calculationText.innerHTML = Number(numbers[numbers.length - 1]).toLocaleString('en-US');
  }

  document.querySelector('.clear').innerHTML = 'C';
}

function updateOperator(operator) {
  toggleHistory();
  if (operators[operators.length - 1] && numbers[numbers.length - 1] === '') {
    if (operators[operators.length - 1] === operator) {
      operators.splice(operators.length - 1, 1);
      numbers.splice(numbers.length - 1, 1);
      updateCalculation();
    } else {
      operators[operators.length - 1] = operator;
      updateCalculation();
    }
  } else if (!operators[0] && numbers[0] === '') {
      operators[0] = operator;
      calculation = `0${operator}`;
      numbers[0] = '0';
      numbers.push('');
  } else {
      operators.push(operator);
      numbers.push('');
      calculation += operator;
  }

  const num1 = Number(numbers[0]);
  const num2 = Number(numbers[1]);
  const num3 = Number(numbers[2]);
  const op1 = operators[0];
  const op2 = operators[1];

  if (numbers.length === 4) {
    if (operators[0] === ' + ' || operators[0] === ' - ') {
      let secondNumber = new Decimal(numbers[1]);
      let lastNumber = new Decimal(numbers[2]);
      if (operators[1] === ' * ') {
        let product = secondNumber.mul(lastNumber);
        calculation = `${numbers[numbers.length - 4]}${operators[operators.length - 3]}${product}`;

        let firstNumber = new Decimal(numbers[0]);
        if (operators[0] === ' + ') {
          calculation = firstNumber.add(product);
        } else if (operators[0] === ' - ') {
          calculation = firstNumber.minus(product);
        }
        
        if (operators[2] === ' * ' || operators[2] === ' / ') {
          numbers[3] = product;
          calculationText.innerHTML = Number(numbers[3]).toLocaleString('en-US');
          const answer = Number(numbers[3]); 
          calcHistory[calcHistory.length - 1] = `${num1.toLocaleString('en-US')}${op1}${num2.toLocaleString('en-US')}${op2}${num3.toLocaleString('en-US')}  ... = ${num1.toLocaleString('en-US')}${op1}${answer.toLocaleString('en-US')} ...`;
          calcHistory.push('');
          operators = [operators[0], operators[2]];
          numbers = [numbers[0], numbers[3]];
          calculation = `${numbers[2]}${operators[1]}${numbers[3]}${operators[2]}`;
          numbers.push('');
          return;
        } else if (operators[2] === ' + ' || operators[2] === ' - ') {
          const answer = Number(calculation); 
          calcHistory[calcHistory.length - 1] = `${num1.toLocaleString('en-US')}${op1}${num2.toLocaleString('en-US')}${op2}${num3.toLocaleString('en-US')} = ${answer.toLocaleString('en-US')}`;
          calcHistory.push('');

          numbers = [calculation.toString(), ''];
          operators = [operators[2]];
        }

      } else if (operators[1] === ' / ') {
        let quotient = secondNumber.dividedBy(lastNumber);
        calculation = `${numbers[0]}${operators[2]}${quotient}`;
        let firstNumber = new Decimal(numbers[0]);

        if (operators[2] === ' + ') {
          calculation = firstNumber.add(quotient);
        } else if (operators[2] === ' - ') {
          calculation = firstNumber.minus(quotient);
        } 
        
        if (operators[operators.length - 1] === ' * ' || operators[operators.length - 1] === ' / ') {
          numbers[numbers.length - 1] = quotient;
          calculationText.innerHTML = Number(numbers[numbers.length - 1]).toLocaleString('en-US');
          const answer = Number(numbers[3]); 
          calcHistory[calcHistory.length - 1] = `${num1.toLocaleString('en-US')}${op1}${num2.toLocaleString('en-US')}${op2}${num3.toLocaleString('en-US')}... = ${num1.toLocaleString('en-US')}${op1}${answer.toLocaleString('en-US')}...`;
          calcHistory.push('');
          operators = [operators[0], operators[2]];
          numbers = [numbers[0], numbers[3]];
          calculation = `${numbers[2]}${operators[1]}${numbers[3]}${operators[2]}`;
          numbers.push('');
          return;
        } else if (operators[2] === ' + ' || operators[2] === ' - ') {
          const answer = Number(calculation); 
          calcHistory[calcHistory.length - 1] = `${num1.toLocaleString('en-US')}${op1}${num2.toLocaleString('en-US')}${op2}${num3.toLocaleString('en-US')} = ${answer.toLocaleString('en-US')}`;
          calcHistory.push('');
        }
      }
    } 
  } else if (numbers.length === 3 && (operators[0] === ' / ' || operators[0] === ' * ') || ((operators[0] === ' + ' || operators[0] === ' - ') && (operators[1] === ' + ' || operators[1] === ' - '))) {
    let firstNumber  = new Decimal(numbers[0]);
    let secondNumber = new Decimal(numbers[1]);
    if (operators[0] === ' + ') {
      let sum = firstNumber.add(secondNumber);
      const answer = Number(sum); 
      calcHistory[calcHistory.length - 1] = `${num1.toLocaleString('en-US')}${op1}${num2.toLocaleString('en-US')}${op2}... = ${answer.toLocaleString('en-US')}${op2}...`;
      calcHistory.push('');

      calculationText.innerHTML = Number(sum).toLocaleString('en-US');
      numbers = [sum, ''];
      operators = [operators[1]];
      calculation = `${sum}${operators[0]}`;
    } else if (operators[0] === ' - ') {
      let diff = firstNumber.minus(secondNumber);
      const answer = Number(diff); 
      calcHistory[calcHistory.length - 1] = `${num1.toLocaleString('en-US')}${op1}${num2.toLocaleString('en-US')}${op2}... = ${answer.toLocaleString('en-US')}${op2}...`;
      calcHistory.push('');

      calculationText.innerHTML = Number(diff).toLocaleString('en-US');
      numbers = [diff, ''];
      operators = [operators[1]];
      calculation = `${diff}${operators[0]}`;
    } 
    
      else if (operators[0] === ' * ') {
      let product = firstNumber.mul(secondNumber);
      const answer = Number(product); 
      calcHistory[calcHistory.length - 1] = `${num1.toLocaleString('en-US')}${op1}${num2.toLocaleString('en-US')}${op2}... = ${answer.toLocaleString('en-US')}${op2}...`;
      calcHistory.push('');

      calculationText.innerHTML = Number(product).toLocaleString('en-US');
      numbers = [String(product), ''];
      operators = [operators[1]];
      calculation = `${product}${operators[0]}`;
    } else if (operators[0] === ' / ') {
      let quotient = firstNumber.dividedBy(secondNumber);
      const answer = Number(quotient); 
      calcHistory[calcHistory.length - 1] = `${num1.toLocaleString('en-US')}${op1}${num2.toLocaleString('en-US')}${op2}... = ${answer.toLocaleString('en-US')}${op2}...`;
      calcHistory.push('');

      calculationText.innerHTML = Number(quotient).toLocaleString();
      numbers = [String(quotient), ''];
      operators = [operators[1]];
      calculation = `${quotient}${operators[0]}`; // *** unnecessary? ***
    } 
    checkResultLength(numbers[0]);

    tooltip.innerHTML = '';

    const button = document.createElement('button');
    button.innerText = 'Clear';
    button.id = 'history-clear-button';
    tooltip.appendChild(button);

    for (let i = 0; i < calcHistory.length; i++) {
      if (i !== 0) {
        tooltip.innerHTML += `\n${calcHistory[i]}\n`;
      } else {
        tooltip.innerHTML += `${calcHistory[i]}\n`;
      }
    }
    return;
  }  
}

function calculate() {
  turnOffButton();
  const num1 = Number(numbers[0]);
  const num2 = Number(numbers[1]);
  const num3 = Number(numbers[2]);
  const op1 = operators[0];
  const op2 = operators[1];

  if (calculation) {
    if (operators.length === 1) {
      if (numbers.length === 2 && numbers[1]==='') {
        let number = new Decimal(numbers[0]);
        if (operators[0] === ' + ') {
          calculation = Number(number.mul(2));
        } else if (operators[0] === ' - ') {
          calculation = '0';
        } else if (operators[0] === ' * ') {
          calculation = Number(number.toPower(2));
        } else if (operators[0] === ' / ') {
          calculation = '1';
        }
        const answer = Number(calculation); 
        calcHistory[calcHistory.length - 1] = `${num1.toLocaleString('en-US')}${op1}${num1.toLocaleString('en-US')} = ${answer.toLocaleString('en-US')}`;
        calcHistory.push('');
      } else if (numbers.length === 2) {
        let firstNumber = new Decimal(numbers[numbers.length - 2]);
        let secondNumber = new Decimal(numbers[numbers.length - 1]);
        if (operators[0] === ' + ') {
          let sum = firstNumber.add(secondNumber);
          calculation = Number(sum);
        } else if (operators[0] === ' - ') {
          let difference = firstNumber.minus(secondNumber);
          calculation = Number(difference);
        } else if (operators[0] === ' * ') {
          let product = firstNumber.mul(secondNumber);
          calculation = Number(product);
        } else if (operators[0] === ' / ') {
          let quotient = firstNumber.dividedBy(secondNumber);
          calculation = Number(quotient);
        } 
        const answer = Number(calculation); 
        calcHistory[calcHistory.length - 1] = `${num1.toLocaleString('en-US')}${op1}${num2.toLocaleString('en-US')} = ${answer.toLocaleString('en-US')}`;
        calcHistory.push('');
      } 
    } else if (numbers.length === 3) {
        if (operators[operators.length - 2] === ' + ' || operators[operators.length - 2] === ' - ') {
          let firstNumber = new Decimal(numbers[numbers.length - 3]);
          let secondNumber = new Decimal(numbers[numbers.length - 2]);
          let lastNumber = new Decimal(numbers[numbers.length - 1]);
          if (operators[operators.length - 1] === ' * ') {
            let product = (secondNumber.mul(lastNumber));
    
            if (operators[operators.length - 2] === ' + ') {
              calculation = firstNumber.add(product);
            } else if (operators[operators.length - 2] === ' - ') {
              calculation = firstNumber.minus(product);
            } 
          } else if (operators[operators.length - 1] === ' / ') {
            let quotient = secondNumber.dividedBy(lastNumber);
            if (operators[operators.length - 2] === ' + ') {
              calculation = firstNumber.add(quotient);
            } else if (operators[operators.length - 2] === ' - ') {
              calculation = firstNumber.minus(quotient);
            } 
          } 
        } 
        const answer = Number(calculation); 
        calcHistory[calcHistory.length - 1] = `${num1.toLocaleString('en-US')}${op1}${num2.toLocaleString('en-US')}${op2}${num3.toLocaleString('en-US')} = ${answer.toLocaleString('en-US')}`;
        calcHistory.push('');
      } 
    } else return;

  numbers = [String(calculation)];
  operators = [];

  if (calculation.toString() === 'Infinity' || calculation === 'NaN') {
    calculationText.innerHTML = 'Undefined';
  } else {
    calculationText.innerHTML = Number(calculation).toLocaleString('en-US');
  }

  checkResultLength(numbers[numbers.length - 1]);

  tooltip.innerHTML = '';

  const button = document.createElement('button');
  button.innerText = 'Clear';
  button.id = 'history-clear-button';
  tooltip.appendChild(button);
  

  for (let i = 0; i < calcHistory.length; i++) {
    if (i !== 0) {
      tooltip.innerHTML += `\n${calcHistory[i]}\n`;
    } else {
      tooltip.innerHTML += `${calcHistory[i]}\n`;
    }
  }

}

function handleKeydown(key) {
  if (Number(key) || key === '0') {
    updateNumber(key);
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    updateOperator(` ${key} `);
    if (key === '+') {
      toggleButton('add');
    } else if (key === '-') {
      toggleButton('minus');
    } else if (key === '*') {
      toggleButton('multiply');
    } else {
      toggleButton('divide');
    }
  } else if (key === '=') {
    calculate();
  } else if (key === '%') {
    convertToPercent();
  } else if (key === 'C') {
    clearDisplay();
  } else if (key === '_') {
    negativeNumber();
  } else if (key === '.') {
    addDecimal();
  }
}

function clearDisplay() {
  toggleHistory();
  if (calculationText.innerHTML === '0') {
    calculation = '';
    numbers = [''];
    operators = [];
    turnOffButton();
  }

  if (document.querySelector('.clear').innerHTML === 'C') {
    if (numbers.length === 1) {
      calculation = '';
      numbers = [''];
      operators = [];
    } else {
      numbers[numbers.length - 1] = '';
      updateCalculation();
      turnOffButton();
    }
  } 
  document.querySelector('.js-calculation').innerHTML = 0;

  if ((numbers.length === 2 && numbers[numbers.length - 1] === '') || calculationText.innerHTML === '0') {
    document.querySelector('.clear').innerHTML = 'AC';
  }
}

function updateCalculation() {
  calculation = '';
    for (let i = 0; i < numbers.length; i++) {
      calculation += numbers[i];
      if (i + 1 <= operators.length){
        calculation += operators[i];
      }
    }
}

function checkResultLength(result) {
  if (String(result).length < 7) {
    calculationText.style.fontSize = '64px';
    calculationText.style.top = '90px';
  } else if (String(result).length === 8) {
    calculationText.style.fontSize = '58px';
    calculationText.style.top = '96px';
  } else if (String(result).length === 9 || String(result).length === 10) {
    calculationText.style.fontSize = '52px';
    calculationText.style.top = '102px';
  } else if (String(result).length > 10) {
    result = Number(result).toExponential(4);
    calculationText.innerHTML = result;
    calculationText.style.fontSize = '54px';
    calculationText.style.top = '102px';
  }
}

function convertToPercent() {
  toggleHistory();
  let lastNum = new Decimal(numbers[numbers.length - 1]);
  let lastOperator = operators[operators.length - 1];
  if ((numbers.length === 1 && lastNum !== '') || (lastOperator === ' * ' || lastOperator === ' / ')) {

    lastNum = lastNum.dividedBy(100);
    numbers[numbers.length - 1] = lastNum.toString();
    
    updateCalculation();
    updateDisplay();
  } else if (lastOperator === ' + ' || lastOperator === ' - ') {
    let firstNum = new Decimal(numbers[numbers.length - 2]);

    lastNum = Decimal.mul(lastNum.dividedBy(100), firstNum);

    numbers[numbers.length - 1] = lastNum.toString();

    updateCalculation();
    updateDisplay();
  }
  if (String(numbers[numbers.length - 1]).length > 9) {
    numbers[numbers.length - 1] = Number(numbers[numbers.length - 1]).toExponential(3);
    calculationText.innerHTML = numbers[numbers.length - 1];
  }
}

function negativeNumber() {
  toggleHistory();
  if (numbers[numbers.length - 1] !== 0) {
    numbers[numbers.length - 1] *= -1;
    numbers[numbers.length - 1] = numbers[numbers.length - 1].toString();
    updateCalculation();
    calculationText.innerHTML = numbers[numbers.length - 1].toLocaleString('en-US');
    checkResultLength(calculationText.innerHTML);
  }
}

function addDecimal() {
  toggleHistory();
  if (!numbers[numbers.length - 1].includes('.')) {
    if (numbers[numbers.length - 1] !== '') {
      calculation += '.'
      numbers[numbers.length - 1] += '.';
    } else {
      numbers[numbers.length - 1] = '0.';
      calculation += numbers[numbers.length - 1];
    }
    calculationText.innerHTML = numbers[numbers.length - 1];

    document.querySelector('.clear').innerHTML = 'C';
  }
}

function toggleButton(description) {
  const buttonElement = document.querySelector(`.js-${description}-button`); 

  if (buttonElement.classList.contains('is-toggled')) {
    buttonElement.classList.remove('is-toggled');
  } else {
    turnOffButton();
    buttonElement.classList.add('is-toggled');
  }
}

function turnOffButton() {
  const previousButton = document.querySelector('.is-toggled');

  if (previousButton) {
    previousButton.classList.remove('is-toggled');
  }
}

window.onerror = function() {
  calculationText.innerHTML = 'Error';
}
