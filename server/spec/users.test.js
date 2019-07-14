import chai from 'chai';
import chaihttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaihttp);
const signupUrl = '/api/v1/auth/signup';

describe('POST/auth signup', () => {
  it('should signup a non existing user(agent)', (done) => {
    chai.request(app)
      .post(signupUrl)
      .send({
        first_name: 'igor',
        last_name: 'oslo',
        email: 'mighty@gmail.com',
        password: 'moneyheist',
        phone_number: '2348181384092',
        address: '22,owdunitt street',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('first_name');
        expect(res.body.data).to.have.property('last_name');
        expect(res.body.data).to.have.property('email');
        expect(res.body.data.token).to.be.a('string');
        expect(res.body.data.email).to.equal('mighty@gmail.com');
        done();
      });
  });

  it('should not signup a registered user', (done) => {
    chai.request(app)
      .post(signupUrl)
      .send({
        first_name: 'Nairobi',
        last_name: 'Ozil',
        email: 'nairobi@gmail.com',
        password: 'moneyheist',
        phone_number: '2348181384092',
        address: '22,owodunnnit stra',
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
        first_name: 'professor',
        last_name: 'sergio',
        password: 'maquiness',
        phone_number: '2348181384092',
        address: '22,owodunnnit stra',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Enter a valid email.');
        done();
      });
  });
  it('should not signup a user when first_name is missing', (done) => {
    const user = {
      first_name: '',
      last_name: 'sergio',
      email: 'professor@gmail.com',
      password: 'professor',
      phone_number: '2348181384092',
      address: '22,owodunnnit stra',
    };
    chai.request(app)
      .post(signupUrl)
      .send(user)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Enter a valid first name.');
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
  it('should not signup a user when last_name is missing', (done) => {
    chai.request(app)
      .post(signupUrl)
      .send({
        first_name: 'sergio',
        last_name: '',
        email: 'professor@gmail.com',
        password: 'professor',
        phone_number: '2348181384092',
        address: '22,owodunnnit stra',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Enter a valid last name.');
        done();
      });
  });
  it('should not signup a user when phone_number is missing', (done) => {
    chai.request(app)
      .post(signupUrl)
      .send({
        first_name: 'sergio',
        last_name: 'sergio',
        email: 'professor@gmail.com',
        password: 'professor',
        phone_number: '',
        address: '22,owodunnnit stra',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Enter a valid Phone Number');
        done();
      });
  });
  it('should not signup a user when the password is missing', (done) => {
    chai.request(app)
      .post(signupUrl)
      .send({
        first_name: 'sergio',
        last_name: 'xavi',
        email: 'xavi@gmail.com',
        phone_number: '2348181384092',
        address:'22,owodunnnit stra',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('error');
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equal('Enter a password with at least 8 characters.');
        done();
      });
  });
});

// Signin Test
describe('POST/auth signin', () => {
  const signinUrl = '/api/v1/auth/signin';
  it('should signin an existing user(Agent)', (done) => {
    chai.request(app)
      .post(signinUrl)
      .send({
        email: 'ajibolahussain@gmail.com',
        password: 'nollywood10',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.statusCode).to.equal(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('token');
        done();
      });
  });

  it('should not signin an unregistered user', (done) => {
    chai.request(app)
      .post(signinUrl)
      .send({
        email: 'lolzing@gmail.com',
        password: 'lolzing',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('error');
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('User does not exist');
        done();
      });
  });

  it('should not signin an invalid password', (done) => {
    chai.request(app)
      .post(signinUrl)
      .send({
        email: 'Berliniike@gmail.com',
        password: 'sfssffdfs',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('error');
        // expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Incorrect Password or Email');
        done();
      });
  });
});

// Password reset Test
describe('POST/auth reset_password', () => {
  const passwordResetUrl = '/api/v1/auth/ashimi@gmail.com/reset_password';
  const passwordResetUrl2 = '/api/v1/auth/Berliniike@gmail.com/reset_password';
  it('should generate password and send to user email', (done) => {
    chai.request(app)
      .post(passwordResetUrl)
      .end((err, res) => {
        expect(res.statusCode).to.equal(204);
        done();
      });
  });

  it('should allow user to change password if old password is correct', (done) => {
    chai.request(app)
      .post(passwordResetUrl2)
      .send({
        password: 'nollywood10',
        new_password: 'bollywood1000',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(204);
        done();
      });
  });

  it('should not allow wrong email to reset password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/noemal@gmail.com/reset_password')
      .end((err, res) => {
        expect(res.body.status).to.equal('error');
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('User does not exist');
        done();
      });
  });
  it('should not allow wrong old password to reset password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/nairobi@gmail.com/reset_password')
      .send({
        password: 'Berliniike@gmail.com',
        new_password: 'sfssffdfs',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('error');
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Incorrect Password');
        done();
      });
  });
});
