// -   -   -   -   Variables   -   -   -   -
const CLEAR_BUTTONS = {
  AC: 'AC',
  C: 'C'
}

let calcMem = {}

// -   -   -   -   Helpers   -   -   -   -

const clearCalc = () => {
  calcMem = {
    runningSum: null,
    equation: [],
    currentVal: null,
    currentOperator: null,
    messy: false
  }
}

const refreshInputScreen = () => {
  const input = document.getElementById('inputScreen')
  input.value = calcMem.currentVal || ''
}

const refreshEquation = () => {
  const display = document.getElementById('equation-display')
  const equation = Array.from(calcMem.equation)
  if (!calcMem.messy && calcMem.runningSum && !calcMem.currentOperator) {
    equation.push(`= ${calcMem.runningSum}`)
  }
  display.innerHTML = `<p>${equation.join(' ')}</p>`
}

// next time use object deconstruction in the args dummy :)
const el = (type, classes, innerText) => {
  const newElement = document.createElement(type)
  if (classes) {
    newElement.setAttribute('class', classes)
  }
  if (innerText) {
    newElement.innerText = innerText
  }
  return newElement
}

// -   -   -   -   Main Functions   -   -   -   -

const cleanCalc = () => {
  if (calcMem.runningSum === null) {
    calcMem.runningSum = Number(calcMem.currentVal)
  }

  if (!calcMem.currentOperator) {
    calcMem.messy = false
    return
  }

  if (!calcMem.messy) return

  calcMem.currentVal = Number(calcMem.currentVal)
  switch (calcMem.currentOperator) {
    case '+': {
      calcMem.runningSum += calcMem.currentVal
      break
    }
    case '-': {
      calcMem.runningSum -= calcMem.currentVal
      break
    }
    case 'x': {
      calcMem.runningSum *= calcMem.currentVal
      break
    }
    case '/': {
      calcMem.runningSum /= calcMem.currentVal
      break
    }
    default: {
      break
    }
  }
  calcMem.currentVal = calcMem.runningSum.toString()
  calcMem.messy = false
}

const onButtonClick = (e) => {
  const btnClicked = e.target.getAttribute('data-btn')
  const dot = btnClicked === '.'

  if (btnClicked in CLEAR_BUTTONS) {
    switch (btnClicked) {
      case CLEAR_BUTTONS.AC: {
        clearCalc()
        break
      }
      case CLEAR_BUTTONS.C: {
        calcMem.currentVal = calcMem.runningSum
        calcMem.currentOperator = null
        calcMem.messy = false
        break
      }
      default:
        break
    }
  } else if ('+-x/='.includes(btnClicked)) {
    cleanCalc()

    if (btnClicked !== '=') {
      if (calcMem.currentOperator) {
        calcMem.equation[calcMem.equation.length - 1] = btnClicked
      } else {
        calcMem.equation.push(btnClicked)
      }
    }

    calcMem.currentOperator = btnClicked
    if (btnClicked === '=') calcMem.currentOperator = null
  } else {
    if (calcMem.messy) {
      if (dot && calcMem.currentVal.includes('.')) return

      calcMem.currentVal += btnClicked

      calcMem.equation[calcMem.equation.length - 1] = calcMem.currentVal
    } else {
      if (!calcMem.currentOperator) {
        clearCalc()
      }

      if (dot) {
        calcMem.currentVal = '0.'
      } else {
        calcMem.currentVal = btnClicked
      }

      calcMem.equation.push(calcMem.currentVal)
    }
    calcMem.messy = true
  }

  refreshInputScreen()
  refreshEquation()
}

// -   -   -   -   HTML stuffs   -   -   -   -

const btn = (value) => {
  const button = el('div', 'button', value)
  button.setAttribute('data-btn', value)
  button.addEventListener('click', onButtonClick)
  return button
}

const root = document.getElementById('root')
const main = el('div', 'main')
const calculator = el('div', 'calculator')

const mainInputScreen = el('input', 'main-input')
mainInputScreen.setAttribute('id', 'inputScreen')

const equationDisplay = el('div')
equationDisplay.setAttribute('id', 'equation-display')

const clearButtons = el('div', 'clear-buttons')
clearButtons.appendChild(btn(CLEAR_BUTTONS.AC))
clearButtons.appendChild(btn(CLEAR_BUTTONS.C))

const numbers = el('div', 'numbers')
for (let i = 1; i < 10; ++i) {
  numbers.appendChild(btn(`${i}`))
  if (i === 9) {
    numbers.appendChild(btn('0'))
    numbers.appendChild(btn('.'))
  }
}

const operators = el('div', 'operators')
operators.appendChild(btn('+'))
operators.appendChild(btn('-'))
operators.appendChild(btn('x'))
operators.appendChild(btn('/'))
operators.appendChild(btn('='))

main.appendChild(equationDisplay)
root.appendChild(main)
main.appendChild(calculator)
calculator.appendChild(mainInputScreen)
calculator.appendChild(clearButtons)
calculator.appendChild(numbers)
calculator.appendChild(operators)

// -   -   -   -   Run The Script!   -   -   -   -
clearCalc()
refreshInputScreen()
