import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'; 
import CriarBanco from './components/CriarBanco/CriarBanco';
import CriarTabela from './components/CriarTabela/CriarTabela';
import InserirRegistro from './components/InserirRegistro/InserirRegistro';
import ListarRegistro from './components/ListarRegistro/ListarRegistro';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/criar-banco">Criar Banco</Link></li>
            <li><Link to="/criar-tabela">Criar Tabela</Link></li>
            <li><Link to="/inserir-registro">Inserir Registro</Link></li>
            <li><Link to="/listar-registro">Listar Registro</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/criar-banco" element={<CriarBanco />} />
          <Route path="/criar-tabela" element={<CriarTabela />} />
          <Route path="/inserir-registro" element={<InserirRegistro />} />
          <Route path="/listar-registro" element={<ListarRegistro />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
