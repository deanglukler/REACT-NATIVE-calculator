import {init} from './logic'

const UPDATE = 'UPDATE'

export const reducer = (state = init, action = {}) => {
  console.log(`-- -- -- Old State -- -- --`)
  console.log(state)
  switch (action.type) {
    case UPDATE: {
      state = {...state}
      // state = Object.assign({}, state)
      break
    }
    default: {
      break
    }
  }
  console.log(`-- -- -- New State -- -- --`)
  console.log(state)
  return state
}

export const updateCalc = calcMem => {
  return {type: UPDATE, calcMem}
}
