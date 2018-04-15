/*
 * Helper function to compare two Arrays or two Objects.
 * In a real world application you should use Underscore or lodash helper function to do this.
 */
export const isEqual = (value, other) => {
  /* get the value type */
  const type = Object.prototype.toString.call(value);
  /* if the two objects are not the same type return false */
  if (type !== Object.prototype.toString.call(other)) return false;
  /* if items are not objects or arrays return false */
  if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;
  /* compare the length of the two items, return false if they're not equal */
  const valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
  const ohterLen = type === '[object Array]' ? other.length : Object.keys(other).length;
  if (valueLen !== ohterLen) return false;
  /* helper function to compare the acctual items */
  const compare = (item1, item2) => {
    /* get object type */
    const itemType = Object.prototype.toString.call(item1);
    /* if it's an Object or Array compare recursivly */
    if (['[object Array]', '[object Object]'].indexOf(itemType) > 0) {
      /* if it fails while comparing return false */
      if (!isEqual(item1, item2)) return false;
    }
    else {
      /* else do a simple comparison */
      /* if the two items are not the same return false */
      if (itemType !== Object.prototype.toString.call(item2)) return false;
      /* if it's a function convert to string and compare */
      if(itemType === '[object Function]') {
        /* if they're not equal return false */
        if (item1.toString() !== item2.toString()) return false;
      }
      else {
        /* otherwise just compare */
        if (item1 !== item2) return false;
      }
    }
  }
  /* compare properties */
  if (type === '[object Array]') {
    for (let i=0; i < valueLen; i++) {
      if (compare(value[i], other[i]) === false) return false;
    }
  } else {
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        if (compare(value[key], other[key]) === false) return false;
      }
    }
  }
  /* if nothing failed return true */
  return true;
}
