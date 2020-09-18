import express from 'express';
import Model from '../db/models/model';

const customersRouter = express.Router();

const customersModel = new Model('customers');

const multer = require('multer');

const upload = multer({ dest: 'tmp/csv/' });
const csv = require('fast-csv');
const fs = require('fs');

customersRouter.get('/', (req, res) => {
  // customersModel.select('*')
  //   .then(result => res.json(result.rows))
  //   .catch(error => res.json(error.stack))
  res.json({message: "hi"})
});

customersRouter.post('/', upload.single('file'), (req, res) => {
  // const { name, description, price, image } = req.body;
  // const columns = 'name, description, price, image';
  // const values = `'${name}', '${description}', '${price}', '${image}'`;
  // puffsModel.insertWithReturn(columns, values)
  //   .then(result => res.json(result.rows))
  //   .catch(error => res.json(error.stack))
  // const { path } = req.file

  const fileRows = [];
  csv.parseFile(req.file.path)
    .on("data", function (data) {
      fileRows.push(data); // push each row
    })
    .on("end", function () {
      console.log(fileRows) //contains array of arrays. Each inner array represents row of the csv file, with each element of it a column
      fs.unlinkSync(req.file.path);   // remove temp file
      //process "fileRows" and respond
      res.json({fileRows})
    })
  
})

export default customersRouter;