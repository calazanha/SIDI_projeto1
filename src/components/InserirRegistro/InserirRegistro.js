import React, { useState } from "react";
import './InserirRegistro.css';

const InserirRegistro = () => {
  const [nomeRegistro, setNomeRegistro] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Registro "${nomeRegistro}" inserido com sucesso!`);
    // Lógica de inserção de registro via backend pode ser adicionada aqui
  };

  return (
    <div>
      <h1>Inserir Registro</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nomeRegistro">Novo Registro:</label>
        <input
          type="text"
          id="nomeRegistro"
          name="nomeRegistro"
          value={nomeRegistro}
          onChange={(e) => setNomeRegistro(e.target.value)}
          placeholder="Digite o nome do registro"
          required
        />
        <button type="submit">Inserir Registro</button>
      </form>
    </div>
  );
};

export default InserirRegistro;
