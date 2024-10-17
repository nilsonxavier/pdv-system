import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Compra from './pages/Compra';
import Estoque from './pages/Estoque';
import ConfigImpressora from './components/ConfigImpressora';
import Produtos from './pages/Produtos.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/compra" element={<Compra />} />
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/config-impressora" element={<ConfigImpressora />}/>
        <Route path="/produtos" element={<Produtos />}/>
      </Routes>
    </Router>
  );
}
export default App;
