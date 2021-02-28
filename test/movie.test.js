const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

const server = require("../app");

chai.use(chaiHttp);
let token;

describe(" Testing for api/movie", () => {
  before((done) => {
    chai
      .request(server)
      .post("/authenticate")
      .send({ username: "dbaliktest", password: "12345" })
      .end((err, res) => {
        token = res.body.token;
        //console.log(token);
        done();
      });
  });
  describe("/GET ALL MOVIES", () => {
    it("Run the Moviepage (GET/)", (done) => {
      chai
        .request(server)
        .get("/api/movies")
        .set("x-access-token", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });
 
  describe("/POST MOVIES", () => {
    it("İT SHOULD POST A MOVİE",(done) => {
    const movie = {
      title: "Fight Club",
      director_id: "6037780df8ea2f3f14ef50b6",
      category: "Drama",
      country: "USA",
      year: 1999,
      imdb_score: 8.8,
    };
    chai
      .request(server)
      .post("/api/movies")
      .send(movie)
      .set("x-access-token", token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("title");
        res.body.should.have.property("director_id");
        res.body.should.have.property("category");
        res.body.should.have.property("country");
        res.body.should.have.property("year");
        done();
      });
  });
});
});
