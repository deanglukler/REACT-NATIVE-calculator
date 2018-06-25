import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native'
import { createStore } from 'redux'

import {
  ButtonsRow,
  SquareButton as SBD,
  RoundButton as RBD,
  ButtonText,
  CirBtnShell,
  SquBtnShell,
  btnCommonStyles,
  RightButtons,
  LeftButtons,
  Buttons,
  Equation,
  Screen,
  Displays,
  Calc,
  StyledText
} from './components'
import { CLEAR_BUTTONS, onButtonClick } from './logic'
import {reducer, updateCalc} from './redux'

// create Store
const store = createStore(reducer)

// Potential performance loses as a new function is created each time it's rendered
const onInputHandler = btn => () => {
  store.dispatch(updateCalc(onButtonClick(btn, store.getState())))
}

const SquareButton = props => <SBD onPress={onInputHandler(props.sym)} {...props} />
const RoundButton = props => <RBD onPress={onInputHandler(props.sym)} {...props} />

export default class App extends Component {
  constructor(props) {
    super(props)
    store.subscribe(this.forceUpdate.bind(this))
  }
  render () {
    const state = store.getState()
    return (
      <Calc>
        <Displays>
          <Screen>
            <StyledText style={{ textAlign: 'right', fontSize: 50 }}>
              {state.currentVal}
            </StyledText>
          </Screen>
          <Equation>
            <StyledText style={{ textAlign: 'right', fontSize: 35 }}>
              {state.equationOutput}
            </StyledText>
          </Equation>
        </Displays>
        <Buttons>
          <LeftButtons>
            <ButtonsRow>
              <SquareButton space sym={CLEAR_BUTTONS.AC} />
              <SquareButton sym={CLEAR_BUTTONS.C} />
            </ButtonsRow>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(sym => (
              <SquareButton sym={sym} key={sym} />
            ))}
            <ButtonsRow>
              <SquareButton space sym={'0'} />
              <SquareButton sym={'.'} />
            </ButtonsRow>
          </LeftButtons>
          <RightButtons>
            {['+', '-', 'x', '/', '='].map(sym => (
              <RoundButton sym={sym} key={sym} />
            ))}
          </RightButtons>
        </Buttons>
      </Calc>
    )
  }
}
