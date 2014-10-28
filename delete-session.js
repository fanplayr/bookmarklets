(function () {
  function getInfo () {
    var fanplayr = window.fanplayr;
    if ( fanplayr ) {
      var config = fanplayr.platform && fanplayr.platform.config;
      var sessionKey, sessionEndpoint, match;

      if ( config ) {
        sessionKey = config.sessionKey;
        sessionEndpoint = config.sessionEndpoint;
      }

      if ( !sessionKey ) {
        match = document.cookie.match(/fanplayr_genius_session=[^;]*key%3Ds([^%;]+)/);
        sessionKey = match && match[1];
      }

      if ( !sessionEndpoint ) {
        match = document.cookie.match(/fanplayr_region=([^;]+)/);
        sessionEndpoint = match && match[1];
      }

      var errors = [];
      if ( !sessionKey ) {
        errors.push("Couldn't determine sessionKey");
      }

      if ( !sessionEndpoint ) {
        errors.push("Couldn't determine sessionEndpoint");
      }

      if ( errors.length ) {
        alert(errors.join(". "));
      } else {
        return {
          sessionKey: sessionKey,
          sessionEndpoint: sessionEndpoint
        };
      }
    }
  }

  // var info = getInfo();
  // if ( info ) {
  //   var script = document.createElement("script");
  //   script.async = true;
  //   script.src = "//" + info.sessionEndpoint + "/external.genius/?a=expire-session&sk=" + info.sessionKey;
  //   document.body.appendChild(script);
  // }
}());

(function () {
  var doc = document;
  var el = doc.createElement("div");
  var style = el.style;

  style.position = "fixed";
  style.top = "50%";
  style.left = "50%";
  style.zIndex = 100000;
  style.display = "block";
  style.width = "400px";
  style.height = "600px";
  style.border = "3px solid #4183c4";

  el.innerHTML = "<div>hello</div>";
  doc.body.appendChild(el);
}());
