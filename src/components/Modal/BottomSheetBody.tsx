import ResetButton from "@components/ResetButton";
import Typography from "@components/Typograpy";
import { theme } from "@styles/theme";
import React, { FC } from "react";
import styled from "styled-components";

const Wrapperper = styled.div`
  height: 48px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  position: relative;
  padding-top: 16px;
  padding-bottom: 4px;
`;

const Handle = styled.div`
  width: 32px;
  height: 4px;
  border-radius: 2px;
  background-color: #d0d0d0;
  margin: auto;
`;

type Props = {
  id: string;
  label: string
  changeFC: any
}

const BottomSheetBody: FC<Props> = ({ id, label, changeFC }) => {
  const handlerChangeFC = async () => {
    await changeFC(id)
  }
  
  return (
    <Item>
      <ResetButton handleOnClick={handlerChangeFC}>
        <Typography.P200
          color={theme.color.N900}>
          {label}
        </Typography.P200>
      </ResetButton>
    </Item>
  );
};


const Item = styled.li`
    text-align: center;
    padding: 1.6rem 0;
    border-top: 0.5px solid ${theme.color.N40};
    :first-child{
        border-top: 0px;
    }
`

export default BottomSheetBody;