//https://www.97799f.com:9900
!function (e, t) {
    "use strict";
    "undefined" != typeof window && "function" == typeof define && define.amd ? define(t) : "undefined" != typeof module && module.exports ? module.exports = t() : e.exports ? e.exports = t() : e.recognition = t()
}
(this, function () {
    "use strict";
    function u(e, t) {
        e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]],
        t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
        var r = [0, 0, 0, 0];
        return r[3] += e[3] + t[3],
        r[2] += r[3] >>> 16,
        r[3] &= 65535,
        r[2] += e[2] + t[2],
        r[1] += r[2] >>> 16,
        r[2] &= 65535,
        r[1] += e[1] + t[1],
        r[0] += r[1] >>> 16,
        r[1] &= 65535,
        r[0] += e[0] + t[0],
        r[0] &= 65535,
        [r[0] << 16 | r[1], r[2] << 16 | r[3]]
    }
    function d(e, t) {
        e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]],
        t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
        var r = [0, 0, 0, 0];
        return r[3] += e[3] * t[3],
        r[2] += r[3] >>> 16,
        r[3] &= 65535,
        r[2] += e[2] * t[3],
        r[1] += r[2] >>> 16,
        r[2] &= 65535,
        r[2] += e[3] * t[2],
        r[1] += r[2] >>> 16,
        r[2] &= 65535,
        r[1] += e[1] * t[3],
        r[0] += r[1] >>> 16,
        r[1] &= 65535,
        r[1] += e[2] * t[2],
        r[0] += r[1] >>> 16,
        r[1] &= 65535,
        r[1] += e[3] * t[1],
        r[0] += r[1] >>> 16,
        r[1] &= 65535,
        r[0] += e[0] * t[3] + e[1] * t[2] + e[2] * t[1] + e[3] * t[0],
        r[0] &= 65535,
        [r[0] << 16 | r[1], r[2] << 16 | r[3]]
    }
    function f(e, t) {
        return 32 === (t %= 64) ? [e[1], e[0]] : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t | e[0] >>> 32 - t] : [e[1] << (t -= 32) | e[0] >>> 32 - t, e[0] << t | e[1] >>> 32 - t]
    }
    function p(e, t) {
        return 0 === (t %= 64) ? e : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t] : [e[1] << t - 32, 0]
    }
    function g(e, t) {
        return [e[0] ^ t[0], e[1] ^ t[1]]
    }
    function A(e) {
        return e = g(e, [0, e[0] >>> 1]),
        e = d(e, [4283543511, 3981806797]),
        e = g(e, [0, e[0] >>> 1]),
        e = d(e, [3301882366, 444984403]),
        e = g(e, [0, e[0] >>> 1])
    }
    function h(e, t) {
        for (var r = (e = e || "").length % 16, i = e.length - r, n = [0, t = t || 0], a = [0, t], o = [0, 0], h = [0, 0], s = [2277735313, 289559509], l = [1291169091, 658871167], c = 0; c < i; c += 16)
            o = [255 & e.charCodeAt(c + 4) | (255 & e.charCodeAt(c + 5)) << 8 | (255 & e.charCodeAt(c + 6)) << 16 | (255 & e.charCodeAt(c + 7)) << 24, 255 & e.charCodeAt(c) | (255 & e.charCodeAt(c + 1)) << 8 | (255 & e.charCodeAt(c + 2)) << 16 | (255 & e.charCodeAt(c + 3)) << 24],
            h = [255 & e.charCodeAt(c + 12) | (255 & e.charCodeAt(c + 13)) << 8 | (255 & e.charCodeAt(c + 14)) << 16 | (255 & e.charCodeAt(c + 15)) << 24, 255 & e.charCodeAt(c + 8) | (255 & e.charCodeAt(c + 9)) << 8 | (255 & e.charCodeAt(c + 10)) << 16 | (255 & e.charCodeAt(c + 11)) << 24],
            o = d(o, s),
            o = f(o, 31),
            o = d(o, l),
            n = g(n, o),
            n = f(n, 27),
            n = u(n, a),
            n = u(d(n, [0, 5]), [0, 1390208809]),
            h = d(h, l),
            h = f(h, 33),
            h = d(h, s),
            a = g(a, h),
            a = f(a, 31),
            a = u(a, n),
            a = u(d(a, [0, 5]), [0, 944331445]);
        switch (o = [0, 0],
            h = [0, 0],
            r) {
        case 15:
            h = g(h, p([0, e.charCodeAt(c + 14)], 48));
        case 14:
            h = g(h, p([0, e.charCodeAt(c + 13)], 40));
        case 13:
            h = g(h, p([0, e.charCodeAt(c + 12)], 32));
        case 12:
            h = g(h, p([0, e.charCodeAt(c + 11)], 24));
        case 11:
            h = g(h, p([0, e.charCodeAt(c + 10)], 16));
        case 10:
            h = g(h, p([0, e.charCodeAt(c + 9)], 8));
        case 9:
            h = g(h, [0, e.charCodeAt(c + 8)]),
            h = d(h, l),
            h = f(h, 33),
            h = d(h, s),
            a = g(a, h);
        case 8:
            o = g(o, p([0, e.charCodeAt(c + 7)], 56));
        case 7:
            o = g(o, p([0, e.charCodeAt(c + 6)], 48));
        case 6:
            o = g(o, p([0, e.charCodeAt(c + 5)], 40));
        case 5:
            o = g(o, p([0, e.charCodeAt(c + 4)], 32));
        case 4:
            o = g(o, p([0, e.charCodeAt(c + 3)], 24));
        case 3:
            o = g(o, p([0, e.charCodeAt(c + 2)], 16));
        case 2:
            o = g(o, p([0, e.charCodeAt(c + 1)], 8));
        case 1:
            o = g(o, [0, e.charCodeAt(c)]),
            o = d(o, s),
            o = f(o, 31),
            o = d(o, l),
            n = g(n, o)
        }
        return n = g(n, [0, e.length]),
        a = g(a, [0, e.length]),
        n = u(n, a),
        a = u(a, n),
        n = A(n),
        a = A(a),
        n = u(n, a),
        a = u(a, n),
        ("00000000" + (n[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (n[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (a[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (a[1] >>> 0).toString(16)).slice(-8)
    }
    function s(e, t) {
        if (Array.prototype.forEach && e.forEach === Array.prototype.forEach)
            e.forEach(t);
        else if (e.length === +e.length)
            for (var r = 0, i = e.length; r < i; r++)
                t(e[r], r, e);
        else
            for (var n in e)
                e.hasOwnProperty(n) && t(e[n], n, e)
    }
    function l(e, i) {
        var n = [];
        return null == e ? n : Array.prototype.map && e.map === Array.prototype.map ? e.map(i) : (s(e, function (e, t, r) {
                n.push(i(e, t, r))
            }),
            n)
    }
    function i(e) {
        throw new Error("'new Fingerprint()' is deprecated, see https://github.com/Valve/fingerprintjs2#upgrade-guide-from-182-to-200")
    }
    var e = {
        preprocessor: null,
        audio: {
            timeout: 1e3,
            excludeIOS11: !0
        },
        fonts: {
            swfContainerId: "fingerprintjs2",
            swfPath: "flash/compiled/FontList.swf",
            userDefinedFonts: [],
            extendedJsFonts: !1
        },
        screen: {
            detectScreenOrientation: !0
        },
        plugins: {
            sortPluginsFor: [/palemoon/i],
            excludeIE: !1
        },
        extraComponents: [],
        excludes: {
            enumerateDevices: !0,
            pixelRatio: !0,
            doNotTrack: !0,
            fontsFlash: !0
        },
        NOT_AVAILABLE: "not available",
        ERROR: "error",
        EXCLUDED: "excluded"
    },
    r = function () {
        return navigator.mediaDevices && navigator.mediaDevices.enumerateDevices
    },
    n = function (e) {
        var t = [window.screen.width, window.screen.height];
        return e.screen.detectScreenOrientation && t.sort().reverse(),
        t
    },
    a = function (e) {
        if (window.screen.availWidth && window.screen.availHeight) {
            var t = [window.screen.availHeight, window.screen.availWidth];
            return e.screen.detectScreenOrientation && t.sort().reverse(),
            t
        }
        return e.NOT_AVAILABLE
    },
    o = function (e) {
        if (null == navigator.plugins)
            return e.NOT_AVAILABLE;
        for (var t = [], r = 0, i = navigator.plugins.length; r < i; r++)
            navigator.plugins[r] && t.push(navigator.plugins[r]);
        return S(e) && (t = t.sort(function (e, t) {
                return e.name > t.name ? 1 : e.name < t.name ? -1 : 0
            })),
        l(t, function (e) {
            var t = l(e, function (e) {
                return [e.type, e.suffixes]
            });
            return [e.name, e.description, t]
        })
    },
    c = function (t) {
        var e = [];
        return Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject") || "ActiveXObject" in window ? e = l(["AcroPDF.PDF", "Adodb.Stream", "AgControl.AgControl", "DevalVRXCtrl.DevalVRXCtrl.1", "MacromediaFlashPaper.MacromediaFlashPaper", "Msxml2.DOMDocument", "Msxml2.XMLHTTP", "PDF.PdfCtrl", "QuickTime.QuickTime", "QuickTimeCheckObject.QuickTimeCheck.1", "RealPlayer", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "Scripting.Dictionary", "SWCtl.SWCtl", "Shell.UIHelper", "ShockwaveFlash.ShockwaveFlash", "Skype.Detection", "TDCCtl.TDCCtl", "WMPlayer.OCX", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1"], function (e) {
            try {
                return new window.ActiveXObject(e),
                e
            } catch (e) {
                return t.ERROR
            }
        }) : e.push(t.NOT_AVAILABLE),
        e = navigator.plugins ? e.concat(o(t)) : e
    },
    S = function (e) {
        for (var t = !1, r = 0, i = e.plugins.sortPluginsFor.length; r < i; r++) {
            var n = e.plugins.sortPluginsFor[r];
            if (navigator.userAgent.match(n)) {
                t = !0;
                break
            }
        }
        return t
    },
    m = function (t) {
        try {
            return !!window.sessionStorage
        } catch (e) {
            return t.ERROR
        }
    },
    y = function (t) {
        try {
            return !!window.localStorage
        } catch (e) {
            return t.ERROR
        }
    },
    E = function (t) {
        try {
            return !!window.indexedDB
        } catch (e) {
            return t.ERROR
        }
    },
    T = function (e) {
        return navigator.hardwareConcurrency || e.NOT_AVAILABLE
    },
    C = function (e) {
        return navigator.cpuClass || e.NOT_AVAILABLE
    },
    v = function (e) {
        return navigator.platform || e.NOT_AVAILABLE
    },
    w = function (e) {
        return navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack || e.NOT_AVAILABLE
    },
    t = function () {
        var t,
        e = 0;
        void 0 !== navigator.maxTouchPoints ? e = navigator.maxTouchPoints : void 0 !== navigator.msMaxTouchPoints && (e = navigator.msMaxTouchPoints);
        try {
            document.createEvent("TouchEvent"),
            t = !0
        } catch (e) {
            t = !1
        }
        return [e, t, "ontouchstart" in window]
    },
    B = function (e) {
        var t = [],
        r = document.createElement("canvas");
        r.width = 2e3,
        r.height = 200,
        r.style.display = "inline";
        var i = r.getContext("2d");
        return i.rect(0, 0, 10, 10),
        i.rect(2, 2, 6, 6),
        t.push("canvas winding:" + (!1 === i.isPointInPath(5, 5, "evenodd") ? "yes" : "no")),
        i.textBaseline = "alphabetic",
        i.fillStyle = "#f60",
        i.fillRect(125, 1, 62, 20),
        i.fillStyle = "#069",
        e.dontUseFakeFontInCanvas ? i.font = "11pt Arial" : i.font = "11pt no-real-font-123",
        i.fillText("Cwm fjordbank glyphs vext quiz, 😃", 2, 15),
        i.fillStyle = "rgba(102, 204, 0, 0.2)",
        i.font = "18pt Arial",
        i.fillText("Cwm fjordbank glyphs vext quiz, 😃", 4, 45),
        i.globalCompositeOperation = "multiply",
        i.fillStyle = "rgb(255,0,255)",
        i.beginPath(),
        i.arc(50, 50, 50, 0, 2 * Math.PI, !0),
        i.closePath(),
        i.fill(),
        i.fillStyle = "rgb(0,255,255)",
        i.beginPath(),
        i.arc(100, 50, 50, 0, 2 * Math.PI, !0),
        i.closePath(),
        i.fill(),
        i.fillStyle = "rgb(255,255,0)",
        i.beginPath(),
        i.arc(75, 100, 50, 0, 2 * Math.PI, !0),
        i.closePath(),
        i.fill(),
        i.fillStyle = "rgb(255,0,255)",
        i.arc(75, 75, 75, 0, 2 * Math.PI, !0),
        i.arc(75, 75, 25, 0, 2 * Math.PI, !0),
        i.fill("evenodd"),
        r.toDataURL && t.push("canvas fp:" + r.toDataURL()),
        t
    },
    R = function () {
        function e(e) {
            return a.clearColor(0, 0, 0, 1),
            a.enable(a.DEPTH_TEST),
            a.depthFunc(a.LEQUAL),
            a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT),
            "[" + e[0] + ", " + e[1] + "]"
        }
        var a = U();
        if (!a)
            return null;
        var o = [],
        t = a.createBuffer();
        a.bindBuffer(a.ARRAY_BUFFER, t);
        var r = new Float32Array([ - .2,  - .9, 0, .4,  - .26, 0, 0, .732134444, 0]);
        a.bufferData(a.ARRAY_BUFFER, r, a.STATIC_DRAW),
        t.itemSize = 3,
        t.numItems = 3;
        var i = a.createProgram(),
        n = a.createShader(a.VERTEX_SHADER);
        a.shaderSource(n, "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}"),
        a.compileShader(n);
        r = a.createShader(a.FRAGMENT_SHADER);
        a.shaderSource(r, "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}"),
        a.compileShader(r),
        a.attachShader(i, n),
        a.attachShader(i, r),
        a.linkProgram(i),
        a.useProgram(i),
        i.vertexPosAttrib = a.getAttribLocation(i, "attrVertex"),
        i.offsetUniform = a.getUniformLocation(i, "uniformOffset"),
        a.enableVertexAttribArray(i.vertexPosArray),
        a.vertexAttribPointer(i.vertexPosAttrib, t.itemSize, a.FLOAT, !1, 0, 0),
        a.uniform2f(i.offsetUniform, 1, 1),
        a.drawArrays(a.TRIANGLE_STRIP, 0, t.numItems);
        try {
            o.push(a.canvas.toDataURL())
        } catch (e) {}
        o.push("extensions:" + (a.getSupportedExtensions() || []).join(";")),
        o.push("webgl aliased line width range:" + e(a.getParameter(a.ALIASED_LINE_WIDTH_RANGE))),
        o.push("webgl aliased point size range:" + e(a.getParameter(a.ALIASED_POINT_SIZE_RANGE))),
        o.push("webgl alpha bits:" + a.getParameter(a.ALPHA_BITS)),
        o.push("webgl antialiasing:" + (a.getContextAttributes().antialias ? "yes" : "no")),
        o.push("webgl blue bits:" + a.getParameter(a.BLUE_BITS)),
        o.push("webgl depth bits:" + a.getParameter(a.DEPTH_BITS)),
        o.push("webgl green bits:" + a.getParameter(a.GREEN_BITS)),
        o.push("webgl max anisotropy:" + function (e) {
            var t = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic");
            if (t) {
                t = e.getParameter(t.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
                return t = 0 === t ? 2 : t
            }
            return null
        }
            (a)),
        o.push("webgl max combined texture image units:" + a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS)),
        o.push("webgl max cube map texture size:" + a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE)),
        o.push("webgl max fragment uniform vectors:" + a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS)),
        o.push("webgl max render buffer size:" + a.getParameter(a.MAX_RENDERBUFFER_SIZE)),
        o.push("webgl max texture image units:" + a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS)),
        o.push("webgl max texture size:" + a.getParameter(a.MAX_TEXTURE_SIZE)),
        o.push("webgl max varying vectors:" + a.getParameter(a.MAX_VARYING_VECTORS)),
        o.push("webgl max vertex attribs:" + a.getParameter(a.MAX_VERTEX_ATTRIBS)),
        o.push("webgl max vertex texture image units:" + a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS)),
        o.push("webgl max vertex uniform vectors:" + a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS)),
        o.push("webgl max viewport dims:" + e(a.getParameter(a.MAX_VIEWPORT_DIMS))),
        o.push("webgl red bits:" + a.getParameter(a.RED_BITS)),
        o.push("webgl renderer:" + a.getParameter(a.RENDERER)),
        o.push("webgl shading language version:" + a.getParameter(a.SHADING_LANGUAGE_VERSION)),
        o.push("webgl stencil bits:" + a.getParameter(a.STENCIL_BITS)),
        o.push("webgl vendor:" + a.getParameter(a.VENDOR)),
        o.push("webgl version:" + a.getParameter(a.VERSION));
        try {
            var h = a.getExtension("WEBGL_debug_renderer_info");
            h && (o.push("webgl unmasked vendor:" + a.getParameter(h.UNMASKED_VENDOR_WEBGL)),
                o.push("webgl unmasked renderer:" + a.getParameter(h.UNMASKED_RENDERER_WEBGL)))
        } catch (e) {}
        return a.getShaderPrecisionFormat && s(["FLOAT", "INT"], function (n) {
            s(["VERTEX", "FRAGMENT"], function (i) {
                s(["HIGH", "MEDIUM", "LOW"], function (r) {
                    s(["precision", "rangeMin", "rangeMax"], function (e) {
                        var t = a.getShaderPrecisionFormat(a[i + "_SHADER"], a[r + "_" + n])[e];
                        "precision" !== e && (e = "precision " + e);
                        t = ["webgl ", i.toLowerCase(), " shader ", r.toLowerCase(), " ", n.toLowerCase(), " ", e, ":", t].join("");
                        o.push(t)
                    })
                })
            })
        }),
        o
    },
    _ = function () {
        try {
            var e = U(),
            t = e.getExtension("WEBGL_debug_renderer_info");
            return e.getParameter(t.UNMASKED_VENDOR_WEBGL) + "~" + e.getParameter(t.UNMASKED_RENDERER_WEBGL)
        } catch (e) {
            return null
        }
    },
    b = function () {
        var e = document.createElement("div");
        e.innerHTML = "&nbsp;";
        var t = !(e.className = "adsbox");
        try {
            document.body.appendChild(e),
            t = 0 === document.getElementsByClassName("adsbox")[0].offsetHeight,
            document.body.removeChild(e)
        } catch (e) {
            t = !1
        }
        return t
    },
    H = function () {
        if (void 0 !== navigator.languages)
            try {
                if (navigator.languages[0].substr(0, 2) !== navigator.language.substr(0, 2))
                    return !0
            } catch (e) {
                return !0
            }
        return !1
    },
    O = function () {
        return window.screen.width < window.screen.availWidth || window.screen.height < window.screen.availHeight
    },
    M = function () {
        var e = navigator.userAgent.toLowerCase(),
        t = navigator.oscpu,
        r = navigator.platform.toLowerCase(),
        e = 0 <= e.indexOf("windows phone") ? "Windows Phone" : 0 <= e.indexOf("win") ? "Windows" : 0 <= e.indexOf("android") ? "Android" : 0 <= e.indexOf("linux") ? "Linux" : 0 <= e.indexOf("iphone") || 0 <= e.indexOf("ipad") ? "iOS" : 0 <= e.indexOf("mac") ? "Mac" : "Other";
        if (("ontouchstart" in window || 0 < navigator.maxTouchPoints || 0 < navigator.msMaxTouchPoints) && "Windows Phone" !== e && "Android" !== e && "iOS" !== e && "Other" !== e)
            return !0;
        if (void 0 !== t) {
            if (0 <= (t = t.toLowerCase()).indexOf("win") && "Windows" !== e && "Windows Phone" !== e)
                return !0;
            if (0 <= t.indexOf("linux") && "Linux" !== e && "Android" !== e)
                return !0;
            if (0 <= t.indexOf("mac") && "Mac" !== e && "iOS" !== e)
                return !0;
            if ((-1 === t.indexOf("win") && -1 === t.indexOf("linux") && -1 === t.indexOf("mac")) != ("Other" === e))
                return !0
        }
        return 0 <= r.indexOf("win") && "Windows" !== e && "Windows Phone" !== e || ((0 <= r.indexOf("linux") || 0 <= r.indexOf("android") || 0 <= r.indexOf("pike")) && "Linux" !== e && "Android" !== e || ((0 <= r.indexOf("mac") || 0 <= r.indexOf("ipad") || 0 <= r.indexOf("ipod") || 0 <= r.indexOf("iphone")) && "Mac" !== e && "iOS" !== e || ((-1 === r.indexOf("win") && -1 === r.indexOf("linux") && -1 === r.indexOf("mac")) != ("Other" === e) || void 0 === navigator.plugins && "Windows" !== e && "Windows Phone" !== e)))
    },
    x = function () {
        var e = navigator.userAgent.toLowerCase(),
        t = navigator.productSub,
        e = 0 <= e.indexOf("firefox") ? "Firefox" : 0 <= e.indexOf("opera") || 0 <= e.indexOf("opr") ? "Opera" : 0 <= e.indexOf("chrome") ? "Chrome" : 0 <= e.indexOf("safari") ? "Safari" : 0 <= e.indexOf("trident") ? "Internet Explorer" : "Other";
        if (("Chrome" === e || "Safari" === e || "Opera" === e) && "20030107" !== t)
            return !0;
        var r,
        t = eval.toString().length;
        if (37 === t && "Safari" !== e && "Firefox" !== e && "Other" !== e)
            return !0;
        if (39 === t && "Internet Explorer" !== e && "Other" !== e)
            return !0;
        if (33 === t && "Chrome" !== e && "Opera" !== e && "Other" !== e)
            return !0;
        try {
            throw "a"
        } catch (e) {
            try {
                e.toSource(),
                r = !0
            } catch (e) {
                r = !1
            }
        }
        return r && "Firefox" !== e && "Other" !== e
    },
    k = function () {
        var e = document.createElement("canvas");
        return !(!e.getContext || !e.getContext("2d"))
    },
    P = function () {
        if (!k())
            return !1;
        var e = U();
        return !!window.WebGLRenderingContext && !!e
    },
    I = function () {
        return "Microsoft Internet Explorer" === navigator.appName || !("Netscape" !== navigator.appName || !/Trident/.test(navigator.userAgent))
    },
    D = function () {
        return void 0 !== window.swfobject
    },
    L = function () {
        return window.swfobject.hasFlashPlayerVersion("9.0.0")
    },
    N = function (t, e) {
        var r = "___fp_swf_loaded";
        window[r] = function (e) {
            t(e)
        };
        var i,
        n,
        a = e.fonts.swfContainerId;
        (n = document.createElement("div")).setAttribute("id", i.fonts.swfContainerId),
        document.body.appendChild(n);
        window.swfobject.embedSWF(e.fonts.swfPath, a, "1", "1", "9.0.0", !1, {
            onReady: r
        }, {
            allowScriptAccess: "always",
            menu: "false"
        }, {})
    },
    U = function () {
        var e = document.createElement("canvas"),
        t = null;
        try {
            t = e.getContext("webgl") || e.getContext("experimental-webgl")
        } catch (e) {}
        return t = t || null
    },
    F = [{
            key: "userAgent",
            getData: function (e) {
                e(navigator.userAgent)
            }
        }, {
            key: "webdriver",
            getData: function (e, t) {
                e(null == navigator.webdriver ? t.NOT_AVAILABLE : navigator.webdriver)
            }
        }, {
            key: "language",
            getData: function (e, t) {
                e(navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || t.NOT_AVAILABLE)
            }
        }, {
            key: "colorDepth",
            getData: function (e, t) {
                e(window.screen.colorDepth || t.NOT_AVAILABLE)
            }
        }, {
            key: "deviceMemory",
            getData: function (e, t) {
                e(navigator.deviceMemory || t.NOT_AVAILABLE)
            }
        }, {
            key: "pixelRatio",
            getData: function (e, t) {
                e(window.devicePixelRatio || t.NOT_AVAILABLE)
            }
        }, {
            key: "hardwareConcurrency",
            getData: function (e, t) {
                e(T(t))
            }
        }, {
            key: "screenResolution",
            getData: function (e, t) {
                e(n(t))
            }
        }, {
            key: "availableScreenResolution",
            getData: function (e, t) {
                e(a(t))
            }
        }, {
            key: "timezoneOffset",
            getData: function (e) {
                e((new Date).getTimezoneOffset())
            }
        }, {
            key: "timezone",
            getData: function (e, t) {
                window.Intl && window.Intl.DateTimeFormat ? e((new window.Intl.DateTimeFormat).resolvedOptions().timeZone) : e(t.NOT_AVAILABLE)
            }
        }, {
            key: "sessionStorage",
            getData: function (e, t) {
                e(m(t))
            }
        }, {
            key: "localStorage",
            getData: function (e, t) {
                e(y(t))
            }
        }, {
            key: "indexedDb",
            getData: function (e, t) {
                e(E(t))
            }
        }, {
            key: "addBehavior",
            getData: function (e) {
                e(!(!document.body || !document.body.addBehavior))
            }
        }, {
            key: "openDatabase",
            getData: function (e) {
                e(!!window.openDatabase)
            }
        }, {
            key: "cpuClass",
            getData: function (e, t) {
                e(C(t))
            }
        }, {
            key: "platform",
            getData: function (e, t) {
                e(v(t))
            }
        }, {
            key: "doNotTrack",
            getData: function (e, t) {
                e(w(t))
            }
        }, {
            key: "plugins",
            getData: function (e, t) {
                I() ? t.plugins.excludeIE ? e(t.EXCLUDED) : e(c(t)) : e(o(t))
            }
        }, {
            key: "canvas",
            getData: function (e, t) {
                k() ? e(B(t)) : e(t.NOT_AVAILABLE)
            }
        }, {
            key: "webgl",
            getData: function (e, t) {
                P() ? e(R()) : e(t.NOT_AVAILABLE)
            }
        }, {
            key: "webglVendorAndRenderer",
            getData: function (e) {
                P() ? e(_()) : e()
            }
        }, {
            key: "adBlock",
            getData: function (e) {
                e(b())
            }
        }, {
            key: "hasLiedLanguages",
            getData: function (e) {
                e(H())
            }
        }, {
            key: "hasLiedResolution",
            getData: function (e) {
                e(O())
            }
        }, {
            key: "hasLiedOs",
            getData: function (e) {
                e(M())
            }
        }, {
            key: "hasLiedBrowser",
            getData: function (e) {
                e(x())
            }
        }, {
            key: "touchSupport",
            getData: function (e) {
                e(t())
            }
        }, {
            key: "fonts",
            getData: function (e, t) {
                var l = ["monospace", "sans-serif", "serif"],
                c = ["Andale Mono", "Arial", "Arial Black", "Arial Hebrew", "Arial MT", "Arial Narrow", "Arial Rounded MT Bold", "Arial Unicode MS", "Bitstream Vera Sans Mono", "Book Antiqua", "Bookman Old Style", "Calibri", "Cambria", "Cambria Math", "Century", "Century Gothic", "Century Schoolbook", "Comic Sans", "Comic Sans MS", "Consolas", "Courier", "Courier New", "Geneva", "Georgia", "Helvetica", "Helvetica Neue", "Impact", "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", "LUCIDA GRANDE", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Microsoft Sans Serif", "Monaco", "Monotype Corsiva", "MS Gothic", "MS Outlook", "MS PGothic", "MS Reference Sans Serif", "MS Sans Serif", "MS Serif", "MYRIAD", "MYRIAD PRO", "Palatino", "Palatino Linotype", "Segoe Print", "Segoe Script", "Segoe UI", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Tahoma", "Times", "Times New Roman", "Times New Roman PS", "Trebuchet MS", "Verdana", "Wingdings", "Wingdings 2", "Wingdings 3"];
                t.fonts.extendedJsFonts && (c = c.concat(["Abadi MT Condensed Light", "Academy Engraved LET", "ADOBE CASLON PRO", "Adobe Garamond", "ADOBE GARAMOND PRO", "Agency FB", "Aharoni", "Albertus Extra Bold", "Albertus Medium", "Algerian", "Amazone BT", "American Typewriter", "American Typewriter Condensed", "AmerType Md BT", "Andalus", "Angsana New", "AngsanaUPC", "Antique Olive", "Aparajita", "Apple Chancery", "Apple Color Emoji", "Apple SD Gothic Neo", "Arabic Typesetting", "ARCHER", "ARNO PRO", "Arrus BT", "Aurora Cn BT", "AvantGarde Bk BT", "AvantGarde Md BT", "AVENIR", "Ayuthaya", "Bandy", "Bangla Sangam MN", "Bank Gothic", "BankGothic Md BT", "Baskerville", "Baskerville Old Face", "Batang", "BatangChe", "Bauer Bodoni", "Bauhaus 93", "Bazooka", "Bell MT", "Bembo", "Benguiat Bk BT", "Berlin Sans FB", "Berlin Sans FB Demi", "Bernard MT Condensed", "BernhardFashion BT", "BernhardMod BT", "Big Caslon", "BinnerD", "Blackadder ITC", "BlairMdITC TT", "Bodoni 72", "Bodoni 72 Oldstyle", "Bodoni 72 Smallcaps", "Bodoni MT", "Bodoni MT Black", "Bodoni MT Condensed", "Bodoni MT Poster Compressed", "Bookshelf Symbol 7", "Boulder", "Bradley Hand", "Bradley Hand ITC", "Bremen Bd BT", "Britannic Bold", "Broadway", "Browallia New", "BrowalliaUPC", "Brush Script MT", "Californian FB", "Calisto MT", "Calligrapher", "Candara", "CaslonOpnface BT", "Castellar", "Centaur", "Cezanne", "CG Omega", "CG Times", "Chalkboard", "Chalkboard SE", "Chalkduster", "Charlesworth", "Charter Bd BT", "Charter BT", "Chaucer", "ChelthmITC Bk BT", "Chiller", "Clarendon", "Clarendon Condensed", "CloisterBlack BT", "Cochin", "Colonna MT", "Constantia", "Cooper Black", "Copperplate", "Copperplate Gothic", "Copperplate Gothic Bold", "Copperplate Gothic Light", "CopperplGoth Bd BT", "Corbel", "Cordia New", "CordiaUPC", "Cornerstone", "Coronet", "Cuckoo", "Curlz MT", "DaunPenh", "Dauphin", "David", "DB LCD Temp", "DELICIOUS", "Denmark", "DFKai-SB", "Didot", "DilleniaUPC", "DIN", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Edwardian Script ITC", "Elephant", "English 111 Vivace BT", "Engravers MT", "EngraversGothic BT", "Eras Bold ITC", "Eras Demi ITC", "Eras Light ITC", "Eras Medium ITC", "EucrosiaUPC", "Euphemia", "Euphemia UCAS", "EUROSTILE", "Exotc350 Bd BT", "FangSong", "Felix Titling", "Fixedsys", "FONTIN", "Footlight MT Light", "Forte", "FrankRuehl", "Fransiscan", "Freefrm721 Blk BT", "FreesiaUPC", "Freestyle Script", "French Script MT", "FrnkGothITC Bk BT", "Fruitger", "FRUTIGER", "Futura", "Futura Bk BT", "Futura Lt BT", "Futura Md BT", "Futura ZBlk BT", "FuturaBlack BT", "Gabriola", "Galliard BT", "Gautami", "Geeza Pro", "Geometr231 BT", "Geometr231 Hv BT", "Geometr231 Lt BT", "GeoSlab 703 Lt BT", "GeoSlab 703 XBd BT", "Gigi", "Gill Sans", "Gill Sans MT", "Gill Sans MT Condensed", "Gill Sans MT Ext Condensed Bold", "Gill Sans Ultra Bold", "Gill Sans Ultra Bold Condensed", "Gisha", "Gloucester MT Extra Condensed", "GOTHAM", "GOTHAM BOLD", "Goudy Old Style", "Goudy Stout", "GoudyHandtooled BT", "GoudyOLSt BT", "Gujarati Sangam MN", "Gulim", "GulimChe", "Gungsuh", "GungsuhChe", "Gurmukhi MN", "Haettenschweiler", "Harlow Solid Italic", "Harrington", "Heather", "Heiti SC", "Heiti TC", "HELV", "Herald", "High Tower Text", "Hiragino Kaku Gothic ProN", "Hiragino Mincho ProN", "Hoefler Text", "Humanst 521 Cn BT", "Humanst521 BT", "Humanst521 Lt BT", "Imprint MT Shadow", "Incised901 Bd BT", "Incised901 BT", "Incised901 Lt BT", "INCONSOLATA", "Informal Roman", "Informal011 BT", "INTERSTATE", "IrisUPC", "Iskoola Pota", "JasmineUPC", "Jazz LET", "Jenson", "Jester", "Jokerman", "Juice ITC", "Kabel Bk BT", "Kabel Ult BT", "Kailasa", "KaiTi", "Kalinga", "Kannada Sangam MN", "Kartika", "Kaufmann Bd BT", "Kaufmann BT", "Khmer UI", "KodchiangUPC", "Kokila", "Korinna BT", "Kristen ITC", "Krungthep", "Kunstler Script", "Lao UI", "Latha", "Leelawadee", "Letter Gothic", "Levenim MT", "LilyUPC", "Lithograph", "Lithograph Light", "Long Island", "Lydian BT", "Magneto", "Maiandra GD", "Malayalam Sangam MN", "Malgun Gothic", "Mangal", "Marigold", "Marion", "Marker Felt", "Market", "Marlett", "Matisse ITC", "Matura MT Script Capitals", "Meiryo", "Meiryo UI", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "MingLiU-ExtB", "Minion", "Minion Pro", "Miriam", "Miriam Fixed", "Mistral", "Modern", "Modern No. 20", "Mona Lisa Solid ITC TT", "Mongolian Baiti", "MONO", "MoolBoran", "Mrs Eaves", "MS LineDraw", "MS Mincho", "MS PMincho", "MS Reference Specialty", "MS UI Gothic", "MT Extra", "MUSEO", "MV Boli", "Nadeem", "Narkisim", "NEVIS", "News Gothic", "News GothicMT", "NewsGoth BT", "Niagara Engraved", "Niagara Solid", "Noteworthy", "NSimSun", "Nyala", "OCR A Extended", "Old Century", "Old English Text MT", "Onyx", "Onyx BT", "OPTIMA", "Oriya Sangam MN", "OSAKA", "OzHandicraft BT", "Palace Script MT", "Papyrus", "Parchment", "Party LET", "Pegasus", "Perpetua", "Perpetua Titling MT", "PetitaBold", "Pickwick", "Plantagenet Cherokee", "Playbill", "PMingLiU", "PMingLiU-ExtB", "Poor Richard", "Poster", "PosterBodoni BT", "PRINCETOWN LET", "Pristina", "PTBarnum BT", "Pythagoras", "Raavi", "Rage Italic", "Ravie", "Ribbon131 Bd BT", "Rockwell", "Rockwell Condensed", "Rockwell Extra Bold", "Rod", "Roman", "Sakkal Majalla", "Santa Fe LET", "Savoye LET", "Sceptre", "Script", "Script MT Bold", "SCRIPTINA", "Serifa", "Serifa BT", "Serifa Th BT", "ShelleyVolante BT", "Sherwood", "Shonar Bangla", "Showcard Gothic", "Shruti", "Signboard", "SILKSCREEN", "SimHei", "Simplified Arabic", "Simplified Arabic Fixed", "SimSun", "SimSun-ExtB", "Sinhala Sangam MN", "Sketch Rockwell", "Skia", "Small Fonts", "Snap ITC", "Snell Roundhand", "Socket", "Souvenir Lt BT", "Staccato222 BT", "Steamer", "Stencil", "Storybook", "Styllo", "Subway", "Swis721 BlkEx BT", "Swiss911 XCm BT", "Sylfaen", "Synchro LET", "System", "Tamil Sangam MN", "Technical", "Teletype", "Telugu Sangam MN", "Tempus Sans ITC", "Terminal", "Thonburi", "Traditional Arabic", "Trajan", "TRAJAN PRO", "Tristan", "Tubular", "Tunga", "Tw Cen MT", "Tw Cen MT Condensed", "Tw Cen MT Condensed Extra Bold", "TypoUpright BT", "Unicorn", "Univers", "Univers CE 55 Medium", "Univers Condensed", "Utsaah", "Vagabond", "Vani", "Vijaya", "Viner Hand ITC", "VisualUI", "Vivaldi", "Vladimir Script", "Vrinda", "Westminster", "WHITNEY", "Wide Latin", "ZapfEllipt BT", "ZapfHumnst BT", "ZapfHumnst Dm BT", "Zapfino", "Zurich BlkEx BT", "Zurich Ex BT", "ZWAdobeF"])),
                c = (c = c.concat(t.fonts.userDefinedFonts)).filter(function (e, t) {
                    return c.indexOf(e) === t
                });
                function u() {
                    var e = document.createElement("span");
                    return e.style.position = "absolute",
                    e.style.left = "-9999px",
                    e.style.fontSize = "72px",
                    e.style.fontStyle = "normal",
                    e.style.fontWeight = "normal",
                    e.style.letterSpacing = "normal",
                    e.style.lineBreak = "auto",
                    e.style.lineHeight = "normal",
                    e.style.textTransform = "none",
                    e.style.textAlign = "left",
                    e.style.textDecoration = "none",
                    e.style.textShadow = "none",
                    e.style.whiteSpace = "normal",
                    e.style.wordBreak = "normal",
                    e.style.wordSpacing = "normal",
                    e.innerHTML = "mmmmmmmmmmlli",
                    e
                }
                var t = document.getElementsByTagName("body")[0],
                n = document.createElement("div"),
                d = document.createElement("div"),
                i = {},
                a = {},
                r = function () {
                    for (var e = [], t = 0, r = l.length; t < r; t++) {
                        var i = u();
                        i.style.fontFamily = l[t],
                        n.appendChild(i),
                        e.push(i)
                    }
                    return e
                }
                ();
                t.appendChild(n);
                for (var o = 0, h = l.length; o < h; o++)
                    i[l[o]] = r[o].offsetWidth,
                    a[l[o]] = r[o].offsetHeight;
                var s = function () {
                    for (var e, t, r = {}, i = 0, n = c.length; i < n; i++) {
                        for (var a = [], o = 0, h = l.length; o < h; o++) {
                            var s = (e = c[i],
                                t = l[o],
                                s = void 0,
                                (s = u()).style.fontFamily = "'" + e + "'," + t,
                                s);
                            d.appendChild(s),
                            a.push(s)
                        }
                        r[c[i]] = a
                    }
                    return r
                }
                ();
                t.appendChild(d);
                for (var f = [], p = 0, g = c.length; p < g; p++)
                    !function (e) {
                        for (var t = !1, r = 0; r < l.length; r++)
                            if (t = e[r].offsetWidth !== i[l[r]] || e[r].offsetHeight !== a[l[r]])
                                return t;
                        return t
                    }
                (s[c[p]]) || f.push(c[p]);
                t.removeChild(d),
                t.removeChild(n),
                e(f)
            },
            pauseBefore: !0
        }, {
            key: "fontsFlash",
            getData: function (t, e) {
                return D() ? L() ? e.fonts.swfPath ? void N(function (e) {
                    t(e)
                }, e) : t("missing options.fonts.swfPath") : t("flash not installed") : t("swf object not loaded")
            },
            pauseBefore: !0
        }, {
            key: "audio",
            getData: function (r, e) {
                var t = e.audio;
                if (t.excludeIOS11 && navigator.userAgent.match(/OS 11.+Version\/11.+Safari/))
                    return r(e.EXCLUDED);
                var i = window.OfflineAudioContext || window.webkitOfflineAudioContext;
                if (null == i)
                    return r(e.NOT_AVAILABLE);
                var n = new i(1, 44100, 44100),
                a = n.createOscillator();
                a.type = "triangle",
                a.frequency.setValueAtTime(1e4, n.currentTime);
                var o = n.createDynamicsCompressor();
                s([["threshold", -50], ["knee", 40], ["ratio", 12], ["reduction", -20], ["attack", 0], ["release", .25]], function (e) {
                    void 0 !== o[e[0]] && "function" == typeof o[e[0]].setValueAtTime && o[e[0]].setValueAtTime(e[1], n.currentTime)
                }),
                a.connect(o),
                o.connect(n.destination),
                a.start(0),
                n.startRendering();
                var h = setTimeout(function () {
                    return console.warn('Audio fingerprint timed out. Please report bug at https://github.com/Valve/fingerprintjs2 with your user agent: "' + navigator.userAgent + '".'),
                    n.oncomplete = function () {},
                    n = null,
                    r("audioTimeout")
                }, t.timeout);
                n.oncomplete = function (e) {
                    var t;
                    try {
                        clearTimeout(h),
                        t = e.renderedBuffer.getChannelData(0).slice(4500, 5e3).reduce(function (e, t) {
                            return e + Math.abs(t)
                        }, 0).toString(),
                        a.disconnect(),
                        o.disconnect()
                    } catch (e) {
                        return void r(e)
                    }
                    r(t)
                }
            }
        }, {
            key: "enumerateDevices",
            getData: function (t, e) {
                if (!r())
                    return t(e.NOT_AVAILABLE);
                navigator.mediaDevices.enumerateDevices().then(function (e) {
                    t(e.map(function (e) {
                            return "id=" + e.deviceId + ";gid=" + e.groupId + ";" + e.kind + ";" + e.label
                        }))
                }).catch(function (e) {
                    t(e)
                })
            }
        }
    ];
    return i.get = function (r, i) {
        (function (e, t) {
            if (null == t)
                return;
            var r,
            i;
            for (i in t)
                null == (r = t[i]) || Object.prototype.hasOwnProperty.call(e, i) || (e[i] = r)
        })(r = i ? r || {}
             : (i = r, {}), e),
        r.components = r.extraComponents.concat(F);
        var n = {
            data: [],
            addPreprocessedComponent: function (e, t) {
                "function" == typeof r.preprocessor && (t = r.preprocessor(e, t)),
                n.data.push({
                    key: e,
                    value: t
                })
            }
        },
        a = -1,
        o = function (e) {
            if ((a += 1) >= r.components.length)
                i(n.data);
            else {
                var t = r.components[a];
                if (r.excludes[t.key])
                    o(!1);
                else {
                    if (!e && t.pauseBefore)
                        return --a,
                        void setTimeout(function () {
                            o(!0)
                        }, 1);
                    try {
                        t.getData(function (e) {
                            n.addPreprocessedComponent(t.key, e),
                            o(!1)
                        }, r)
                    } catch (e) {
                        n.addPreprocessedComponent(t.key, String(e)),
                        o(!1)
                    }
                }
            }
        };
        o(!1)
    },
    i.getPromise = function (r) {
        return new Promise(function (e, t) {
            i.get(r, e)
        })
    },
    i.getV18 = function (a, o) {
        return null == o && (o = a,
            a = {}),
        i.get(a, function (e) {
            for (var t = [], r = 0; r < e.length; r++) {
                var i = e[r];
                i.value === (a.NOT_AVAILABLE || "not available") ? t.push({
                    key: i.key,
                    value: "unknown"
                }) : "plugins" === i.key ? t.push({
                    key: "plugins",
                    value: l(i.value, function (e) {
                        var t = l(e[2], function (e) {
                            return e.join ? e.join("~") : e
                        }).join(",");
                        return [e[0], e[1], t].join("::")
                    })
                }) : -1 !== ["canvas", "webgl"].indexOf(i.key) ? t.push({
                    key: i.key,
                    value: i.value.join("~")
                }) : -1 !== ["sessionStorage", "localStorage", "indexedDb", "addBehavior", "openDatabase"].indexOf(i.key) ? i.value && t.push({
                    key: i.key,
                    value: 1
                }) : i.value ? t.push(i.value.join ? {
                    key: i.key,
                    value: i.value.join(";")
                }
                     : i) : t.push({
                    key: i.key,
                    value: i.value
                })
            }
            var n = h(l(t, function (e) {
                        return e.value
                    }).join("~~~"), 31);
            o(n, t)
        })
    },
    i.x64hash128 = h,
    i.VERSION = "2.0.6",
    i
}),
function (e) {
    "use strict";
    function u(e, t) {
        var r = (65535 & e) + (65535 & t);
        return (e >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r
    }
    function h(e, t, r, i, n, a) {
        return u((a = u(u(t, e), u(i, a))) << (n = n) | a >>> 32 - n, r)
    }
    function d(e, t, r, i, n, a, o) {
        return h(t & r | ~t & i, e, t, n, a, o)
    }
    function f(e, t, r, i, n, a, o) {
        return h(t & i | r & ~i, e, t, n, a, o)
    }
    function p(e, t, r, i, n, a, o) {
        return h(t ^ r ^ i, e, t, n, a, o)
    }
    function g(e, t, r, i, n, a, o) {
        return h(r ^ (t | ~i), e, t, n, a, o)
    }
    function o(e, t) {
        var r,
        i,
        n,
        a;
        e[t >> 5] |= 128 << t % 32,
        e[14 + (t + 64 >>> 9 << 4)] = t;
        for (var o = 1732584193, h = -271733879, s = -1732584194, l = 271733878, c = 0; c < e.length; c += 16)
            o = d(r = o, i = h, n = s, a = l, e[c], 7, -680876936),
            l = d(l, o, h, s, e[c + 1], 12, -389564586),
            s = d(s, l, o, h, e[c + 2], 17, 606105819),
            h = d(h, s, l, o, e[c + 3], 22, -1044525330),
            o = d(o, h, s, l, e[c + 4], 7, -176418897),
            l = d(l, o, h, s, e[c + 5], 12, 1200080426),
            s = d(s, l, o, h, e[c + 6], 17, -1473231341),
            h = d(h, s, l, o, e[c + 7], 22, -45705983),
            o = d(o, h, s, l, e[c + 8], 7, 1770035416),
            l = d(l, o, h, s, e[c + 9], 12, -1958414417),
            s = d(s, l, o, h, e[c + 10], 17, -42063),
            h = d(h, s, l, o, e[c + 11], 22, -1990404162),
            o = d(o, h, s, l, e[c + 12], 7, 1804603682),
            l = d(l, o, h, s, e[c + 13], 12, -40341101),
            s = d(s, l, o, h, e[c + 14], 17, -1502002290),
            o = f(o, h = d(h, s, l, o, e[c + 15], 22, 1236535329), s, l, e[c + 1], 5, -165796510),
            l = f(l, o, h, s, e[c + 6], 9, -1069501632),
            s = f(s, l, o, h, e[c + 11], 14, 643717713),
            h = f(h, s, l, o, e[c], 20, -373897302),
            o = f(o, h, s, l, e[c + 5], 5, -701558691),
            l = f(l, o, h, s, e[c + 10], 9, 38016083),
            s = f(s, l, o, h, e[c + 15], 14, -660478335),
            h = f(h, s, l, o, e[c + 4], 20, -405537848),
            o = f(o, h, s, l, e[c + 9], 5, 568446438),
            l = f(l, o, h, s, e[c + 14], 9, -1019803690),
            s = f(s, l, o, h, e[c + 3], 14, -187363961),
            h = f(h, s, l, o, e[c + 8], 20, 1163531501),
            o = f(o, h, s, l, e[c + 13], 5, -1444681467),
            l = f(l, o, h, s, e[c + 2], 9, -51403784),
            s = f(s, l, o, h, e[c + 7], 14, 1735328473),
            o = p(o, h = f(h, s, l, o, e[c + 12], 20, -1926607734), s, l, e[c + 5], 4, -378558),
            l = p(l, o, h, s, e[c + 8], 11, -2022574463),
            s = p(s, l, o, h, e[c + 11], 16, 1839030562),
            h = p(h, s, l, o, e[c + 14], 23, -35309556),
            o = p(o, h, s, l, e[c + 1], 4, -1530992060),
            l = p(l, o, h, s, e[c + 4], 11, 1272893353),
            s = p(s, l, o, h, e[c + 7], 16, -155497632),
            h = p(h, s, l, o, e[c + 10], 23, -1094730640),
            o = p(o, h, s, l, e[c + 13], 4, 681279174),
            l = p(l, o, h, s, e[c], 11, -358537222),
            s = p(s, l, o, h, e[c + 3], 16, -722521979),
            h = p(h, s, l, o, e[c + 6], 23, 76029189),
            o = p(o, h, s, l, e[c + 9], 4, -640364487),
            l = p(l, o, h, s, e[c + 12], 11, -421815835),
            s = p(s, l, o, h, e[c + 15], 16, 530742520),
            o = g(o, h = p(h, s, l, o, e[c + 2], 23, -995338651), s, l, e[c], 6, -198630844),
            l = g(l, o, h, s, e[c + 7], 10, 1126891415),
            s = g(s, l, o, h, e[c + 14], 15, -1416354905),
            h = g(h, s, l, o, e[c + 5], 21, -57434055),
            o = g(o, h, s, l, e[c + 12], 6, 1700485571),
            l = g(l, o, h, s, e[c + 3], 10, -1894986606),
            s = g(s, l, o, h, e[c + 10], 15, -1051523),
            h = g(h, s, l, o, e[c + 1], 21, -2054922799),
            o = g(o, h, s, l, e[c + 8], 6, 1873313359),
            l = g(l, o, h, s, e[c + 15], 10, -30611744),
            s = g(s, l, o, h, e[c + 6], 15, -1560198380),
            h = g(h, s, l, o, e[c + 13], 21, 1309151649),
            o = g(o, h, s, l, e[c + 4], 6, -145523070),
            l = g(l, o, h, s, e[c + 11], 10, -1120210379),
            s = g(s, l, o, h, e[c + 2], 15, 718787259),
            h = g(h, s, l, o, e[c + 9], 21, -343485551),
            o = u(o, r),
            h = u(h, i),
            s = u(s, n),
            l = u(l, a);
        return [o, h, s, l]
    }
    function s(e) {
        for (var t = "", r = 32 * e.length, i = 0; i < r; i += 8)
            t += String.fromCharCode(e[i >> 5] >>> i % 32 & 255);
        return t
    }
    function l(e) {
        var t = [];
        for (t[(e.length >> 2) - 1] = void 0,
            i = 0; i < t.length; i += 1)
            t[i] = 0;
        for (var r = 8 * e.length, i = 0; i < r; i += 8)
            t[i >> 5] |= (255 & e.charCodeAt(i / 8)) << i % 32;
        return t
    }
    function i(e) {
        for (var t, r = "0123456789abcdef", i = "", n = 0; n < e.length; n += 1)
            t = e.charCodeAt(n),
            i += r.charAt(t >>> 4 & 15) + r.charAt(15 & t);
        return i
    }
    function r(e) {
        return unescape(encodeURIComponent(e))
    }
    function n(e) {
        return s(o(l(e = r(e)), 8 * e.length))
    }
    function a(e, t) {
        return function (e, t) {
            var r,
            i = l(e),
            n = [],
            a = [];
            for (n[15] = a[15] = void 0,
                16 < i.length && (i = o(i, 8 * e.length)),
                r = 0; r < 16; r += 1)
                n[r] = 909522486 ^ i[r],
                a[r] = 1549556828 ^ i[r];
            return t = o(n.concat(l(t)), 512 + 8 * t.length),
            s(o(a.concat(t), 640))
        }
        (r(e), r(t))
    }
    function t(e, t, r) {
        return t ? r ? a(t, e) : i(a(t, e)) : r ? n(e) : i(n(e))
    }
    "function" == typeof define && define.amd ? define(function () {
        return t
    }) : "object" == typeof module && module.exports ? module.exports = t : e.md5 = t
}
(this),
function () {
    "use strict";
    var f = "input is invalid type",
    e = "object" == typeof window,
    t = e ? window : {},
    r = !(e = t.JS_SHA512_NO_WINDOW ? !1 : e) && "object" == typeof self;
    !t.JS_SHA512_NO_NODE_JS && "object" == typeof process && process.versions && process.versions.node ? t = global : r && (t = self);
    var i = !t.JS_SHA512_NO_COMMON_JS && "object" == typeof module && module.exports,
    n = "function" == typeof define && define.amd,
    p = !t.JS_SHA512_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer,
    S = "0123456789abcdef".split(""),
    a = [-2147483648, 8388608, 32768, 128],
    s = [24, 16, 8, 0],
    ee = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591],
    o = ["hex", "array", "digest", "arrayBuffer"],
    h = [];
    !t.JS_SHA512_NO_NODE_JS && Array.isArray || (Array.isArray = function (e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }),
    !p || !t.JS_SHA512_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView || (ArrayBuffer.isView = function (e) {
        return "object" == typeof e && e.buffer && e.buffer.constructor === ArrayBuffer
    });
    function l(t, r) {
        return function (e) {
            return new g(r, !0).update(e)[t]()
        }
    }
    function c(r, i) {
        return function (e, t) {
            return new u(e, i, !0).update(t)[r]()
        }
    }
    e = function (e) {
        var t = l("hex", e);
        t.create = function () {
            return new g(e)
        },
        t.update = function (e) {
            return t.create().update(e)
        };
        for (var r = 0; r < o.length; ++r) {
            var i = o[r];
            t[i] = l(i, e)
        }
        return t
    },
    r = function (t) {
        var r = c("hex", t);
        r.create = function (e) {
            return new u(e, t)
        },
        r.update = function (e, t) {
            return r.create(e).update(t)
        };
        for (var e = 0; e < o.length; ++e) {
            var i = o[e];
            r[i] = c(i, t)
        }
        return r
    };
    function g(e, t) {
        t ? (h[0] = h[1] = h[2] = h[3] = h[4] = h[5] = h[6] = h[7] = h[8] = h[9] = h[10] = h[11] = h[12] = h[13] = h[14] = h[15] = h[16] = h[17] = h[18] = h[19] = h[20] = h[21] = h[22] = h[23] = h[24] = h[25] = h[26] = h[27] = h[28] = h[29] = h[30] = h[31] = h[32] = 0,
            this.blocks = h) : this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        384 == e ? (this.h0h = 3418070365,
            this.h0l = 3238371032,
            this.h1h = 1654270250,
            this.h1l = 914150663,
            this.h2h = 2438529370,
            this.h2l = 812702999,
            this.h3h = 355462360,
            this.h3l = 4144912697,
            this.h4h = 1731405415,
            this.h4l = 4290775857,
            this.h5h = 2394180231,
            this.h5l = 1750603025,
            this.h6h = 3675008525,
            this.h6l = 1694076839,
            this.h7h = 1203062813,
            this.h7l = 3204075428) : 256 == e ? (this.h0h = 573645204,
            this.h0l = 4230739756,
            this.h1h = 2673172387,
            this.h1l = 3360449730,
            this.h2h = 596883563,
            this.h2l = 1867755857,
            this.h3h = 2520282905,
            this.h3l = 1497426621,
            this.h4h = 2519219938,
            this.h4l = 2827943907,
            this.h5h = 3193839141,
            this.h5l = 1401305490,
            this.h6h = 721525244,
            this.h6l = 746961066,
            this.h7h = 246885852,
            this.h7l = 2177182882) : 224 == e ? (this.h0h = 2352822216,
            this.h0l = 424955298,
            this.h1h = 1944164710,
            this.h1l = 2312950998,
            this.h2h = 502970286,
            this.h2l = 855612546,
            this.h3h = 1738396948,
            this.h3l = 1479516111,
            this.h4h = 258812777,
            this.h4l = 2077511080,
            this.h5h = 2011393907,
            this.h5l = 79989058,
            this.h6h = 1067287976,
            this.h6l = 1780299464,
            this.h7h = 286451373,
            this.h7l = 2446758561) : (this.h0h = 1779033703,
            this.h0l = 4089235720,
            this.h1h = 3144134277,
            this.h1l = 2227873595,
            this.h2h = 1013904242,
            this.h2l = 4271175723,
            this.h3h = 2773480762,
            this.h3l = 1595750129,
            this.h4h = 1359893119,
            this.h4l = 2917565137,
            this.h5h = 2600822924,
            this.h5l = 725511199,
            this.h6h = 528734635,
            this.h6l = 4215389547,
            this.h7h = 1541459225,
            this.h7l = 327033209),
        this.bits = e,
        this.block = this.start = this.bytes = this.hBytes = 0,
        this.finalized = this.hashed = !1
    }
    function u(e, t, r) {
        var i,
        n = typeof e;
        if ("string" != n) {
            if ("object" != n)
                throw new Error(f);
            if (null === e)
                throw new Error(f);
            if (p && e.constructor === ArrayBuffer)
                e = new Uint8Array(e);
            else if (!(Array.isArray(e) || p && ArrayBuffer.isView(e)))
                throw new Error(f);
            i = !0
        }
        var a = e.length;
        if (!i) {
            for (var o, h = [], a = e.length, s = 0, l = 0; l < a; ++l)
                (o = e.charCodeAt(l)) < 128 ? h[s++] = o : (o < 2048 ? h[s++] = 192 | o >> 6 : (o < 55296 || 57344 <= o ? h[s++] = 224 | o >> 12 : (o = 65536 + ((1023 & o) << 10 | 1023 & e.charCodeAt(++l)),
                                        h[s++] = 240 | o >> 18,
                                        h[s++] = 128 | o >> 12 & 63),
                                h[s++] = 128 | o >> 6 & 63),
                        h[s++] = 128 | 63 & o);
            e = h
        }
        128 < e.length && (e = new g(t, !0).update(e).array());
        for (var c = [], u = [], l = 0; l < 128; ++l) {
            var d = e[l] || 0;
            c[l] = 92 ^ d,
            u[l] = 54 ^ d
        }
        g.call(this, t, r),
        this.update(u),
        this.oKeyPad = c,
        this.inner = !0,
        this.sharedMemory = r
    }
    g.prototype.update = function (e) {
        if (this.finalized)
            throw new Error("finalize already called");
        var t,
        r = typeof e;
        if ("string" != r) {
            if ("object" != r)
                throw new Error(f);
            if (null === e)
                throw new Error(f);
            if (p && e.constructor === ArrayBuffer)
                e = new Uint8Array(e);
            else if (!(Array.isArray(e) || p && ArrayBuffer.isView(e)))
                throw new Error(f);
            t = !0
        }
        for (var i, n, a = 0, o = e.length, h = this.blocks; a < o; ) {
            if (this.hashed && (this.hashed = !1,
                    h[0] = this.block,
                    h[1] = h[2] = h[3] = h[4] = h[5] = h[6] = h[7] = h[8] = h[9] = h[10] = h[11] = h[12] = h[13] = h[14] = h[15] = h[16] = h[17] = h[18] = h[19] = h[20] = h[21] = h[22] = h[23] = h[24] = h[25] = h[26] = h[27] = h[28] = h[29] = h[30] = h[31] = h[32] = 0),
                t)
                for (n = this.start; a < o && n < 128; ++a)
                    h[n >> 2] |= e[a] << s[3 & n++];
            else
                for (n = this.start; a < o && n < 128; ++a)
                    (i = e.charCodeAt(a)) < 128 ? h[n >> 2] |= i << s[3 & n++] : (i < 2048 ? h[n >> 2] |= (192 | i >> 6) << s[3 & n++] : (i < 55296 || 57344 <= i ? h[n >> 2] |= (224 | i >> 12) << s[3 & n++] : (i = 65536 + ((1023 & i) << 10 | 1023 & e.charCodeAt(++a)),
                                h[n >> 2] |= (240 | i >> 18) << s[3 & n++],
                                h[n >> 2] |= (128 | i >> 12 & 63) << s[3 & n++]),
                            h[n >> 2] |= (128 | i >> 6 & 63) << s[3 & n++]),
                        h[n >> 2] |= (128 | 63 & i) << s[3 & n++]);
            this.lastByteIndex = n,
            this.bytes += n - this.start,
            128 <= n ? (this.block = h[32],
                this.start = n - 128,
                this.hash(),
                this.hashed = !0) : this.start = n
        }
        return 4294967295 < this.bytes && (this.hBytes += this.bytes / 4294967296 << 0,
            this.bytes = this.bytes % 4294967296),
        this
    },
    g.prototype.finalize = function () {
        var e,
        t;
        this.finalized || (this.finalized = !0,
            e = this.blocks,
            t = this.lastByteIndex,
            e[32] = this.block,
            e[t >> 2] |= a[3 & t],
            this.block = e[32],
            112 <= t && (this.hashed || this.hash(),
                e[0] = this.block,
                e[1] = e[2] = e[3] = e[4] = e[5] = e[6] = e[7] = e[8] = e[9] = e[10] = e[11] = e[12] = e[13] = e[14] = e[15] = e[16] = e[17] = e[18] = e[19] = e[20] = e[21] = e[22] = e[23] = e[24] = e[25] = e[26] = e[27] = e[28] = e[29] = e[30] = e[31] = e[32] = 0),
            e[30] = this.hBytes << 3 | this.bytes >>> 29,
            e[31] = this.bytes << 3,
            this.hash())
    },
    g.prototype.hash = function () {
        for (var e, t, r, i, n, a, o, h, s, l, c, u, d, f, p, g, A, S, m = this.h0h, y = this.h0l, E = this.h1h, T = this.h1l, C = this.h2h, v = this.h2l, w = this.h3h, B = this.h3l, R = this.h4h, _ = this.h4l, b = this.h5h, H = this.h5l, O = this.h6h, M = this.h6l, x = this.h7h, k = this.h7l, P = this.blocks, I = 32; I < 160; I += 2)
            e = ((d = P[I - 30]) >>> 1 | (f = P[I - 29]) << 31) ^ (d >>> 8 | f << 24) ^ d >>> 7,
            t = (f >>> 1 | d << 31) ^ (f >>> 8 | d << 24) ^ (f >>> 7 | d << 25),
            r = ((d = P[I - 4]) >>> 19 | (f = P[I - 3]) << 13) ^ (f >>> 29 | d << 3) ^ d >>> 6,
            i = (f >>> 19 | d << 13) ^ (d >>> 29 | f << 3) ^ (f >>> 6 | d << 26),
            d = P[I - 32],
            f = P[I - 31],
            p = P[I - 14],
            g = P[I - 13],
            P[I] = (p >>> 16) + (d >>> 16) + (e >>> 16) + (r >>> 16) + ((o = (65535 & p) + (65535 & d) + (65535 & e) + (65535 & r) + ((a = (g >>> 16) + (f >>> 16) + (t >>> 16) + (i >>> 16) + ((n = (65535 & g) + (65535 & f) + (65535 & t) + (65535 & i)) >>> 16)) >>> 16)) >>> 16) << 16 | 65535 & o,
            P[I + 1] = a << 16 | 65535 & n;
        var D = m,
        L = y,
        N = E,
        U = T,
        F = C,
        X = v,
        G = w,
        V = B,
        W = R,
        j = _,
        z = b,
        K = H,
        J = O,
        Y = M,
        Z = x,
        q = k,
        Q = N & F,
        $ = U & X;
        for (I = 0; I < 160; I += 8)
            d = P[I],
            f = P[I + 1],
            d = ((p = ee[I]) >>> 16) + (d >>> 16) + ((A = W & z ^ ~W & J) >>> 16) + ((r = (W >>> 14 | j << 18) ^ (W >>> 18 | j << 14) ^ (j >>> 9 | W << 23)) >>> 16) + (Z >>> 16) + ((o = (65535 & p) + (65535 & d) + (65535 & A) + (65535 & r) + (65535 & Z) + ((a = ((g = ee[I + 1]) >>> 16) + (f >>> 16) + ((S = j & K ^ ~j & Y) >>> 16) + ((i = (j >>> 14 | W << 18) ^ (j >>> 18 | W << 14) ^ (W >>> 9 | j << 23)) >>> 16) + (q >>> 16) + ((n = (65535 & g) + (65535 & f) + (65535 & S) + (65535 & i) + (65535 & q)) >>> 16)) >>> 16)) >>> 16) << 16 | 65535 & o,
            f = a << 16 | 65535 & n,
            p = ((c = (h = D & N) ^ D & F ^ Q) >>> 16) + ((e = (D >>> 28 | L << 4) ^ (L >>> 2 | D << 30) ^ (L >>> 7 | D << 25)) >>> 16) + ((o = (65535 & c) + (65535 & e) + ((a = ((u = (s = L & U) ^ L & X ^ $) >>> 16) + ((t = (L >>> 28 | D << 4) ^ (D >>> 2 | L << 30) ^ (D >>> 7 | L << 25)) >>> 16) + ((n = (65535 & u) + (65535 & t)) >>> 16)) >>> 16)) >>> 16) << 16 | 65535 & o,
            g = a << 16 | 65535 & n,
            Z = (G >>> 16) + (d >>> 16) + ((o = (65535 & G) + (65535 & d) + ((a = (V >>> 16) + (f >>> 16) + ((n = (65535 & V) + (65535 & f)) >>> 16)) >>> 16)) >>> 16) << 16 | 65535 & o,
            q = a << 16 | 65535 & n,
            G = (p >>> 16) + (d >>> 16) + ((o = (65535 & p) + (65535 & d) + ((a = (g >>> 16) + (f >>> 16) + ((n = (65535 & g) + (65535 & f)) >>> 16)) >>> 16)) >>> 16) << 16 | 65535 & o,
            V = a << 16 | 65535 & n,
            d = P[I + 2],
            f = P[I + 3],
            d = ((p = ee[I + 2]) >>> 16) + (d >>> 16) + ((A = Z & W ^ ~Z & z) >>> 16) + ((r = (Z >>> 14 | q << 18) ^ (Z >>> 18 | q << 14) ^ (q >>> 9 | Z << 23)) >>> 16) + (J >>> 16) + ((o = (65535 & p) + (65535 & d) + (65535 & A) + (65535 & r) + (65535 & J) + ((a = ((g = ee[I + 3]) >>> 16) + (f >>> 16) + ((S = q & j ^ ~q & K) >>> 16) + ((i = (q >>> 14 | Z << 18) ^ (q >>> 18 | Z << 14) ^ (Z >>> 9 | q << 23)) >>> 16) + (Y >>> 16) + ((n = (65535 & g) + (65535 & f) + (65535 & S) + (65535 & i) + (65535 & Y)) >>> 16)) >>> 16)) >>> 16) << 16 | 65535 & o,
            f = a << 16 | 65535 & n,
            p = ((c = (l = G & D) ^ G & N ^ h) >>> 16) + ((e = (G >>> 28 | V << 4) ^ (V >>> 2 | G << 30) ^ (V >>> 7 | G << 25)) >>> 16) + ((o = (65535 & c) + (65535 & e) + ((a = ((u = (h = V & L) ^ V & U ^ s) >>> 16) + ((t = (V >>> 28 | G << 4) ^ (G >>> 2 | V << 30) ^ (G >>> 7 | V << 25)) >>> 16) + ((n = (65535 & u) + (65535 & t)) >>> 16)) >>> 16)) >>> 16) << 16 | 65535 & o,
            g = a << 16 | 65535 & n,
            J = (F >>> 16) + (d >>> 16) + ((o = (65535 & F) + (65535 & d) + ((a = (X >>> 16) + (f >>> 16) + ((n = (65535 & X) + (65535 & f)) >>> 16)) >>> 16)) >>> 16) << 16 | 65535 & o,
            Y = a << 16 | 65535 & n,
            F = (p >>> 16) + (d >>> 16) + ((o = (65535 & p) + (65535 & d) + ((a = (g >>> 16) + (f >>> 16) + ((n = (65535 & g) + (65535 & f)) >>> 16)) >>> 16)) >>> 16) << 16 | 65535 & o,
            X = a << 16 | 65535 & n,
            d = P[I + 4],
            f = P[I + 5],
            d = ((p = ee[I + 4]) >>> 16) + (d >>> 16) + ((A = J & Z ^ ~J & W) >>> 16) + ((r = (J >>> 14 | Y << 18) ^ (J >>> 18 | Y << 14) ^ (Y >>> 9 | J << 23)) >>> 16) + (z >>> 16) + ((o = (65535 & p) + (65535 & d) + (65535 & A) + (65535 & r) + (65535 & z) + ((a = ((g = ee[I + 5]) >>> 16) + (f >>> 16) + ((S = Y & q ^ ~Y & j) >>> 16) + ((i = (Y >>> 14 | J << 18) ^ (Y >>> 18 | J << 14) ^ (J >>> 9 | Y << 23)) >>> 16) + (K >>> 16) + ((n = (65535 & g) + (65535 & f) + (65535 & S) + (65535 & i) + (65535 & K)) >>> 16)) >>> 16)) >>> 16) << 16 | 65535 & o,
            f = a << 16 | 65535 & n,
            p = ((c = (s = F & G) ^ F & D ^ l) >>> 16) + ((e = (F >>> 28 | X << 4) ^ (X >>> 2 | F << 30) ^ (X >>> 7 | F << 25)) >>> 16) + ((o = (65535 & c) + (65535 & e) + ((a = ((u = (l = X & V) ^ X & L ^ h) >>> 16) + ((t = (X >>> 28 | F << 4) ^ (F >>> 2 | X << 30) ^ (F >>> 7 | X << 25)) >>> 16) + ((n = (65535 & u) + (65535 & t)) >>> 16)) >>> 16)) >>> 16) << 16 | 65535 & o,
            g = a << 16 | 65535 & n,
            z = (N >>> 16) + (d >>> 16) + ((o = (65535 & N) + (65535 & d) + ((a = (U >>> 16) + (f >>> 16) + ((n = (65535 & U) + (65535 & f)) >>> 16)) >>> 16)) >>> 16) << 16 | 65535 & o,
            K = a << 16 | 65535 & n,
            N = (p >>> 16) + (d >>> 16) + ((o = (65535 & p) + (65535 & d) + ((a = (g >>> 16) + (f >>> 16) + ((n = (65535 & g) + (65535 & f)) >>> 16)) >>> 16)) >>> 16) << 16 | 65535 & o,
            U = a << 16 | 65535 & n,
            d = P[I + 6],
            f = P[I + 7],
            d = ((p = ee[I + 6]) >>> 16) + (d >>> 16) + ((A = z & J ^ ~z & Z) >>> 16) + ((r = (z >>> 14 | K << 18) ^ (z >>> 18 | K << 14) ^ (K >>> 9 | z << 23)) >>> 16) + (W >>> 16) + ((o = (65535 & p) + (65535 & d) + (65535 & A) + (65535 & r) + (65535 & W) + ((a = ((g = ee[I + 7]) >>> 16) + (f >>> 16) + ((S = K & Y ^ ~K & q) >>> 16) + ((i = (K >>> 14 | z << 18) ^ (K >>> 18 | z << 14) ^ (z >>> 9 | K << 23)) >>> 16) + (j >>> 16) + ((n = (65535 & g) + (65535 & f) + (65535 & S) + (65535 & i) + (65535 & j)) >>> 16)) >>> 16)) >>> 16) << 16 | 65535 & o,
            f = a << 16 | 65535 & n,
            p = ((c = (Q = N & F) ^ N & G ^ s) >>> 16) + ((e = (N >>> 28 | U << 4) ^ (U >>> 2 | N << 30) ^ (U >>> 7 | N << 25)) >>> 16) + ((o = (65535 & c) + (65535 & e) + ((a = ((u = ($ = U & X) ^ U & V ^ l) >>> 16) + ((t = (U >>> 28 | N << 4) ^ (N >>> 2 | U << 30) ^ (N >>> 7 | U << 25)) >>> 16) + ((n = (65535 & u) + (65535 & t)) >>> 16)) >>> 16)) >>> 16) << 16 | 65535 & o,
            g = a << 16 | 65535 & n,
            W = (D >>> 16) + (d >>> 16) + ((o = (65535 & D) + (65535 & d) + ((a = (L >>> 16) + (f >>> 16) + ((n = (65535 & L) + (65535 & f)) >>> 16)) >>> 16)) >>> 16) << 16 | 65535 & o,
            j = a << 16 | 65535 & n,
            D = (p >>> 16) + (d >>> 16) + ((o = (65535 & p) + (65535 & d) + ((a = (g >>> 16) + (f >>> 16) + ((n = (65535 & g) + (65535 & f)) >>> 16)) >>> 16)) >>> 16) << 16 | 65535 & o,
            L = a << 16 | 65535 & n;
        this.h0h = (m >>> 16) + (D >>> 16) + ((o = (65535 & m) + (65535 & D) + ((a = (y >>> 16) + (L >>> 16) + ((n = (65535 & y) + (65535 & L)) >>> 16)) >>> 16)) >>> 16) << 16 | 65535 & o,
        this.h0l = a << 16 | 65535 & n,
        this.h1h = (E >>> 16) + (N >>> 16) + ((o = (65535 & E) + (65535 & N) + ((a = (T >>> 16) + (U >>> 16) + ((n = (65535 & T) + (65535 & U)) >>> 16)) >>> 16)) >>> 16) << 16 | 65535 & o,
        this.h1l = a << 16 | 65535 & n,
        this.h2h = (C >>> 16) + (F >>> 16) + ((o = (65535 & C) + (65535 & F) + ((a = (v >>> 16) + (X >>> 16) + ((n = (65535 & v) + (65535 & X)) >>> 16)) >>> 16)) >>> 16) << 16 | 65535 & o,
        this.h2l = a << 16 | 65535 & n,
        this.h3h = (w >>> 16) + (G >>> 16) + ((o = (65535 & w) + (65535 & G) + ((a = (B >>> 16) + (V >>> 16) + ((n = (65535 & B) + (65535 & V)) >>> 16)) >>> 16)) >>> 16) << 16 | 65535 & o,
        this.h3l = a << 16 | 65535 & n,
        this.h4h = (R >>> 16) + (W >>> 16) + ((o = (65535 & R) + (65535 & W) + ((a = (_ >>> 16) + (j >>> 16) + ((n = (65535 & _) + (65535 & j)) >>> 16)) >>> 16)) >>> 16) << 16 | 65535 & o,
        this.h4l = a << 16 | 65535 & n,
        this.h5h = (b >>> 16) + (z >>> 16) + ((o = (65535 & b) + (65535 & z) + ((a = (H >>> 16) + (K >>> 16) + ((n = (65535 & H) + (65535 & K)) >>> 16)) >>> 16)) >>> 16) << 16 | 65535 & o,
        this.h5l = a << 16 | 65535 & n,
        this.h6h = (O >>> 16) + (J >>> 16) + ((o = (65535 & O) + (65535 & J) + ((a = (M >>> 16) + (Y >>> 16) + ((n = (65535 & M) + (65535 & Y)) >>> 16)) >>> 16)) >>> 16) << 16 | 65535 & o,
        this.h6l = a << 16 | 65535 & n,
        this.h7h = (x >>> 16) + (Z >>> 16) + ((o = (65535 & x) + (65535 & Z) + ((a = (k >>> 16) + (q >>> 16) + ((n = (65535 & k) + (65535 & q)) >>> 16)) >>> 16)) >>> 16) << 16 | 65535 & o,
        this.h7l = a << 16 | 65535 & n
    },
    g.prototype.toString = g.prototype.hex = function () {
        this.finalize();
        var e = this.h0h,
        t = this.h0l,
        r = this.h1h,
        i = this.h1l,
        n = this.h2h,
        a = this.h2l,
        o = this.h3h,
        h = this.h3l,
        s = this.h4h,
        l = this.h4l,
        c = this.h5h,
        u = this.h5l,
        d = this.h6h,
        f = this.h6l,
        p = this.h7h,
        g = this.h7l,
        A = this.bits,
        o = S[e >> 28 & 15] + S[e >> 24 & 15] + S[e >> 20 & 15] + S[e >> 16 & 15] + S[e >> 12 & 15] + S[e >> 8 & 15] + S[e >> 4 & 15] + S[15 & e] + S[t >> 28 & 15] + S[t >> 24 & 15] + S[t >> 20 & 15] + S[t >> 16 & 15] + S[t >> 12 & 15] + S[t >> 8 & 15] + S[t >> 4 & 15] + S[15 & t] + S[r >> 28 & 15] + S[r >> 24 & 15] + S[r >> 20 & 15] + S[r >> 16 & 15] + S[r >> 12 & 15] + S[r >> 8 & 15] + S[r >> 4 & 15] + S[15 & r] + S[i >> 28 & 15] + S[i >> 24 & 15] + S[i >> 20 & 15] + S[i >> 16 & 15] + S[i >> 12 & 15] + S[i >> 8 & 15] + S[i >> 4 & 15] + S[15 & i] + S[n >> 28 & 15] + S[n >> 24 & 15] + S[n >> 20 & 15] + S[n >> 16 & 15] + S[n >> 12 & 15] + S[n >> 8 & 15] + S[n >> 4 & 15] + S[15 & n] + S[a >> 28 & 15] + S[a >> 24 & 15] + S[a >> 20 & 15] + S[a >> 16 & 15] + S[a >> 12 & 15] + S[a >> 8 & 15] + S[a >> 4 & 15] + S[15 & a] + S[o >> 28 & 15] + S[o >> 24 & 15] + S[o >> 20 & 15] + S[o >> 16 & 15] + S[o >> 12 & 15] + S[o >> 8 & 15] + S[o >> 4 & 15] + S[15 & o];
        return 256 <= A && (o += S[h >> 28 & 15] + S[h >> 24 & 15] + S[h >> 20 & 15] + S[h >> 16 & 15] + S[h >> 12 & 15] + S[h >> 8 & 15] + S[h >> 4 & 15] + S[15 & h]),
        384 <= A && (o += S[s >> 28 & 15] + S[s >> 24 & 15] + S[s >> 20 & 15] + S[s >> 16 & 15] + S[s >> 12 & 15] + S[s >> 8 & 15] + S[s >> 4 & 15] + S[15 & s] + S[l >> 28 & 15] + S[l >> 24 & 15] + S[l >> 20 & 15] + S[l >> 16 & 15] + S[l >> 12 & 15] + S[l >> 8 & 15] + S[l >> 4 & 15] + S[15 & l] + S[c >> 28 & 15] + S[c >> 24 & 15] + S[c >> 20 & 15] + S[c >> 16 & 15] + S[c >> 12 & 15] + S[c >> 8 & 15] + S[c >> 4 & 15] + S[15 & c] + S[u >> 28 & 15] + S[u >> 24 & 15] + S[u >> 20 & 15] + S[u >> 16 & 15] + S[u >> 12 & 15] + S[u >> 8 & 15] + S[u >> 4 & 15] + S[15 & u]),
        512 == A && (o += S[d >> 28 & 15] + S[d >> 24 & 15] + S[d >> 20 & 15] + S[d >> 16 & 15] + S[d >> 12 & 15] + S[d >> 8 & 15] + S[d >> 4 & 15] + S[15 & d] + S[f >> 28 & 15] + S[f >> 24 & 15] + S[f >> 20 & 15] + S[f >> 16 & 15] + S[f >> 12 & 15] + S[f >> 8 & 15] + S[f >> 4 & 15] + S[15 & f] + S[p >> 28 & 15] + S[p >> 24 & 15] + S[p >> 20 & 15] + S[p >> 16 & 15] + S[p >> 12 & 15] + S[p >> 8 & 15] + S[p >> 4 & 15] + S[15 & p] + S[g >> 28 & 15] + S[g >> 24 & 15] + S[g >> 20 & 15] + S[g >> 16 & 15] + S[g >> 12 & 15] + S[g >> 8 & 15] + S[g >> 4 & 15] + S[15 & g]),
        o
    },
    g.prototype.array = g.prototype.digest = function () {
        this.finalize();
        var e = this.h0h,
        t = this.h0l,
        r = this.h1h,
        i = this.h1l,
        n = this.h2h,
        a = this.h2l,
        o = this.h3h,
        h = this.h3l,
        s = this.h4h,
        l = this.h4l,
        c = this.h5h,
        u = this.h5l,
        d = this.h6h,
        f = this.h6l,
        p = this.h7h,
        g = this.h7l,
        A = this.bits,
        o = [e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e, t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, 255 & t, r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, 255 & r, i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, 255 & i, n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, 255 & n, a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, 255 & a, o >> 24 & 255, o >> 16 & 255, o >> 8 & 255, 255 & o];
        return 256 <= A && o.push(h >> 24 & 255, h >> 16 & 255, h >> 8 & 255, 255 & h),
        384 <= A && o.push(s >> 24 & 255, s >> 16 & 255, s >> 8 & 255, 255 & s, l >> 24 & 255, l >> 16 & 255, l >> 8 & 255, 255 & l, c >> 24 & 255, c >> 16 & 255, c >> 8 & 255, 255 & c, u >> 24 & 255, u >> 16 & 255, u >> 8 & 255, 255 & u),
        512 == A && o.push(d >> 24 & 255, d >> 16 & 255, d >> 8 & 255, 255 & d, f >> 24 & 255, f >> 16 & 255, f >> 8 & 255, 255 & f, p >> 24 & 255, p >> 16 & 255, p >> 8 & 255, 255 & p, g >> 24 & 255, g >> 16 & 255, g >> 8 & 255, 255 & g),
        o
    },
    g.prototype.arrayBuffer = function () {
        this.finalize();
        var e = this.bits,
        t = new ArrayBuffer(e / 8),
        r = new DataView(t);
        return r.setUint32(0, this.h0h),
        r.setUint32(4, this.h0l),
        r.setUint32(8, this.h1h),
        r.setUint32(12, this.h1l),
        r.setUint32(16, this.h2h),
        r.setUint32(20, this.h2l),
        r.setUint32(24, this.h3h),
        256 <= e && r.setUint32(28, this.h3l),
        384 <= e && (r.setUint32(32, this.h4h),
            r.setUint32(36, this.h4l),
            r.setUint32(40, this.h5h),
            r.setUint32(44, this.h5l)),
        512 == e && (r.setUint32(48, this.h6h),
            r.setUint32(52, this.h6l),
            r.setUint32(56, this.h7h),
            r.setUint32(60, this.h7l)),
        t
    },
    g.prototype.clone = function () {
        var e = new g(this.bits, !1);
        return this.copyTo(e),
        e
    },
    g.prototype.copyTo = function (e) {
        for (var t = 0, r = ["h0h", "h0l", "h1h", "h1l", "h2h", "h2l", "h3h", "h3l", "h4h", "h4l", "h5h", "h5l", "h6h", "h6l", "h7h", "h7l", "start", "bytes", "hBytes", "finalized", "hashed", "lastByteIndex"], t = 0; t < r.length; ++t)
            e[r[t]] = this[r[t]];
        for (t = 0; t < this.blocks.length; ++t)
            e.blocks[t] = this.blocks[t]
    },
    (u.prototype = new g).finalize = function () {
        var e;
        g.prototype.finalize.call(this),
        this.inner && (this.inner = !1,
            e = this.array(),
            g.call(this, this.bits, this.sharedMemory),
            this.update(this.oKeyPad),
            this.update(e),
            g.prototype.finalize.call(this))
    },
    u.prototype.clone = function () {
        var e = new u([], this.bits, !1);
        this.copyTo(e),
        e.inner = this.inner;
        for (var t = 0; t < this.oKeyPad.length; ++t)
            e.oKeyPad[t] = this.oKeyPad[t];
        return e
    };
    var d = e(512);
    (d.sha512 = d).sha384 = e(384),
    d.sha512_256 = e(256),
    d.sha512_224 = e(224),
    d.sha512.hmac = r(512),
    d.sha384.hmac = r(384),
    d.sha512_256.hmac = r(256),
    d.sha512_224.hmac = r(224),
    i ? module.exports = d : (t.sha512 = d.sha512,
            t.sha384 = d.sha384,
            t.sha512_256 = d.sha512_256,
            t.sha512_224 = d.sha512_224,
            n && define(function () {
                return d
            }))
}
(),
!function () {
    "use strict";
    var ERROR = "input is invalid type",
    WINDOW = "object" == typeof window,
    root = WINDOW ? window : {};
    root.JS_SHA256_NO_WINDOW && (WINDOW = !1);
    var WEB_WORKER = !WINDOW && "object" == typeof self,
    NODE_JS = !root.JS_SHA256_NO_NODE_JS && "object" == typeof process && process.versions && process.versions.node;
    NODE_JS ? root = global : WEB_WORKER && (root = self);
    var COMMON_JS = !root.JS_SHA256_NO_COMMON_JS && "object" == typeof module && module.exports,
    AMD = "function" == typeof define && define.amd,
    ARRAY_BUFFER = !root.JS_SHA256_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer,
    HEX_CHARS = "0123456789abcdef".split(""),
    EXTRA = [-2147483648, 8388608, 32768, 128],
    SHIFT = [24, 16, 8, 0],
    K = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
    OUTPUT_TYPES = ["hex", "array", "digest", "arrayBuffer"],
    blocks = [];
    !root.JS_SHA256_NO_NODE_JS && Array.isArray || (Array.isArray = function (e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }),
    !ARRAY_BUFFER || !root.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView || (ArrayBuffer.isView = function (e) {
        return "object" == typeof e && e.buffer && e.buffer.constructor === ArrayBuffer
    });
    var createOutputMethod = function (t, r) {
        return function (e) {
            return new Sha256(r, !0).update(e)[t]()
        }
    },
    createMethod = function (e) {
        var t = createOutputMethod("hex", e);
        (t = NODE_JS ? nodeWrap(t, e) : t).create = function () {
            return new Sha256(e)
        },
        t.update = function (e) {
            return t.create().update(e)
        };
        for (var r = 0; r < OUTPUT_TYPES.length; ++r) {
            var i = OUTPUT_TYPES[r];
            t[i] = createOutputMethod(i, e)
        }
        return t
    },
    nodeWrap = function (method, is224) {
        var crypto = eval("require('crypto')"),
        Buffer = eval("require('buffer').Buffer"),
        algorithm = is224 ? "sha224" : "sha256",
        nodeMethod = function (e) {
            if ("string" == typeof e)
                return crypto.createHash(algorithm).update(e, "utf8").digest("hex");
            if (null == e)
                throw new Error(ERROR);
            return e.constructor === ArrayBuffer && (e = new Uint8Array(e)),
            Array.isArray(e) || ArrayBuffer.isView(e) || e.constructor === Buffer ? crypto.createHash(algorithm).update(new Buffer(e)).digest("hex") : method(e)
        };
        return nodeMethod
    },
    createHmacOutputMethod = function (r, i) {
        return function (e, t) {
            return new HmacSha256(e, i, !0).update(t)[r]()
        }
    },
    createHmacMethod = function (t) {
        var r = createHmacOutputMethod("hex", t);
        r.create = function (e) {
            return new HmacSha256(e, t)
        },
        r.update = function (e, t) {
            return r.create(e).update(t)
        };
        for (var e = 0; e < OUTPUT_TYPES.length; ++e) {
            var i = OUTPUT_TYPES[e];
            r[i] = createHmacOutputMethod(i, t)
        }
        return r
    };
    function Sha256(e, t) {
        t ? (blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0,
            this.blocks = blocks) : this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        e ? (this.h0 = 3238371032,
            this.h1 = 914150663,
            this.h2 = 812702999,
            this.h3 = 4144912697,
            this.h4 = 4290775857,
            this.h5 = 1750603025,
            this.h6 = 1694076839,
            this.h7 = 3204075428) : (this.h0 = 1779033703,
            this.h1 = 3144134277,
            this.h2 = 1013904242,
            this.h3 = 2773480762,
            this.h4 = 1359893119,
            this.h5 = 2600822924,
            this.h6 = 528734635,
            this.h7 = 1541459225),
        this.block = this.start = this.bytes = this.hBytes = 0,
        this.finalized = this.hashed = !1,
        this.first = !0,
        this.is224 = e
    }
    function HmacSha256(e, t, r) {
        var i = typeof e;
        if ("string" == i) {
            for (var n, a = [], o = e.length, h = 0, s = 0; s < o; ++s)
                (n = e.charCodeAt(s)) < 128 ? a[h++] = n : (n < 2048 ? a[h++] = 192 | n >> 6 : (n < 55296 || 57344 <= n ? a[h++] = 224 | n >> 12 : (n = 65536 + ((1023 & n) << 10 | 1023 & e.charCodeAt(++s)),
                                        a[h++] = 240 | n >> 18,
                                        a[h++] = 128 | n >> 12 & 63),
                                a[h++] = 128 | n >> 6 & 63),
                        a[h++] = 128 | 63 & n);
            e = a
        } else {
            if ("object" != i)
                throw new Error(ERROR);
            if (null === e)
                throw new Error(ERROR);
            if (ARRAY_BUFFER && e.constructor === ArrayBuffer)
                e = new Uint8Array(e);
            else if (!(Array.isArray(e) || ARRAY_BUFFER && ArrayBuffer.isView(e)))
                throw new Error(ERROR)
        }
        64 < e.length && (e = new Sha256(t, !0).update(e).array());
        var l = [],
        c = [];
        for (s = 0; s < 64; ++s) {
            var u = e[s] || 0;
            l[s] = 92 ^ u,
            c[s] = 54 ^ u
        }
        Sha256.call(this, t, r),
        this.update(c),
        this.oKeyPad = l,
        this.inner = !0,
        this.sharedMemory = r
    }
    Sha256.prototype.update = function (e) {
        if (!this.finalized) {
            var t,
            r = typeof e;
            if ("string" != r) {
                if ("object" != r)
                    throw new Error(ERROR);
                if (null === e)
                    throw new Error(ERROR);
                if (ARRAY_BUFFER && e.constructor === ArrayBuffer)
                    e = new Uint8Array(e);
                else if (!(Array.isArray(e) || ARRAY_BUFFER && ArrayBuffer.isView(e)))
                    throw new Error(ERROR);
                t = !0
            }
            for (var i, n, a = 0, o = e.length, h = this.blocks; a < o; ) {
                if (this.hashed && (this.hashed = !1,
                        h[0] = this.block,
                        h[16] = h[1] = h[2] = h[3] = h[4] = h[5] = h[6] = h[7] = h[8] = h[9] = h[10] = h[11] = h[12] = h[13] = h[14] = h[15] = 0),
                    t)
                    for (n = this.start; a < o && n < 64; ++a)
                        h[n >> 2] |= e[a] << SHIFT[3 & n++];
                else
                    for (n = this.start; a < o && n < 64; ++a)
                        (i = e.charCodeAt(a)) < 128 ? h[n >> 2] |= i << SHIFT[3 & n++] : (i < 2048 ? h[n >> 2] |= (192 | i >> 6) << SHIFT[3 & n++] : (i < 55296 || 57344 <= i ? h[n >> 2] |= (224 | i >> 12) << SHIFT[3 & n++] : (i = 65536 + ((1023 & i) << 10 | 1023 & e.charCodeAt(++a)),
                                    h[n >> 2] |= (240 | i >> 18) << SHIFT[3 & n++],
                                    h[n >> 2] |= (128 | i >> 12 & 63) << SHIFT[3 & n++]),
                                h[n >> 2] |= (128 | i >> 6 & 63) << SHIFT[3 & n++]),
                            h[n >> 2] |= (128 | 63 & i) << SHIFT[3 & n++]);
                this.lastByteIndex = n,
                this.bytes += n - this.start,
                64 <= n ? (this.block = h[16],
                    this.start = n - 64,
                    this.hash(),
                    this.hashed = !0) : this.start = n
            }
            return 4294967295 < this.bytes && (this.hBytes += this.bytes / 4294967296 << 0,
                this.bytes = this.bytes % 4294967296),
            this
        }
    },
    Sha256.prototype.finalize = function () {
        var e,
        t;
        this.finalized || (this.finalized = !0,
            e = this.blocks,
            t = this.lastByteIndex,
            e[16] = this.block,
            e[t >> 2] |= EXTRA[3 & t],
            this.block = e[16],
            56 <= t && (this.hashed || this.hash(),
                e[0] = this.block,
                e[16] = e[1] = e[2] = e[3] = e[4] = e[5] = e[6] = e[7] = e[8] = e[9] = e[10] = e[11] = e[12] = e[13] = e[14] = e[15] = 0),
            e[14] = this.hBytes << 3 | this.bytes >>> 29,
            e[15] = this.bytes << 3,
            this.hash())
    },
    Sha256.prototype.hash = function () {
        for (var e, t, r, i, n, a, o = this.h0, h = this.h1, s = this.h2, l = this.h3, c = this.h4, u = this.h5, d = this.h6, f = this.h7, p = this.blocks, g = 16; g < 64; ++g)
            e = ((t = p[g - 15]) >>> 7 | t << 25) ^ (t >>> 18 | t << 14) ^ t >>> 3,
            t = p[g - 2],
            p[g] = p[g - 16] + e + p[g - 7] + ((t >>> 17 | t << 15) ^ (t >>> 19 | t << 13) ^ t >>> 10) << 0;
        for (a = h & s,
            g = 0; g < 64; g += 4)
            this.first ? (l = this.is224 ? (r = 300032,
                        f = (t = p[0] - 1413257819) - 150054599 << 0,
                        t + 24177077 << 0) : (r = 704751109,
                        f = (t = p[0] - 210244248) - 1521486534 << 0,
                        t + 143694565 << 0),
                this.first = !1) : (f = l + (t = f + ((c >>> 6 | c << 26) ^ (c >>> 11 | c << 21) ^ (c >>> 25 | c << 7)) + (c & u ^ ~c & d) + K[g] + p[g]) << 0,
                l = t + ((e = (o >>> 2 | o << 30) ^ (o >>> 13 | o << 19) ^ (o >>> 22 | o << 10)) + ((r = o & h) ^ o & s ^ a)) << 0),
            d = s + (t = d + ((f >>> 6 | f << 26) ^ (f >>> 11 | f << 21) ^ (f >>> 25 | f << 7)) + (f & c ^ ~f & u) + K[g + 1] + p[g + 1]) << 0,
            s = t + ((e = (l >>> 2 | l << 30) ^ (l >>> 13 | l << 19) ^ (l >>> 22 | l << 10)) + ((i = l & o) ^ l & h ^ r)) << 0,
            u = h + (t = u + ((d >>> 6 | d << 26) ^ (d >>> 11 | d << 21) ^ (d >>> 25 | d << 7)) + (d & f ^ ~d & c) + K[g + 2] + p[g + 2]) << 0,
            h = t + ((e = (s >>> 2 | s << 30) ^ (s >>> 13 | s << 19) ^ (s >>> 22 | s << 10)) + ((n = s & l) ^ s & o ^ i)) << 0,
            c = o + (t = c + ((u >>> 6 | u << 26) ^ (u >>> 11 | u << 21) ^ (u >>> 25 | u << 7)) + (u & d ^ ~u & f) + K[g + 3] + p[g + 3]) << 0,
            o = t + ((e = (h >>> 2 | h << 30) ^ (h >>> 13 | h << 19) ^ (h >>> 22 | h << 10)) + ((a = h & s) ^ h & l ^ n)) << 0;
        this.h0 = this.h0 + o << 0,
        this.h1 = this.h1 + h << 0,
        this.h2 = this.h2 + s << 0,
        this.h3 = this.h3 + l << 0,
        this.h4 = this.h4 + c << 0,
        this.h5 = this.h5 + u << 0,
        this.h6 = this.h6 + d << 0,
        this.h7 = this.h7 + f << 0
    },
    Sha256.prototype.hex = function () {
        this.finalize();
        var e = this.h0,
        t = this.h1,
        r = this.h2,
        i = this.h3,
        n = this.h4,
        a = this.h5,
        o = this.h6,
        h = this.h7,
        o = HEX_CHARS[e >> 28 & 15] + HEX_CHARS[e >> 24 & 15] + HEX_CHARS[e >> 20 & 15] + HEX_CHARS[e >> 16 & 15] + HEX_CHARS[e >> 12 & 15] + HEX_CHARS[e >> 8 & 15] + HEX_CHARS[e >> 4 & 15] + HEX_CHARS[15 & e] + HEX_CHARS[t >> 28 & 15] + HEX_CHARS[t >> 24 & 15] + HEX_CHARS[t >> 20 & 15] + HEX_CHARS[t >> 16 & 15] + HEX_CHARS[t >> 12 & 15] + HEX_CHARS[t >> 8 & 15] + HEX_CHARS[t >> 4 & 15] + HEX_CHARS[15 & t] + HEX_CHARS[r >> 28 & 15] + HEX_CHARS[r >> 24 & 15] + HEX_CHARS[r >> 20 & 15] + HEX_CHARS[r >> 16 & 15] + HEX_CHARS[r >> 12 & 15] + HEX_CHARS[r >> 8 & 15] + HEX_CHARS[r >> 4 & 15] + HEX_CHARS[15 & r] + HEX_CHARS[i >> 28 & 15] + HEX_CHARS[i >> 24 & 15] + HEX_CHARS[i >> 20 & 15] + HEX_CHARS[i >> 16 & 15] + HEX_CHARS[i >> 12 & 15] + HEX_CHARS[i >> 8 & 15] + HEX_CHARS[i >> 4 & 15] + HEX_CHARS[15 & i] + HEX_CHARS[n >> 28 & 15] + HEX_CHARS[n >> 24 & 15] + HEX_CHARS[n >> 20 & 15] + HEX_CHARS[n >> 16 & 15] + HEX_CHARS[n >> 12 & 15] + HEX_CHARS[n >> 8 & 15] + HEX_CHARS[n >> 4 & 15] + HEX_CHARS[15 & n] + HEX_CHARS[a >> 28 & 15] + HEX_CHARS[a >> 24 & 15] + HEX_CHARS[a >> 20 & 15] + HEX_CHARS[a >> 16 & 15] + HEX_CHARS[a >> 12 & 15] + HEX_CHARS[a >> 8 & 15] + HEX_CHARS[a >> 4 & 15] + HEX_CHARS[15 & a] + HEX_CHARS[o >> 28 & 15] + HEX_CHARS[o >> 24 & 15] + HEX_CHARS[o >> 20 & 15] + HEX_CHARS[o >> 16 & 15] + HEX_CHARS[o >> 12 & 15] + HEX_CHARS[o >> 8 & 15] + HEX_CHARS[o >> 4 & 15] + HEX_CHARS[15 & o];
        return this.is224 || (o += HEX_CHARS[h >> 28 & 15] + HEX_CHARS[h >> 24 & 15] + HEX_CHARS[h >> 20 & 15] + HEX_CHARS[h >> 16 & 15] + HEX_CHARS[h >> 12 & 15] + HEX_CHARS[h >> 8 & 15] + HEX_CHARS[h >> 4 & 15] + HEX_CHARS[15 & h]),
        o
    },
    Sha256.prototype.toString = Sha256.prototype.hex,
    Sha256.prototype.digest = function () {
        this.finalize();
        var e = this.h0,
        t = this.h1,
        r = this.h2,
        i = this.h3,
        n = this.h4,
        a = this.h5,
        o = this.h6,
        h = this.h7,
        o = [e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e, t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, 255 & t, r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, 255 & r, i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, 255 & i, n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, 255 & n, a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, 255 & a, o >> 24 & 255, o >> 16 & 255, o >> 8 & 255, 255 & o];
        return this.is224 || o.push(h >> 24 & 255, h >> 16 & 255, h >> 8 & 255, 255 & h),
        o
    },
    Sha256.prototype.array = Sha256.prototype.digest,
    Sha256.prototype.arrayBuffer = function () {
        this.finalize();
        var e = new ArrayBuffer(this.is224 ? 28 : 32),
        t = new DataView(e);
        return t.setUint32(0, this.h0),
        t.setUint32(4, this.h1),
        t.setUint32(8, this.h2),
        t.setUint32(12, this.h3),
        t.setUint32(16, this.h4),
        t.setUint32(20, this.h5),
        t.setUint32(24, this.h6),
        this.is224 || t.setUint32(28, this.h7),
        e
    },
    HmacSha256.prototype = new Sha256,
    HmacSha256.prototype.finalize = function () {
        var e;
        Sha256.prototype.finalize.call(this),
        this.inner && (this.inner = !1,
            e = this.array(),
            Sha256.call(this, this.is224, this.sharedMemory),
            this.update(this.oKeyPad),
            this.update(e),
            Sha256.prototype.finalize.call(this))
    };
    var exports = createMethod();
    exports.sha256 = exports,
    exports.sha224 = createMethod(!0),
    exports.sha256.hmac = createHmacMethod(),
    exports.sha224.hmac = createHmacMethod(!0),
    COMMON_JS ? module.exports = exports : (root.sha256 = exports.sha256,
            root.sha224 = exports.sha224,
            AMD && define(function () {
                return exports
            }))
}
();
var CryptoJS = CryptoJS || (function (Math, undefined) {
    var C = {};
    var C_lib = C.lib = {};
    var Base = C_lib.Base = (function () {
        function F() {};
        return {
            extend: function (overrides) {
                F.prototype = this;
                var subtype = new F();
                if (overrides) {
                    subtype.mixIn(overrides);
                }
                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
                    subtype.init = function () {
                        subtype.$super.init.apply(this, arguments);
                    };
                }
                subtype.init.prototype = subtype;
                subtype.$super = this;
                return subtype;
            }, create: function () {
                var instance = this.extend();
                instance.init.apply(instance, arguments);
                return instance;
            }, init: function () {}, mixIn: function (properties) {
                for (var propertyName in properties) {
                    if (properties.hasOwnProperty(propertyName)) {
                        this[propertyName] = properties[propertyName];
                    }
                }
                if (properties.hasOwnProperty('toString')) {
                    this.toString = properties.toString;
                }
            }, clone: function () {
                return this.init.prototype.extend(this);
            }
        };
    }());
    var WordArray = C_lib.WordArray = Base.extend({
        init: function (words, sigBytes) {
            words = this.words = words || [];
            if (sigBytes != undefined) {
                this.sigBytes = sigBytes;
            } else {
                this.sigBytes = words.length * 4;
            }
        }, toString: function (encoder) {
            return (encoder || Hex).stringify(this);
        }, concat: function (wordArray) {
            var thisWords = this.words;
            var thatWords = wordArray.words;
            var thisSigBytes = this.sigBytes;
            var thatSigBytes = wordArray.sigBytes;
            this.clamp();
            if (thisSigBytes % 4) {
                for (var i = 0; i < thatSigBytes; i++) {
                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
                }
            } else if (thatWords.length > 0xffff) {
                for (var i = 0; i < thatSigBytes; i += 4) {
                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
                }
            } else {
                thisWords.push.apply(thisWords, thatWords);
            }
            this.sigBytes += thatSigBytes;
            return this;
        }, clamp: function () {
            var words = this.words;
            var sigBytes = this.sigBytes;
            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
            words.length = Math.ceil(sigBytes / 4);
        }, clone: function () {
            var clone = Base.clone.call(this);
            clone.words = this.words.slice(0);
            return clone;
        }, random: function (nBytes) {
            var words = [];
            var r = (function (m_w) {
                var m_w = m_w;
                var m_z = 0x3ade68b1;
                var mask = 0xffffffff;
                return function () {
                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
                    var result = ((m_z << 0x10) + m_w) & mask;
                    result /= 0x100000000;
                    result += 0.5;
                    return result * (Math.random() > .5 ? 1 : -1);
                }
            });
            for (var i = 0, rcache; i < nBytes; i += 4) {
                var _r = r((rcache || Math.random()) * 0x100000000);
                rcache = _r() * 0x3ade67b7;
                words.push((_r() * 0x100000000) | 0);
            }
            return new WordArray.init(words, nBytes);
        }
    });
    var C_enc = C.enc = {};
    var Hex = C_enc.Hex = {
        stringify: function (wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var hexChars = [];
            for (var i = 0; i < sigBytes; i++) {
                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                hexChars.push((bite >>> 4).toString(16));
                hexChars.push((bite & 0x0f).toString(16));
            }
            return hexChars.join('');
        }, parse: function (hexStr) {
            var hexStrLength = hexStr.length;
            var words = [];
            for (var i = 0; i < hexStrLength; i += 2) {
                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
            }
            return new WordArray.init(words, hexStrLength / 2);
        }
    };
    var Latin1 = C_enc.Latin1 = {
        stringify: function (wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var latin1Chars = [];
            for (var i = 0; i < sigBytes; i++) {
                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                latin1Chars.push(String.fromCharCode(bite));
            }
            return latin1Chars.join('');
        }, parse: function (latin1Str) {
            var latin1StrLength = latin1Str.length;
            var words = [];
            for (var i = 0; i < latin1StrLength; i++) {
                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
            }
            return new WordArray.init(words, latin1StrLength);
        }
    };
    var Utf8 = C_enc.Utf8 = {
        stringify: function (wordArray) {
            try {
                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
            } catch (e) {
                throw new Error('Malformed UTF-8 data');
            }
        }, parse: function (utf8Str) {
            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
        }
    };
    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
        reset: function () {
            this._data = new WordArray.init();
            this._nDataBytes = 0;
        }, _append: function (data) {
            if (typeof data == 'string') {
                data = Utf8.parse(data);
            }
            this._data.concat(data);
            this._nDataBytes += data.sigBytes;
        }, _process: function (doFlush) {
            var data = this._data;
            var dataWords = data.words;
            var dataSigBytes = data.sigBytes;
            var blockSize = this.blockSize;
            var blockSizeBytes = blockSize * 4;
            var nBlocksReady = dataSigBytes / blockSizeBytes;
            if (doFlush) {
                nBlocksReady = Math.ceil(nBlocksReady);
            } else {
                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
            }
            var nWordsReady = nBlocksReady * blockSize;
            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);
            if (nWordsReady) {
                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                    this._doProcessBlock(dataWords, offset);
                }
                var processedWords = dataWords.splice(0, nWordsReady);
                data.sigBytes -= nBytesReady;
            }
            return new WordArray.init(processedWords, nBytesReady);
        }, clone: function () {
            var clone = Base.clone.call(this);
            clone._data = this._data.clone();
            return clone;
        }, _minBufferSize: 0
    });
    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
        cfg: Base.extend(),
        init: function (cfg) {
            this.cfg = this.cfg.extend(cfg);
            this.reset();
        }, reset: function () {
            BufferedBlockAlgorithm.reset.call(this);
            this._doReset();
        }, update: function (messageUpdate) {
            this._append(messageUpdate);
            this._process();
            return this;
        }, finalize: function (messageUpdate) {
            if (messageUpdate) {
                this._append(messageUpdate);
            }
            var hash = this._doFinalize();
            return hash;
        }, blockSize: 512 / 32,
        _createHelper: function (hasher) {
            return function (message, cfg) {
                return new hasher.init(cfg).finalize(message);
            };
        }, _createHmacHelper: function (hasher) {
            return function (message, key) {
                return new C_algo.HMAC.init(hasher, key).finalize(message);
            };
        }
    });
    var C_algo = C.algo = {};
    return C;
}(Math));


