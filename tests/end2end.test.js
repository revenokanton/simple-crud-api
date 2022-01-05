const server = require('../index');
const request = require('supertest');

let createdId;
describe('Scenario with object get, create, update, delete, get and check that deleted', () => {
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

describe('Error scenarios', () => {
  it('GET error scenarios', (done) => {
    request
      .agent(server)
      .get('/person/1233')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, { message: 'Id is not valid.' }, done);
  });
  it('GET error scenarios', (done) => {
    request
      .agent(server)
      .get('/person/346fdfd5-54eb-4132-9a6a-53afee2d1c26')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, { message: 'No person with given id found.' }, done);
  });
  it('DELETE error scenarios', (done) => {
    request
      .agent(server)
      .delete('/person/1233')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, { message: 'Id is not valid.' }, done);
  });
  it('DELETE error scenarios', (done) => {
    request
      .agent(server)
      .delete('/person/346fdfd5-54eb-4132-9a6a-53afee2d1c27')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, { message: 'No person with given id found.' }, done);
  });
  it('PUT error scenarios', (done) => {
    request
      .agent(server)
      .put('/person/1233')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, { message: 'Id is not valid.' }, done);
  });
  it('PUT error scenarios', (done) => {
    request
      .agent(server)
      .put('/person/346fdfd5-54eb-4132-9a6a-53afee2d1c27')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, { message: 'No person with given id found.' }, done);
  });
  it('POST error scenarios', (done) => {
    request
      .agent(server)
      .post('/person')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500, done);
  });
  it('POST error scenarios', (done) => {
    request
      .agent(server)
      .post('/person')
      .send({
        fakeName: '',
        fakeAge: '',
        fakeHobbies: [],
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        400,
        { message: 'Required parameters are missing: name,age,hobbies' },
        done,
      );
  });
});

describe('Success scenarios', () => {
  const objects = [];
  it('POST-request creates a new object', (done) => {
    request
      .agent(server)
      .post('/person')
      .send({
        name: 'Test1',
        age: 12,
        hobbies: [],
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        objects.push(res.body);
      })
      .expect(201, done);
  });
  it('POST-request creates a new object', (done) => {
    request
      .agent(server)
      .post('/person')
      .send({
        name: 'Test2',
        age: 12,
        hobbies: [],
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        objects.push(res.body);
      })
      .expect(201, done);
  });
  it('POST-request creates a new object', (done) => {
    request
      .agent(server)
      .post('/person')
      .send({
        name: 'Test3',
        age: 12,
        hobbies: [],
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        objects.push(res.body);
      })
      .expect(201, done);
  });
  it('DELETE all objects, []', (done) => {
    request
      .agent(server)
      .delete(`/person/${objects[0].id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(204, done);
  });
  it('DELETE all objects, []', (done) => {
    request
      .agent(server)
      .delete(`/person/${objects[1].id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(204, done);
  });
  it('DELETE all objects, []', (done) => {
    request
      .agent(server)
      .delete(`/person/${objects[2].id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(204, done);
  });
  it('GET-request we get all objects, []', (done) => {
    request
      .agent(server)
      .get('/person')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [], done);
  });
});
