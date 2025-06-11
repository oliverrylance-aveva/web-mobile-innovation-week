// backend/index.ts
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/items', async (req, res) => {
  const items = await prisma.item.findMany();
  res.json(items);
});

app.post('/items', async (req, res) => {
  const { name } = req.body;
  const newItem = await prisma.item.create({ data: { name } });
  res.json(newItem);
});

app.listen(4000, () => {
  console.log('Server running at http://localhost:4000');
});
