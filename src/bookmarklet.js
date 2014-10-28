(function () {
  var doc = document;

  var link = doc.createElement("link");
  link.rel = "stylesheet";
  link.href = "//rawgit.com/fanplayr/bookmarklets/master/src/style.css";
  doc.head.appendChild(link);

  var script = doc.createElement("script");
  script.async = true;
  script.src = "//rawgit.com/fanplayr/bookmarklets/master/src/script.js";
  doc.head.appendChild(script);
}());
