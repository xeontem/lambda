describe('Functors', function() {
  describe('fmap', function() {
    it('must apply passed function to the functor and return new functor', function() {
      const mock = ['10', '20', '30'];
      const func = v => v - 10;
      assert.equal(X.fmap(func)(mock)[0], 0);
      assert.equal(X.fmap(func)(mock)[1], 10);
      assert.equal(X.fmap(func)(mock)[2], 20);
    });
  });
});

