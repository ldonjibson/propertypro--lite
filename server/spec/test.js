import chai from 'chai';
import chaihttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaihttp);

describe('Propertyprolite tests', () => {
  describe('Display welcome message', () => {
    it('should display welcome message on start', (done) => {
      chai.request(app)
        .get('/api/v1')
        .end((err, res) => {
          expect(res.body.message).to.equal('Welcome to Propertypro--Lite API');
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should throw an error for an invalid url', (done) => {
      chai.request(app)
        .get('/anyotherthing')
        .end((err, res) => {
          expect(res.body.message).to.equal('Page Not Found');
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});