(function () {
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var C_enc = C.enc;
    var Base64 = C_enc.Base64 = {
        stringify: function (wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var map = this._map;
            wordArray.clamp();
            var base64Chars = [];
            for (var i = 0; i < sigBytes; i += 3) {
                var byte1 = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;
                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;
                for (var j = 0;
                    (j < 4) && (i + j * 0.75 < sigBytes); j++) {
                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
                }
            }
            var paddingChar = map.charAt(64);
            if (paddingChar) {
                while (base64Chars.length % 4) {
                    base64Chars.push(paddingChar);
                }
            }
            return base64Chars.join('');
        }, parse: function (base64Str) {
            var base64StrLength = base64Str.length;
            var map = this._map;
            var reverseMap = this._reverseMap;
            if (!reverseMap) {
                reverseMap = this._reverseMap = [];
                for (var j = 0; j < map.length; j++) {
                    reverseMap[map.charCodeAt(j)] = j;
                }
            }
            var paddingChar = map.charAt(64);
            if (paddingChar) {
                var paddingIndex = base64Str.indexOf(paddingChar);
                if (paddingIndex !== -1) {
                    base64StrLength = paddingIndex;
                }
            }
            return parseLoop(base64Str, base64StrLength, reverseMap);
        }, _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    };
    function parseLoop(base64Str, base64StrLength, reverseMap) {
        var words = [];
        var nBytes = 0;
        for (var i = 0; i < base64StrLength; i++) {
            if (i % 4) {
                var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
                var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
                words[nBytes >>> 2] |= (bits1 | bits2) << (24 - (nBytes % 4) * 8);
                nBytes++;
            }
        }
        return WordArray.create(words, nBytes);
    }
}());

