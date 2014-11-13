(function () {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.src = "//s3.amazonaws.com/fanplayr/browser-dev-tools/loader.js";
  var entry = (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]);
  if ( entry ) {
    entry.appendChild(script);
  }
}());
