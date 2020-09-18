import express from 'express';

const indexRouter = express.Router();

indexRouter.get('/', (req, res) =>
  res.json({ message: 'Welcome to Express API template' })
);

indexRouter.post('/', (req, res) =>
  res.json({ message: 'Welcome to Express API template' })
);

export default indexRouter;