(function (Math) {
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;
    var H = [];
    var K = [];
    (function () {
        function isPrime(n) {
            var sqrtN = Math.sqrt(n);
            for (var factor = 2; factor <= sqrtN; factor++) {
                if (!(n % factor)) {
                    return false;
                }
            }
            return true;
        }
        function getFractionalBits(n) {
            return ((n - (n | 0)) * 0x100000000) | 0;
        }
        var n = 2;
        var nPrime = 0;
        while (nPrime < 64) {
            if (isPrime(n)) {
                if (nPrime < 8) {
                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
                }
                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));
                nPrime++;
            }
            n++;
        }
    }());
    var W = [];
    var SHA256 = C_algo.SHA256 = Hasher.extend({
        _doReset: function () {
            this._hash = new WordArray.init(H.slice(0));
        }, _doProcessBlock: function (M, offset) {
            var H = this._hash.words;
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            var e = H[4];
            var f = H[5];
            var g = H[6];
            var h = H[7];
            for (var i = 0; i < 64; i++) {
                if (i < 16) {
                    W[i] = M[offset + i] | 0;
                } else {
                    var gamma0x = W[i - 15];
                    var gamma0 = ((gamma0x << 25) | (gamma0x >>> 7)) ^ ((gamma0x << 14) | (gamma0x >>> 18)) ^ (gamma0x >>> 3);
                    var gamma1x = W[i - 2];
                    var gamma1 = ((gamma1x << 15) | (gamma1x >>> 17)) ^ ((gamma1x << 13) | (gamma1x >>> 19)) ^ (gamma1x >>> 10);
                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
                }
                var ch = (e & f) ^ (~e & g);
                var maj = (a & b) ^ (a & c) ^ (b & c);
                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7) | (e >>> 25));
                var t1 = h + sigma1 + ch + K[i] + W[i];
                var t2 = sigma0 + maj;
                h = g;
                g = f;
                f = e;
                e = (d + t1) | 0;
                d = c;
                c = b;
                b = a;
                a = (t1 + t2) | 0;
            }
            H[0] = (H[0] + a) | 0;
            H[1] = (H[1] + b) | 0;
            H[2] = (H[2] + c) | 0;
            H[3] = (H[3] + d) | 0;
            H[4] = (H[4] + e) | 0;
            H[5] = (H[5] + f) | 0;
            H[6] = (H[6] + g) | 0;
            H[7] = (H[7] + h) | 0;
        }, _doFinalize: function () {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;
            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
            data.sigBytes = dataWords.length * 4;
            this._process();
            return this._hash;
        }, clone: function () {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
        }
    });
    C.SHA256 = Hasher._createHelper(SHA256);
    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
}(Math));

