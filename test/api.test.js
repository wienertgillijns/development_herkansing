process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
const { post } = require('../index');
let should = chai.should();
let server = require('../index');
let postCategorie = require("../modules/postCategorie");
const deleteCategorie = require("../modules/deleteCategorie");
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

describe('Post categorie test driven', () => {
  
  it('returns a object',async () => {
      expect(await postCategorie({
        "name" : "Wouter"
    })).to.be.a('object')
  })
})

describe('Delete categorie test driven', () => {
  
  it('returns a object',async () => {
      expect(await deleteCategorie(
        "Wouter" )).to.be.a('object')
  })
})