import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CriarTabela.css"; // Certifique-se de ter um arquivo CSS com o estilo do alerta

function CriarTabela() {
  const [bancos, setBancos] = useState([]);
  const [bancoSelecionado, setBancoSelecionado] = useState("");
  const [nomeTabela, setNomeTabela] = useState("");
  const [colunas, setColunas] = useState([{ nome: "", tipo: "VARCHAR(255)" }]);
  const [mensagem, setMensagem] = useState(""); // Estado para mensagem de alerta

  // Carregar bancos ao iniciar o componente
  useEffect(() => {
    axios.get("http://localhost:3001/listar-bancos")
      .then((res) => setBancos(res.data))
      .catch((err) => console.error("Erro ao buscar bancos:", err));
  }, []);

  // Adicionar uma nova coluna ao formulário
  const adicionarColuna = () => {
    setColunas([...colunas, { nome: "", tipo: "VARCHAR(255)" }]);
  };

  // Atualizar os dados da coluna
  const atualizarColuna = (index, key, value) => {
    const novasColunas = [...colunas];
    novasColunas[index][key] = value;
    setColunas(novasColunas);
  };

  // Criar a tabela no banco selecionado
  const criarTabela = () => {
    if (!bancoSelecionado || !nomeTabela || colunas.length === 0) {
      setMensagem({ texto: "Preencha todos os campos.", tipo: "erro" });
      return;
    }

    axios.post("http://localhost:3001/criar-tabela", {
      banco: bancoSelecionado,
      nomeTabela,
      colunas,
    })
    .then((res) => {
      setMensagem({ texto: "Tabela criada com sucesso!", tipo: "sucesso" }); // Alerta de sucesso
    })
    .catch(() => {
      setMensagem({ texto: "Erro ao criar tabela.", tipo: "erro" }); // Alerta de erro
    });
  };

  return (
    <div>
      <h1>Criar Tabela</h1>

      {/* Seleção do Banco */}
      <label>Escolha um Banco:</label>
      <select onChange={(e) => setBancoSelecionado(e.target.value)} value={bancoSelecionado}>
        <option value="">Selecione um banco</option>
        {bancos.map((banco) => (
          <option key={banco} value={banco}>{banco}</option>
        ))}
      </select>

      {/* Nome da Tabela */}
      <label>Nome da Tabela:</label>
      <input 
        type="text" 
        value={nomeTabela} 
        onChange={(e) => setNomeTabela(e.target.value)} 
        placeholder="Digite o nome da tabela" 
      />

      {/* Campos para definir as colunas */}
      <h3>Definir Colunas:</h3>
      {colunas.map((coluna, index) => (
        <div key={index} className="coluna">
          <input 
            type="text" 
            value={coluna.nome} 
            onChange={(e) => atualizarColuna(index, "nome", e.target.value)} 
            placeholder="Nome da Coluna"
          />
          <select 
            value={coluna.tipo} 
            onChange={(e) => atualizarColuna(index, "tipo", e.target.value)}
          >
            <option value="VARCHAR(255)">Texto</option>
            <option value="INT">Número Inteiro</option>
            <option value="FLOAT">Número Decimal</option>
            <option value="DATE">Data</option>
          </select>
        </div>
      ))}

      {/* Botão para adicionar mais colunas */}
      <button onClick={adicionarColuna}>Adicionar Coluna</button>

      {/* Botão para criar a tabela */}
      <button onClick={criarTabela}>Criar Tabela</button>

      {/* Exibição da mensagem de sucesso ou erro */}
      {mensagem.texto && (
        <div className={`alerta ${mensagem.tipo}`}>
          {mensagem.texto}
        </div>
      )}
    </div>
  );
}

export default CriarTabela;
