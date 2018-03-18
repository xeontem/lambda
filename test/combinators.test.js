describe('Combinators', function() {
  describe('Identity', function() {
    it('must always return its argument', function() {
      assert.equal(X.I('string'), 'string');
    });
  });

  describe('Constant', function() {
    it('must always return its first argument', function() {
      assert.equal(X.K('string')(), 'string');
    });
  });
});

