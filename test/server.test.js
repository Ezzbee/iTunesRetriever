
let chai = require("chai");
let server = require("../server")
let chaiHttp = require("chai-http");

// Set the test parameters
const query = "covey";
const type = "all";
const limit = 10;


// Assertion style
chai.should();
chai.use(chaiHttp);

// Test the GET route to the iTunes API
describe("GET route", () => {
    it("Should GET all the data for the specified parameters", (done) =>{
        chai.request('http://localhost:3001')
        .get('/search/'+query+'/'+type+'/'+limit)
        .end((err,response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
        done();
        })
    })
})
