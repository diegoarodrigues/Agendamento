import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import { v4 as uuid } from 'uuid';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS events (
      id UUID PRIMARY KEY,
      title TEXT NOT NULL,
      start TIMESTAMPTZ NOT NULL,
      "end" TIMESTAMPTZ NOT NULL,
      location TEXT,
      description TEXT,
      color TEXT,
      remind_minutes_before INT
    );
  `);

  const { rows } = await pool.query('SELECT COUNT(*) FROM events');
  if (parseInt(rows[0].count, 10) === 0) {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0);
    await pool.query(
      `INSERT INTO events (id, title, start, "end", color)
       VALUES ($1,$2,$3,$4,$5),
              ($6,$7,$8,$9,$10),
              ($11,$12,$13,$14,$15)`,
      [
        uuid(),
        'Reunião de equipe',
        start.toISOString(),
        new Date(start.getTime() + 3600000).toISOString(),
        '#3b82f6',
        uuid(),
        'Almoço com cliente',
        new Date(start.getTime() + 3 * 3600000).toISOString(),
        new Date(start.getTime() + 4 * 3600000).toISOString(),
        '#10b981',
        uuid(),
        'Call do projeto',
        new Date(start.getTime() + 24 * 3600000).toISOString(),
        new Date(start.getTime() + 25 * 3600000).toISOString(),
        '#f59e0b',
      ]
    );
  }
}

app.get('/events', async (_req, res) => {
  const { rows } = await pool.query('SELECT * FROM events ORDER BY start');
  res.json(
    rows.map((r) => ({
      id: r.id,
      title: r.title,
      start: r.start,
      end: r.end,
      location: r.location,
      description: r.description,
      color: r.color,
      remindMinutesBefore: r.remind_minutes_before,
    }))
  );
});

app.post('/events', async (req, res) => {
  const e = { id: uuid(), ...req.body };
  await pool.query(
    'INSERT INTO events (id, title, start, "end", location, description, color, remind_minutes_before) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
    [
      e.id,
      e.title,
      e.start,
      e.end,
      e.location,
      e.description,
      e.color,
      e.remindMinutesBefore,
    ]
  );
  res.status(201).json(e);
});

app.put('/events/:id', async (req, res) => {
  const id = req.params.id;
  const e = req.body;
  await pool.query(
    'UPDATE events SET title=$1, start=$2, "end"=$3, location=$4, description=$5, color=$6, remind_minutes_before=$7 WHERE id=$8',
    [
      e.title,
      e.start,
      e.end,
      e.location,
      e.description,
      e.color,
      e.remindMinutesBefore,
      id,
    ]
  );
  res.json({ id, ...e });
});

app.delete('/events/:id', async (req, res) => {
  await pool.query('DELETE FROM events WHERE id=$1', [req.params.id]);
  res.status(204).end();
});

const port = process.env.PORT || 3001;

init()
  .then(() => {
    app.listen(port, () => console.log(`API ouvindo na porta ${port}`));
  })
  .catch((err) => {
    console.error('Falha ao iniciar', err);
    process.exit(1);
  });
