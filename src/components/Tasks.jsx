import { useEffect, useState } from "react";
import { Rowtask } from "./RowTask";
import { useLocation, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'
import { styled } from "styled-components";

export const Tasks = () => {

    const {state} = useLocation();

    const [newTask, setNewTask] = useState('');
    const [rowsTasks, setRowsTasks] = useState([]);
    const [type, setType] = useState(state);

    useEffect( () => {
        setType(state)
    }, [state])

    useEffect(() => {
        const rows = localStorage.getItem(type);
        rows !== null ?
            setRowsTasks(JSON.parse(rows))
        :
            setRowsTasks([])
    }, [type])

    function handlerNewTask(task) {
        const verificar = rowsTasks.find((t) => t.name.toLowerCase() === task.toLowerCase());
        const userId = uuidv4();
        if (!verificar) {
            setRowsTasks([...rowsTasks, { id: userId, name: task, done: false }])
        }
    }

    function handlerDelete (id) {
        const row = [...rowsTasks];
        row.map((t, i) => {
            if(t.id === id ){
                row.splice(i, 1);
            }
        });
        setRowsTasks(row);
    }

    function handlerChangeDone(idTask) {
        const rows = rowsTasks.map((t) => t.id === idTask ? { ...t, done: !t.done } : t)
        setRowsTasks(rows)
    }

    function handlerSubmit(e) {
        e.preventDefault();
        handlerNewTask(newTask);
        setNewTask('')
    }

    useEffect(() => {
        localStorage.setItem(type, JSON.stringify(rowsTasks))
    }, [rowsTasks])

    return (
        <Container>
            <ContainerForm>
                <form onSubmit={handlerSubmit}>
                    <Input
                        placeholder="Enter Task"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                </form>
                <Rowtask rowTask={rowsTasks} handlerChangeDone={handlerChangeDone} handlerDelete={handlerDelete} />
            </ContainerForm>
        </Container>
    );
}

const Input = styled.input`
    padding: 1.3rem 1rem;
    width: calc(100% - 2rem);
    border-radius: 1rem;
    border: none;
    background: #d9d9d9;

    &:focus{
        outline: none;
    }
`;

const ContainerForm = styled.div`
    width: 60%;
    padding: 3rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Container = styled.div`
    width: 100%;
    grid-area: main;
    display: flex;
    justify-content: center;
    max-height: 100%;
    overflow: auto;
    margin: 0 0 2rem 0;
`;