(function (Math) {
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;
    var H = [];
    var K = [];
    (function () {
        function isPrime(n) {
            var sqrtN = Math.sqrt(n);
            for (var factor = 2; factor <= sqrtN; factor++) {
                if (!(n % factor)) {
                    return false;
                }
            }
            return true;
        }
        function getFractionalBits(n) {
            return ((n - (n | 0)) * 0x100000000) | 0;
        }
        var n = 2;
        var nPrime = 0;
        while (nPrime < 64) {
            if (isPrime(n)) {
                if (nPrime < 8) {
                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
                }
                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));
                nPrime++;
            }
            n++;
        }
    }());
    var W = [];
    var SHA256 = C_algo.SHA256 = Hasher.extend({
        _doReset: function () {
            this._hash = new WordArray.init(H.slice(0));
        }, _doProcessBlock: function (M, offset) {
            var H = this._hash.words;
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            var e = H[4];
            var f = H[5];
            var g = H[6];
            var h = H[7];
            for (var i = 0; i < 64; i++) {
                if (i < 16) {
                    W[i] = M[offset + i] | 0;
                } else {
                    var gamma0x = W[i - 15];
                    var gamma0 = ((gamma0x << 25) | (gamma0x >>> 7)) ^ ((gamma0x << 14) | (gamma0x >>> 18)) ^ (gamma0x >>> 3);
                    var gamma1x = W[i - 2];
                    var gamma1 = ((gamma1x << 15) | (gamma1x >>> 17)) ^ ((gamma1x << 13) | (gamma1x >>> 19)) ^ (gamma1x >>> 10);
                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
                }
                var ch = (e & f) ^ (~e & g);
                var maj = (a & b) ^ (a & c) ^ (b & c);
                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7) | (e >>> 25));
                var t1 = h + sigma1 + ch + K[i] + W[i];
                var t2 = sigma0 + maj;
                h = g;
                g = f;
                f = e;
                e = (d + t1) | 0;
                d = c;
                c = b;
                b = a;
                a = (t1 + t2) | 0;
            }
            H[0] = (H[0] + a) | 0;
            H[1] = (H[1] + b) | 0;
            H[2] = (H[2] + c) | 0;
            H[3] = (H[3] + d) | 0;
            H[4] = (H[4] + e) | 0;
            H[5] = (H[5] + f) | 0;
            H[6] = (H[6] + g) | 0;
            H[7] = (H[7] + h) | 0;
        }, _doFinalize: function () {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;
            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
            data.sigBytes = dataWords.length * 4;
            this._process();
            return this._hash;
        }, clone: function () {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
        }
    });
    C.SHA256 = Hasher._createHelper(SHA256);
    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
}(Math));

