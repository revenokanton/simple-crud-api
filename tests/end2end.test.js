const server = require('../index');
const request = require('supertest');

let createdId;
describe('GET /person', () => {
  it('GET-request we get all objects, []', (done) => {
    request
      .agent(server)
      .get('/person')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [], done);
  });
  it('POST-request creates a new object', (done) => {
    request
      .agent(server)
      .post('/person')
      .send({
        name: 'Test',
        age: 12,
        hobbies: [],
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        console.log(res.body);
        createdId = res.body.id;
        res.body.id = 'some fixed id';
      })
      .expect(
        201,
        {
          id: 'some fixed id',
          name: 'Test',
          age: 12,
          hobbies: [],
        },
        done,
      );
  });

  it('GET-request, we try to get the created object by its id', (done) => {
    request
      .agent(server)
      .get(`/person/${createdId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        200,
        {
          id: createdId,
          name: 'Test',
          age: 12,
          hobbies: [],
        },
        done,
      );
  });

  it('PUT-request, we are trying to update the created object with', (done) => {
    request
      .agent(server)
      .put(`/person/${createdId}`)
      .send({
        name: 'Test2',
        age: 13,
        hobbies: ['Football'],
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        200,
        {
          id: createdId,
          name: 'Test2',
          age: 13,
          hobbies: ['Football'],
        },
        done,
      );
  });
  it('DELETE-request to delete the created object by id', (done) => {
    request
      .agent(server)
      .delete(`/person/${createdId}`)
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(204, '', done);
  });
  it('GET-request, we are trying to get a remote object by id', (done) => {
    request
      .agent(server)
      .get(`/person/${createdId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});
