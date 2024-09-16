import styled from "styled-components";

interface DarkModeProps {
    isDarkMode: Boolean;
}

type ActiveProps = {
    isActive: boolean
} & DarkModeProps

export const Table = styled.table`
    width:100%;
    border-collapse: collapse;

`

export const THead = styled.thead <DarkModeProps>`
    background-color:${props => (props.isDarkMode ? 'var(--backgroundDarkMode2)' : '#f4f6f8')};
    //border: ${props => (props.isDarkMode ? '1px solid gray' : '1px solid silver')}; 
    border-radius: 10px;
    color: #67636d;
    padding:10px;
    width:100%;
    font-size: 0.85rem;
    box-shadow: rgba(58, 53, 65, 0.1) 0px 1px 2px 0px;
      @media screen and (max-width:930px) {
        font-size: 0.7rem;
    }
`

export const TFootListClients = styled.tfoot <DarkModeProps>`
    background-color:${props => (props.isDarkMode ? 'var(--backgroundDarkMode2)' : '#f4f6f8')};
    width: 100%;
    height: 70px;
    border-radius: 0px 0px 20px 20px;;

`

export const DivAlterPage = styled.div`
    min-width: max-content;
    width: 25%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`


export const TrBody = styled.tr <ActiveProps>`
   color: ${props => (props.isDarkMode ? '#485059' : '#3c454e')};
text-decoration:${props => (props.isActive ? '' : 'line-through')} ;
opacity: ${props => (props.isActive ? '' : '0.6')};
height: 60px;
width:100%;
font-size: 0.85rem;
box-shadow: rgba(58, 53, 65, 0.1) 0px 1px 0px 0px;
&:hover{
    background-color: ${props => (props.isDarkMode ? 'var(--backgroundDarkMode2)' : '#f7f7f8')};
}
@media screen and (max-width:930px) {
    font-size: 0.7rem;
}
`
export const Th = styled.th`
    padding: 10px;
    @media screen and (max-width:930px) {
       max-width: 7ch;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space: nowrap;
    }
`
export const TdBody = styled.td <DarkModeProps>`
    color: ${props => (props.isDarkMode ? '#485059' : '#3c454e')};
`