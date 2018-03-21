const mockedData = require('./mockedData.js');


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

  describe('view', () => {
    it('must return the result of applying lenses to data', () => {
      const lensField = fb => prop => X.lens(fieldGetter(fb)(prop))(X.setter(X.I)(fb)(prop));
      const fieldGetter = fb => prop =>
        X.S(obj => res => X.condL(X.includes('valid_field')(res))
          (x => res)(x => fb))
        (X.getter(X.I)(fb)(prop));

      const parentLense = X.lensProp({})('parent');
      const childLense = X.lensProp([])('child');
      const child2Lense = X.lensProp({})('child2');
      const fieldLense = lensField('')('field');


      const temp = X.view(X.B(X.B(X.B(X.B(parentLense)(child2Lense))(childLense))(X.viewMap))(fieldLense))(mockedData);
      // const temp = set(B(B(B(B(parentLense)(child2Lense))(childLense))(setMap))(fieldLense))('new value')(response);
      // const temp = over(B(B(B(B(parentLense)(child2Lense))(childLense))(setMap))(fieldLense))(addExcl)(response);
      // const temp = set(B(parentLense)(childLense))('hahahha')(child);
      // const temp = over(B(B(B(parentLense)(childLense))(overMap))(fieldLense))(addExcl)(child);
      // const temp = over(path([parentLense, childLense, overMap, fieldLense]))(addExcl)(child);
      // const temp = over(B(parentLense)(childLense))(fmap(over(fieldLense)(addExcl)))(child);
      assert.equal(temp[0], 'valid_field11111');
      assert.equal(temp[1], '');
    });
  });

  describe('set', () => {
    it('must set a given value in place given by lenses', () => {
      const mock = {parent: {child: [{field:'valid_field'},{field:'valid22_field2'}]}};

      const lensField = fb => prop => X.lens(fieldGetter(fb)(prop))(X.setter(X.I)(fb)(prop));
      const fieldGetter = fb => prop =>
        X.S(obj => res => X.condL(X.includes('valid_field')(res))
          (x => res)(x => fb))
        (X.getter(X.I)(fb)(prop));

      const parentLense = X.lensProp({})('parent');
      const childLense = X.lensProp([])('child');
      const child2Lense = X.lensProp({})('child2');
      const fieldLense = lensField('')('field');

      const temp = X.set(X.B(X.B(X.B(parentLense)(childLense))(X.overMap))(fieldLense))('test-data')(mock);
      assert.equal(temp.parent.child[0].field, 'test-data');
      assert.equal(temp.parent.child[1].field, 'test-data');
    });
  });

});

