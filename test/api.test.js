process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../index');

chai.use(chaiHttp);

describe('/GET book', () => {
    it('it should GET all the books', (done) => {
      chai.request(server)
          .get('/categorie/all')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
               
            done();
          });
    });
});