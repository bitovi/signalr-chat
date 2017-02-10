var QUnit = require('steal-qunit');
var Post = require('./message');

QUnit.module('models/post');

QUnit.test('getList', function(){
  stop();
  Post.getList().then(function(items) {
    QUnit.equal(items.length, 2);
    QUnit.equal(items.attr('0.description'), 'First item');
    start();
  });
});
