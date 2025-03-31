import React, { useState } from "react";

function CriarBanco() {
  const [nomeBanco, setNomeBanco] = useState("");

  const criarBanco = async () => {
    if (!nomeBanco) {
      alert("Digite um nome para o banco de dados!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/criar-banco", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nomeBanco }),
      });

      const data = await response.json();
      alert(data.mensagem || data.erro);
    } catch (error) {
      alert("Erro ao conectar com o servidor");
      console.error("Erro:", error);
    }
  };

  return (
    <div>
      <h1>Criar Banco de Dados</h1>
      <input
        type="text"
        placeholder="Nome do Banco"
        value={nomeBanco}
        onChange={(e) => setNomeBanco(e.target.value)}
      />
      <button onClick={criarBanco}>Criar Banco</button>
    </div>
  );
}

export default CriarBanco;
