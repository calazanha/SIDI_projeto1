import React, { useState } from "react";
import './CriarBanco.css'; 

const CriarBanco = () => {
  // Estado para o nome do banco
  const [nomeBanco, setNomeBanco] = useState("");

  // Função para lidar com a submissão do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Banco de dados "${nomeBanco}" criado com sucesso!`);
    // Aqui você pode adicionar a lógica para criar o banco de dados via backend
  };

  return (
    <div>
      <h1 style={{ fontWeight: "bold" }}>Criação de Banco de Dados</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nomeBanco">Novo Banco de Dados:</label>
          <input
            type="text"
            id="nomeBanco"
            name="nomeBanco"
            value={nomeBanco}
            onChange={(e) => setNomeBanco(e.target.value)}
            placeholder="Digite o nome do banco"
            required
          />
        </div>
        <button type="submit">Criar Banco de Dados</button>
      </form>
    </div>
  );
};

export default CriarBanco;
