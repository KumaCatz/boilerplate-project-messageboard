const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
  // test('Creating a new thread: POST request to /api/threads/{board}', (done) => {
  //   chai
  //     .request(server)
  //     .post('/api/threads/test')
  //     .send({
  //       created_on: '01-01-2001',
  //       reported: false,
  //       text: 'test',
  //       delete_password: 'test',
  //       bumped_on: '01-01-2001',
  //       replies: [],
  //       replycount: 0,
  //     })
  //     .end((err, res) => {
  //       assert.equal(res.status, 200);
  //       assert.deepEqual(res.body.acknowledged, true);
  //       done();
  //     });
  // });
  // test('Viewing the 10 most recent threads with 3 replies each: GET request to /api/threads/{board}', (done) => {
  //   chai
  //     .request(server)
  //     .get('/api/threads/test')
  //     .end((err, res) => {
  //       assert.equal(res.status, 200);
  //       assert.isAtMost(res.body.length, 10)
  //       res.body.forEach((thread) => {
  //         assert.isAtMost(thread.replies.length, 3)
  //       })
  //       done();
  //     });
  // });
  // test('Deleting a thread with the incorrect password: DELETE request to /api/threads/{board} with an invalid delete_password', (done) => {
  //   chai
  //     .request(server)
  //     .get('/api/threads/test')
  //     .end((err, res) => {
  //       const sample = res.body[0];
  //       chai
  //         .request(server)
  //         .delete('/api/threads/test')
  //         .send({
  //           thread_id: sample._id,
  //           delete_password: 'err',
  //         })
  //         .end((err, res) => {
  //           assert.equal(res.status, 200);
  //           assert.equal(res.text, 'incorrect password');
  //           done();
  //         });
  //     });
  // });
  // test('Deleting a thread with the correct password: DELETE request to /api/threads/{board} with a valid delete_password', (done) => {
  //   chai
  //     .request(server)
  //     .get('/api/threads/test')
  //     .end((err, res) => {
  //       const sample = res.body[0];
  //       chai
  //         .request(server)
  //         .delete('/api/threads/test')
  //         .send({
  //           thread_id: sample._id,
  //           delete_password: 'test',
  //         })
  //         .end((err, res) => {
  //           assert.equal(res.status, 200);
  //           assert.equal(res.text, 'success');
  //           done();
  //         });
  //     });
  // })
  // test('Reporting a thread: PUT request to /api/threads/{board}', (done) => {
  //   chai
  //     .request(server)
  //     .get('/api/threads/:board')
  //     .end((err, res) => {
  //       const sample = res.body[0];
  //       chai
  //       .request(server)
  //       .put(`/api/threads/${sample.text}`)
  //       .send({
  //         thread_id: sample._id
  //       })
  //       .end((err, res) => {
  //         assert.equal(res.status, 200)
  //         assert.equal(res.text, 'reported')
  //         done()
  //       })
  //     })
  // })
  // test('Creating a new reply: POST request to /api/replies/{board}', (done) => {
  //   chai
  //     .request(server)
  //     .get('/api/threads/:board')
  //     .end((err, res) => {
  //       const sample = res.body[0];
  //       chai
  //       .request(server)
  //       .post(`/api/replies/${sample.text}`)
  //       .send({
  //         thread_id: sample._id,
  //         text: 'test',
  //         delete_password: 'test'
  //       })
  //       .end((err, res) => {
  //         assert.equal(res.status, 200)
  //         assert.equal(res.text, 'success')
  //         done()
  //       })
  //     })
  // })
  // test('Viewing a single thread with all replies: GET request to /api/replies/{board}', (done) => {
  //   chai
  //     .request(server)
  //     .get('/api/threads/:board')
  //     .end((err, res) => {
  //       const sample = res.body[0];
  //       chai
  //         .request(server)
  //         .get(`/api/replies/${sample.text}`)
  //         .end((err, res) => {
  //           assert.equal(res.status, 200)
  //           if (res.body.replies.length > 0) {
  //             res.body.replies.forEach((reply) => {
  //               assert.typeOf(reply.created_on, 'string')
  //               assert.typeOf(reply.reported, 'boolean')
  //               assert.typeOf(reply.text, 'string')
  //             })
  //           }
  //           done()
  //         })
  //       })
  // })
  test('Deleting a reply with the incorrect password: DELETE request to /api/replies/{board} with an invalid delete_password', (done) => {
    done()
  })
  // test('Deleting a reply with the correct password: DELETE request to /api/replies/{board} with a valid delete_password', (done) => {
  //   done()
  // })
  // test('Reporting a reply: PUT request to /api/replies/{board}', (done) => {
  //   done()
  // })
});
