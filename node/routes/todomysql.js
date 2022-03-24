var express = require('express');
var router = express.Router();
const connector = require('../connect');
router.get('/createTable', function (req, res) {
  var sql =
    'create table todos(id int AUTO_INCREMENT PRIMARY KEY,item varchar(50),status varchar(20))';
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.get('/', function (req, res) {
  var sql = 'select * from todos';
  connector.query(sql, function (err, results) {
    res.json({ err, results });
  });
});
router.post('/', function (req, res) {
  const { item, status } = req.body;
  var sql = `insert into todos (item,status) values ("${item}","${status}")`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.delete('/:id', function (req, res) {
  let sql;
  if (req.params.id === 'delete') {
    sql = 'drop table todos';
  } else {
    sql = `delete from todos where id=${Number(req.params.id)}`;
  }
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.put('/:id', function (req, res) {
  const { item, status } = req.body;
  var sql = `update todos set item="${item}",status="${status}" where id=${Number(
    req.params.id
  )}`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
module.exports = router;
