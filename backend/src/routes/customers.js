import express from 'express';
import Model from '../db/models/model';
import fs from 'fs';
import * as csv from 'fast-csv';
import multer from 'multer';
import FuzzySet from 'fuzzyset.js'

const customersRouter = express.Router();
const customersModel = new Model('customers');

const upload = multer({ dest: 'tmp/csv/' });

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

  const { path } = req.file;

  const rightValues = [
    'customer_id', 'firstname',
    'lastname',    'email',
    'company',     'address1',
    'address2',    'website',
    'city',        'state',
    'country',     'zip',
    'note',        'home_phone',
    'work_phone',  'mobile_phone',
    'fax_phone',   'pager_phone'
  ];

  const leftValues = [ 'custid', 'fname', 'lname', 'e-mail', 'company', 'adrs_1', 'adrs_2', 'site',
'city', 'state', 'country', 'zip', 'note', 'homephone', 'workphone', 'mobphone', 'fax', 'pager']

  const fset = FuzzySet(rightValues)
  
  const fileRows = [];
  csv.parseFile(path)
    .on("data", function (data) {
      fileRows.push(data);
    })
    .on("end", function () {
      fs.unlinkSync(path);

      const newVals = [];
      for (const val of leftValues) {
        const value = fset.get(val)[0];
        newVals.push({left: val, right: value[1], score: value[0]})
      }

      res.json({
        fileRows,
        newTemplate: newVals
      })
    })
  
})

export default customersRouter;