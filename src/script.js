(function () {
  var doc = document;

  var actions = {};

  actions.close = function () {
    destroy();
  };

  actions.deleteSession = function () {
    var info = getInfo();
    if ( info ) {
      var script = document.createElement("script");
      script.async = true;
      script.src = "//" + info.sessionEndpoint + "/external.genius/?a=expire-session&sk=" + info.sessionKey;
      appendEl(script);
    }
  };

  actions.expireSession = function () {
    var info = getInfo();
    if ( info ) {
      var script = document.createElement("script");
      script.async = true;
      script.src = "//" + info.sessionEndpoint + "/external.genius/?a=expire-session&sk=" + info.sessionKey + "&delete=0";
      appendEl(script);
    }
  };

  function getInfo ( hideErrors ) {
    var errors = [];
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

      if ( !sessionKey ) {
        errors.push("Couldn't determine sessionKey");
      }

      if ( !sessionEndpoint ) {
        errors.push("Couldn't determine sessionEndpoint");
      }

      if ( hideErrors || !errors.length ) {
        return {
          sessionKey: sessionKey,
          sessionEndpoint: sessionEndpoint
        };
      }
    } else {
      errors.push("Fanplayr not present on this site.");
    }

    if ( !hideErrors && errors.length ) {
      alert(errors.join(". "));
    }
  }

  function destroy () {
    removeEl("fanplayr-bm");
    removeEl("fanplayr-bm-style");
    removeEl("fanplayr-bm-overlay");

    if ( window.removeEventListener ) {
      window.removeEventListener("keydown", onKeyDown, false);
    } else {
      window.detachEvent("onkeydown", onKeyDown);
    }
  }

  function removeEl ( id ) {
    var el = doc.getElementById(id);
    if ( el && el.parentNode ) {
      el.parentNode.removeChild(el);
    }
  }

  function appendEl ( el ) {
    (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(el);
  }

  function create () {
    // var base = "//root.dev/fanplayr/repos/bookmarklets/src";
    var base = "//rawgit.com/fanplayr/bookmarklets/master/src";

    var info = getInfo(true);

    var url = base + "/index.html" +
      "?url=" + encodeURIComponent(window.location.href) +
      "&sessionKey=" + encodeURIComponent(info && info.sessionKey || "") +
      "&sessionEndpoint=" + encodeURIComponent(info && info.sessionEndpoint || "");

    var frame = doc.createElement("iframe");
    frame.id = "fanplayr-bm";
    frame.src = url;
    frame.frameBorder = 0;
    appendEl(frame);

    var styleSheet = doc.createElement("link");
    styleSheet.id = "fanplayr-bm-style";
    styleSheet.rel = "stylesheet";
    styleSheet.href = base + "/style.css";
    appendEl(styleSheet);

    var overlay = doc.createElement("div");
    overlay.id = "fanplayr-bm-overlay";
    appendEl(overlay);

    if ( window.addEventListener ) {
      window.addEventListener("keydown", onKeyDown, false);
    } else {
      window.attachEvent("onkeydown", onKeyDown);
    }
  }

  function onKeyDown ( event ) {
    if ( event.keyCode === 27 ) {
      destroy();
    }
  }

  var history = window.history;

  function poll () {
    setInterval(function () {
      var href = window.location.href;
      var match = href.match(/#fanplayr:(.*)/);
      if ( match ) {
        if ( history && history.replaceState ) {
          history.replaceState({}, doc.title, href.substr(0, href.indexOf("#")));
        } else {
          window.location.href = href.substr(0, href.indexOf("#") + 1);
        }

        var action = decodeURIComponent(match[1]);
        if ( actions[action] ) {
          actions[action]();
        }
      }
    }, 500);
  }

  (function () {
    var frame = doc.getElementById("fanplayr-bm");
    if ( frame ) {
      return destroy();
    }
    create();
    poll();
  }());

}());
