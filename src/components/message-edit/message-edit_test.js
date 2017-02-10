var QUnit = require('steal-qunit');
var { ViewModel } = require('./chat');

// ViewModel unit tests
QUnit.module('can-connect-signalr/messages');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the chat-messages component');
});
