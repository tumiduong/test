import express from 'express';
import Model from '../db/models/model';
import fs from 'fs';
import * as csv from 'fast-csv';
import multer from 'multer';
import FuzzySet from 'fuzzyset.js'
import hash from 'object-hash';

const customersRouter = express.Router();
const customersModel = new Model('customers');

const upload = multer({ dest: 'tmp/csv/' });

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let fileRows = [];
let fileName = "";
let customerEmail = "duong.julie@live.com";

customersRouter.get('/', (req, res) => {
  customersModel.select('*')
    .then(result => res.json(result.rows))
    .catch(error => res.json(error.stack))
});

customersRouter.post('/', (req, res) => {
  const { left, right, score } = req.body;
  const hashKey = hash([fileName, customerEmail]);

  const index = fileRows.length && fileRows[0].indexOf(left);
  const data = fileRows.map(x => x[index]).slice(1);
  const samples = shuffleArray([...data]).slice(0, 3).toString();

  const columns = 'file_key, left_value, right_value, score, samples';
  const values = `'${hashKey}', '${left}', '${right}', '${score}', '{${samples}}'`;

  customersModel.insertWithReturn(columns, values)
    .then(result => res.json(result.rows))
    .catch(error => res.json(error.stack))

});

customersRouter.post('/upload', upload.single('file'), (req, res) => {
  const { path, originalname } = req.file;

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

  // check for csv or throw err

  const fset = FuzzySet(rightValues)

  fileRows = [];
  fileName = "";

  csv.parseFile(path)
    .on("data", function (data) {
      
      fileRows.push(data);
    })
    .on("end", function () {
      fs.unlinkSync(path);
      fileName = originalname;
      const newVals = [];
      let index = 0;
      for (const val of fileRows[0]) {
        const value = fset.get(val)[0];
        newVals.push({id: index, left: val, right: value[1], score: value[0]})
        index++;
      }

      res.json({
        newTemplate: newVals
      })
    })
  
})

export default customersRouter;