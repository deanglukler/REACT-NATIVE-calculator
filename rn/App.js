/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";
import styled from "styled-components";

const paddingHorz = 10;
let { width: devWidth, height: devHeight } = Dimensions.get("window");
devWidth -= paddingHorz * 2;
const paddingUnit = 5; // adjust this for all spacing preferences
const btnSize = (devWidth - paddingUnit * 3) / 4;

const palette = {
  buttonTxt: '#969595',
}

const bgAndBorder = `
  background: #484848;
  border-color: #969595;
  border-radius: 2;
  border-width: 2;
`;

const StyledText = styled.Text`
  font-size: 20;
  color: pink;
`;

const Calc = styled.View`
  background: #272727;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-vertical: 23;
  padding-horizontal: ${paddingHorz};
`;

const Displays = styled.View`
  flex: 200;
  width: 100%;
`;
const Screen = styled.View`
  ${bgAndBorder};
  width: 100%;
  margin-bottom: 20;
  height: 80;
  justify-content: center;
`;
const Equation = styled.View`
  ${bgAndBorder};
`;
const Buttons = styled.View`
  flex-flow: row;
  justify-content: space-between;
  width: ${devWidth};
  height: ${devWidth * (5 / 4)};
`;
const LeftButtons = styled.View`
  width: ${devWidth * (3 / 4) - paddingUnit / 2};
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
`;
const ButtonsRow = styled.View`
  width: 100%;
  flex-flow: row;
`;
const RightButtons = styled.View`
  width: ${devWidth / 4 - paddingUnit / 2};
  justify-content: space-between;
`;
const btnCommonStyles = `
  justify-content: center;
  align-items: center;
`
const SquBtnShell = styled.View`
  ${bgAndBorder}
  ${btnCommonStyles}
  width: ${btnSize};
  height: ${btnSize};
  margin-right: ${props => (props.space ? paddingUnit : 0)};
`;
const CirBtnShell = styled.View`
  ${btnCommonStyles}
  ${bgAndBorder} 
  border-radius: 50;
  height: ${btnSize};
`;
const ButtonText = styled.Text`
  color: ${palette.buttonTxt};
  font-size: 30;
`

const btnNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const btnEquators = ["+", "-", "x", "/", "="];

const SquareButton = props => {
  return (
    <SquBtnShell space={props.space}>
      <ButtonText>{props.sym}</ButtonText>
    </SquBtnShell>
  );
};
const RoundButton = props => {
  return (
    <CirBtnShell>
      <ButtonText style={{transform: [ { translateY: -2}]}}>{props.sym}</ButtonText>
    </CirBtnShell>
  );
};

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Calc>
        <Displays>
          <Screen>
            <StyledText style={{ textAlign: "right", fontSize: 50 }}>
              123.54444
            </StyledText>
          </Screen>
          <Equation>
            <StyledText style={{ textAlign: "right", fontSize: 35 }}>
              2 + 4 + 5 = 123.54444
            </StyledText>
          </Equation>
        </Displays>
        <Buttons>
          <LeftButtons>
            <ButtonsRow>
              <SquareButton space sym={"AC"} />
              <SquareButton sym={"C"} />
            </ButtonsRow>
            {btnNumbers.map(sym => <SquareButton sym={sym} key={sym} />)}
            <ButtonsRow>
              <SquareButton space sym={"0"} />
              <SquareButton sym={"."} />
            </ButtonsRow>
          </LeftButtons>
          <RightButtons>
            {btnEquators.map(sym => <RoundButton sym={sym} key={sym} />)}
          </RightButtons>
        </Buttons>
      </Calc>
    );
  }
}