function sha256(word) {
    return CryptoJS.SHA256(word).toString(CryptoJS.enc.Hex);
}

function handleCode(code, type, order, start, length) {
    if (type !== 'mix') {
        var str = type === 'en' ? 'AAAAAAAAAA' : '0000000000';
        /* 補滿不足位數 */
        var reg = type === 'en' ? /[0-9]/g : /\D/g;
        if (order === '+') {
            return code.replace(reg, '').concat(str).substr(start, length);
        }
        return (str + code).replace(reg, '').split('').reverse().join('').substr(start, length);
    }
    if (order === '+') {
        return code.substr(start, length);
    }
    return code.split('').reverse().join('').substr(start, length);
}

var CryptoJS = CryptoJS || (function (Math, undefined) {
    var C = {};
    var C_lib = C.lib = {};
    var Base = C_lib.Base = (function () {
        function F() {};
        return {
            extend: function (overrides) {
                F.prototype = this;
                var subtype = new F();
                if (overrides) {
                    subtype.mixIn(overrides);
                }
                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
                    subtype.init = function () {
                        subtype.$super.init.apply(this, arguments);
                    };
                }
                subtype.init.prototype = subtype;
                subtype.$super = this;
                return subtype;
            }, create: function () {
                var instance = this.extend();
                instance.init.apply(instance, arguments);
                return instance;
            }, init: function () {}, mixIn: function (properties) {
                for (var propertyName in properties) {
                    if (properties.hasOwnProperty(propertyName)) {
                        this[propertyName] = properties[propertyName];
                    }
                }
                if (properties.hasOwnProperty('toString')) {
                    this.toString = properties.toString;
                }
            }, clone: function () {
                return this.init.prototype.extend(this);
            }
        };
    }());
    var WordArray = C_lib.WordArray = Base.extend({
        init: function (words, sigBytes) {
            words = this.words = words || [];
            if (sigBytes != undefined) {
                this.sigBytes = sigBytes;
            } else {
                this.sigBytes = words.length * 4;
            }
        }, toString: function (encoder) {
            return (encoder || Hex).stringify(this);
        }, concat: function (wordArray) {
            var thisWords = this.words;
            var thatWords = wordArray.words;
            var thisSigBytes = this.sigBytes;
            var thatSigBytes = wordArray.sigBytes;
            this.clamp();
            if (thisSigBytes % 4) {
                for (var i = 0; i < thatSigBytes; i++) {
                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
                }
            } else if (thatWords.length > 0xffff) {
                for (var i = 0; i < thatSigBytes; i += 4) {
                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
                }
            } else {
                thisWords.push.apply(thisWords, thatWords);
            }
            this.sigBytes += thatSigBytes;
            return this;
        }, clamp: function () {
            var words = this.words;
            var sigBytes = this.sigBytes;
            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
            words.length = Math.ceil(sigBytes / 4);
        }, clone: function () {
            var clone = Base.clone.call(this);
            clone.words = this.words.slice(0);
            return clone;
        }, random: function (nBytes) {
            var words = [];
            var r = (function (m_w) {
                var m_w = m_w;
                var m_z = 0x3ade68b1;
                var mask = 0xffffffff;
                return function () {
                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
                    var result = ((m_z << 0x10) + m_w) & mask;
                    result /= 0x100000000;
                    result += 0.5;
                    return result * (Math.random() > .5 ? 1 : -1);
                }
            });
            for (var i = 0, rcache; i < nBytes; i += 4) {
                var _r = r((rcache || Math.random()) * 0x100000000);
                rcache = _r() * 0x3ade67b7;
                words.push((_r() * 0x100000000) | 0);
            }
            return new WordArray.init(words, nBytes);
        }
    });
    var C_enc = C.enc = {};
    var Hex = C_enc.Hex = {
        stringify: function (wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var hexChars = [];
            for (var i = 0; i < sigBytes; i++) {
                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                hexChars.push((bite >>> 4).toString(16));
                hexChars.push((bite & 0x0f).toString(16));
            }
            return hexChars.join('');
        }, parse: function (hexStr) {
            var hexStrLength = hexStr.length;
            var words = [];
            for (var i = 0; i < hexStrLength; i += 2) {
                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
            }
            return new WordArray.init(words, hexStrLength / 2);
        }
    };
    var Latin1 = C_enc.Latin1 = {
        stringify: function (wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var latin1Chars = [];
            for (var i = 0; i < sigBytes; i++) {
                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                latin1Chars.push(String.fromCharCode(bite));
            }
            return latin1Chars.join('');
        }, parse: function (latin1Str) {
            var latin1StrLength = latin1Str.length;
            var words = [];
            for (var i = 0; i < latin1StrLength; i++) {
                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
            }
            return new WordArray.init(words, latin1StrLength);
        }
    };
    var Utf8 = C_enc.Utf8 = {
        stringify: function (wordArray) {
            try {
                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
            } catch (e) {
                throw new Error('Malformed UTF-8 data');
            }
        }, parse: function (utf8Str) {
            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
        }
    };
    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
        reset: function () {
            this._data = new WordArray.init();
            this._nDataBytes = 0;
        }, _append: function (data) {
            if (typeof data == 'string') {
                data = Utf8.parse(data);
            }
            this._data.concat(data);
            this._nDataBytes += data.sigBytes;
        }, _process: function (doFlush) {
            var data = this._data;
            var dataWords = data.words;
            var dataSigBytes = data.sigBytes;
            var blockSize = this.blockSize;
            var blockSizeBytes = blockSize * 4;
            var nBlocksReady = dataSigBytes / blockSizeBytes;
            if (doFlush) {
                nBlocksReady = Math.ceil(nBlocksReady);
            } else {
                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
            }
            var nWordsReady = nBlocksReady * blockSize;
            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);
            if (nWordsReady) {
                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                    this._doProcessBlock(dataWords, offset);
                }
                var processedWords = dataWords.splice(0, nWordsReady);
                data.sigBytes -= nBytesReady;
            }
            return new WordArray.init(processedWords, nBytesReady);
        }, clone: function () {
            var clone = Base.clone.call(this);
            clone._data = this._data.clone();
            return clone;
        }, _minBufferSize: 0
    });
    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
        cfg: Base.extend(),
        init: function (cfg) {
            this.cfg = this.cfg.extend(cfg);
            this.reset();
        }, reset: function () {
            BufferedBlockAlgorithm.reset.call(this);
            this._doReset();
        }, update: function (messageUpdate) {
            this._append(messageUpdate);
            this._process();
            return this;
        }, finalize: function (messageUpdate) {
            if (messageUpdate) {
                this._append(messageUpdate);
            }
            var hash = this._doFinalize();
            return hash;
        }, blockSize: 512 / 32,
        _createHelper: function (hasher) {
            return function (message, cfg) {
                return new hasher.init(cfg).finalize(message);
            };
        }, _createHmacHelper: function (hasher) {
            return function (message, key) {
                return new C_algo.HMAC.init(hasher, key).finalize(message);
            };
        }
    });
    var C_algo = C.algo = {};
    return C;
}(Math));


