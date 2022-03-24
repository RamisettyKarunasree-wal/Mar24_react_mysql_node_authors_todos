const connector = require('../connect');
const createAuthorsTable = (req, res) => {
  var sql =
    'create table authors(id int AUTO_INCREMENT PRIMARY KEY,first_name varchar(50),last_name varchar(50),dob date,dod date)';
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
};

const getAuthors = (req, res) => {
  var sql = 'select * from authors';
  connector.query(sql, function (err, results) {
    res.json({ err, results });
  });
};
const postAuthors = (req, res) => {
  const { first_name, last_name, dob, dod } = req.body;
  var sql = `insert into authors (first_name, last_name, dob, dod) values ("${first_name}", "${last_name}", "${dob}", "${dod}")`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
};
const deleteAuthors = (req, res) => {
  let sql;
  if (req.params.id === 'delete') {
    sql = 'drop table authors';
  } else {
    sql = `delete from authors where id=${Number(req.params.id)}`;
  }
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
};
const updateAuthors = (req, res) => {
  const { first_name, last_name, dob, dod } = req.body;
  var sql = `update authors set first_name="${first_name}", last_name="${last_name}", dob="${dob}", dod="${dod}" where id=${Number(
    req.params.id
  )}`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
};
module.exports = {
  getAuthors,
  postAuthors,
  deleteAuthors,
  updateAuthors,
  createAuthorsTable,
};
