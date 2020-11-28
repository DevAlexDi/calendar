
export function toQueryString(item, name = '') {
  if ([undefined, null].indexOf(item) > -1) {
    return '';
  }

  if (['number', 'string', 'boolean'].indexOf(typeof item) > -1) {
    return `${name}=${item}`;
  }
  return Object.keys(item).map(function (key) {
    const keyName = name ? `${name}[${key}]` : key;
    return toQueryString(item[key], keyName);
  }).filter(function (i) { return !!i; }).join('&');
}

export function getParamFromQueryString(paramName) {
  const reg = RegExp(`${paramName}=([^&]*)`);
  const match = window.location.href.match(reg);
  return !!match && !!match.length ? match[1] : null;
}