(function () {
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var C_enc = C.enc;
    var Base64 = C_enc.Base64 = {
        stringify: function (wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var map = this._map;
            wordArray.clamp();
            var base64Chars = [];
            for (var i = 0; i < sigBytes; i += 3) {
                var byte1 = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;
                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;
                for (var j = 0;
                    (j < 4) && (i + j * 0.75 < sigBytes); j++) {
                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
                }
            }
            var paddingChar = map.charAt(64);
            if (paddingChar) {
                while (base64Chars.length % 4) {
                    base64Chars.push(paddingChar);
                }
            }
            return base64Chars.join('');
        }, parse: function (base64Str) {
            var base64StrLength = base64Str.length;
            var map = this._map;
            var reverseMap = this._reverseMap;
            if (!reverseMap) {
                reverseMap = this._reverseMap = [];
                for (var j = 0; j < map.length; j++) {
                    reverseMap[map.charCodeAt(j)] = j;
                }
            }
            var paddingChar = map.charAt(64);
            if (paddingChar) {
                var paddingIndex = base64Str.indexOf(paddingChar);
                if (paddingIndex !== -1) {
                    base64StrLength = paddingIndex;
                }
            }
            return parseLoop(base64Str, base64StrLength, reverseMap);
        }, _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    };
    function parseLoop(base64Str, base64StrLength, reverseMap) {
        var words = [];
        var nBytes = 0;
        for (var i = 0; i < base64StrLength; i++) {
            if (i % 4) {
                var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
                var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
                words[nBytes >>> 2] |= (bits1 | bits2) << (24 - (nBytes % 4) * 8);
                nBytes++;
            }
        }
        return WordArray.create(words, nBytes);
    }
}());

