import styled, {keyframes} from "styled-components";

const rotate = keyframes`
  
  from{
      transform: rotate(0deg)
  };
  to{
    transform: rotate(360deg)
  }

`

const Container = styled.div`
   display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
`

const Loading = styled.span`
   width: 48px;
    height: 48px;
    display: inline-block;
    position: relative;
    border-width: 3px 2px 3px 2px;
    border-style: solid dotted solid dotted;
    border-color: #de3500 rgba(255, 255, 255,0.3) #fff rgba(151, 107, 93, 0.3);
    border-radius: 50%;
    box-sizing: border-box;
    animation: 1s ${rotate} linear infinite;
    
    &:before ,:after{
    content: '';
    top: 0;
    left: 0;
    position: absolute;
    border: 10px solid transparent;
    border-bottom-color:#fff;
    transform: translate(-10px, 19px) rotate(-35deg);
  };
  &:after{
    border-color: #de3500 #0000 #0000 #0000 ;
    transform: translate(32px, 3px) rotate(-35deg);
  }
`
const Msg = styled.span`
     color: cornflowerblue;
  font-style: italic;
  font-weight: 500;
`

const Loader = () => {
  return (
    <>
    <Container>
      <Loading></Loading>
      <Msg>Carregando...</Msg>
    </Container>
      
    </>
  );
};

export default Loader;
