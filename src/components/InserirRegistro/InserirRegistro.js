import React, { useState, useEffect } from "react";
import axios from "axios";
import "./InserirRegistro.css"; // Criamos um novo CSS

function InserirRegistro() {
  const [bancos, setBancos] = useState([]);
  const [bancoSelecionado, setBancoSelecionado] = useState("");
  const [tabelas, setTabelas] = useState([]);
  const [tabelaSelecionada, setTabelaSelecionada] = useState("");
  const [campos, setCampos] = useState([]);
  const [valores, setValores] = useState({});
  const [mensagem, setMensagem] = useState("");

  // Carregar bancos de dados
  useEffect(() => {
    axios.get("http://localhost:3001/listar-bancos")
      .then(res => setBancos(res.data))
      .catch(err => console.error("Erro ao buscar bancos:", err));
  }, []);

  // Carregar tabelas do banco selecionado
  useEffect(() => {
    if (bancoSelecionado) {
      axios.get(`http://localhost:3001/listar-tabelas?banco=${bancoSelecionado}`)
        .then(res => setTabelas(res.data))
        .catch(err => console.error("Erro ao buscar tabelas:", err));
    }
  }, [bancoSelecionado]);

  // Carregar campos da tabela selecionada
  useEffect(() => {
    if (tabelaSelecionada) {
      axios.get(`http://localhost:3001/listar-campos?banco=${bancoSelecionado}&tabela=${tabelaSelecionada}`)
        .then(res => {
          setCampos(res.data);
          const valoresIniciais = {};
          res.data.forEach(campo => valoresIniciais[campo] = "");
          setValores(valoresIniciais);
        })
        .catch(err => console.error("Erro ao buscar campos:", err));
    }
  }, [tabelaSelecionada]);

  const handleChange = (campo, valor) => {
    setValores({ ...valores, [campo]: valor });
  };

  const inserirRegistro = () => {
    axios.post("http://localhost:3001/inserir-registro", {
      banco: bancoSelecionado,
      tabela: tabelaSelecionada,
      valores
    })
    .then(res => setMensagem(res.data))
    .catch(() => setMensagem("Erro ao inserir registro."));
  };

  return (
    <div>
      <h1>Inserir Registro</h1>

      {/* Selecionar Banco */}
      <label>Escolha um Banco:</label>
      <select onChange={(e) => setBancoSelecionado(e.target.value)}>
        <option value="">Selecione um banco</option>
        {bancos.map(banco => (
          <option key={banco} value={banco}>{banco}</option>
        ))}
      </select>

      {/* Selecionar Tabela */}
      {bancoSelecionado && (
        <>
          <label>Escolha uma Tabela:</label>
          <select onChange={(e) => setTabelaSelecionada(e.target.value)}>
            <option value="">Selecione uma tabela</option>
            {tabelas.map(tabela => (
              <option key={tabela} value={tabela}>{tabela}</option>
            ))}
          </select>
        </>
      )}

      {/* Exibir Campos da Tabela */}
      {tabelaSelecionada && (
        <>
          <h3>Preencha os Dados:</h3>
          {campos.map(campo => (
            <div key={campo}>
              <label>{campo}:</label>
              <input
                type="text"
                value={valores[campo]}
                onChange={(e) => handleChange(campo, e.target.value)}
              />
            </div>
          ))}
          <button onClick={inserirRegistro}>Inserir Registro</button>
        </>
      )}

      <p>{mensagem}</p>
    </div>
  );
}

export default InserirRegistro;
