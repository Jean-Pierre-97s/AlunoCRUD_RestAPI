import { hash } from 'bcrypt';
import * as dotenv from 'dotenv';
import { Pool } from 'pg';
import { Role } from 'src/modules/user/enum/role.enum';
import { v4 as uuidV4 } from 'uuid';

dotenv.config({ path: `.env` });

const newDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

// Create a new PostgreSQL client pool
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

// Define your seed data

// Function to insert seed data into the database
async function seedDatabase() {
  const client = await pool.connect();

  const password = await hash('Senh@123', 12);

  // adiciona email de administrador no banco de dados
  const userSeedData = [
    {
      id: uuidV4(),
      nome: 'admin',
      email: 'emailDeTeste@gmail.com',
      role: Role.admin,
      password: password,
      created_at: newDate,
    },
    // Add more seed data as needed
  ];

  try {
    await client.query('BEGIN');
    // Loop through the seed data and insert each record into the database
    for (const data of userSeedData) {
      const query = `INSERT INTO "user"(id, nome, email, role, password, created_at) VALUES ($1, $2, $3, $4, $5, $6)`;
      const values = [
        data.id,
        data.nome,
        data.email,
        data.role,
        data.password,
        data.created_at,
      ];
      await client.query(query, values);
    }
    // Connect to the database

    // Commit the transaction
    await client.query('COMMIT');

    console.log('Seed data inserted successfully');

    // Release the client
    client.release();
  } catch (error) {
    // If there is an error, rollback the transaction
    await client.query('ROLLBACK');
    console.error('Error seeding database:', error);
  } finally {
    // End the database connection pool
    pool.end();
  }
}

// Call the seedDatabase function to insert the seed data
seedDatabase();
