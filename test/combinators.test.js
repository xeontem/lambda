describe('Combinators', function() {
  describe('Identity', function() {
    it('must always return its argument', function() {
      assert.equal(X.I('string'), 'string');
    });
  });
});

