/**
 * Mix properties into target object.
 */
function extend(to: any, _from: any) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject(arr: any) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}

function cached(fn: any) {
  var cache = Object.create(null);
  return function cachedFn(str: string) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

var parseStyleText = cached(function (cssText: string) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item: any) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      // @ts-ignore
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
});

// normalize possible array / string values into Object
function normalizeStyleBinding(bindingStyle: any) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }
  if (typeof bindingStyle === "string") {
    return parseStyleText(bindingStyle);
  }
  return bindingStyle;
}

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str: string) {
  return str.replace(hyphenateRE, "-$1").toLowerCase();
});

export function internalMixin(app: any) {
  app.config.globalProperties.__get_style = (
    dynamicStyle: any,
    staticStyle: any
  ) => {
    if (!dynamicStyle && !staticStyle) {
      return "";
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle
      ? extend(staticStyle, dynamicStyleObj)
      : dynamicStyleObj;
    return Object.keys(styleObj)
      .map(function (name) {
        return hyphenate(name) + ":" + styleObj[name];
      })
      .join(";");
  };
}
