let native = Page;
Page = (obj) => {
  let { mixins = [] } = obj;
  let merge = new Merge();
  Reflect.deleteProperty(obj, "mixins");
  let pageData = mixins.length <= 0 ? obj : merge.start(obj, ...mixins);
  native(pageData);
}
class Merge {
  constructor() { }
  start(rootObj, ...objs) {
    let root = {};
    objs.forEach((el) => {
      root = Merge.recursive(rootObj, el);
    })
    return root;
  }
  static recursive = (rootObj, obj) => {
    for (let attr in obj) {
      if (rootObj[attr] === undefined) {
        rootObj[attr] = obj[attr];
      }
      else if (Merge.isObject(obj[attr])) {
        Merge.recursive(rootObj[attr], obj[attr])
      }
      else {
        rootObj[attr] = obj[attr];
      }
    }
    return rootObj;
  }
  static isObject = (obj) => {
    return Object.prototype.toString.call(obj).includes("Object");
  }
}