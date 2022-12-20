import { FC } from "react";
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

const BottomSheetHeader: FC = () => {
  return (
    <Wrapperper>
      <Handle />
    </Wrapperper>
  );
};

export default BottomSheetHeader;