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

app.get("/listar-tabelas", (req, res) => {
  const { banco } = req.query;
  if (!banco) return res.status(400).send("Banco não informado.");

  const sql = `SHOW TABLES FROM ${banco}`;
  db.query(sql, (err, result) => {
      if (err) {
          console.error("Erro ao listar tabelas:", err);
          res.status(500).send("Erro ao listar tabelas.");
      } else {
          const tabelas = result.map(row => Object.values(row)[0]);
          res.json(tabelas);
      }
  });
});

app.get("/listar-campos", (req, res) => {
  const { banco, tabela } = req.query;
  if (!banco || !tabela) return res.status(400).send("Banco ou tabela não informados.");

  const sql = `SHOW COLUMNS FROM ${banco}.${tabela}`;
  db.query(sql, (err, result) => {
      if (err) {
          console.error("Erro ao listar campos:", err);
          res.status(500).send("Erro ao listar campos.");
      } else {
          // Retorna nome do campo e tipo de dado
          const campos = result.map(row => ({
              nome: row.Field,
              tipo: row.Type
          }));
          res.json(campos);
      }
  });
});

app.get('/listar-registros', (req, res) => {
  const { banco, tabela } = req.query; // Recebe o nome do banco e da tabela do frontend

  if (!banco || !tabela) {
    return res.status(400).json({ error: 'Banco e tabela são obrigatórios' });
  }

  const sql = `SELECT * FROM ${banco}.${tabela}`;
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao listar registros:', err);
      return res.status(500).json({ error: 'Erro ao listar registros' });
    }
    res.json(results);
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
  const sql = `CREATE TABLE IF NOT EXISTS ${banco}.${nomeTabela} (${colunasSQL})`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Erro ao criar tabela:", err);
      res.status(500).send("Erro ao criar tabela.");
    } else {
      res.send(`Tabela "${nomeTabela}" criada no banco "${banco}".`);
    }
  });
});

app.post("/inserir-registro", (req, res) => {
  const { banco, tabela, valores } = req.body;
  if (!banco || !tabela || !valores) {
      return res.status(400).send("Dados insuficientes.");
  }

  const colunas = Object.keys(valores).join(", ");
  const valoresArray = Object.values(valores).map(val => `'${val}'`).join(", ");
  
  const sql = `INSERT INTO ${banco}.${tabela} (${colunas}) VALUES (${valoresArray})`;

  db.query(sql, (err, result) => {
      if (err) {
          console.error("Erro ao inserir registro:", err);
          res.status(500).send("Erro ao inserir registro.");
      } else {
          res.send(`Registro inserido com sucesso na tabela "${tabela}".`);
      }
  });
});

app.get('/listar-bancos', (req, res) => {
  const sql = "SHOW DATABASES";
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao listar bancos:", err);
      return res.status(500).json({ error: "Erro ao listar bancos" });
    }
    const bancos = results.map(row => row.Database);
    res.json(bancos);
  });
});

// Rota para listar tabelas de um banco selecionado
app.get('/listar-tabelas', (req, res) => {
  const { banco } = req.query;

  if (!banco) {
    return res.status(400).json({ error: "Banco de dados não especificado" });
  }

  const sql = `SHOW TABLES FROM ${banco}`;
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao listar tabelas:", err);
      return res.status(500).json({ error: "Erro ao listar tabelas" });
    }
    const tabelas = results.map(row => Object.values(row)[0]);
    res.json(tabelas);
  });
});


app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
