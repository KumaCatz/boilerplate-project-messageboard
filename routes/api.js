'use strict';

const { client }  = require('../db-connection.js');

const database  = client.db("anonymousMessageBoard");
const threads   = database.collection("threads");

const getBaseData = (text, delete_password) => {
  const date = new Date();

  return {
    'text': '',
    'created_on': date,
    'delete_password': ''
  };
}

module.exports = function (app) {

  app.route('/api/threads/:board')
    .post((req, res) => {
      const {text, delete_password} = req.body
      console.log(req.params)
      console.log(req.body)
      const baseData = getBaseData(text, delete_password)
      const newThread = {
        ...baseData,
        'bumped_on': date,
        'reported': false,
        'replies': []
      }

    })
    .get((req, res) => {

    });
  app.route('/api/replies/:board');

};
