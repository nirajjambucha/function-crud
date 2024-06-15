import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Crud from './components/Crud';
import TableData from './components/TableData';
import Navbar from './components/Navbar';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Crud />} />
                <Route path="/table" element={<TableData />} />
                <Route path="/edit/:id" element={<Crud />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
