import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";

type Props = {
    style?: React.CSSProperties
    color?: string,
    lineHeight?: string,
    margin?: string
}

const Typography = {
    H900: styled.h1<Props>`
        font-size: ${theme.fontSize.H900};
        font-weight: ${theme.fontWeight.Regular};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    H900L: styled.h1<Props>`
        font-size: ${theme.fontSize.H900};
        font-weight: ${theme.fontWeight.Light};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    H900M: styled.h1<Props>`
        font-size: ${theme.fontSize.H900};
        font-weight: ${theme.fontWeight.Medium};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    H900B: styled.h1<Props>`
        font-size: ${theme.fontSize.H900};
        font-weight: ${theme.fontWeight.Bold};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    H900BL: styled.h1<Props>`
        font-size: ${theme.fontSize.H900};
        font-weight: ${theme.fontWeight.BlackBold};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    HE900: styled.h1<Props>`
        font-size: ${theme.fontSize.H900};
        font-weight: ${theme.fontWeight.Regular};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,
    HE900B: styled.h1<Props>`
        font-size: ${theme.fontSize.H900};
        font-weight: ${theme.fontWeight.Bold};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,
    H800: styled.h1<Props>`
        font-size: ${theme.fontSize.H800};
        font-weight: ${theme.fontWeight.Regular};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
    `,

    H800L: styled.h1<Props>`
        font-size: ${theme.fontSize.H800};
        font-weight: ${theme.fontWeight.Light};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
    `,

    H800M: styled.h1<Props>`
font-size: ${theme.fontSize.H800};
font-weight: ${theme.fontWeight.Medium};
letter-spacing:  ${theme.letterSpacing.normal}px;
line-height:  ${theme.lineHeight.normal};
color: ${(props) => props.color ? props.color : theme.color.N900};
margin: ${(props) => props.margin ? props.margin : '0'};
`,

    H800B: styled.h1<Props>`
font-size: ${theme.fontSize.H800};
font-weight: ${theme.fontWeight.Bold};
letter-spacing:  ${theme.letterSpacing.normal}px;
line-height:  ${theme.lineHeight.normal};
color: ${(props) => props.color ? props.color : theme.color.N900};
margin: ${(props) => props.margin ? props.margin : '0'};
`,

    H800BL: styled.h1<Props>`
font-size: ${theme.fontSize.H800};
font-weight: ${theme.fontWeight.BlackBold};
letter-spacing:  ${theme.letterSpacing.normal}px;
line-height:  ${theme.lineHeight.normal};
color: ${(props) => props.color ? props.color : theme.color.N900};
margin: ${(props) => props.margin ? props.margin : '0'};
`, H700: styled.h1<Props>`
font-size: ${theme.fontSize.H700};
font-weight: ${theme.fontWeight.Regular};
letter-spacing:  ${theme.letterSpacing.normal}px;
line-height:  ${theme.lineHeight.normal};
color: ${(props) => props.color ? props.color : theme.color.N900};
margin: ${(props) => props.margin ? props.margin : '0'};
`,

    H700L: styled.h1<Props>`
font-size: ${theme.fontSize.H700};
font-weight: ${theme.fontWeight.Light};
letter-spacing:  ${theme.letterSpacing.normal}px;
line-height:  ${theme.lineHeight.normal};
color: ${(props) => props.color ? props.color : theme.color.N900};
margin: ${(props) => props.margin ? props.margin : '0'};
`,

    H700M: styled.h1<Props>`
font-size: ${theme.fontSize.H700};
font-weight: ${theme.fontWeight.Medium};
letter-spacing:  ${theme.letterSpacing.normal}px;
line-height:  ${theme.lineHeight.normal};
color: ${(props) => props.color ? props.color : theme.color.N900};
margin: ${(props) => props.margin ? props.margin : '0'};
`,

    H700B: styled.h1<Props>`
font-size: ${theme.fontSize.H700};
font-weight: ${theme.fontWeight.Bold};
letter-spacing:  ${theme.letterSpacing.normal}px;
line-height:  ${(props) => props.lineHeight ? props.lineHeight : theme.lineHeight.normal};
color: ${(props) => props.color ? props.color : theme.color.N900};
margin: ${(props) => props.margin ? props.margin : '0'};
`,

    H700BL: styled.h1<Props>`
font-size: ${theme.fontSize.H700};
font-weight: ${theme.fontWeight.BlackBold};
letter-spacing:  ${theme.letterSpacing.normal}px;
line-height:  ${theme.lineHeight.normal};
color: ${(props) => props.color ? props.color : theme.color.N900};
margin: ${(props) => props.margin ? props.margin : '0'};
`,
    H600: styled.h1<Props>`
        font-size: ${theme.fontSize.H600};
        font-weight: ${theme.fontWeight.Regular};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    H600L: styled.h1<Props>`
        font-size: ${theme.fontSize.H600};
        font-weight: ${theme.fontWeight.Light};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    H600M: styled.h1<Props>`
        font-size: ${theme.fontSize.H600};
        font-weight: ${theme.fontWeight.Medium};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    H600B: styled.h1<Props>`
        font-size: ${theme.fontSize.H600};
        font-weight: ${theme.fontWeight.Bold};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    H600BL: styled.h1<Props>`
        font-size: ${theme.fontSize.H600};
        font-weight: ${theme.fontWeight.BlackBold};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,
    H500: styled.h1<Props>`
   font-size: ${theme.fontSize.H500};
   font-weight: ${theme.fontWeight.Regular};
   letter-spacing:  ${theme.letterSpacing.normal}px;
   line-height:  ${theme.lineHeight.normal};
   color: ${(props) => props.color ? props.color : theme.color.N900};
   margin: ${(props) => props.margin ? props.margin : '0'};
`,

    H500L: styled.h1<Props>`
   font-size: ${theme.fontSize.H500};
   font-weight: ${theme.fontWeight.Light};
   letter-spacing:  ${theme.letterSpacing.normal}px;
   line-height:  ${theme.lineHeight.normal};
   color: ${(props) => props.color ? props.color : theme.color.N900};
   margin: ${(props) => props.margin ? props.margin : '0'};
`,

    H500M: styled.h1<Props>`
   font-size: ${theme.fontSize.H500};
   font-weight: ${theme.fontWeight.Medium};
   letter-spacing:  ${theme.letterSpacing.normal}px;
   line-height:  ${theme.lineHeight.normal};
   color: ${(props) => props.color ? props.color : theme.color.N900};
   margin: ${(props) => props.margin ? props.margin : '0'};
`,

    H500B: styled.h1<Props>`
   font-size: ${theme.fontSize.H500};
   font-weight: ${theme.fontWeight.Bold};
   letter-spacing:  ${theme.letterSpacing.normal}px;
   line-height:  ${theme.lineHeight.normal};
   color: ${(props) => props.color ? props.color : theme.color.N900};
   margin: ${(props) => props.margin ? props.margin : '0'};
`,

    H500BL: styled.h1<Props>`
   font-size: ${theme.fontSize.H500};
   font-weight: ${theme.fontWeight.BlackBold};
   letter-spacing:  ${theme.letterSpacing.normal}px;
   line-height:  ${theme.lineHeight.normal};
   color: ${(props) => props.color ? props.color : theme.color.N900};
   margin: ${(props) => props.margin ? props.margin : '0'};
`,
    H400: styled.h1<Props>`
        font-size: ${theme.fontSize.H400};
        font-weight: ${theme.fontWeight.Regular};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    H400L: styled.h1<Props>`
        font-size: ${theme.fontSize.H400};
        font-weight: ${theme.fontWeight.Light};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    H400M: styled.h1<Props>`
        font-size: ${theme.fontSize.H400};
        font-weight: ${theme.fontWeight.Medium};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    H400B: styled.h1<Props>`
        font-size: ${theme.fontSize.H400};
        font-weight: ${theme.fontWeight.Bold};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    H400BL: styled.h1<Props>`
        font-size: ${theme.fontSize.H400};
        font-weight: ${theme.fontWeight.BlackBold};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,
    H300: styled.h1<Props>`
   font-size: ${theme.fontSize.H300};
   font-weight: ${theme.fontWeight.Regular};
   letter-spacing:  ${theme.letterSpacing.normal}px;
   line-height:  ${theme.lineHeight.normal};
   color: ${(props) => props.color ? props.color : theme.color.N900};
   margin: ${(props) => props.margin ? props.margin : '0'};
`,

    H300L: styled.h1<Props>`
   font-size: ${theme.fontSize.H300};
   font-weight: ${theme.fontWeight.Light};
   letter-spacing:  ${theme.letterSpacing.normal}px;
   line-height:  ${theme.lineHeight.normal};
   color: ${(props) => props.color ? props.color : theme.color.N900};
   margin: ${(props) => props.margin ? props.margin : '0'};
`,

    H300M: styled.h1<Props>`
   font-size: ${theme.fontSize.H300};
   font-weight: ${theme.fontWeight.Medium};
   letter-spacing:  ${theme.letterSpacing.normal}px;
   line-height:  ${theme.lineHeight.normal};
   color: ${(props) => props.color ? props.color : theme.color.N900};
   margin: ${(props) => props.margin ? props.margin : '0'};
`,

    H300B: styled.h1<Props>`
   font-size: ${theme.fontSize.H300};
   font-weight: ${theme.fontWeight.Bold};
   letter-spacing:  ${theme.letterSpacing.normal}px;
   line-height:  ${theme.lineHeight.normal};
   color: ${(props) => props.color ? props.color : theme.color.N900};
   margin: ${(props) => props.margin ? props.margin : '0'};
`,

    H300BL: styled.h1<Props>`
   font-size: ${theme.fontSize.H300};
   font-weight: ${theme.fontWeight.BlackBold};
   letter-spacing:  ${theme.letterSpacing.normal}px;
   line-height:  ${theme.lineHeight.normal};
   color: ${(props) => props.color ? props.color : theme.color.N900};
   margin: ${(props) => props.margin ? props.margin : '0'};
`,
    H200: styled.h1<Props>`
        font-size: ${theme.fontSize.H200};
        font-weight: ${theme.fontWeight.Regular};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    H200L: styled.h1<Props>`
        font-size: ${theme.fontSize.H200};
        font-weight: ${theme.fontWeight.Light};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    H200M: styled.h1<Props>`
        font-size: ${theme.fontSize.H200};
        font-weight: ${theme.fontWeight.Medium};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        word-break: keep-all;
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    H200B: styled.h1<Props>`
        font-size: ${theme.fontSize.H200};
        font-weight: ${theme.fontWeight.Bold};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    H200BL: styled.h1<Props>`
        font-size: ${theme.fontSize.H200};
        font-weight: ${theme.fontWeight.BlackBold};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,
    H100: styled.h1<Props>`
   font-size: ${theme.fontSize.H100};
   font-weight: ${theme.fontWeight.Regular};
   letter-spacing:  ${theme.letterSpacing.normal}px;
   line-height:  ${theme.lineHeight.normal};
   color: ${(props) => props.color ? props.color : theme.color.N900};
   margin: ${(props) => props.margin ? props.margin : '0'};
`,

    H100L: styled.h1<Props>`
   font-size: ${theme.fontSize.H100};
   font-weight: ${theme.fontWeight.Light};
   letter-spacing:  ${theme.letterSpacing.normal}px;
   line-height:  ${theme.lineHeight.normal};
   color: ${(props) => props.color ? props.color : theme.color.N900};
   margin: ${(props) => props.margin ? props.margin : '0'};

`,

    H100M: styled.h1<Props>`
   font-size: ${theme.fontSize.H100};
   font-weight: ${theme.fontWeight.Medium};
   letter-spacing:  ${theme.letterSpacing.normal}px;
   line-height:  ${theme.lineHeight.normal};
   color: ${(props) => props.color ? props.color : theme.color.N900};
   margin: ${(props) => props.margin ? props.margin : '0'};
`,

    H100B: styled.h1<Props>`
   font-size: ${theme.fontSize.H100};
   font-weight: ${theme.fontWeight.Bold};
   letter-spacing:  ${theme.letterSpacing.normal}px;
   line-height:  ${theme.lineHeight.normal};
   color: ${(props) => props.color ? props.color : theme.color.N900};
   margin: ${(props) => props.margin ? props.margin : '0'};
`,

    H100BL: styled.h1<Props>`
   font-size: ${theme.fontSize.H100};
   font-weight: ${theme.fontWeight.BlackBold};
   letter-spacing:  ${theme.letterSpacing.normal}px;
   line-height:  ${theme.lineHeight.normal};
   color: ${(props) => props.color ? props.color : theme.color.N900};
   margin: ${(props) => props.margin ? props.margin : '0'};
`,
    H75: styled.h1<Props>`
        font-size: ${theme.fontSize.H75};
        font-weight: ${theme.fontWeight.Regular};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    H75L: styled.h1<Props>`
        font-size: ${theme.fontSize.H75};
        font-weight: ${theme.fontWeight.Light};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    H75M: styled.h1<Props>`
        font-size: ${theme.fontSize.H75};
        font-weight: ${theme.fontWeight.Medium};
        letter-spacing: ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    H75B: styled.h1<Props>`
        font-size: ${theme.fontSize.H75};
        font-weight: ${theme.fontWeight.Bold};
        letter-spacing: ${theme.letterSpacing.normal}px;
        line-height:  ${(props) => props.lineHeight ? props.lineHeight : theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    H75BL: styled.h1<Props>`
        font-size: ${theme.fontSize.H75};
        font-weight: ${theme.fontWeight.BlackBold};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,
    H50: styled.h1<Props>`
   font-size: ${theme.fontSize.H50};
   font-weight: ${theme.fontWeight.Regular};
   letter-spacing:  ${theme.letterSpacing.normal}px;
   line-height:  ${theme.lineHeight.normal};
   color: ${(props) => props.color ? props.color : theme.color.N900};
   margin: ${(props) => props.margin ? props.margin : '0'};
`,

    H50L: styled.h1<Props>`
   font-size: ${theme.fontSize.H50};
   font-weight: ${theme.fontWeight.Light};
   letter-spacing:  ${theme.letterSpacing.normal}px;
   line-height:  ${theme.lineHeight.normal};
   color: ${(props) => props.color ? props.color : theme.color.N900};
   margin: ${(props) => props.margin ? props.margin : '0'};
`,

    H50M: styled.h1<Props>`
   font-size: ${theme.fontSize.H50};
   font-weight: ${theme.fontWeight.Medium};
   letter-spacing:  ${theme.letterSpacing.normal}px;
   line-height:  ${theme.lineHeight.normal};
   color: ${(props) => props.color ? props.color : theme.color.N900};
   margin: ${(props) => props.margin ? props.margin : '0'};
`,

    H50B: styled.h1<Props>`
   font-size: ${theme.fontSize.H50};
   font-weight: ${theme.fontWeight.Bold};
   letter-spacing:  ${theme.letterSpacing.normal}px;
   line-height:  ${theme.lineHeight.normal};
   color: ${(props) => props.color ? props.color : theme.color.N900};
   margin: ${(props) => props.margin ? props.margin : '0'};
`,

    H50BL: styled.h1<Props>`
   font-size: ${theme.fontSize.H50};
   font-weight: ${theme.fontWeight.BlackBold};
   letter-spacing:  ${theme.letterSpacing.normal}px;
   line-height:  ${theme.lineHeight.normal};
   color: ${(props) => props.color ? props.color : theme.color.N900};
   margin: ${(props) => props.margin ? props.margin : '0'};
`, P50: styled.h1<Props>`
font-size: ${theme.fontSize.P50};
font-weight: ${theme.fontWeight.Regular};
letter-spacing:  ${theme.letterSpacing.normal}px;
line-height:  ${theme.lineHeight.normal};
color: ${(props) => props.color ? props.color : theme.color.N900};
margin: ${(props) => props.margin ? props.margin : '0'};
`,

    P50L: styled.h1<Props>`
font-size: ${theme.fontSize.P50};
font-weight: ${theme.fontWeight.Light};
letter-spacing:  ${theme.letterSpacing.normal}px;
line-height:  ${theme.lineHeight.normal};
color: ${(props) => props.color ? props.color : theme.color.N900};
margin: ${(props) => props.margin ? props.margin : '0'};
`,

    P50M: styled.h1<Props>`
font-size: ${theme.fontSize.P50};
font-weight: ${theme.fontWeight.Medium};
letter-spacing:  ${theme.letterSpacing.normal}px;
line-height:  ${theme.lineHeight.normal};
color: ${(props) => props.color ? props.color : theme.color.N900};
margin: ${(props) => props.margin ? props.margin : '0'};
`,

    P50B: styled.h1<Props>`
font-size: ${theme.fontSize.P50};
font-weight: ${theme.fontWeight.Bold};
letter-spacing:  ${theme.letterSpacing.normal}px;
line-height:  ${theme.lineHeight.normal};
color: ${(props) => props.color ? props.color : theme.color.N900};
margin: ${(props) => props.margin ? props.margin : '0'};
`,

    P50BL: styled.h1<Props>`
font-size: ${theme.fontSize.P50};
font-weight: ${theme.fontWeight.BlackBold};
letter-spacing:  ${theme.letterSpacing.normal}px;
line-height:  ${theme.lineHeight.normal};
color: ${(props) => props.color ? props.color : theme.color.N900};
margin: ${(props) => props.margin ? props.margin : '0'};
`,
    Paragraph: styled.h1<Props>`
        font-size: ${theme.fontSize.P200};
        font-weight: ${theme.fontWeight.Regular};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    Link: styled.h1<Props>`
        font-size: ${theme.fontSize.P200};
        font-weight: ${theme.fontWeight.Light};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N400};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    LinkHOver: styled.h1<Props>`
        font-size: ${theme.fontSize.P200};
        font-weight: ${theme.fontWeight.Light};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        text-decoration: underline;
        color: ${(props) => props.color ? props.color : theme.color.N300};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    BlockQuote: styled.h1<Props>`
        font-size: ${theme.fontSize.P200};
        font-weight: ${theme.fontWeight.Medium};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N100};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    Caption: styled.h1<Props>`
        font-size: ${theme.fontSize.P200};
        font-weight: ${theme.fontWeight.Bold};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N300};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,
    P200: styled.h1<Props>`
font-size: ${theme.fontSize.P200};
font-weight: ${theme.fontWeight.Regular};
letter-spacing:  ${theme.letterSpacing.normal}px;
line-height:  ${theme.lineHeight.normal};
color: ${(props) => props.color ? props.color : theme.color.N900};
word-break: keep-all;
margin: ${(props) => props.margin ? props.margin : '0'};
`,

    P200L: styled.h1<Props>`
font-size: ${theme.fontSize.P200};
font-weight: ${theme.fontWeight.Light};
letter-spacing:  ${theme.letterSpacing.normal}px;
line-height:  ${theme.lineHeight.normal};
color: ${(props) => props.color ? props.color : theme.color.N900};
margin: ${(props) => props.margin ? props.margin : '0'};
`,

    P200M: styled.h1<Props>`
font-size: ${theme.fontSize.P200};
font-weight: ${theme.fontWeight.Medium};
letter-spacing:  ${theme.letterSpacing.normal}px;
line-height:  ${theme.lineHeight.normal};
color: ${(props) => props.color ? props.color : theme.color.N900};
margin: ${(props) => props.margin ? props.margin : '0'};
`,

    P200B: styled.h1<Props>`
font-size: ${theme.fontSize.P200};
font-weight: ${theme.fontWeight.Bold};
letter-spacing:  ${theme.letterSpacing.normal}px;
line-height:  ${theme.lineHeight.normal};
color: ${(props) => props.color ? props.color : theme.color.N900};
margin: ${(props) => props.margin ? props.margin : '0'};
`,

    P200BL: styled.h1<Props>`
        font-size: ${theme.fontSize.P200};
        font-weight: ${theme.fontWeight.BlackBold};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
    `,
    P100: styled.h1<Props>`
        font-size: ${theme.fontSize.P100};
        font-weight: ${theme.fontWeight.Regular};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    P100L: styled.h1<Props>`
        font-size: ${theme.fontSize.P100};
        font-weight: ${theme.fontWeight.Light};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    P100M: styled.h1<Props>`
        font-size: ${theme.fontSize.P100};
        font-weight: ${theme.fontWeight.Medium};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    P100B: styled.h1<Props>`
        font-size: ${theme.fontSize.P100};
        font-weight: ${theme.fontWeight.Bold};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,

    P100BL: styled.h1<Props>`
        font-size: ${theme.fontSize.P100};
        font-weight: ${theme.fontWeight.BlackBold};
        letter-spacing: ${theme.letterSpacing.normal}px;
        line-height:  ${theme.lineHeight.normal};
        color: ${(props) => props.color ? props.color : theme.color.N900};
        margin: ${(props) => props.margin ? props.margin : '0'};
   `,
    P75: styled.h1<Props>`
   font-size: ${theme.fontSize.P75};
   font-weight: ${theme.fontWeight.Regular};
   letter-spacing:  ${theme.letterSpacing.normal}px;
   line-height:  ${theme.lineHeight.normal};
   color: ${(props) => props.color ? props.color : theme.color.N900};
   margin: ${(props) => props.margin ? props.margin : '0'};
`,

    P75L: styled.h1<Props>`
   font-size: ${theme.fontSize.P75};
   font-weight: ${theme.fontWeight.Light};
   letter-spacing:  ${theme.letterSpacing.normal}px;
   line-height:  ${theme.lineHeight.normal};
   color: ${(props) => props.color ? props.color : theme.color.N900};
   margin: ${(props) => props.margin ? props.margin : '0'};
`,

    P75M: styled.h1<Props>`
   font-size: ${theme.fontSize.P75};
   font-weight: ${theme.fontWeight.Medium};
   letter-spacing:  ${theme.letterSpacing.normal}px;
   line-height:  ${theme.lineHeight.normal};
   color: ${(props) => props.color ? props.color : theme.color.N900};
   margin: ${(props) => props.margin ? props.margin : '0'};
`,

    P75B: styled.h1<Props>`
   font-size: ${theme.fontSize.P75};
   font-weight: ${theme.fontWeight.Bold};
   letter-spacing:  ${theme.letterSpacing.normal}px;
   line-height:  ${theme.lineHeight.normal};
   color: ${(props) => props.color ? props.color : theme.color.N900};
   margin: ${(props) => props.margin ? props.margin : '0'};
`,

    P75BL: styled.h1<Props>`
   font-size: ${theme.fontSize.P75};
   font-weight: ${theme.fontWeight.BlackBold};
   letter-spacing:  ${theme.letterSpacing.normal}px;
   line-height:  ${theme.lineHeight.normal};
   color: ${(props) => props.color ? props.color : theme.color.N900};
   margin: ${(props) => props.margin ? props.margin : '0'};
`,

}

export default Typography;