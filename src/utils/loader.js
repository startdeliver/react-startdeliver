export default function () {
  // https://app.startdeliver.com/developer/usage
  /* eslint-disable */
  (function (window, document, tag, url, name, a, m) {
    window[name] = window[name] || function () {
      (window[name].q = window[name].q || []).push(arguments);
    };
    a = document.createElement(tag);
    m = document.getElementsByTagName(tag)[0];
    a.async = 1;
    a.src = url;
    m.parentNode.insertBefore(a, m);
  })(window, document, 'script', 'https://startde.live/r.js', 'startdeliver');
  /* eslint-enable */
}