import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { v4 } from "uuid";
import { NavLink } from "react-router-dom";

export const Category = () => {
    const idCategoria = v4()

    const [newCategory, setNewCategory] = useState('');
    const [rowCategory, setRowCategory] = useState([]);

    useEffect(() => {
        const rows = localStorage.getItem('Category');
        if (rows) {
            setRowCategory(JSON.parse(rows));
        }
    }, [])

    function createCategory(e) {
        e.preventDefault();
        if (!rowCategory.find((t) => t.name === newCategory)) {
            setRowCategory([...rowCategory, { id: idCategoria, name: newCategory, count: 0 }]);
        }
        setNewCategory('')
    }

    useEffect(() => {
        localStorage.setItem('Category', JSON.stringify(rowCategory));
    }, [rowCategory])

    return (
        <Container>
            <CategoryContainer>
                <ContainerRows>
                    {rowCategory.length > 0 &&
                        rowCategory.map((row) => {
                            return (
                                <ul key={row.id}>
                                    <ItemCategoria to={`/${row.name}`} state={row.name}>{row.name}</ItemCategoria>
                                </ul>
                            );
                        })
                    }
                </ContainerRows>
                <form onSubmit={createCategory}>
                    <Input
                        placeholder="+ Create New Category..."
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                </form>
            </CategoryContainer>
        </Container>
    );
}

const Input = styled.input`
    border: none;
    width: calc(100% - 1rem);
    padding: 1rem .5rem;
    &:focus{
        outline: solid gray .1rem;
        border-radius: 1rem;
    }
`;

const ItemCategoria = styled(NavLink)`
    text-decoration: none;
    color: black;
    width: 100%;
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    outline: .15rem solid #e6e7eb;
    &.active{
        background: black;
        color: white;
        outline: none;
    }
`;

const ContainerRows = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    ul {
        list-style: none;
        border-radius: 1rem;
        display: flex;
        justify-content: space-between;
    }
`;

const CategoryContainer = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    height: 88%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    aling-items: end;
`;

const Container = styled.div`
    grid-area: aside;
    padding: 2rem;
`;