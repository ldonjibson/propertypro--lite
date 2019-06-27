import chai from 'chai';
import chaihttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaihttp);
describe('POST /api/v1/property', () => {
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
