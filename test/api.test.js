process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../index');

chai.use(chaiHttp);

describe('/GET categories', () => {
    it('it should GET all the categories', (done) => {
      chai.request(server)
          .get('/categorie/all')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
               
            done();
          });
    });
});
describe('/POST logs', () => {
  it('sould post logs', (done) => {
      let book = {
        "name" : "Ayoub"
    }
    chai.request(server)
        .post('/logs')
        .send(book)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
          done();
        });
  });

});