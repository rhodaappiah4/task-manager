import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World! My Task Manager API is running');
});

export default app;