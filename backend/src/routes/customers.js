import express from 'express';
import Model from '../db/models/model';

const customersRouter = express.Router();

const customersModel = new Model('customers');

customersRouter.get('/', (req, res) => {
  // customersModel.select('*')
  //   .then(result => res.json(result.rows))
  //   .catch(error => res.json(error.stack))
  res.json({message: "hi"})
});

customersRouter.post('/', (req, res) => {
  // const { name, description, price, image } = req.body;
  // const columns = 'name, description, price, image';
  // const values = `'${name}', '${description}', '${price}', '${image}'`;
  // puffsModel.insertWithReturn(columns, values)
  //   .then(result => res.json(result.rows))
  //   .catch(error => res.json(error.stack))
  res.json({message: "hi"})
})

export default customersRouter;