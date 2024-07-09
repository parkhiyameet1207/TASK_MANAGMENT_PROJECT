import logo from './logo.svg';
import './App.css';

import { Container } from '@mui/material';
import { lazy, Suspense } from 'react';
import { Route, Routes } from "react-router"
const Board = lazy(() => import('./components/Board'));
const Header = lazy(() => import('./components/Header'));
const Loading = lazy(() => import('./components/Loader/loading'));

function App() {
  return (
    <>
      <Header />
      <Container maxWidth='lg'>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Board />} />
          </Routes>
        </Suspense>
      </Container>
    </>
  );
}

export default App;
