const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "", 
});

app.get("/listar-bancos", (req, res) => {
    const sql = "SHOW DATABASES";

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Erro ao listar bancos:", err);
            res.status(500).send("Erro ao listar bancos.");
        } else {
            const bancos = result.map((row) => Object.values(row)[0]); // Pegando apenas os nomes
            res.json(bancos);
        }
    });
});


app.post("/criar-banco", (req, res) => {
  const { nomeBanco } = req.body;

  if (!nomeBanco) {
    return res.status(400).json({ erro: "O nome do banco é obrigatório" });
  }

  db.query(`CREATE DATABASE IF NOT EXISTS \`${nomeBanco}\``, (err, result) => {
    if (err) {
      console.error("Erro ao criar banco:", err);
      return res.status(500).json({ erro: "Erro ao criar banco de dados" });
    }
    res.json({ mensagem: `Banco de dados '${nomeBanco}' criado com sucesso!` });
  });
});

app.post("/criar-tabela", (req, res) => {
    const { banco, nomeTabela, colunas } = req.body;

    if (!banco || !nomeTabela || !colunas || colunas.length === 0) {
        return res.status(400).send("Dados insuficientes.");
    }

    let colunasSQL = colunas.map(col => `${col.nome} ${col.tipo}`).join(", ");

    const sql = `CREATE TABLE IF NOT EXISTS ${banco}.${nomeTabela} (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        ${colunasSQL}
    )`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Erro ao criar tabela:", err);
            res.status(500).send("Erro ao criar tabela.");
        } else {
            res.send(`Tabela "${nomeTabela}" criada no banco "${banco}".`);
        }
    });
});


app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
