import styled from "styled-components";

export const LabelIconsModal = styled.div `
    cursor:pointer;
    display:flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 50px;
`

export const LabelDeliveryIconsModal = styled.div `
    cursor:pointer;
    display:flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 50px;
   
`

export const DivModalIconsPayment = styled.div`
    font-size:0.8rem;
    display: flex;
    justify-content: space-around;
    padding-bottom: 0.3rem;
    .hoverbutton {
        width: 25px;
        height: 25px;
    }
    .hoverbutton:hover{
        width: 30px;
        height:30px;
    }
    .deliveryIcon{
	-webkit-animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    @-webkit-keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(1000px);
            transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(1000px);
            transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}

    @media screen and (max-width:930px) {
        flex-wrap: wrap;
    }
`