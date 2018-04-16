const should = require('should');

/* import utils */
const utils = require('../utils');

describe('Utils', () => {
  /* test isEqual utility function */
  describe('isEqual (Arrys)', () => {
    it('should not be equal', () => {
      const firstArr = ['one','tow','three'];
      const secondArr = ['one','2', 'three'];

      should(utils.isEqual(firstArr, secondArr)).be.false();
    })

    it('should be equal', () => {
      const item1 = ['one', 2, 'three', 4, 'five'];
      const item2 = [...item1];

      should(utils.isEqual(item1, item2)).be.true();
    })

    it('should be equal', () => {
      const item1 = [
        {'name': 'Sam', 'age': 20, 'number': 50},
        {'name': 'James', 'age': 30, 'number': 20}
      ]
      const item2 = [...item1];

      should(utils.isEqual(item1, item2)).be.true();
    })
  })

  describe('isEqual (Objects)', () => {
    it('should be equal', () => {
      const obj1 = {'one': [1,2,3], 'two': 2, 'three': {'age': 20}};
      const obj2 = {...obj1};

      should(utils.isEqual(obj1, obj2)).be.true();
    })

    it('should not be equal', () => {
      const ob1 = {'age': 20, 'name': 'Doe'};
      const ob2 = {'age': 30, 'name': 'Doe'};

      should(utils.isEqual(ob1, ob2)).be.false();
    })
  })
})
