import ResetButton from "@components/ResetButton";
import Typography from "@components/Typograpy";
import { theme } from "@styles/theme";
import { FC } from "react";
import styled from "styled-components";


type Props = {
  id: string;
  label: string
  changeFC: any
}

const BottomSheetBody: FC<Props> = ({ id, label, changeFC }) => {
  return (
    <Item>
      <ResetButton handleOnClick={changeFC}>
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