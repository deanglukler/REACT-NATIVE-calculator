// -   -   -   -   Variables   -   -   -   -
export const CLEAR_BUTTONS = {
  AC: 'AC',
  C: 'C'
}

export const init = {
  runningSum: null,
  equation: [],
  equationOutput: null,
  currentVal: null,
  currentOperator: null,
  messy: false
}

// -   -   -   -   Main Functions   -   -   -   -
export const onButtonClick = (btnClicked, calcMem) => {
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

  const dot = btnClicked === '.'

  if (btnClicked in CLEAR_BUTTONS) {
    switch (btnClicked) {
      case CLEAR_BUTTONS.AC: {
        calcMem = init
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
        calcMem = init
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

  // Update the equation that will be output
  const equation = Array.from(calcMem.equation)
  if (!calcMem.messy && calcMem.runningSum && !calcMem.currentOperator) {
    equation.push(`= ${calcMem.runningSum}`)
  }
  calcMem.equationOutput = equation.join(' ')
  return calcMem
}
