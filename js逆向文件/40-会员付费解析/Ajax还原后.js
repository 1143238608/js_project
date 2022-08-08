;

function O00Q0Q(O000Q0) {
  $(".timemsg")["text"](O000Q0);

  if (O000Q0 == 15) {
    $(".tips")["hide"]();
    $(".timeout")["show"]();
  } else {
    O000Q0 += 1;
    setTimeout(function () {
      O00Q0Q(O000Q0);
    }, 1000);
  }
}

O00Q0Q(0);
QQQQOO();

function QQQQOO() {
  $["cookie"]("uuid", Vkey + "-" + Key + "-" + Sign + "-" + Token);
  $["cookie"]("BAIDUID", $["md5"](Vkey + "-" + Key + "-" + Sign + "-" + Token)["toUpperCase"]());
  $["cookie"]("BAIDUSID", $["md5"](Key1 + "-" + Sign1 + "-" + Token1)["toUpperCase"]());

  if (isios) {
    var QOOO0O = "1";
  } else {
    var QOOO0O = "0";
  }

  if (isiPad) {
    var QO00Q0 = "1";
  } else {
    var QO00Q0 = "0";
  }

  var QO0000 = {
    "url": Vurl,
    "wap": QO00Q0,
    "ios": QOOO0O,
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
  Ckey = AES_CBC(JSON["stringify"](QO0000), $["md5"](XXTEA["encryptToBase64"](Vkey + "-" + Key + "-" + Sign + "-" + Token + Key1 + "-" + Sign1 + "-" + Token1 + Key2 + Sign2 + Token2, Host + Domain + Time)));
  var QO0QQQ = {
    "ckey": "110#" + Base64["encode"](Ckey)
  };
  DATA = Object["assign"](QO0000, QO0QQQ);
  iplist = returnCitySN["cip"]["split"](".");
  $["ajax"]({
    "type": "post",
    "url": Api + "/Api.php" + "?ver=" + Version + "&timestamp=" + Time + "&appkey=" + $["md5"](Host), //Host = jx.aidouer.net
    "dataType": "json",
    "headers": {
      "Vkey": Vkey,
      "Ipmd5": $["md5"](iplist[0] + "." + iplist[1] + ".000.000"),
      "Version": Version,
      "Access-Token0": Vkey + "-" + Key + "-" + Sign + "-" + Token,
      "Access-Token1": Key1 + "-" + Sign1 + "-" + Token1,
      "Access-Token2": XXTEA["encryptToBase64"](Vkey + "-" + Key + "-" + Sign + "-" + Token + Key1 + "-" + Sign1 + "-" + Token1 + Key2 + Sign2 + Token2, Host + Domain + Time),
      "Access-Token3": TSTKC(DATA)
=    },
    "data": DATA,
    "success": function (QOQ00O) {
      if (QOQ00O["status"] == 1) {
        if ($["md5"](iplist[0] + "." + iplist[1] + ".000.000") == QOQ00O["ipmd5"]) {
          var O0OQO0 = QOQ00O["ipmd5"];
        } else {
          var O0OQO0 = $["md5"](returnCitySN["cip"]);
        }

        data = QOQ00O["data"];
        jmdata = AES_CBC_DE(data, $["md5"](QOQ00O["appkey"] + O0OQO0));
        info = JSON["parse"](jmdata);
        info["url"] = decodeURIComponent(decode_url(info["url"], $["md5"](Host + Token)));

        if (PlayConfig["Route"]) {
          var Q00O0Q = false;
          Routes = PlayConfig["Route"]["split"]("|");

          for (var OOOQQ0 = 0; OOOQQ0 < Routes["length"]; OOOQQ0++) {
            if (info["url"]["indexOf"](Routes[OOOQQ0]) != -1) {
              Q00O0Q = true;
              break;
            } else {
              Q00O0Q = false;
            }
          }

          if (Q00O0Q) {
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
          OOOQ00(info);
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
        $(".timeout")["text"](QOQ00O["data"]["msg"]);
      }
    }
  });
}

function OOOQ00(OOO0OQ) {
  if (OOO0OQ["player"] == "dplayer" || OOO0OQ["player"] == "mplayer" || OOO0OQ["player"] == "h5") {
    $LAB["script"](PlayConfig["Playpath"] + "/c2d5cb6f-1b4d-46e3-b1f1-e1b315eadebf.js?t=" + Time)["script"](PlayConfig["Playpath"] + "/41cd0c97-ca24-421c-99ac-4997aa00ce6c.js?t=" + Time)["script"](PlayConfig["Playpath"] + "/e33f5839-25cc-4d5a-b221-5c973d2f0341.js?t=" + Time)["script"](PlayConfig["Playpath"] + "/b3c24266-3b26-443d-b791-3acb2453cc7e.js?t=" + Time)["script"](PlayConfig["Playpath"] + "/85dbfcc1-5e29-4fdb-84ac-3a8df406bda0.js?t=" + Time)["wait"](function () {
      console["log"]("MuiPlayer播放器加载成功!");
      var Q00QOQ = {
        "container": "#video",
        "src": OOO0OQ["url"],
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

      if (OOO0OQ["type"] == "hls" || OOO0OQ["url"]["indexOf"](".m3u8") > -1) {
        Q00QOQ["parse"] = {
          "type": "hls",
          "loader": Hls,
          "config": {
            "debug": false
          }
        };
      } else if (OOO0OQ["type"] == "flv" || OOO0OQ["url"]["indexOf"](".flv") > -1) {
        Q00QOQ["parse"] = {
          "type": "flv",
          "loader": flvjs,
          "config": {
            "debug": false
          }
        };
      } else {
        Q00QOQ["parse"] = {
          "type": "mp4",
          "config": {
            "debug": false
          }
        };
      }

      var OO0QO0 = new MuiPlayer(Q00QOQ);
      OO0QO0["on"]("ready", function () {
        OO0QO0["showToast"]("请手动点击播放");
        video = OO0QO0["video"]();

        if (QQ00OO["get"](PlayConfig["Url"]) && QQ00OO["get"](PlayConfig["Url"]) != undefined) {
          video["addEventListener"]("loadedmetadata", function () {
            this["currentTime"] = QQ00OO["get"](PlayConfig["Url"]);
          });
        }

        video["addEventListener"]("timeupdate", function () {
          QQ00OO["set"](PlayConfig["Url"], Math["floor"](video["currentTime"]));
        });
      });
    });
    $("#loading")["hide"]();
    $("#video")["show"]();
  } else if (OOO0OQ["player"] == "ckplayer") {
    $LAB["script"](PlayConfig["Playpath"] + "/39fd8431-9c5b-425e-a59a-99a69cf12c2b.js?t=" + Time)["wait"](function () {
      console["log"]("ckplayer播放器加载成功!");

      if (OOO0OQ["type"] == "m3u8") {
        var OQQO0O = {
          "f": PlayConfig["Playpath"] + "/e1bede7d-b94a-4eea-9846-dd906d385183.swf?t=" + Time,
          "a": encodeURIComponent(OOO0OQ["url"]),
          "c": 0,
          "s": 4,
          "p": PlayConfig["Autock"],
          "v": 100
        };
        var OQQOQO = [OOO0OQ["url"] + "->video"];
        CKobject["embed"](PlayConfig["Playpath"] + "/4419c9cd-b79f-44ff-a99e-a5145b88683c.swf?t=" + Time, "video", "ckplayer_a1", "100%", "100%", false, OQQO0O, OQQOQO);
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