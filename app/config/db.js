import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "gabriel", // seu usuário do PostgreSQL
  host: "localhost", // ou IP do servidor
  database: "development_db", // nome do banco
  password: "2009", // senha do banco
  port: 5432, // porta padrão PostgreSQL
});

export default pool;
