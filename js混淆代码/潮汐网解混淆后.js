ws = CryptoJS["AES"]["decrypt"](ws, CryptoJS["enc"]["Utf8"]["parse"]("aaasfbbbbcccgasdeeeeffffgrwervxr"), {
    "iv": CryptoJS["enc"]["Utf8"]["parse"]("3125674387384578"),
    "mode": CryptoJS["mode"]["CBC"],
    "padding": CryptoJS["pad"]["ZeroPadding"]
});
ts = CryptoJS["AES"]["decrypt"](ts, CryptoJS["enc"]["Utf8"]["parse"]("aaasfbbbbcccgasdeeeeffffgrwervxr"), {
    "iv": CryptoJS["enc"]["Utf8"]["parse"]("3125674387384578"),
    "mode": CryptoJS["mode"]["CBC"],
    "padding": CryptoJS["pad"]["ZeroPadding"]
});

function set_GHPJ(_0x51da5a) {
    if (Number(_0x51da5a) < 0.5)
        return "(优)";
    else if (Number(_0x51da5a) < 1)
        return "(好)";
    else if (Number(_0x51da5a) < 1.5)
        return "(一般)";
    else
        return "(差)";
}

function fromDate(_0x4ac72d) {
    if (_0x4ac72d && _0x4ac72d != null && _0x4ac72d != "null") {
        return Number(_0x4ac72d["split"](":")[0]) + ":" + Number(_0x4ac72d["split"](":")[1]);
    } else {
        return "";
    }
}

function getMarkPoint(_0x328a1a, _0x3e9f32, _0x18fb33, _0x4962c5) {
    var _0x38baa6 = Number(_0x328a1a) + (_0x3e9f32 == 0 ? "" : ":" + Number(_0x3e9f32));

    if (_0x4962c5["length"] > 0) {
        _0x38baa6 = _0x4962c5;
    }

    if (_0x18fb33 == "#ff8585")
        _0x38baa6 = "▴";
    else
        _0x38baa6 = "▾";
    if (_0x18fb33 == "#3ba7a3")
        _0x38baa6 = "♢";
    return {
        "name": "",
        "value": _0x38baa6,
        "xAxis": _0x328a1a * cc + Math["ceil"](_0x3e9f32 / (60 / cc)),
        "yAxis": JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideData"][_0x328a1a * cc + Math["ceil"](_0x3e9f32 / (60 / cc))] != "null" ? JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideData"][_0x328a1a * cc + Math["ceil"](_0x3e9f32 / (60 / cc))] : JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideData1"][_0x328a1a * cc + Math["ceil"](_0x3e9f32 / (60 / cc))],
        "itemStyle": {
            "color": _0x18fb33
        }
    };
}

var cc = JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["cc"];
var x = [];

for (var i = 0; i < 24; i++) {
    for (var y = 0; y < 60; y = y + 60 / cc) {
        if (y < 10)
            x["push"](i + ":0" + y);
        else
            x["push"](i + ":" + y);
    }
}

