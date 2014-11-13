(function () {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.src = "//s3.amazonaws.com/fanplayr/browser-dev-tools/releases/20141113-1041/fanplayr-bdt.js";

  var entry = (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]);
  if ( entry ) {
    entry.appendChild(script);
  }
}());
