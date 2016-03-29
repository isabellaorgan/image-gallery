var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/image_gallery_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Image = require(__dirname + '/../models/image');

describe('image routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to submit an image url', function(done) {
    var imageData = {url: 'test image'};
    chai.request('localhost:3000')
      .post('/api/images')
      .send(imageData)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.url).to.eql('test image');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should be able to display images', function(done) {
    chai.request('localhost:3000')
      .get('/api/images')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  describe('show an image', function() {
    beforeEach(function(done) {
      (new Image({url: 'test image'})).save(function(err, data) {
        expect(err).to.eql(null);
        this.image = data;
        done();
      }.bind(this));
    });

    it('should be able to modify an image', function(done) {
      chai.request('localhost:3000')
        .put('/api/images/' + this.image._id)
        .send({name: 'a different image'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success!');
          done();
        });
    });

    it('should be able to remove an image', function(done) {
      chai.request('localhost:3000')
        .delete('/api/images/' + this.image._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success!');
          done();
        });
    });
  });
});
