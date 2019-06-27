import chai from 'chai';
import chaihttp from 'chai-http';
import app from '../app';


const { expect } = chai;
chai.use(chaihttp);
const signupUrl = '/api/v1/auth/signup';

describe('POST/auth signup', () => {
  it('should signup a non existing user(client)', (done) => {
    chai.request(app)
      .post(signupUrl)
      .send({
        firstName: 'oslo',
        lastName: 'oslo',
        email: 'oslo@gmail.com',
        password: 'moneyheist',
        phoneNumber: '2348181384092',
        accountType: 'agent',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(201);
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('firstName');
        expect(res.body.data).to.have.property('lastName');
        expect(res.body.data).to.have.property('email');
        expect(res.body.data.token).to.be.a('string');
        expect(res.body.data.email).to.equal('oslo@gmail.com');
        done();
      });
  });
  it('should not signup a registered user', (done) => {
    chai.request(app)
      .post(signupUrl)
      .send({
        firstName: 'Nairobi',
        lastName: 'Ozil',
        email: 'nairobi@gmail.com',
        password: 'moneyheist',
        phoneNumber: '2348181384092',
        accountType: 'agent',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Email already in use');
        done();
      });
  });
  it('should not signup a user when the email is missing', (done) => {
    chai.request(app)
      .post(signupUrl)
      .send({
        firstName: 'professor',
        lastName: 'sergio',
        password: 'maquiness',
        phoneNumber: '2348181384092',
        accountType: 'agent',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Enter a valid email.');
        done();
      });
  });
  it('should not signup a user when firstName is missing', (done) => {
    const user = {
      firstName: '',
      lastName: 'sergio',
      email: 'professor@gmail.com',
      password: 'professor',
      phoneNumber: '2348181384092',
      accountType: 'agent',
    };
    chai.request(app)
      .post(signupUrl)
      .send(user)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Enter a valid firstName.');
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
  it('should not signup a user when lastName is missing', (done) => {
    chai.request(app)
      .post(signupUrl)
      .send({
        firstName: 'sergio',
        lastName: 'Maquiness',
        email: 'professor@gmail.com',
        password: 'professor',
        phoneNumber: '2348181384092',
        accountType: 'agent',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Enter a valid lastName.');
        done();
      });
  });
  it('should not signup a user when the password is missing', (done) => {
    chai.request(app)
      .post(signupUrl)
      .send({
        firstName: 'sergio',
        lastName: 'xavi',
        email: 'xavi@gmail.com',
        phoneNumber: '2348181384092',
        accountType: 'agent',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('error');
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equal('Enter a password with at least 8 characters.');
        done();
      });
  });
  it('should not signup a user when the phoneNumber is missing', (done) => {
    chai.request(app)
      .post(signupUrl)
      .send({
        firstName: 'sergio',
        lastName: 'xavi',
        email: 'xavi@gmail.com',
        password: 'nollywo',
        accountType: 'user',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('error');
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equal('Enter a valid Phone Number');
        done();
      });
  });
  it('should not signup a user when the accountType is missing', (done) => {
    chai.request(app)
      .post(signupUrl)
      .send({
        firstName: 'sergio',
        lastName: 'xavi',
        email: 'xavi@gmail.com',
        password: 'nollywo',
        phoneNumber: '2348181384092',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('error');
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equal('account type can only be agent and client');
        done();
      });
  });
});
