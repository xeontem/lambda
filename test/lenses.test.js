describe('Lenses abstraction', () => {

  describe('lens', () => {
    it('must return functor with mocked data inside', () => {
      const mock = 'mock-data';
      const get = X.I;
      const set = X.K;
      const toFn = data => [data];
      const lens = X.lens(get)(set)(toFn)(mock);
      assert.equal(lens[0], 'mock-data');
    });
  });

  describe('getter', () => {
    it('must pick prop from target', () => {
      const getter = X.getter;
      const fbfunc = fb => prop => target => fb;
      const fb = {};
      const prop = 'test';
      const target = {test: 'test value'};
      assert.equal(getter(fbfunc)(fb)(prop)(target), 'test value');
    })
  });

  describe('setter', () => {
    it('must set value in target and return it (array)', () => {
      const setter = X.setter;
      const fbfunc = fb => prop => obj => fb;
      const fb = [];
      const prop = 1;
      const val = 200;
      const target = [10,20];
      assert.equal(setter(fbfunc)(fb)(prop)(val)(target)[1], 200);
    });
    it('must set value in target and return it (object)', () => {
      const setter = X.setter;
      const fbfunc = fb => prop => obj => fb;
      const fb = {};
      const prop = 'a2';
      const val = 200;
      const target = {a1: 100};
      assert.equal(setter(fbfunc)(fb)(prop)(val)(target)[prop], 200);
    });
    it('must run fbfunc if target not an object/array', () => {
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

