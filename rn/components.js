import React from "react";
import { Dimensions, Button } from "react-native";
import styled from "styled-components";

/*
 * Styles + Styled Components
 *  *  *  *   *   *   *   *   *  */
// Calculate the button conntainers based on the screen size
const paddingHorz = 10;
let { width: devWidth } = Dimensions.get("window");
devWidth -= paddingHorz * 2;
const paddingUnit = 5; // adjust this for all spacing preferences
const btnSize = (devWidth - paddingUnit * 3) / 4;

const palette = {
  buttonTxt: "#fff"
};

const bgAndBorder = `
  background: #484848;
  border-color: #969595;
  border-radius: 2;
  border-width: 2;
`;

export const StyledText = styled.Text`
  font-size: 20;
  color: ${palette.buttonTxt};
`;

export const Calc = styled.View`
  background: #272727;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-vertical: 23;
  padding-horizontal: ${paddingHorz};
`;

export const Displays = styled.View`
  flex: 200;
  width: 100%;
`;
export const Screen = styled.View`
  ${bgAndBorder};
  width: 100%;
  margin-bottom: 20;
  height: 80;
  justify-content: center;
`;
export const Equation = styled.View`
  ${bgAndBorder};
  height: 60;
  justify-content: center;
`;
export const Buttons = styled.View`
  flex-flow: row;
  justify-content: space-between;
  width: ${devWidth};
  height: ${devWidth * (5 / 4)};
`;
export const LeftButtons = styled.View`
  width: ${devWidth * (3 / 4) - paddingUnit / 2};
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
`;
export const ButtonsRow = styled.View`
  width: 100%;
  flex-flow: row;
`;
export const RightButtons = styled.View`
  width: ${devWidth / 4 - paddingUnit / 2};
  justify-content: space-between;
`;
export const btnCommonStyles = `
  justify-content: center;
  align-items: center;
`;
export const SquBtnShell = styled.View`
  ${bgAndBorder}
  ${btnCommonStyles}
  width: ${btnSize};
  height: ${btnSize};
  margin-right: ${props => (props.space ? paddingUnit : 0)};
`;
export const CirBtnShell = styled.View`
  ${btnCommonStyles} ${bgAndBorder} 
  border-radius: 50;
  height: ${btnSize};
`;

/*
 * Sub Components
 *  *  *  *   *   *  */
export const SquareButton = props => {
  const { sym, onPress, ...rest } = props;
  return (
    <SquBtnShell {...rest}>
      <Button onPress={onPress} title={sym} color={palette.buttonTxt} />
    </SquBtnShell>
  );
};
export const RoundButton = props => {
  const { sym, onPress, ...rest } = props;
  return (
    <CirBtnShell {...rest}>
      <Button onPress={onPress} title={sym} color={palette.buttonTxt} />
    </CirBtnShell>
  );
};
