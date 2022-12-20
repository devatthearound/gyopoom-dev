import FillButton from '@components/FillButton';
import FillMediumButton from '@components/FillMediumButton';
import Typography from '@components/Typograpy';
import { theme } from '@styles/theme';
import { style1 } from '@utils/theme/button/style1';
import { style4 } from '@utils/theme/button/style4';
import { style7 } from '@utils/theme/button/style7';
import React, { useState, useEffect, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import styled from 'styled-components';

const CanvasWrapperper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px dashed ${theme.color.N60};
  border-radius: 0.8rem;
  background-color: ${theme.color.N10};
  overflow: hidden;
`;

const CanvasPlaceholder = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
`;

type Props = {
    getSignature: (signature: string) => Promise<boolean>;
}

const Signature: React.FC<Props> = ({ getSignature }) => {
    const canvasRef = useRef<any>(null);
    const canvasWrapperRef = useRef<any>(null);
    const [isSigned, setIsSigned] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [width, setWidth] = useState<number>(0);


    const handleSubmit = async () => {
        setLoading(true);
        const res = await getSignature(canvasRef.current.getCanvas())

        if (res) {

            setLoading(false);
        }
    }

    useEffect(() => {
        setWidth(canvasWrapperRef.current.width)
    }, [canvasWrapperRef.current])

    return (
        <>
            <CanvasWrapperper ref={canvasWrapperRef}>
                {!isSigned && (
                    <CanvasPlaceholder>
                        <Typography.P200M color={theme.color.N60}>
                            여기에 서명을 해주세요.
                        </Typography.P200M>
                    </CanvasPlaceholder>
                )}
                <SignatureCanvas
                    ref={canvasRef}
                    canvasProps={{ width: width, height: "160px" }}
                    onBegin={() => {
                        setIsSigned(true);
                    }}
                />
            </CanvasWrapperper>
            <div style={{ marginTop: "0.8rem", textAlign:"left" }}>
                <FillMediumButton
                    id="remove-button"
                    label="모두 지우기"
                    disabled={loading}
                    handleOnClick={() => {
                        canvasRef.current.clear(); // 리셋
                        setIsSigned(false);
                    }}
                    {...style7} />
            </div>
            <div style={{ marginTop: "4rem", }}>
                <FillButton
                    id="submit-button"
                    label="입력하기"
                    loading={loading}
                    disabled={loading}
                    handleOnClick={handleSubmit}
                    {...style1} />
            </div>
        </>
    );
};

export default Signature;