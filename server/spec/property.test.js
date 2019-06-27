import chai from 'chai';
import chaihttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaihttp);
describe('POST, PATCH, DELETE, GET /property/', () => {
  const user = {
    email: 'nairobi@gmail.com',
    password: 'nollywood10',
  };
  const user2 = {
    email: 'MarkRio@gmail.com',
    password: 'nollywood10',
  };
  let userToken;
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        userToken = res.body.data.token;
        done();
      });
  });

  let userToken2;
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user2)
      .end((err, res) => {
        userToken2 = res.body.data.token;
        done();
      });
  });

  describe('POST /api/v1/property', () => {
    it('should successfully create a property', (done) => {
      // try {/
      chai.request(app)
        .post('/api/v1/property')
        .set('authorization', userToken)
        .field('type', 'mini flat')
        .field('state', 'lagos state')
        .field('city', 'lagos')
        .field('address', '2,owodunit street')
        .field('amount', 400000)
        .attach('image', 'server/spec/realestate.jpg', 'realestate.jpg')
        .end((err, res) => {
          expect(res.body.status).to.equal('success');
          expect(res.statusCode).to.equal(201);
        });
      done();
    }).timeout(10000);

    it('should not post property if type is missing', (done) => {
      const create = {
        state: 'lagos state',
        city: 'lagos',
        address: '2,owodunit street',
        amount: 60000.00,
      };
      chai.request(app)
        .post('/api/v1/property')
        .set('authorization', userToken)
        .send(create)
        .end((err, res) => {
          expect(res.body.status).to.equal('error');
          expect(res.body.error).to.equal('Enter the property type');
          done();
        });
    });

    it('should not post property if state is missing', (done) => {
      const create = {
        type: 'mini flat',
        city: 'lagos',
        address: '2,owodunit street',
        amount: 60000.00,
      };
      chai.request(app)
        .post('/api/v1/property')
        .set('authorization', userToken)
        .send(create)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.error).to.equal('Enter the state where the property is located');
          done();
        });
    });

    it('should not post property if city is missing', (done) => {
      const create = {
        type: 'mini flat',
        state: 'lagos state',
        address: '2,owodunit street',
        amount: 60000.00,
      };
      chai.request(app)
        .post('/api/v1/property')
        .set('authorization', userToken)
        .send(create)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.error).to.equal('Enter the city where the property is located');
          done();
        });
    });

    it('should not post property if address is missing', (done) => {
      const create = {
        type: 'mini flat',
        state: 'lagos state',
        city: 'lagos',
        amount: 60000.00,
      };
      chai.request(app)
        .post('/api/v1/property')
        .set('authorization', userToken)
        .send(create)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.error).to.equal('Enter the address of the property');
          done();
        });
    });

    it('should not post property if amount is missing', (done) => {
      const create = {
        type: 'mini flat',
        state: 'lagos state',
        city: 'lagos',
        address: '2,owodunit street',
      };
      chai.request(app)
        .post('/api/v1/property')
        .set('authorization', userToken)
        .send(create)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.error).to.equal('Enter an amount');
          done();
        });
    });

    it('should not post property for an invalid token', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('authorization', 'invalidtoken12343')
        .field('type', 'mini flat')
        .field('state', 'lagos state')
        .field('city', 'lagos')
        .field('address', '2,owodunit street')
        .field('amount', 400000)
        .attach('image', 'server/spec/realestate.jpg', 'realestate.jpg')
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.status).to.equal('error');
          expect(res.body.error).to.equal('You are not signed in.');
          done();
        });
    });

    it('should not post property if user is not an agent', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('authorization', userToken2)
        .field('type', 'mini flat')
        .field('state', 'lagos state')
        .field('city', 'lagos')
        .field('address', '2,owodunit street')
        .field('amount', 400000)
        .attach('image', 'server/spec/realestate.jpg', 'realestate.jpg')
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.status).to.equal('error');
          expect(res.body.error).to.equal('Unauthorized');
          done();
        });
    });
  });

  describe('PATCH /api/v1/property/<:property-id>', () => {
    it('should successfully update a specific property', (done) => {
      chai.request(app)
        .patch('/api/v1/property/3')
        .set('authorization', userToken)
        .field('type', 'mini flat')
        .field('state', 'lagos state')
        .field('city', 'lagos')
        .field('address', '2,owodunit street')
        .field('amount', 400000)
        .attach('image', 'server/spec/realestate.jpg', 'realestate.jpg')
        .end((err, res) => {
          expect(res.body.status).to.equal('success');
          expect(res.statusCode).to.equal(201);
        });
      done();
    }).timeout(10000);

    it('should not update property if type is missing', (done) => {
      const create = {
        state: 'lagos state',
        city: 'lagos',
        address: '2,owodunit street',
        amount: 60000.00,
      };
      chai.request(app)
        .patch('/api/v1/property/3')
        .set('authorization', userToken)
        .send(create)
        .end((err, res) => {
          expect(res.body.status).to.equal('error');
          expect(res.body.error).to.equal('Enter the property type');
          done();
        });
    });

    it('should not update property if state is missing', (done) => {
      const create = {
        type: 'mini flat',
        city: 'lagos',
        address: '2,owodunit street',
        amount: 60000.00,
      };
      chai.request(app)
        .patch('/api/v1/property/3')
        .set('authorization', userToken)
        .send(create)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.error).to.equal('Enter the state where the property is located');
          done();
        });
    });

    it('should not update property if city is missing', (done) => {
      const create = {
        type: 'mini flat',
        state: 'lagos state',
        address: '2,owodunit street',
        amount: 60000.00,
      };
      chai.request(app)
        .patch('/api/v1/property/3')
        .set('authorization', userToken)
        .send(create)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.error).to.equal('Enter the city where the property is located');
          done();
        });
    });

    it('should not update property if address is missing', (done) => {
      const create = {
        type: 'mini flat',
        state: 'lagos state',
        city: 'lagos',
        amount: 60000.00,
      };
      chai.request(app)
        .patch('/api/v1/property/3')
        .set('authorization', userToken)
        .send(create)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.error).to.equal('Enter the address of the property');
          done();
        });
    });

    it('should not update property if amount is missing', (done) => {
      const create = {
        type: 'mini flat',
        state: 'lagos state',
        city: 'lagos',
        address: '2,owodunit street',
      };
      chai.request(app)
        .patch('/api/v1/property/3')
        .set('authorization', userToken)
        .send(create)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.error).to.equal('Enter an amount');
          done();
        });
    });

    it('should not update property for an invalid token', (done) => {
      chai.request(app)
        .patch('/api/v1/property/3')
        .set('authorization', 'invalidtoken12343')
        .field('type', 'mini flat')
        .field('state', 'lagos state')
        .field('city', 'lagos')
        .field('address', '2,owodunit street')
        .field('amount', 400000)
        .attach('image', 'server/spec/realestate.jpg', 'realestate.jpg')
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.status).to.equal('error');
          expect(res.body.error).to.equal('You are not signed in.');
          done();
        });
    });

    it('should not update property if user is not an agent', (done) => {
      chai.request(app)
        .patch('/api/v1/property/3')
        .set('authorization', userToken2)
        .field('type', 'mini flat')
        .field('state', 'lagos state')
        .field('city', 'lagos')
        .field('address', '2,owodunit street')
        .field('amount', 400000)
        .attach('image', 'server/spec/realestate.jpg', 'realestate.jpg')
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.status).to.equal('error');
          expect(res.body.error).to.equal('Unauthorized');
          done();
        });
    });
  });

  describe('PATCH /api/v1/property/:propertyId/old', () => {
    it('should update status of a property', (done) => {
      // try {/
      chai.request(app)
        .patch('/api/v1/property/3/sold')
        .set('authorization', userToken)
        .end((err, res) => {
          expect(res.body.status).to.equal('success');
          expect(res.body.data.status).to.equal('sold');
          expect(res.statusCode).to.equal(201);
        });
      done();
    });

    it('should not update status if token is invalid ', (done) => {
      chai.request(app)
        .patch('/api/v1/property/3/sold')
        .set('authorization', 'invalidtoken12343')
        .end((err, res) => {
          expect(res.body.status).to.equal('error');
          expect(res.body.error).to.equal('You are not signed in.');
          done();
        });
    });

    it('should not update status if user is not an agent ', (done) => {
      chai.request(app)
        .patch('/api/v1/property/3/sold')
        .set('authorization', userToken2)
        .end((err, res) => {
          expect(res.body.status).to.equal('error');
          expect(res.body.error).to.equal('Unauthorized');
          done();
        });
    });

    it('should not update status if paramater is invalid ', (done) => {
      chai.request(app)
        .patch('/api/v1/property/g/sold')
        .set('authorization', userToken2)
        .end((err, res) => {
          expect(res.body.status).to.equal('error');
          expect(res.body.error).to.equal('Invalid id, id must be a number');
          done();
        });
    });
  });

  describe('DELETE /api/v1/property/:propertyId', () => {
    it('should delete a property', (done) => {
      chai.request(app)
        .delete('/api/v1/property/3')
        .set('authorization', userToken)
        .end((err, res) => {
          expect(res.body.status).to.equal('success');
          expect(res.body.data.message).to.equal('Property deleted successfully.');
          expect(res.statusCode).to.equal(200);
        });
      done();
    });

    it('should not delete a property if token is invalid ', (done) => {
      chai.request(app)
        .delete('/api/v1/property/3')
        .set('authorization', 'invalidtoken12343')
        .end((err, res) => {
          expect(res.body.status).to.equal('error');
          expect(res.body.error).to.equal('You are not signed in.');
          done();
        });
    });

    it('should not delete a property if user is not an agent ', (done) => {
      chai.request(app)
        .delete('/api/v1/property/3')
        .set('authorization', userToken2)
        .end((err, res) => {
          expect(res.body.status).to.equal('error');
          expect(res.body.error).to.equal('Unauthorized');
          done();
        });
    });

    it('should not delete a property if paramater is invalid ', (done) => {
      chai.request(app)
        .delete('/api/v1/property/g')
        .set('authorization', userToken2)
        .end((err, res) => {
          expect(res.body.status).to.equal('error');
          expect(res.body.error).to.equal('Invalid id, id must be a number');
          done();
        });
    });
  });

  describe('GET /api/v1/property', () => {
    it('should list all properties and types', (done) => {
      chai.request(app)
        .get('/api/v1/property')
        .end((err, res) => {
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          expect(res.statusCode).to.equal(200);
        });
      done();
    });
  });

  describe('GET /api/v1/property/:propertyId', () => {
    it('should get details of a specific property', (done) => {
      chai.request(app)
        .get('/api/v1/property/4')
        .end((err, res) => {
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.be.an('object');
          expect(res.statusCode).to.equal(200);
        });
      done();
    });

    it('should not get details of a specific property for invalid id', (done) => {
      chai.request(app)
        .get('/api/v1/property/g')
        .end((err, res) => {
          expect(res.body.status).to.equal('error');
          expect(res.statusCode).to.equal(400);
        });
      done();
    });
  });
  describe('GET /api/v1/property/?type=PropertyType', () => {
    it('should get specific type of properties', (done) => {
      chai.request(app)
        .get('/api/v1/property/?type=2 bed room')
        .end((err, res) => {
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          expect(res.statusCode).to.equal(200);
        });
      done();
    });

    it('should not get specific type of properties for iinvalid property type', (done) => {
      chai.request(app)
        .get('/api/v1/property/?type=gjhssfasa')
        .end((err, res) => {
          expect(res.body.status).to.equal('error');
          expect(res.statusCode).to.equal(404);
        });
      done();
    });
  });
});
