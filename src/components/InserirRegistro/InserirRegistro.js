import React, { useState, useEffect } from "react";
import axios from "axios";
import './InserirRegistro.css'; // Certifique-se de ter um arquivo CSS com o estilo do alerta

function InserirRegistro() {
  const [bancos, setBancos] = useState([]);
  const [tabelas, setTabelas] = useState([]);
  const [bancoSelecionado, setBancoSelecionado] = useState("");
  const [tabelaSelecionada, setTabelaSelecionada] = useState("");
  const [campos, setCampos] = useState([]);
  const [valores, setValores] = useState({});
  const [mensagem, setMensagem] = useState(""); // Estado para mensagem de alerta

  // Carregar bancos ao iniciar o componente
  useEffect(() => {
    axios.get("http://localhost:3001/listar-bancos")
      .then((res) => setBancos(res.data))
      .catch((err) => console.error("Erro ao buscar bancos:", err));
  }, []);

  // Carregar tabelas quando o banco for selecionado
  useEffect(() => {
    if (bancoSelecionado) {
      axios.get(`http://localhost:3001/listar-tabelas?banco=${bancoSelecionado}`)
        .then((res) => setTabelas(res.data))
        .catch((err) => console.error("Erro ao buscar tabelas:", err));
    } else {
      setTabelas([]);  // Limpar tabelas ao desmarcar banco
    }
  }, [bancoSelecionado]);

  // Carregar campos quando a tabela for selecionada
  useEffect(() => {
    if (bancoSelecionado && tabelaSelecionada) {
      axios.get(`http://localhost:3001/listar-campos?banco=${bancoSelecionado}&tabela=${tabelaSelecionada}`)
        .then((res) => setCampos(res.data))
        .catch((err) => console.error("Erro ao buscar campos:", err));
    }
  }, [bancoSelecionado, tabelaSelecionada]);

  // Atualizar valores conforme o usuário insere os dados
  const atualizarValor = (campo, valor) => {
    setValores({
      ...valores,
      [campo]: valor,
    });
  };

  // Inserir os dados na tabela
  const inserirRegistro = () => {
    if (!bancoSelecionado || !tabelaSelecionada || Object.keys(valores).length === 0) {
      setMensagem({ texto: "Preencha todos os campos.", tipo: "erro" });
      return;
    }

    axios.post("http://localhost:3001/inserir-registro", {
      banco: bancoSelecionado,
      tabela: tabelaSelecionada,
      valores,
    })
    .then((res) => {
      setMensagem({ texto: "Registro inserido com sucesso!", tipo: "sucesso" }); // Alerta de sucesso
    })
    .catch(() => {
      setMensagem({ texto: "Erro ao inserir registro.", tipo: "erro" }); // Alerta de erro
    });
  };

  return (
    <div>
      <h1>Inserir Registro</h1>

      {/* Seleção do Banco */}
      <label>Escolha um Banco:</label>
      <select onChange={(e) => setBancoSelecionado(e.target.value)} value={bancoSelecionado}>
        <option value="">Selecione um banco</option>
        {bancos.map((banco) => (
          <option key={banco} value={banco}>{banco}</option>
        ))}
      </select>

      {/* Seleção da Tabela */}
    
      <select onChange={(e) => setTabelaSelecionada(e.target.value)} value={tabelaSelecionada}>
        <option value="">Selecione uma tabela</option>
        {tabelas.map((tabela) => (
          <option key={tabela} value={tabela}>{tabela}</option>
        ))}
      </select>

      {/* Formulário para inserção de dados */}
      <h3>Inserir Dados:</h3>
      {campos.map((campo) => (
        <div key={campo.nome}>
          <label>{campo.nome} ({campo.tipo}):</label>
          <input
            type="text"
            onChange={(e) => atualizarValor(campo.nome, e.target.value)}
            placeholder={`Digite ${campo.nome}`}
          />
        </div>
      ))}

      {/* Botão para inserir registro */}
      <button onClick={inserirRegistro}>Inserir Registro</button>

      {/* Exibição da mensagem de sucesso ou erro */}
      {mensagem.texto && (
        <div className={`alerta ${mensagem.tipo}`}>
          {mensagem.texto}
        </div>
      )}
    </div>
  );
}

export default InserirRegistro;
