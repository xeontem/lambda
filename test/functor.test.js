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

  describe('filter', function() {
    it('must filter the functor with a given predicate', () => {
      const predicate = val => val > 10;
      const functor = [11, 2, 33, 9];
      assert.equal(X.filter(predicate)(functor)[0], 11);
    });
  });
});

