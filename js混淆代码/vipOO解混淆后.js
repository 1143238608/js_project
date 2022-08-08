;

function tipstime(O00QQQ) {
  $(".timemsg")["text"](O00QQQ);

  if (O00QQQ == 15) {
    $(".tips")["hide"]();
    $(".timeout")["show"]();
  } else {
    O00QQQ += 1;
    setTimeout(function () {
      tipstime(O00QQQ);
    }, 1000);
  }
}

tipstime(0);
ajax_api();

function ajax_api() {
  $["cookie"]("uuid", Vkey + "-" + Key + "-" + Sign + "-" + Token);
  $["cookie"]("BAIDUID", $["md5"](Vkey + "-" + Key + "-" + Sign + "-" + Token)["toUpperCase"]());
  $["cookie"]("BAIDUSID", $["md5"](Key1 + "-" + Sign1 + "-" + Token1)["toUpperCase"]());

  if (isios) {
    var QOQ000 = "1";
  } else {
    var QOQ000 = "0";
  }

  if (isiPad) {
    var OOOQQO = "1";
  } else {
    var OOOQQO = "0";
  }

  var OOOQQQ = {
    "url": Vurl,
    "wap": OOOQQO,
    "ios": QOQ000,
    "host": Host,
    "referer": Ref,
    "time": Time,
    "key": Key,
    "key1": Key1,
    "sign": Sign,
    "sign1": Sign1,
    "token": Token,
    "token1": Token1
  };
  Ckey = AES_CBC(JSON["stringify"](OOOQQQ), $["md5"](XXTEA["encryptToBase64"](Vkey + "-" + Key + "-" + Sign + "-" + Token + Key1 + "-" + Sign1 + "-" + Token1 + Key2 + Sign2 + Token2, Host + Domain + Time)));
  var Q00OOQ = {
    "ckey": "110#" + Base64["encode"](Ckey)
  };
  DATA = Object["assign"](OOOQQQ, Q00OOQ);
  iplist = returnCitySN["cip"]["split"](".");
  $["ajax"]({
    "type": "post",
    "url": Api + "/Api.php" + "?ver=" + Version + "&timestamp=" + Time + "&appkey=" + $["md5"](Host),
    "dataType": "json",
    "headers": {
      "Vkey": Vkey,
      "Ipmd5": $["md5"](iplist[0] + "." + iplist[1] + ".000.000"),
      "Version": Version,
      "Access-Token0": Vkey + "-" + Key + "-" + Sign + "-" + Token,
      "Access-Token1": Key1 + "-" + Sign1 + "-" + Token1,
      "Access-Token2": XXTEA["encryptToBase64"](Vkey + "-" + Key + "-" + Sign + "-" + Token + Key1 + "-" + Sign1 + "-" + Token1 + Key2 + Sign2 + Token2, Host + Domain + Time),
      "Access-Token3": TSTKC(DATA)
    },
    "data": DATA,
    "success": function (OQ0OQQ) {
      if (OQ0OQQ["status"] == 1) {
        if ($["md5"](iplist[0] + "." + iplist[1] + ".000.000") == OQ0OQQ["ipmd5"]) {
          var OQQQ0Q = OQ0OQQ["ipmd5"];
        } else {
          var OQQQ0Q = $["md5"](returnCitySN["cip"]);
        }

        data = OQ0OQQ["data"];
        jmdata = AES_CBC_DE(data, $["md5"](OQ0OQQ["appkey"] + OQQQ0Q));
        info = JSON["parse"](jmdata);
        info["url"] = decodeURIComponent(decode_url(info["url"], $["md5"](Host + Token)));

        if (PlayConfig["Route"]) {
          var Q0000Q = false;
          Routes = PlayConfig["Route"]["split"]("|");

          for (var OQQ0QO = 0; OQQ0QO < Routes["length"]; OQQ0QO++) {
            if (info["url"]["indexOf"](Routes[OQQ0QO]) != -1) {
              Q0000Q = true;
              break;
            } else {
              Q0000Q = false;
            }
          }

          if (Q0000Q) {
            $("head")["append"]("<meta name=\"referrer\" content=\"no-referrer\">");
          } else {
            $("head")["append"]("<meta name=\"referrer\" content=\"strict-origin-when-cross-origin\">");
          }
        } else {
          $("head")["append"]("<meta name=\"referrer\" content=\"strict-origin-when-cross-origin\">");
        }

        if (info["type"] == "url") {
          $("#video")["html"]("<iframe id=\"video\" scrolling=\"no\" allowtransparency=\"true\" src=\"" + info["url"] + "\" width=\"100%\" height=\"100%\" style=\"background: #000000\" frameborder=\"0\" border=\"0\" marginwidth=\"0\" marginheight=\"0\" allowfullscreen=\"allowfullscreen\" mozallowfullscreen=\"mozallowfullscreen\" msallowfullscreen=\"msallowfullscreen\" oallowfullscreen=\"oallowfullscreen\" webkitallowfullscreen=\"webkitallowfullscreen\"></iframe>");
        } else {
          play(info);
        }
      } else if (PlayConfig["Online"] == "1") {
        $(".tips")["text"](PlayConfig["Onlinemsg"]);
        setTimeout(function () {
          $("#loading")["hide"]();
          $("#video")["show"]();
          $("#video")["html"]("<iframe frameborder=0 marginheight=0 marginwidth=0 scrolling=no src=\"" + PlayConfig["Ather"] + PlayConfig["Url"] + "\" width=\"100%\" height=\"100%\" allowfullscreen=\"true\"></iframe>");
        }, PlayConfig["Onlinetime"] * 1000);
      } else {
        $(".tips")["hide"]();
        $(".timeout")["show"]();
        $(".timeout")["text"](OQ0OQQ["data"]["msg"]);
      }
    }
  });
}

