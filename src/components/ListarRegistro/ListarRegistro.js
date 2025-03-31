import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ListarRegistro.css";

function ListarRegistro() {
  const [bancos, setBancos] = useState([]);
  const [tabelas, setTabelas] = useState([]);
  const [bancoSelecionado, setBancoSelecionado] = useState("");
  const [tabelaSelecionada, setTabelaSelecionada] = useState("");
  const [registros, setRegistros] = useState([]);
  const [erro, setErro] = useState("");

  // Carrega os bancos de dados ao iniciar
  useEffect(() => {
    axios.get("http://localhost:3001/listar-bancos")
      .then((res) => setBancos(res.data))
      .catch((err) => console.error("Erro ao carregar bancos:", err));
  }, []);

  // Carrega as tabelas ao selecionar um banco
  const carregarTabelas = (banco) => {
    setBancoSelecionado(banco);
    setTabelaSelecionada("");
    axios.get("http://localhost:3001/listar-tabelas", { params: { banco } })
      .then((res) => setTabelas(res.data))
      .catch((err) => console.error("Erro ao carregar tabelas:", err));
  };

  // Busca os registros ao selecionar uma tabela
  const listarRegistros = () => {
    if (!bancoSelecionado || !tabelaSelecionada) {
      setErro("Selecione um banco e uma tabela.");
      return;
    }
    setErro("");

    axios.get("http://localhost:3001/listar-registros", {
      params: { banco: bancoSelecionado, tabela: tabelaSelecionada }
    })
      .then((res) => setRegistros(res.data))
      .catch((err) => {
        console.error("Erro ao buscar registros:", err);
        setErro("Erro ao buscar registros.");
      });
  };

  return (
    <div className="listar-registro-container">
      <h1>Listar Registros</h1>

      {/* Seleção de Banco */}
      <select onChange={(e) => carregarTabelas(e.target.value)} value={bancoSelecionado}>
        <option value="">Selecione um banco</option>
        {bancos.map((banco, index) => (
          <option key={index} value={banco}>{banco}</option>
        ))}
      </select>

      {/* Seleção de Tabela */}
      {bancoSelecionado && (
        <select onChange={(e) => setTabelaSelecionada(e.target.value)} value={tabelaSelecionada}>
          <option value="">Selecione uma tabela</option>
          {tabelas.map((tabela, index) => (
            <option key={index} value={tabela}>{tabela}</option>
          ))}
        </select>
      )}

      <button onClick={listarRegistros}>Buscar</button>
      {erro && <p className="erro">{erro}</p>}

      {/* Tabela de Registros */}
      {registros.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(registros[0]).map((key) => <th key={key}>{key}</th>)}
            </tr>
          </thead>
          <tbody>
            {registros.map((registro, index) => (
              <tr key={index}>
                {Object.values(registro).map((valor, i) => <td key={i}>{valor}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum registro encontrado.</p>
      )}
    </div>
  );
}

export default ListarRegistro;
