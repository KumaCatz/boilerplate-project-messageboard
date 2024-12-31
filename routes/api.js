'use strict';

const { ObjectId } = require('mongodb');

const { client } = require('../db-connection.js');

const database = client.db('anonymousMessageBoard');
const threads = database.collection('threads');

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

    .post(async (req, res) => {
      const { text, delete_password } = req.body;

      const baseData = getBaseData(text, delete_password);

      const newThread = {
        ...baseData,
        bumped_on: baseData.created_on,
        replies: [],
        replycount: 0
      };

      try {
        const postThread = await threads.insertOne(newThread);
        delete postThread.insertedId
        res.send(postThread);  
      } catch (err) {
        res.send(err)
      }
    })

    .get(async (req, res) => {
      try {
        const recentThreads = await threads
          .find()
          .sort({ bumped_on: -1 })
          .limit(10)
          .toArray();

        const updatedThreads = recentThreads.map((thread) => {
          thread.replies.sort((a, b) => b.created_on - a.created_on);
          thread.replies = thread.replies.slice(0, 3);

          thread.replies.forEach((reply) => {
            delete reply.delete_password;
            delete reply.reported;
          });

          delete thread.delete_password;
          delete thread.reported;
          return thread;
        });

        res.send(updatedThreads);
      } catch (err) {
        res.send(err)
      }
    })

    .put(async (req, res) => {
      const { board, thread_id } = req.body;

      const thread = await threads.updateOne(
        { _id: new ObjectId(thread_id) },
        { $set: { reported: true } }
      );

      res.send('reported');
    })

    .delete(async (req, res) => {
      const { thread_id, delete_password } = req.body;

      try {
        const thread = await threads.findOne({ _id: new ObjectId(thread_id) });

        if (thread.delete_password == delete_password) {
          const deleteThread = await threads.deleteOne({
            _id: new ObjectId(thread_id),
          });
          res.send('success');
        } else {
          res.send('incorrect password');
        }
      } catch (err) {
        res.send(err)
      }
    });

  app
    .route('/api/replies/:board')

    // . You can send a POST request to /api/replies/{board} with form data including text, delete_password, & thread_id. This will update the bumped_on date to the comment's date. In the thread's replies array, an object will be saved with at least the properties _id, text, created_on, delete_password, & reported.
    .post(async (req, res) => {
      const { board, thread_id, text, delete_password } = req.body;
      const baseData = getBaseData(text, delete_password);

      const newReply = {
        _id: new ObjectId(),
        ...baseData,
      };

      const thread = await threads.updateOne(
        { _id: new ObjectId(thread_id) },
        {
          $set: { bumped_on: new Date() },
          $inc: { replycount: 1 },
          $push: { replies: newReply },
        }
      );

      res.send('test: /api/replies/:board POST');
    })

    // 8. You can send a GET request to /api/replies/{board}?thread_id={thread_id}.
    .get(async (req, res) => {
      const { board } = req.params;
      const { thread_id } = req.query;

      // Returned will be the entire thread with all its replies, also excluding the same fields from the client as the previous test.
      // delete_password and reported key-values
      const thread = await threads.findOne({ _id: new ObjectId(thread_id) })
      const updatedReplies = thread.replies.map((reply) => {
        delete reply.delete_password;
        delete reply.reported;
        return reply;
      });

      thread.replies = updatedReplies
      delete thread.delete_password;
      delete thread.reported
      res.send(thread)
      // res.send('test: /api/replies/:board GET');
    })

    // 12. You can send a PUT request to /api/replies/{board} and pass along the thread_id & reply_id. Returned will be the string reported. The reported value of the reply_id will be changed to true.
    .put(async (req, res) => {
      const {board, thread_id, reply_id} = req.body

      // const thread = await threads.findOne({ _id: new ObjectId(thread_id) })
      // const reply = thread.replies.find((reply) => new ObjectId(reply._id) == reply_id)

      const updateReply = await threads.updateOne(
        { _id: new ObjectId(thread_id), 'replies._id': new ObjectId(reply_id)},
        {
          $set: { 'replies.$.reported': true }
        }
      );


      res.send('reported')
      // res.send('test: /api/replies/:board PUT');
    })

    // 10. You can send a DELETE request to /api/replies/{board} and pass along the thread_id, reply_id, & delete_password. Returned will be the string incorrect password or success. On success, the text of the reply_id will be changed to [deleted].
    .delete(async (req, res) => {
      console.log(req.body)
      const {board, thread_id, reply_id, delete_password} = req.body

      const thread = await threads.findOne({ _id: new ObjectId(thread_id) })
      const reply = await thread.replies.find((reply) => new ObjectId(reply._id) == reply_id)

      if (reply.delete_password == delete_password) {
        const updateReply = await threads.updateOne(
          { _id: new ObjectId(thread_id), 'replies._id': new ObjectId(reply_id)},
          {
            $set: { 'replies.$.text': '[deleted]' },
          }
        );

        res.send('success')
      } else {
        res.send('incorrect password')
      }

      // res.send('test: /api/replies/:board DELETE');
    });
};
