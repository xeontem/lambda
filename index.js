const xambda = () => {
  'use strict';

  // combinators
  const I = x => x;
  const K = x => y => x;
  const S = f => g => x => f(x)(g(x));
  const B = f => g => x => f(g(x));
  const C = f => a => b => f(b)(a);

  // boolean logic/predicates
  const condL = c => t => f => c ? t() : f();
  const existance = val => !!val;
  const includes = sub => str => str.includes(sub);

  // functors
  const Constant = () => a2 => ({
    show: K(a2),
    map: f => Constant()(a2)
  });

  const Apply = func => tar => ({
    show: K(func(tar)),
    map: f => Apply(K(f(func(tar))))(tar)
  });

  const fmap = f => t => t && t.map && t.map(f) || t;
  const show = t => t && t.show ? t.show() : t;
  const filter = p => t => t && t.filter && t.filter(p) || t;
  const flatMap = f => t => t && t.reduce && t.reduce((total, val) => total.concat(f(val)), []);

  // common getter/setter
  const getter = fbfunc => fb => prop => obj => (obj && Object(obj) === obj && prop in obj && obj[prop]) ||
    fbfunc(fb)(prop)(obj);

  const setter = fbfunc => fb => prop => val => obj =>  obj &&
  (Array.isArray(obj) && Object.assign([].concat(obj), { [prop]: val })) ||
  (Object(obj) === obj && Object.assign({}, obj, { [prop]: val })) ||
    fbfunc(fb)(prop)(obj);

  // lenses
  // B(C(B))(C(B)) === W(B)(C(B)) === S(W)(C)(B)
  // const lens = B(C(B)(B(S)(B(B(fmap(C))))))(S(W)(C)(B));
  const lens = get => set => toFunctor => target => fmap(C(set)(target))(toFunctor(get(target)));
  const lensProp = fb => prop => lens(getter(f=>p=>o=>f)(fb)(prop))(setter(f=>p=>o=>f)(fb)(prop));
  const lensFprop = fbfunc => fb => prop => lens(getter(fbfunc)(fb)(prop))(setter(fbfunc)(fb)(prop));

  const view = lens => S(t => ct => show(lens(ct)(t)))(Constant);
  const over = lens => func => target => show(lens(Apply(func))(target));
  // const set = lens => val => target => show(lens(Apply(K(val)))(target));
  const set = B(C(B)(K))(over);

  const viewMap = toFunctor => t => Constant(t)(fmap(B(show)(toFunctor))(t));
  const overMap = toFunctor => t => Apply(K(fmap(B(show)(toFunctor))(t)))(t);
  const setMap = overMap;

  const path = arr => arr.reduce((acc, val) => B(acc)(val));


  // tools
  const log = S(K)(console.log);

  return {
    I,
    K,
    S,
    B,
    set,
    log,
    lens,
    fmap,
    view,
    over,
    show,
    path,
    condL,
    Apply,
    setter,
    getter,
    setMap,
    viewMap,
    flatMap,
    overMap,
    Constant,
    includes,
    lensProp,
    lensFprop,
    existance,
  }

}

module.exports = xambda();
