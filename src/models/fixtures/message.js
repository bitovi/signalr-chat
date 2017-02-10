var fixture = require('can-fixture');

const store = fixture.store([{
  id: 0,
  description: 'First item'
}, {
  id: 1,
  description: 'Second item'
}]);

fixture({
  'GET /': store.findAll,
  'GET //{id}': store.findOne,
  'POST /': store.create,
  'PUT //{id}': store.update,
  'DELETE //{id}': store.destroy
});

export default store;
