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

  describe('setter', function() {
    it('must set value in target and return it (array)', function() {
      const setter = X.setter;
      const fbfunc = fb => prop => obj => fb;
      const fb = [];
      const prop = 1;
      const val = 200;
      const target = [10,20];
      assert.equal(setter(fbfunc)(fb)(prop)(val)(target)[1], 200);
    });
    it('must set value in target and return it (object)', function() {
      const setter = X.setter;
      const fbfunc = fb => prop => obj => fb;
      const fb = {};
      const prop = 'a2';
      const val = 200;
      const target = {a1: 100};
      assert.equal(setter(fbfunc)(fb)(prop)(val)(target)[prop], 200);
    });
    it('must run fbfunc if target not an object/array', function() {
      const setter = X.setter;
      const fbfunc = fb => prop => obj => fb + ' from fallback func';
      const fb = 'test';
      const prop = 1;
      const val = 200;
      const target = 'string';
      assert.equal(setter(fbfunc)(fb)(prop)(val)(target), 'test from fallback func');
    });
  });

});

