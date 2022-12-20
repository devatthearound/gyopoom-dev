import { createGlobalStyle } from "styled-components";

//`normalize`로 기본 css 초기화
const GlobalStyle = createGlobalStyle`
a {
  color: inherit;
  text-decoration: none;
}
#root{
  height: 100%;
  overflow: hidden;
  position: relative;
}
html, body{
  padding: 0;
  height: 100%;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; 
  ::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
  }
  background: #FAFBFC;

  max-width: 600px;
  margin: auto !important;
  -webkit-tap-highlight-color : rgba(0,0,0,0);
}
html{
  font-size: 10px;
}
@media screen and (max-width: 330px) {
    html{
    font-size: 7px;
  }
}

body{
  font-size: 1rem;
  overflow: hidden;
  position: fixed;
  width: 100%;
}
input{
  
  line-height: 2rem;
  ::placeholder{
    color: #BBBBBB;
  }
}
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  font-family: "Noto Sans KR",'Apple SD Gothic Neo',Sans-serif;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
strong {
  font-weight: 600;
}
ol,
ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

head {
  display: block;
}

* {
  box-sizing: border-box;
  word-break: break-all;
}

pre {
  white-space: pre-Wrapper; /* Since CSS 2.1 */
  white-space: -moz-pre-Wrapper; /* Mozilla, since 1999 */
  white-space: -pre-Wrapper; /* Opera 4-6 */
  white-space: -o-pre-Wrapper; /* Opera 7 */
  word-Wrapper: break-word;
}
input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
input[type=search]::-webkit-search-cancel-button,
input[type=search]::-webkit-search-decoration,
input[type=search]::-webkit-search-results-button,
input[type=search]::-webkit-search-results-decoration {
    -webkit-appearance: none;
    -moz-appearance: none;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="radio"] {
  /* Add if not using autoprefixer */
  -webkit-appearance: none;
  appearance: none;
  /* For iOS < 15 to remove gradient background */
  background-color: #fff;
  /* Not removed via appearance */
  margin: 0;
}

textarea:focus, input:focus, select:focus{
    outline: none;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

`
export default GlobalStyle;
