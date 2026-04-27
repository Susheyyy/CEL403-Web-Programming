const assert = require('assert');
const request = require('supertest');
const sinon = require('sinon');

const Ward = require('../models/ward');
const { app } = require('../index');

describe('Backend API Endpoints', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('GET / should return Hello World', async function () {
    const response = await request(app).get('/');

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.text, 'Hello World!');
  });

  it('GET /api/wards should return wards', async function () {
    const fakeWards = [{ name: 'Alice', prn: '123', subject: 'Math' }];
    const sortStub = sinon.stub().resolves(fakeWards);
    sinon.stub(Ward, 'find').returns({ sort: sortStub });

    const response = await request(app).get('/api/wards');

    assert.strictEqual(response.status, 200);
    assert.deepStrictEqual(response.body, fakeWards);
  });

  it('POST /api/wards should return 400 when required fields are missing', async function () {
    const response = await request(app).post('/api/wards').send({ name: 'Alice' });

    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.message, 'Name, PRN, and subject are required');
  });

  it('POST /api/wards should create a ward', async function () {
    const payload = { name: 'Alice', prn: '123', subject: 'Math' };
    const savedWard = { _id: '1', ...payload };
    sinon.stub(Ward, 'create').resolves(savedWard);

    const response = await request(app).post('/api/wards').send(payload);

    assert.strictEqual(response.status, 201);
    assert.deepStrictEqual(response.body, savedWard);
  });

  it('PUT /api/wards/:id should return 400 when required fields are missing', async function () {
    const response = await request(app).put('/api/wards/abc').send({ name: 'Alice' });

    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.message, 'Name, PRN, and subject are required');
  });

  it('PUT /api/wards/:id should return 404 when ward does not exist', async function () {
    sinon.stub(Ward, 'findByIdAndUpdate').resolves(null);

    const response = await request(app)
      .put('/api/wards/abc')
      .send({ name: 'Alice', prn: '123', subject: 'Math' });

    assert.strictEqual(response.status, 404);
    assert.strictEqual(response.body.message, 'Ward not found');
  });

  it('PUT /api/wards/:id should update a ward', async function () {
    const updatedWard = { _id: '1', name: 'Bob', prn: '456', subject: 'Physics' };
    sinon.stub(Ward, 'findByIdAndUpdate').resolves(updatedWard);

    const response = await request(app)
      .put('/api/wards/1')
      .send({ name: 'Bob', prn: '456', subject: 'Physics' });

    assert.strictEqual(response.status, 200);
    assert.deepStrictEqual(response.body, updatedWard);
  });

  it('DELETE /api/wards/:id should return 404 when ward does not exist', async function () {
    sinon.stub(Ward, 'findByIdAndDelete').resolves(null);

    const response = await request(app).delete('/api/wards/abc');

    assert.strictEqual(response.status, 404);
    assert.strictEqual(response.body.message, 'Ward not found');
  });

  it('DELETE /api/wards/:id should delete ward successfully', async function () {
    sinon.stub(Ward, 'findByIdAndDelete').resolves({ _id: '1' });

    const response = await request(app).delete('/api/wards/1');

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.message, 'Ward deleted successfully');
  });
});
