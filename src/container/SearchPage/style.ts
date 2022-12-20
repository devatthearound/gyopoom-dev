import Flex from "@components/Flex"
import { theme } from "@styles/theme"
import styled from "styled-components"
import SearchIcon from "@images/icons/search.svg"
import CancelIcon from "@images/icons/cancel.svg"
import BackIcon from "@images/icons/keyboard_arrow_left.svg"

export const ResultBox = styled.div`
    padding: 0 2rem;
    overflow: scroll;
    background-color: ${theme.color.N0};
    ::-webkit-scrollbar {
        width: 0px;
    }
`

export const HeaderNavigationWrapper = styled.div`
    z-index: 99;
    width:100%;
`
export const Wrapper = styled.div`
    position: relative;
    height: 4.8rem;
`

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4.8rem;
    padding: 0 2rem 0 1.6rem;
    border-bottom: 1px solid ${theme.color.N40};
`

export const InputWarp = styled(Flex)`
    flex: 1;
    align-items: center;
    justify-content: space-between;
    padding: 0.6rem 1rem;
    background-color: ${theme.color.N20};
    border-radius: 0.8rem;
    border: 0px;
`

export const Input = styled.input`
    border: 0px;
    background-color: ${theme.color.N20};
`
export const Form = styled.form`
    flex: 1px;
`

export const SearchButton = styled.button`
    width: 2.4rem;
    height: 2.4rem;
    background: url(${SearchIcon}) no-repeat center;
    background-size: 100%;
    border: 0px;
    cursor: pointer;
`
export const CancelButton = styled.button`
    width: 2.4rem;
    height: 2.4rem;
    background: url(${CancelIcon}) no-repeat center;
    background-size: 100%;
    border: 0px;
    cursor: pointer;
`
export const GotoBackButton = styled.button`
    width: 2.4rem;
    height: 2.4rem;
    margin-right: 1rem;
    background: url(${BackIcon}) no-repeat center;
    background-size: 100%;
    border: 0px;  
    cursor: pointer; 
`