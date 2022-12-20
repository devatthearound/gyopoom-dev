import styled from "styled-components"

type Props = {
    isOpen: boolean;
    children: React.ReactChild
}

const PrivateModal: React.FC<Props> = ({ isOpen, children }) => {

    return (
        <>
            <Wrapperper isOpen={isOpen}>
                <Conatiner>
                    {children}
                </Conatiner>
            </Wrapperper>
        </>
    )
}

const Wrapperper = styled.div<{ isOpen: boolean }>`
    display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: rgb(20,20,20, 0.6);
`

const Conatiner = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export default PrivateModal