function play(OQQ0OO) {
  if (OQQ0OO["player"] == "dplayer" || OQQ0OO["player"] == "mplayer" || OQQ0OO["player"] == "h5") {
    $LAB["script"](PlayerPath["mui"])["script"](PlayerPath["mui_desktop"])["script"](PlayerPath["mui_mobile"])["script"](PlayerPath["hls"])["script"](PlayerPath["flv"])["wait"](function () {
      console["log"]("MuiPlayer播放器加载成功!");
      var OO0000 = {
        "container": "#video",
        "src": OQQ0OO["url"],
        "poster": PlayConfig["Loading"],
        "autoplay": PlayConfig["Autodp"],
        "initFullFixed": true,
        "preload": "auto",
        "autoOrientaion": true,
        "videoAttribute": [{
          "attrKey": "playsinline",
          "attrValue": "playsinline"
        }, {
          "attrKey": "webkit-playsinline",
          "attrValue": "webkit-playsinline"
        }, {
          "attrKey": "x5-video-player-type",
          "attrValue": "h5-page"
        }],
        "plugins": [new MuiPlayerDesktopPlugin({
          "leaveHiddenControls": true,
          "fullScaling": 1
        }), new MuiPlayerMobilePlugin({
          "showMenuButton": true
        })]
      };

      if (OQQ0OO["type"] == "hls" || OQQ0OO["url"]["indexOf"](".m3u8") > -1) {
        OO0000["parse"] = {
          "type": "hls",
          "loader": Hls,
          "config": {
            "debug": false
          }
        };
      } else if (OQQ0OO["type"] == "flv" || OQQ0OO["url"]["indexOf"](".flv") > -1) {
        OO0000["parse"] = {
          "type": "flv",
          "loader": flvjs,
          "config": {
            "debug": false
          }
        };
      } else {
        OO0000["parse"] = {
          "type": "mp4",
          "config": {
            "debug": false
          }
        };
      }

      var OOOOOQ = new MuiPlayer(OO0000);
      OOOOOQ["on"]("ready", function () {
        OOOOOQ["showToast"]("请手动点击播放");
        video = OOOOOQ["video"]();

        if (webdata["get"](PlayConfig["Url"]) && webdata["get"](PlayConfig["Url"]) != undefined) {
          video["addEventListener"]("loadedmetadata", function () {
            this["currentTime"] = webdata["get"](PlayConfig["Url"]);
          });
        }

        video["addEventListener"]("timeupdate", function () {
          webdata["set"](PlayConfig["Url"], Math["floor"](video["currentTime"]));
        });
      });
    });
    $("#loading")["hide"]();
    $("#video")["show"]();
  } else if (OQQ0OO["player"] == "ckplayer") {
    $LAB["script"](PlayerPath["ck"])["wait"](function () {
      console["log"]("ckplayer播放器加载成功!");

      if (OQQ0OO["type"] == "m3u8") {
        var Q0O000 = {
          "f": PlayerPath["m3u8swf"],
          "a": encodeURIComponent(OQQ0OO["url"]),
          "c": 0,
          "s": 4,
          "p": PlayConfig["Autock"],
          "v": 100
        };
        var Q0OQ0O = [OQQ0OO["url"] + "->video"];
        CKobject["embed"](PlayerPath["ckswf"], "video", "ckplayer_a1", "100%", "100%", false, Q0O000, Q0OQ0O);
        $("#loading")["hide"]();
        $("#video")["show"]();
      } else {
        $("#loading")["show"]();
        $(".tips")["hide"]();
        $("#video")["hide"]();
        $(".timeout")["show"]();
        $(".timeout")["text"]("播放器加载失败!");
        console["log"]("播放器加载失败!");
      }
    });
  } else {
    $("#loading")["show"]();
    $(".tips")["hide"]();
    $("#video")["hide"]();
    $(".timeout")["show"]();
    $(".timeout")["text"]("播放器加载失败!");
    console["log"]("播放器加载失败!");
  }
}

;
OＯ0$ = "jsjiami.com.v6";