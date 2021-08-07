process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
const { post } = require('../index');
let should = chai.should();
let server = require('../index');
let postCategorie = require("../modules/postCategorie");
var expect = chai.expect;

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

describe('hello world test suite', () => {
  
  it('returns a string Hello World',async () => {
      expect(await postCategorie({
        "name" : "Wouter"
    })).to.be.a('object')
  })
})