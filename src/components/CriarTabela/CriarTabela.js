import React, { useState } from "react";
import './CriarTabela.css';

const CriarTabela = () => {
  const [nomeTabela, setNomeTabela] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Tabela "${nomeTabela}" criada com sucesso!`);
    // Lógica de criação da tabela via backend pode ser adicionada aqui
  };

  return (
    <div>
      <h1>Criação de Tabela</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nomeTabela">Novo Nome de Tabela:</label>
        <input
          type="text"
          id="nomeTabela"
          name="nomeTabela"
          value={nomeTabela}
          onChange={(e) => setNomeTabela(e.target.value)}
          placeholder="Digite o nome da tabela"
          required
        />
        <button type="submit">Criar Tabela</button>
      </form>
    </div>
  );
};

export default CriarTabela;
