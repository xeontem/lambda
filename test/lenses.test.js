describe('Lenses abstraction', function() {
  describe('lens', function() {
    it('must return functor with mocked data inside', function() {
      const mock = 'mock-data';
      const get = X.I;
      const set = X.K;
      const toFn = data => [data];
      const lens = X.lens(get)(set)(toFn)(mock);
      assert.equal(lens[0], 'mock-data');
    });
  });
});

