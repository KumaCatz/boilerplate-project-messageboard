'use strict';

const { ObjectId } = require('mongodb')

const { client }   = require('../db-connection.js');

const database = client.db('anonymousMessageBoard');
const threads = database.collection('threads');
const replies = database.collection('replies');

const getBaseData = (text, delete_password) => {
  const date = new Date();

  return {
    created_on: date,
    reported: false,
    text,
    delete_password,
  };
};

module.exports = function (app) {
  app
    .route('/api/threads/:board')

    // You can send a POST request to /api/threads/{board}
    .post(async (req, res) => {
      // with form data including text and delete_password.
      const { text, delete_password } = req.body;

      const baseData = getBaseData(text, delete_password);

      // The saved database record will have at least the fields _id, text, created_on(date & time), bumped_on(date & time, starts same as created_on), reported (boolean), delete_password, & replies (array).
      const newThread = {
        ...baseData,
        bumped_on: baseData.created_on,
        replies: [],
      };
      const insertRes = await threads.insertOne(newThread);
      res.send(insertRes);

      // res.send('test: /api/threads/:board GET');
    })

    // 7. You can send a GET request to /api/threads/{board}.
    .get(async (req, res) => {
      // Returned will be an array of the most recent 10 bumped threads on the board
      const recentThreads = await threads

        .find()
        .sort({ bumped_on: -1 })
        .limit(10)
        .toArray();

      //with only the most recent 3 replies for each
      const updatedThreads = recentThreads.map((thread) => {
        thread.replies.sort((a, b) => b.created_on - a.created_on);
        thread.replies = thread.replies.slice(0, 3);
        delete thread.delete_password;
        delete thread.reported;
        return thread;
      });

      // The reported and delete_password fields will not be sent to the client.
      res.send(updatedThreads);

      // res.send('test: /api/threads/:board GET');
    })

    // 11. You can send a PUT request to /api/threads/{board} and pass along the thread_id. Returned will be the string reported. The reported value of the thread_id will be changed to true.
    .put(async (req, res) => {
      const { board, thread_id } = req.body;

      console.log('searching thread...')

      const thread = await threads.updateOne(
        { _id: new ObjectId(thread_id) },
        { $set: { reported: true } }
      )

      console.log(thread)

      res.send('reported')
      // res.send('test: /api/threads/:board PUT');
    })

    .delete((req, res) => {
      // 9. You can send a DELETE request to /api/threads/{board} and pass along the thread_id & delete_password to delete the thread. Returned will be the string incorrect password or success.

      res.send('test: /api/threads/:board DELETE');
    });

  app
    .route('/api/replies/:board')

    .post((req, res) => {
      // . You can send a POST request to /api/replies/{board} with form data including text, delete_password, & thread_id. This will update the bumped_on date to the comment's date. In the thread's replies array, an object will be saved with at least the properties _id, text, created_on, delete_password, & reported.

      const { board, thread_id, text, delete_password } = req.body;
      const newReply = getBaseData(text, delete_password);

      res.send('test: /api/replies/:board POST');
    })

    .get((req, res) => {
      // 8. You can send a GET request to /api/replies/{board}?thread_id={thread_id}. Returned will be the entire thread with all its replies, also excluding the same fields from the client as the previous test.

      res.send('test: /api/replies/:board GET');
    })

    .put((req, res) => {
      // 12. You can send a PUT request to /api/replies/{board} and pass along the thread_id & reply_id. Returned will be the string reported. The reported value of the reply_id will be changed to true.

      res.send('test: /api/replies/:board PUT');
    })

    .delete((req, res) => {
      // 10. You can send a DELETE request to /api/replies/{board} and pass along the thread_id, reply_id, & delete_password. Returned will be the string incorrect password or success. On success, the text of the reply_id will be changed to [deleted].

      res.send('test: /api/replies/:board DELETE');
    });
};
