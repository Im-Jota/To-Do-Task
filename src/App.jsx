import { Tasks } from './components/Tasks'
import { Category } from './components/Category';
import { styled } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Category />
        <Routes>
          <Route
            path='/:category'
            element={<Tasks />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: .7fr 2fr;
  grid-template-rows: 1fr;
  grid-template-areas:
    "aside main";
  gap: 2rem;
  width: auto;
  height: 100%;
`;

export default App;
