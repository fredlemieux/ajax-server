/**
 * Created by LemieuxF on 15/08/2017.
 */
const chai = require('chai')
const should = chai.should();
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('./../app');

describe("Multiply should return multiplied numbers",function(){
	it("Multply returns correct number",function(done){
		//test
		expect(app.multiply(2,3)).to.be.a('number');
		expect(app.multiply(2, 3)).to.equal(6);
		//test
		done();
	});
	it("Main page loads", function(done){
		chai.request(app)
			.get('/')
			.end(function(err, res){
				//console.log(res);
				res.should.have.status(200)
				done();
			})
	});
	it("Get chat room, returns text");
	it("Post messsage works correctly", function(done){
			chai.request(app)
				.post("/chatroom/?id=1")
				.send("Hello")
				.end((err, res) => {
				console.log(res);
			console.log(err);
			expect(err).to.be.null;
			res.should.have.status(200);
			done();
		})
	});
})