x["push"]("0:00");
JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideData"] = JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideData"]["split"](",");
JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideData1"] = JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideData1"]["split"](",");
JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideSpeed"] = JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideSpeed"]["split"](",");
JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TidePrp"] = JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TidePrp"]["split"](",");
JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"] = JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"]["split"](",");
JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Sunrise"] = fromDate(JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Sunrise"]);
JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Sunset"] = fromDate(JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Sunset"]);
JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Length"] = fromDate(JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["Day_Length"]);
JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time1"] = x[JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"][0]];
JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time2"] = x[JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"][1]];
JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time3"] = x[JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"][2]];
JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time4"] = x[JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"][3]];
JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_High_Tide1"] = JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideData"][JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"][0]] != "null" ? JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideData"][JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"][0]] : JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideData1"][JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"][0]];
JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_High_Tide2"] = JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideData"][JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"][1]] != "null" ? JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideData"][JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"][1]] : JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideData1"][JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"][1]];
JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_High_Tide3"] = JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideData"][JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"][2]] != "null" ? JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideData"][JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"][2]] : JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideData1"][JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"][2]];
JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_High_Tide4"] = JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideData"][JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"][3]] != "null" ? JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideData"][JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"][3]] : JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideData1"][JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"][3]];
JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["State1"] = JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["isRetreat"] ? "满潮" : "干潮";
JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["State2"] = JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["isRetreat"] ? "干潮" : "满潮";
JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["State3"] = JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["isRetreat"] ? "满潮" : "干潮";
JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["State4"] = JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["isRetreat"] ? "干潮" : "满潮";
JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["ready1"] = JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["isRetreat"] ? "退潮" : "涨潮";
JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["ready2"] = JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["isRetreat"] ? "涨潮" : "退潮";
JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["ready3"] = JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["isRetreat"] ? "退潮" : "涨潮";
JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["ready4"] = JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["isRetreat"] ? "涨潮" : "退潮";
JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["GHDesc"] = "推荐赶海时间：";
JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["YKDesc"] = "最佳鱼口时间：";
JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideDesc"] = "";

if (JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time1"]) {
    if (JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["State1"] == "干潮") {
        var _0x50fd1d = Number(JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time1"]["split"](":")[0]) - 4;

        if (_0x50fd1d < 0)
            _0x50fd1d = "前天" + (24 + _0x50fd1d);
        JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["GHDesc"] += _0x50fd1d + ":" + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time1"]["split"](":")[1] + " - " + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time1"] + "点" + set_GHPJ(JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_High_Tide1"]) + "；";
    } else {
        if (JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time2"])
            JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideDesc"] += JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time1"] + "点 - " + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time2"] + "点" + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["ready1"] + "；";
        else
            JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideDesc"] += JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time1"] + "点开始" + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["ready1"] + "；";
    }

    var _0x50fd1d = Number(JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time1"]["split"](":")[0]) - 1;

    if (_0x50fd1d < 0)
        _0x50fd1d = "前天" + (24 + _0x50fd1d);
    if (Number(JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time1"]["split"](":")[0]) + 1 > 24)
        _0x50fd1d = "第二天" + (24 + _0x50fd1d);
    JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["YKDesc"] += _0x50fd1d + "-" + Number(JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time1"]["split"](":")[0]) + 1 + "点；";
}

if (JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time2"]) {
    if (JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["State2"] == "干潮") {
        var d = Number(JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time2"]["split"](":")[0]) - 4;
        if (d < 0)
            d = "前天" + (24 + d);
        JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["GHDesc"] += d + ":" + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time2"]["split"](":")[1] + " - " + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time2"] + "点" + set_GHPJ(JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_High_Tide2"]) + "；";
    } else {
        if (JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time3"])
            JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideDesc"] += JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time2"] + "点 - " + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time3"] + "点" + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["ready2"] + "；";
        else
            JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideDesc"] += JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time2"] + "点开始" + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["ready2"] + "；";
    }

    var d = Number(JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time2"]["split"](":")[0]) - 1;
    if (d < 0)
        d = "前天" + (24 + d);
    if (Number(JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time2"]["split"](":")[0]) + 1 > 24)
        d = "第二天" + (24 + d);
    JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["YKDesc"] += d + "-" + Number(JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time2"]["split"](":")[0]) + 1 + "点；";
}

if (JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time3"]) {
    if (JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["State3"] == "干潮") {
        var _0x272820 = Number(JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time3"]["split"](":")[0]) - 4;

        if (_0x272820 < 0)
            _0x272820 = "前天" + (24 + _0x272820);
        JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["GHDesc"] += _0x272820 + ":" + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time3"]["split"](":")[1] + " - " + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time3"] + "点" + set_GHPJ(JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_High_Tide3"]) + "；";
    } else {
        if (JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time4"])
            JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideDesc"] += JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time3"] + "点 - " + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time4"] + "点" + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["ready3"] + "；";
        else
            JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideDesc"] += JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time3"] + "点开始" + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["ready3"] + "；";
    }

    var _0x272820 = Number(JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time3"]["split"](":")[0]) - 1;

    if (_0x272820 < 0)
        _0x272820 = "前天" + (24 + _0x272820);
    if (Number(JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time3"]["split"](":")[0]) + 1 > 24)
        _0x272820 = "第二天" + (24 + _0x272820);
    JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["YKDesc"] += _0x272820 + "-" + Number(JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time3"]["split"](":")[0]) + 1 + "点；";
}

if (JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time4"]) {
    if (JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["State4"] == "干潮") {
        var _0x9a04ff = Number(JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time4"]["split"](":")[0]) - 4;

        if (_0x9a04ff < 0)
            _0x9a04ff = 24 + _0x9a04ff;
        JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["GHDesc"] += _0x9a04ff + ":" + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time4"]["split"](":")[1] + " - " + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time4"] + "点" + set_GHPJ(JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_High_Tide4"]) + "；";
    } else {
        JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideDesc"] += JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time4"] + "点开始" + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["ready4"] + "到第二天；";
    }

    var _0x9a04ff = Number(JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time4"]["split"](":")[0]) - 1;

    if (_0x9a04ff < 0)
        _0x9a04ff = "前天" + (24 + _0x9a04ff);
    if (Number(JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time4"]["split"](":")[0]) + 1 > 24)
        _0x9a04ff = "第二天" + (24 + _0x9a04ff);
    JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["YKDesc"] += _0x9a04ff + "-" + Number(JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time4"]["split"](":")[0]) + 1 + "点；";
}

$("#ghdesc")["html"](JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["GHDesc"] + "<br/>" + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["YKDesc"]);
var today = "<div class=\"value\">                    <text class=\"column\">" + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time1"] + " - " + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time2"] + " " + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["ready1"] + "</text>                    <text class=\"column\">" + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_High_Tide1"] + " ➤ " + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_High_Tide2"] + "米" + "</text>                </div>                <div class=\"value\">                      <text class=\"column\" >" + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time2"] + " - " + (JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time3"] ? JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time3"] : "23:59") + " " + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["ready2"] + "</text>                   <text class=\"column\">" + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_High_Tide2"] + " ➤ " + (JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_High_Tide3"] ? JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_High_Tide3"] : "??") + "米" + "</text>                </div>";

if (JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time3"]) {
    today += " <div class=\"value\">                      <text class=\"column\" >" + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time3"] + " - " + (JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time4"] ? JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time4"] : "23:59") + " " + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["ready3"] + "</text >                   <text class=\"column\">" + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_High_Tide3"] + " ➤ " + (JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_High_Tide3"] ? JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_High_Tide3"] : "??") + "米" + "</text>                </div>";
}

if (JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time4"]) {
    today += " <div class=\"value\">                      <text class=\"column\" >" + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time4"] + " - 23:59" + " " + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["ready4"] + "</text >                   <text class=\"column\">" + JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_High_Tide4"] + " ➤ " + "??米" + "</text>                </div>";
}

$("#today")["append"](today);
var option = {};
var myChart = {};
$(function () {
    var _0x547001 = [];

    try {
        var _0x2f5b45 = JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time1"]["split"](":");

        _0x547001["push"](getMarkPoint(_0x2f5b45[0], _0x2f5b45[1], JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["isRetreat"] ? "#ff8585" : "#aaaaff", ""));
    } catch (_0x2ac6a7) {
        console["log"](_0x2ac6a7);
    }

    try {
        var _0x2f5b45 = JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time2"]["split"](":");

        _0x547001["push"](getMarkPoint(_0x2f5b45[0], _0x2f5b45[1], !JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["isRetreat"] ? "#ff8585" : "#aaaaff", ""));
    } catch (_0x16fe46) {
        console["log"](_0x16fe46);
    }

    try {
        var _0x2f5b45 = JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time3"]["split"](":");

        _0x547001["push"](getMarkPoint(_0x2f5b45[0], _0x2f5b45[1], JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["isRetreat"] ? "#ff8585" : "#aaaaff", ""));
    } catch (_0x232071) {
        console["log"](_0x232071);
    }

    try {
        var _0x2f5b45 = JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["DayList"]["Day_Time4"]["split"](":");

        _0x547001["push"](getMarkPoint(_0x2f5b45[0], _0x2f5b45[1], !JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["isRetreat"] ? "#ff8585" : "#aaaaff", ""));
    } catch (_0x593fc2) {
        console["log"](_0x593fc2);
    }

    try {
        var _0x33910e = new Date();

        _0x547001["push"](getMarkPoint(_0x33910e["getHours"](), _0x33910e["getMinutes"](), "#3ba7a3", ""));
    } catch (_0x321281) {
        console["log"](_0x321281);
    }

    option = {
        "grid": [{
                "top": 8,
                "left": 25,
                "right": 5,
                "bottom": 30
            }
        ],
        "color": ["#2a7d70", "#1f5b59", "#fa2424"],
        "backgroundColor": "#122b3a",
        "tooltip": {
            "show": true,
            "trigger": "axis",
            "position": [10, 0],
            "formatter": function (_0x16c187) {
                var _0x474702 = _0x16c187[0]["dataIndex"];
                var _0x4f60dc = "高：";
                if (_0x16c187[0]["data"] && _0x16c187[0]["data"] != "null")
                    _0x4f60dc = _0x4f60dc + Number(_0x16c187[0]["data"])["toFixed"](2) + "米 ；";
                else {
                    if (_0x16c187[1]["data"] && _0x16c187[1]["data"] != "null")
                        _0x4f60dc = _0x4f60dc + Number(_0x16c187[1]["data"])["toFixed"](2) + "米 ；";
                }
                var _0x210af1 = 0;
                if (JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"][3] && _0x16c187[0]["dataIndex"] <= Number(JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"][3]) || JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"]["length"] == 4)
                    _0x210af1 = JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"][3];
                if (JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"][2] && _0x16c187[0]["dataIndex"] <= Number(JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"][2]) || JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"]["length"] == 3)
                    _0x210af1 = JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"][2];
                if (JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"][1] && _0x16c187[0]["dataIndex"] <= Number(JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"][1]) || JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"]["length"] == 2)
                    _0x210af1 = JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"][1];
                if (JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"][0] && _0x16c187[0]["dataIndex"] <= Number(JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"][0]))
                    _0x210af1 = JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideChange"][0];
                var _0x2b2369 = "";

                if (JSON["parse"](ws["toString"](CryptoJS["enc"]["Utf8"])) && JSON["parse"](ws["toString"](CryptoJS["enc"]["Utf8"]))["length"] > 0 && JSON["parse"](ws["toString"](CryptoJS["enc"]["Utf8"]))[parseInt(_0x474702 / cc)] && JSON["parse"](ws["toString"](CryptoJS["enc"]["Utf8"]))[parseInt(_0x474702 / cc)]["wind"]) {
                    _0x2b2369 = "<br/>天气：" + JSON["parse"](ws["toString"](CryptoJS["enc"]["Utf8"]))[parseInt(_0x474702 / cc)]["skycon"] + "(" + JSON["parse"](ws["toString"](CryptoJS["enc"]["Utf8"]))[parseInt(_0x474702 / cc)]["temperature"] + "°C)；";
                    _0x2b2369 += JSON["parse"](ws["toString"](CryptoJS["enc"]["Utf8"]))[parseInt(_0x474702 / cc)]["wind_direction_txt"] + "风" + JSON["parse"](ws["toString"](CryptoJS["enc"]["Utf8"]))[parseInt(_0x474702 / cc)]["wind"]["wind_scale"] + "级；";
                    _0x2b2369 += (JSON["parse"](ws["toString"](CryptoJS["enc"]["Utf8"]))[parseInt(_0x474702 / cc)]["wind"]["wave_height_new"] ? JSON["parse"](ws["toString"](CryptoJS["enc"]["Utf8"]))[parseInt(_0x474702 / cc)]["wind"]["wave_height_new"]["toFixed"](1) : JSON["parse"](ws["toString"](CryptoJS["enc"]["Utf8"]))[parseInt(_0x474702 / cc)]["wind"]["wave_height_avg"]["toFixed"](1)) + "米" + JSON["parse"](ws["toString"](CryptoJS["enc"]["Utf8"]))[parseInt(_0x474702 / cc)]["wind"]["water_surface_image"] + "；气压";
                    _0x2b2369 += JSON["parse"](ws["toString"](CryptoJS["enc"]["Utf8"]))[parseInt(_0x474702 / cc)]["pressure"] + "hpa；";
                }

                $("#tooltip")["html"]("时间：" + _0x16c187[0]["name"] + " ；" + _0x4f60dc + "速：" + Number(_0x16c187[2]["data"])["toFixed"](2) + " 米/秒；" + "" + Number(JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TidePrp"][_0x16c187[0]["dataIndex"]] * 10)["toFixed"](1) + "分潮" + _0x2b2369);
                return "";
            }
        },
        "xAxis": {
            "type": "category",
            "boundaryGap": false,
            "data": x,
            "axisLine": {
                "lineStyle": {
                    "color": "#fff"
                }
            }
        },
        "yAxis": {
            "x": "center",
            "type": "value",
            "splitLine": {
                "lineStyle": {
                    "type": "dashed"
                }
            },
            "axisLine": {
                "lineStyle": {
                    "color": "#fff"
                }
            }
        },
        "series": [{
                "name": "白",
                "type": "line",
                "smooth": true,
                "areaStyle": {
                    "normal": {
                        "color": new echarts["graphic"]["LinearGradient"](0, 0, 0, 1, [{
                                    "offset": 0,
                                    "color": "#2a7d70"
                                }, {
                                    "offset": 1,
                                    "color": "#143340"
                                }
                            ])
                    }
                },
                "symbol": "none",
                "data": JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideData"],
                "markPoint": {
                    "data": _0x547001,
                    "symbolSize": 2,
                    "itemStyle": {
                        "normal": {
                            "label": {
                                "fontSize": 2
                            }
                        }
                    }
                }
            }, {
                "name": "黑",
                "type": "line",
                "smooth": true,
                "areaStyle": {
                    "normal": {
                        "color": new echarts["graphic"]["LinearGradient"](0, 0, 0, 1, [{
                                    "offset": 0,
                                    "color": "#1f5b59"
                                }, {
                                    "offset": 1,
                                    "color": "#143340"
                                }
                            ])
                    }
                },
                "symbol": "none",
                "data": JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideData1"]
            }, {
                "name": "速",
                "type": "line",
                "smooth": true,
                "areaStyle": {
                    "normal": {
                        "color": new echarts["graphic"]["LinearGradient"](0, 0, 0, 1, [{
                                    "offset": 0,
                                    "color": "#fa2424"
                                }, {
                                    "offset": 1,
                                    "color": "#143340"
                                }
                            ])
                    }
                },
                "symbol": "none",
                "data": JSON["parse"](ts["toString"](CryptoJS["enc"]["Utf8"]))["TideSpeed"]
            }
        ]
    };
    $("#tides")["height"](Number($("#tides")["width"]()) * 0.62);
    myChart = echarts["init"](document["getElementById"]("tides"));
    myChart["setOption"](option);
}); ;

var _0x328c08;

var _0x30f1a4;

_0x328c08 = "al";

try {
    _0x328c08 += "ert";
    _0x30f1a4 = encode_version;

    window[_0x328c08]("删除版本号，js会定期弹窗，还请支持我们的工作");
} catch (_0x494f48) {
    window[_0x328c08]("删除版本号，js会定期弹窗");
};
encode_version = "jsjiami.com.v5";
