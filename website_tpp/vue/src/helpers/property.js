  // Based of Underscore 1.9.1
  // Creates a function that, when passed an object, will traverse that object’s
  // properties down the given `path`, specified as an array of keys or indexes.
  export default function(path) {
    if (toString.call(path) != '[object Array]') {
      return shallowProperty(path);
    }
    return function(obj) {
      return deepGet(obj, path);
    };
  }

  function shallowProperty(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  }

  function deepGet(obj, path) {
    var length = path.length;
    for (var i = 0; i < length; i++) {
      if (obj == null) return void 0;
      obj = obj[path[i]];
    }
    return length ? obj : void 0;
  }