function base64(word) {
    var src = CryptoJS.enc.Utf8.parse(word);
    return CryptoJS.enc.Base64.stringify(src);
}



var data = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36,not available,zh-CN,24,8,8,1920,1080,1920,1040,-480,Asia/Shanghai,true,true,true,false,true,not available,Win32,Chromium PDF Plugin,Portable Document Format,application/x-google-chrome-pdf,pdf,Chromium PDF Viewer,,application/pdf,pdf,hH7AF20sFNfp2lnsggLNJ0yxpkuXNKMYlxXy+CLSv085bnc4a2NiOWZkaENxeDVT,canvas winding:yes,canvas fp:data:image/png;base64,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AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgcoFDOiVVyAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECNRBwIBehxZkIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIHKBQzolVcgAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjUQcCAXocWZCBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBygUM6JVXIAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI1EHAgF6HFmQgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgcoFDOiVVyAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECNRBwIBehxZkIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIED8mOBAAAAGXklEQVSAAIHKBQzolVcgAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjUQcCAXocWZCBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBygUM6JVXIAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI1EHAgF6HFmQgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgcoFDOiVVyAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECNRBwIBehxZkIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIHKBQzolVcgAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjUQcCAXocWZCBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBygUM6JVXIAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI1EHAgF6HFmQgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgcoFDOiVVyAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECNRBwIBehxZkIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIHKBQzolVcgAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjUQcCAXocWZCBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBygUM6JVXIAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI1EHAgF6HFmQgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgcoFDOiVVyAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECNRBwIBehxZkIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIHKBQzolVcgAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjUQcCAXocWZCBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBygUM6JVXIAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI1EHAgF6HFmQgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgcoFDOiVVyAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECNRBwIBehxZkIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIHKBQzolVcgAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjUQcCAXocWZCBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBygUM6JVXIAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI1EHAgF6HFmQgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgcoFDOiVVyAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECNRBwIBehxZkIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIHKBQzolVcgAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjUQcCAXocWZCBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBygUM6JVXIAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI1EHAgF6HFmQgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgcoFDOiVVyAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECNRBwIBehxZkIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIHKBQzolVcgAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjUQcCAXocWZCBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBygUM6JVXIAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI1EHAgF6HFmQgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgcoFDOiVVyAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECNRB4L+N53J865u+BAAAAABJRU5ErkJggg==,data:image/png;base64,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,extensions:ANGLE_instanced_arrays;EXT_blend_minmax;EXT_color_buffer_half_float;EXT_disjoint_timer_query;EXT_frag_depth;EXT_shader_texture_lod;EXT_texture_filter_anisotropic;WEBKIT_EXT_texture_filter_anisotropic;EXT_sRGB;OES_element_index_uint;OES_standard_derivatives;OES_texture_float;OES_texture_float_linear;OES_texture_half_float;OES_texture_half_float_linear;OES_vertex_array_object;WEBGL_color_buffer_float;WEBGL_compressed_texture_s3tc;WEBKIT_WEBGL_compressed_texture_s3tc;WEBGL_compressed_texture_s3tc_srgb;WEBGL_debug_renderer_info;WEBGL_debug_shaders;WEBGL_depth_texture;WEBKIT_WEBGL_depth_texture;WEBGL_draw_buffers;WEBGL_lose_context;WEBKIT_WEBGL_lose_context,webgl aliased line width range:[1, 1],webgl aliased point size range:[1, 1024],webgl alpha bits:8,webgl antialiasing:yes,webgl blue bits:8,webgl depth bits:24,webgl green bits:8,webgl max anisotropy:16,webgl max combined texture image units:32,webgl max cube map texture size:16384,webgl max fragment uniform vectors:1024,webgl max render buffer size:16384,webgl max texture image units:16,webgl max texture size:16384,webgl max varying vectors:30,webgl max vertex attribs:16,webgl max vertex texture image units:16,webgl max vertex uniform vectors:4096,webgl max viewport dims:[32767, 32767],webgl red bits:8,webgl renderer:WebKit WebGL,webgl shading language version:WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium),webgl stencil bits:0,webgl vendor:WebKit,webgl version:WebGL 1.0 (OpenGL ES 2.0 Chromium),webgl unmasked vendor:Google Inc.,webgl unmasked renderer:ANGLE (Intel(R) UHD Graphics 630 Direct3D11 vs_5_0 ps_5_0),webgl vertex shader high float precision:23,webgl vertex shader high float precision rangeMin:127,webgl vertex shader high float precision rangeMax:127,webgl vertex shader medium float precision:23,webgl vertex shader medium float precision rangeMin:127,webgl vertex shader medium float precision rangeMax:127,webgl vertex shader low float precision:23,webgl vertex shader low float precision rangeMin:127,webgl vertex shader low float precision rangeMax:127,webgl fragment shader high float precision:23,webgl fragment shader high float precision rangeMin:127,webgl fragment shader high float precision rangeMax:127,webgl fragment shader medium float precision:23,webgl fragment shader medium float precision rangeMin:127,webgl fragment shader medium float precision rangeMax:127,webgl fragment shader low float precision:23,webgl fragment shader low float precision rangeMin:127,webgl fragment shader low float precision rangeMax:127,webgl vertex shader high int precision:0,webgl vertex shader high int precision rangeMin:31,webgl vertex shader high int precision rangeMax:30,webgl vertex shader medium int precision:0,webgl vertex shader medium int precision rangeMin:31,webgl vertex shader medium int precision rangeMax:30,webgl vertex shader low int precision:0,webgl vertex shader low int precision rangeMin:31,webgl vertex shader low int precision rangeMax:30,webgl fragment shader high int precision:0,webgl fragment shader high int precision rangeMin:31,webgl fragment shader high int precision rangeMax:30,webgl fragment shader medium int precision:0,webgl fragment shader medium int precision rangeMin:31,webgl fragment shader medium int precision rangeMax:30,webgl fragment shader low int precision:0,webgl fragment shader low int precision rangeMin:31,webgl fragment shader low int precision rangeMax:30,Google Inc.~ANGLE (Intel(R) UHD Graphics 630 Direct3D11 vs_5_0 ps_5_0),false,false,false,false,false,0,false,false,Arial,Arial Black,Arial Narrow,Calibri,Cambria,Cambria Math,Comic Sans MS,Consolas,Courier,Courier New,Georgia,Helvetica,Impact,Lucida Console,Lucida Sans Unicode,Microsoft Sans Serif,MS Gothic,MS PGothic,MS Sans Serif,MS Serif,Palatino Linotype,Segoe Print,Segoe Script,Segoe UI,Segoe UI Light,Segoe UI Semibold,Segoe UI Symbol,Tahoma,Times,Times New Roman,Trebuchet MS,Verdana,Wingdings,124.0434474653739";
function components() {
    
    var fp = recognition.x64hash128(data, 31);
    var secretCode = '';
    var fcacheType = "B";
    switch (fcacheType) {
    case 'A':
        /*  */
        secretCode = handleCode(window.btoa(fp), 'int', '+', 0, 3) + '@' + fp + '*' + handleCode(md5(fp), 'en', '+', 0, 5);
        break;
    case 'B':
        /*  */
        secretCode = handleCode(md5(fp), 'en', '+', 0, 5) + '#' + fp + '*' + handleCode(sha256(fp), 'int', '-', 0, 5);
        break;
    case 'C':
        /*  */
        secretCode = handleCode(sha256(fp), 'en', '-', 0, 7) + '-' + handleCode(md5(fp), 'int', '+', 0, 4) + fp;
        break;
    case 'D':
        /*  */
        secretCode = fp + '+' + handleCode(md5(fp), 'en', '-', 0, 4) + handleCode(sha256(fp), 'int', '+', 0, 3);
        break;
    case 'E':
        /*  */
        secretCode = handleCode(fp, 'en', '+', 0, 2) + '%' + handleCode(sha256(fp), 'int', '+', 0, 2) + fp;
        break;
    case 'F':
        /*  */
        secretCode = handleCode(sha256('8f0' + fp + 'b7a'), 'mix', '-', 7, 8) + fp + handleCode(md5('f16s' + fp + 'd'), 'mix', '+', 5, 8);
        break;
    case 'G':
        /*  */
        secretCode = handleCode(sha224('9a1' + fp + 'q1'), 'mix', '+', 10, 9) + handleCode(md5('e5cv' + fp + 'v1'), 'mix', '-', 7, 8) + fp;
        break;
    case 'H':
        /*  */
        secretCode = handleCode(md5('eds' + fp + '874'), 'mix', '-', 4, 7) + fp + handleCode(sha384('t3b' + fp + 'fe4'), 'mix', '+', 6, 8);
        break;
    case 'I':
        /*  */
        secretCode = handleCode(sha224('11a' + fp + 'q1aa'), 'mix', '-', 12, 15) + fp + handleCode(md5('r124' + fp + 'v'), 'mix', '-', 8, 7);
        break;
    case 'J':
        /*  */
        secretCode = fp + handleCode(sha384('e5da' + fp + 'q'), 'mix', '-', 13, 5) + handleCode(sha512('d31' + fp + 'l78'), 'mix', '-', 10, 9);
        break;
    case 'K':
        /*  */
        secretCode = handleCode(md5('p3sa' + fp + 'ps5'), 'mix', '-', 8, 7) + handleCode(sha224('vbne' + fp + '834'), 'mix', '-', 15, 10) + fp;
        break;
    case 'L':
        /*  */
        secretCode = fp + handleCode(sha512('idmn' + fp + '78g'), 'mix', '-', 4, 6) + handleCode(md5('d84' + fp + 'rtd'), 'mix', '-', 12, 5);
        break;
    case 'M':
        /*  */
        secretCode = handleCode(sha224('dfs' + fp + 'e1y'), 'mix', '-', 10, 9) + handleCode(sha512('bvs4' + fp + '12s'), 'mix', '-', 15, 7) + fp;
        break;
    case 'N':
        /*  */
        secretCode = fp + handleCode(sha384('ad4f' + fp + 'qz'), 'mix', '-', 4, 6) + handleCode(sha512('nqu' + fp + '7dbn'), 'mix', '-', 30, 12);
        break;
    case 'O':
        /*  */
        secretCode = handleCode(sha512('7df4' + fp + '1f'), 'mix', '-', 9, 6) + fp + handleCode(md5(fp + 'd3f1'), 'mix', '-', 4, 7);
        break;
    case 'P':
        /*  */
        secretCode = fp + handleCode(sha512('nd8a' + fp + '1x'), 'mix', '-', 18, 7) + handleCode(sha256('pa' + fp + '178a'), 'mix', '-', 7, 10);
        break;
    case 'Q':
        /*  */
        secretCode = handleCode(sha224(fp + 'of555'), 'mix', '-', 4, 6) + handleCode(sha512('37ol' + fp + 'j'), 'mix', '+', 15, 9) + fp;
        break;
    case 'R':
        /*  */
        secretCode = handleCode(sha384('ok2' + fp + 'pzl1'), 'mix', '+', 8, 10) + fp + handleCode(md5('grew5' + fp + '4'), 'mix', '-', 2, 7);
        break;
    default:
        /*  */
        secretCode = handleCode(md5(fp), 'en', '+', 0, 5) + '#' + fp + '*' + handleCode(sha256(fp), 'int', '-', 0, 5);
    };
    // return window.btoa(secretCode);
	return base64(secretCode);
}
