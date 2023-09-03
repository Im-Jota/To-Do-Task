import { styled } from "styled-components";

export const Rowtask = ({rowTask, handlerChangeDone, handlerDelete}) => {
    return (
        <>
        {rowTask.map((row) => {
            return (
                <Ul key={row.id} style={{display: 'flex', gap: '2rem', 'listStyle': 'none'}}>
                    <ContainerInfo>
                    <li>
                        <Input
                            type="checkbox"
                            checked={row.done}
                            onChange={() => handlerChangeDone(row.id)}
                        />
                    </li>
                    <li>{row.name}</li>
                    </ContainerInfo>
                    <li><Button onClick={() => handlerDelete(row.id)}>x</Button></li>
                </Ul>
            )
        })}
        </>
    );
}

const ContainerInfo = styled.div`
    display: flex;
    gap: 1.5rem;
    align-items: center;
`;

const Button = styled.button`
    width: 1.5rem;
    height: 1.5rem;
    border: none;
    border-radius: .5rem;
    background: #fa4119;
    color: white;
    cursor: pointer;
`;

const Input = styled.input`
    appearance: none;
    background: #e6e7eb;
    cursor: pointer;
    border-radius: .2rem;
    width: 1.5rem;
    height: 1.5rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    
    &:before{
        content: '';
        position: absolute;
        color: black;
    }

    &:checked {
        background: black;
        display: flex;
        justify-content: center;
        align-items: center;
        display: relative;
        &:before{
            content: '✔';
            position: absolute;
            color: white;
        }
    }
`;

const Ul = styled.ul`
    width: calc(100% - 2rem);
    background: white;
    padding: 1rem;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;