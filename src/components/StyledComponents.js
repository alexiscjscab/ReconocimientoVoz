import styled from 'styled-components';

export const MyButton = styled.button`
    text-align: center;
    color: #000;
    text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;
    display: inline-block;
    font-size: 0.8em;
`


export const NeonButton = styled(MyButton)`
    width: 130px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-right: 10px;
    background-color: transparent;
    border: 3px solid ${({status}) => status==='done' ? 'green' : status==='inprocess' ? 'orange' : 'crimson' };
    border-radius: 50px;
    color: ${({status}) => status==='done' ? 'green' : status==='inprocess' ? 'orange' : 'crimson' };

    // inset añade el box-shadow hacia adentro
    &:hover{
        box-shadow: 0 0 10px 0 ${({status}) => status==='done' ? 'green' : status==='inprocess' ? 'orange' : 'crimson' } inset, 0 0 20px 2px ${({status}) => status==='done' ? 'green' : status==='inprocess' ? 'orange' : 'crimson' };
    }
`

export const NeonDiv = styled(NeonButton)`
    width: 90%;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 10px;
    text-transform: capitalize;
    display:flex;
    justify-content: center;
    
`