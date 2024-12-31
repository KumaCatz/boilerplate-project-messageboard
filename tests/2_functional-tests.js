const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
  test('Creating a new thread: POST request to /api/threads/{board}', (done) => {
    chai
      .request(server)
      .post('/api/threads/test')
      .send({
        created_on: '01-01-2001',
        reported: false,
        text: 'test',
        delete_password: 'test',
        bumped_on: '01-01-2001',
        replies: [],
        replycount: 0,
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body.acknowledged, true);
        done();
      });
  });
  test('Viewing the 10 most recent threads with 3 replies each: GET request to /api/threads/{board}', (done) => {
    chai
      .request()
      .get('/api/threads/test')
      .end((err, res) => {
        assert.equal(res.status, 200)
        
        done()
      })
  });
  // test('Deleting a thread with the incorrect password: DELETE request to /api/threads/{board} with an invalid delete_password', (done) => {
  //   done()
  // })
  // test('Deleting a thread with the correct password: DELETE request to /api/threads/{board} with a valid delete_password', (done) => {
  //   done()
  // })
  // test('Reporting a thread: PUT request to /api/threads/{board}', (done) => {
  //   done()
  // })
  // test('Creating a new reply: POST request to /api/replies/{board}', (done) => {
  //   done()
  // })
  // test('Viewing a single thread with all replies: GET request to /api/replies/{board}', (done) => {
  //   done()
  // })
  // test('Deleting a reply with the incorrect password: DELETE request to /api/replies/{board} with an invalid delete_password', (done) => {
  //   done()
  // })
  // test('Deleting a reply with the correct password: DELETE request to /api/replies/{board} with a valid delete_password', (done) => {
  //   done()
  // })
  // test('Reporting a reply: PUT request to /api/replies/{board}', (done) => {
  //   done()
  // })
});
