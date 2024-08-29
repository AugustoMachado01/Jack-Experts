import styled from "styled-components";

import Logo from "../../assets/image 1.jpg"

export const Main = styled.div`
width: 100%;
height: 60px;
background-color: red;

background: url({Logo}), no-repeat;
background-size: cover;
background-clip: border-box;
`;

export const Title = styled.h1`
color: red;
`