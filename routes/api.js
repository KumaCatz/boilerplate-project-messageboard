'use strict';

const { client }  = require('../db-connection.js');

const database  = client.db("anonymousMessageBoard");
const threads   = database.collection("threads");

const date = new Date();
const baseData = {
  'text': '',
  'created_on': date,
  'delete_password': ''
};

module.exports = function (app) {

  app.route('/api/threads/:board')
    .post((req, res) => {
      console.log(req.params)
      console.log(req.body)

    })
    .get((req, res) => {

    });
  app.route('/api/replies/:board');

};
