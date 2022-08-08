//https://m.wukonglicai.com/weChat/login
window=this;navigator = {};//如果需要用到浏览器协议头，请在<加载代码> 按钮 右侧选择 navigator.js
var e = {}; 
!function(t) {
        "use strict";
        var e = "0123456789abcdefghijklmnopqrstuvwxyz";
        function r(t) {
            return e.charAt(t)
        }
        function n(t, e) {
            return t & e
        }
        function o(t, e) {
            return t | e
        }
        function c(t, e) {
            return t ^ e
        }
        function f(t, e) {
            return t & ~e
        }
        function l(t) {
            if (0 == t)
                return -1;
            var e = 0;
            return 0 == (65535 & t) && (t >>= 16,
            e += 16),
            0 == (255 & t) && (t >>= 8,
            e += 8),
            0 == (15 & t) && (t >>= 4,
            e += 4),
            0 == (3 & t) && (t >>= 2,
            e += 2),
            0 == (1 & t) && ++e,
            e
        }
        function h(t) {
            for (var e = 0; 0 != t; )
                t &= t - 1,
                ++e;
            return e
        }
        var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
          , v = "=";
        function y(t) {
            var i, e, r = "";
            for (i = 0; i + 3 <= t.length; i += 3)
                e = parseInt(t.substring(i, i + 3), 16),
                r += d.charAt(e >> 6) + d.charAt(63 & e);
            for (i + 1 == t.length ? (e = parseInt(t.substring(i, i + 1), 16),
            r += d.charAt(e << 2)) : i + 2 == t.length && (e = parseInt(t.substring(i, i + 2), 16),
            r += d.charAt(e >> 2) + d.charAt((3 & e) << 4)); (3 & r.length) > 0; )
                r += v;
            return r
        }
        function m(s) {
            var i, t = "", e = 0, n = 0;
            for (i = 0; i < s.length && s.charAt(i) != v; ++i) {
                var o = d.indexOf(s.charAt(i));
                o < 0 || (0 == e ? (t += r(o >> 2),
                n = 3 & o,
                e = 1) : 1 == e ? (t += r(n << 2 | o >> 4),
                n = 15 & o,
                e = 2) : 2 == e ? (t += r(n),
                t += r(o >> 2),
                n = 3 & o,
                e = 3) : (t += r(n << 2 | o >> 4),
                t += r(15 & o),
                e = 0))
            }
            return 1 == e && (t += r(n << 2)),
            t
        }
        var w, S = function(t, b) {
            return S = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(t, b) {
                t.__proto__ = b
            }
            || function(t, b) {
                for (var p in b)
                    b.hasOwnProperty(p) && (t[p] = b[p])
            }
            ,
            S(t, b)
        };
        function x(t, b) {
            function e() {
                this.constructor = t
            }
            S(t, b),
            t.prototype = null === b ? Object.create(b) : (e.prototype = b.prototype,
            new e)
        }
        var _, E = {
            decode: function(a) {
                var i;
                if (void 0 === w) {
                    var t = "0123456789ABCDEF"
                      , e = " \f\n\r\t?\u2028\u2029";
                    for (w = {},
                    i = 0; i < 16; ++i)
                        w[t.charAt(i)] = i;
                    for (t = t.toLowerCase(),
                    i = 10; i < 16; ++i)
                        w[t.charAt(i)] = i;
                    for (i = 0; i < e.length; ++i)
                        w[e.charAt(i)] = -1
                }
                var r = []
                  , n = 0
                  , o = 0;
                for (i = 0; i < a.length; ++i) {
                    var c = a.charAt(i);
                    if ("=" == c)
                        break;
                    if (-1 != (c = w[c])) {
                        if (void 0 === c)
                            throw new Error("Illegal character at offset " + i);
                        n |= c,
                        ++o >= 2 ? (r[r.length] = n,
                        n = 0,
                        o = 0) : n <<= 4
                    }
                }
                if (o)
                    throw new Error("Hex encoding incomplete: 4 bits missing");
                return r
            }
        }, O = {
            decode: function(a) {
                var i;
                if (void 0 === _) {
                    var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
                      , e = "= \f\n\r\t?\u2028\u2029";
                    for (_ = Object.create(null),
                    i = 0; i < 64; ++i)
                        _[t.charAt(i)] = i;
                    for (i = 0; i < e.length; ++i)
                        _[e.charAt(i)] = -1
                }
                var r = []
                  , n = 0
                  , o = 0;
                for (i = 0; i < a.length; ++i) {
                    var c = a.charAt(i);
                    if ("=" == c)
                        break;
                    if (-1 != (c = _[c])) {
                        if (void 0 === c)
                            throw new Error("Illegal character at offset " + i);
                        n |= c,
                        ++o >= 4 ? (r[r.length] = n >> 16,
                        r[r.length] = n >> 8 & 255,
                        r[r.length] = 255 & n,
                        n = 0,
                        o = 0) : n <<= 6
                    }
                }
                switch (o) {
                case 1:
                    throw new Error("Base64 encoding incomplete: at least 2 bits missing");
                case 2:
                    r[r.length] = n >> 10;
                    break;
                case 3:
                    r[r.length] = n >> 16,
                    r[r.length] = n >> 8 & 255
                }
                return r
            },
            re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
            unarmor: function(a) {
                var t = O.re.exec(a);
                if (t)
                    if (t[1])
                        a = t[1];
                    else {
                        if (!t[2])
                            throw new Error("RegExp out of sync");
                        a = t[2]
                    }
                return O.decode(a)
            }
        }, A = 1e13, T = function() {
            function t(t) {
                this.buf = [+t || 0]
            }
            return t.prototype.mulAdd = function(t, e) {
                var i, r, b = this.buf, n = b.length;
                for (i = 0; i < n; ++i)
                    (r = b[i] * t + e) < A ? e = 0 : r -= (e = 0 | r / A) * A,
                    b[i] = r;
                e > 0 && (b[i] = e)
            }
            ,
            t.prototype.sub = function(t) {
                var i, e, b = this.buf, r = b.length;
                for (i = 0; i < r; ++i)
                    (e = b[i] - t) < 0 ? (e += A,
                    t = 1) : t = 0,
                    b[i] = e;
                for (; 0 === b[b.length - 1]; )
                    b.pop()
            }
            ,
            t.prototype.toString = function(base) {
                if (10 != (base || 10))
                    throw new Error("only base 10 is supported");
                for (var b = this.buf, s = b[b.length - 1].toString(), i = b.length - 2; i >= 0; --i)
                    s += (A + b[i]).toString().substring(1);
                return s
            }
            ,
            t.prototype.valueOf = function() {
                for (var b = this.buf, t = 0, i = b.length - 1; i >= 0; --i)
                    t = t * A + b[i];
                return t
            }
            ,
            t.prototype.simplify = function() {
                var b = this.buf;
                return 1 == b.length ? b[0] : this
            }
            ,
            t
        }(), j = "…", C = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/, k = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
        function R(t, e) {
            return t.length > e && (t = t.substring(0, e) + j),
            t
        }
        var P, I = function() {
            function t(e, r) {
                this.hexDigits = "0123456789ABCDEF",
                e instanceof t ? (this.enc = e.enc,
                this.pos = e.pos) : (this.enc = e,
                this.pos = r)
            }
            return t.prototype.get = function(t) {
                if (void 0 === t && (t = this.pos++),
                t >= this.enc.length)
                    throw new Error("Requesting byte offset " + t + " on a stream of length " + this.enc.length);
                return "string" == typeof this.enc ? this.enc.charCodeAt(t) : this.enc[t]
            }
            ,
            t.prototype.hexByte = function(b) {
                return this.hexDigits.charAt(b >> 4 & 15) + this.hexDigits.charAt(15 & b)
            }
            ,
            t.prototype.hexDump = function(t, e, r) {
                for (var s = "", i = t; i < e; ++i)
                    if (s += this.hexByte(this.get(i)),
                    !0 !== r)
                        switch (15 & i) {
                        case 7:
                            s += "  ";
                            break;
                        case 15:
                            s += "\n";
                            break;
                        default:
                            s += " "
                        }
                return s
            }
            ,
            t.prototype.isASCII = function(t, e) {
                for (var i = t; i < e; ++i) {
                    var r = this.get(i);
                    if (r < 32 || r > 176)
                        return !1
                }
                return !0
            }
            ,
            t.prototype.parseStringISO = function(t, e) {
                for (var s = "", i = t; i < e; ++i)
                    s += String.fromCharCode(this.get(i));
                return s
            }
            ,
            t.prototype.parseStringUTF = function(t, e) {
                for (var s = "", i = t; i < e; ) {
                    var r = this.get(i++);
                    s += r < 128 ? String.fromCharCode(r) : r > 191 && r < 224 ? String.fromCharCode((31 & r) << 6 | 63 & this.get(i++)) : String.fromCharCode((15 & r) << 12 | (63 & this.get(i++)) << 6 | 63 & this.get(i++))
                }
                return s
            }
            ,
            t.prototype.parseStringBMP = function(t, e) {
                for (var r, n, o = "", i = t; i < e; )
                    r = this.get(i++),
                    n = this.get(i++),
                    o += String.fromCharCode(r << 8 | n);
                return o
            }
            ,
            t.prototype.parseTime = function(t, e, r) {
                var s = this.parseStringISO(t, e)
                  , n = (r ? C : k).exec(s);
                return n ? (r && (n[1] = +n[1],
                n[1] += +n[1] < 70 ? 2e3 : 1900),
                s = n[1] + "-" + n[2] + "-" + n[3] + " " + n[4],
                n[5] && (s += ":" + n[5],
                n[6] && (s += ":" + n[6],
                n[7] && (s += "." + n[7]))),
                n[8] && (s += " UTC",
                "Z" != n[8] && (s += n[8],
                n[9] && (s += ":" + n[9]))),
                s) : "Unrecognized time: " + s
            }
            ,
            t.prototype.parseInteger = function(t, e) {
                for (var r, n = this.get(t), o = n > 127, c = o ? 255 : 0, s = ""; n == c && ++t < e; )
                    n = this.get(t);
                if (0 == (r = e - t))
                    return o ? -1 : 0;
                if (r > 4) {
                    for (s = n,
                    r <<= 3; 0 == (128 & (+s ^ c)); )
                        s = +s << 1,
                        --r;
                    s = "(" + r + " bit)\n"
                }
                o && (n -= 256);
                for (var f = new T(n), i = t + 1; i < e; ++i)
                    f.mulAdd(256, this.get(i));
                return s + f.toString()
            }
            ,
            t.prototype.parseBitString = function(t, e, r) {
                for (var n = this.get(t), o = "(" + ((e - t - 1 << 3) - n) + " bit)\n", s = "", i = t + 1; i < e; ++i) {
                    for (var b = this.get(i), c = i == e - 1 ? n : 0, f = 7; f >= c; --f)
                        s += b >> f & 1 ? "1" : "0";
                    if (s.length > r)
                        return o + R(s, r)
                }
                return o + s
            }
            ,
            t.prototype.parseOctetString = function(t, e, r) {
                if (this.isASCII(t, e))
                    return R(this.parseStringISO(t, e), r);
                var n = e - t
                  , s = "(" + n + " byte)\n";
                n > (r /= 2) && (e = t + r);
                for (var i = t; i < e; ++i)
                    s += this.hexByte(this.get(i));
                return n > r && (s += j),
                s
            }
            ,
            t.prototype.parseOID = function(t, e, r) {
                for (var s = "", n = new T, o = 0, i = t; i < e; ++i) {
                    var c = this.get(i);
                    if (n.mulAdd(128, 127 & c),
                    o += 7,
                    !(128 & c)) {
                        if ("" === s)
                            if ((n = n.simplify())instanceof T)
                                n.sub(80),
                                s = "2." + n.toString();
                            else {
                                var f = n < 80 ? n < 40 ? 0 : 1 : 2;
                                s = f + "." + (n - 40 * f)
                            }
                        else
                            s += "." + n.toString();
                        if (s.length > r)
                            return R(s, r);
                        n = new T,
                        o = 0
                    }
                }
                return o > 0 && (s += ".incomplete"),
                s
            }
            ,
            t
        }(), N = function() {
            function t(t, header, e, r, sub) {
                if (!(r instanceof D))
                    throw new Error("Invalid tag value.");
                this.stream = t,
                this.header = header,
                this.length = e,
                this.tag = r,
                this.sub = sub
            }
            return t.prototype.typeName = function() {
                switch (this.tag.tagClass) {
                case 0:
                    switch (this.tag.tagNumber) {
                    case 0:
                        return "EOC";
                    case 1:
                        return "BOOLEAN";
                    case 2:
                        return "INTEGER";
                    case 3:
                        return "BIT_STRING";
                    case 4:
                        return "OCTET_STRING";
                    case 5:
                        return "NULL";
                    case 6:
                        return "OBJECT_IDENTIFIER";
                    case 7:
                        return "ObjectDescriptor";
                    case 8:
                        return "EXTERNAL";
                    case 9:
                        return "REAL";
                    case 10:
                        return "ENUMERATED";
                    case 11:
                        return "EMBEDDED_PDV";
                    case 12:
                        return "UTF8String";
                    case 16:
                        return "SEQUENCE";
                    case 17:
                        return "SET";
                    case 18:
                        return "NumericString";
                    case 19:
                        return "PrintableString";
                    case 20:
                        return "TeletexString";
                    case 21:
                        return "VideotexString";
                    case 22:
                        return "IA5String";
                    case 23:
                        return "UTCTime";
                    case 24:
                        return "GeneralizedTime";
                    case 25:
                        return "GraphicString";
                    case 26:
                        return "VisibleString";
                    case 27:
                        return "GeneralString";
                    case 28:
                        return "UniversalString";
                    case 30:
                        return "BMPString"
                    }
                    return "Universal_" + this.tag.tagNumber.toString();
                case 1:
                    return "Application_" + this.tag.tagNumber.toString();
                case 2:
                    return "[" + this.tag.tagNumber.toString() + "]";
                case 3:
                    return "Private_" + this.tag.tagNumber.toString()
                }
            }
            ,
            t.prototype.content = function(t) {
                if (void 0 === this.tag)
                    return null;
                void 0 === t && (t = 1 / 0);
                var content = this.posContent()
                  , e = Math.abs(this.length);
                if (!this.tag.isUniversal())
                    return null !== this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(content, content + e, t);
                switch (this.tag.tagNumber) {
                case 1:
                    return 0 === this.stream.get(content) ? "false" : "true";
                case 2:
                    return this.stream.parseInteger(content, content + e);
                case 3:
                    return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(content, content + e, t);
                case 4:
                    return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(content, content + e, t);
                case 6:
                    return this.stream.parseOID(content, content + e, t);
                case 16:
                case 17:
                    return null !== this.sub ? "(" + this.sub.length + " elem)" : "(no elem)";
                case 12:
                    return R(this.stream.parseStringUTF(content, content + e), t);
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 26:
                    return R(this.stream.parseStringISO(content, content + e), t);
                case 30:
                    return R(this.stream.parseStringBMP(content, content + e), t);
                case 23:
                case 24:
                    return this.stream.parseTime(content, content + e, 23 == this.tag.tagNumber)
                }
                return null
            }
            ,
            t.prototype.toString = function() {
                return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]"
            }
            ,
            t.prototype.toPrettyString = function(t) {
                void 0 === t && (t = "");
                var s = t + this.typeName() + " @" + this.stream.pos;
                if (this.length >= 0 && (s += "+"),
                s += this.length,
                this.tag.tagConstructed ? s += " (constructed)" : !this.tag.isUniversal() || 3 != this.tag.tagNumber && 4 != this.tag.tagNumber || null === this.sub || (s += " (encapsulates)"),
                s += "\n",
                null !== this.sub) {
                    t += "  ";
                    for (var i = 0, e = this.sub.length; i < e; ++i)
                        s += this.sub[i].toPrettyString(t)
                }
                return s
            }
            ,
            t.prototype.posStart = function() {
                return this.stream.pos
            }
            ,
            t.prototype.posContent = function() {
                return this.stream.pos + this.header
            }
            ,
            t.prototype.posEnd = function() {
                return this.stream.pos + this.header + Math.abs(this.length)
            }
            ,
            t.prototype.toHexString = function() {
                return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
            }
            ,
            t.decodeLength = function(t) {
                var e = t.get()
                  , r = 127 & e;
                if (r == e)
                    return r;
                if (r > 6)
                    throw new Error("Length over 48 bits not supported at position " + (t.pos - 1));
                if (0 === r)
                    return null;
                e = 0;
                for (var i = 0; i < r; ++i)
                    e = 256 * e + t.get();
                return e
            }
            ,
            t.prototype.getHexStringValue = function() {
                var t = this.toHexString()
                  , e = 2 * this.header
                  , r = 2 * this.length;
                return t.substr(e, r)
            }
            ,
            t.decode = function(e) {
                var r;
                r = e instanceof I ? e : new I(e,0);
                var n = new I(r)
                  , o = new D(r)
                  , c = t.decodeLength(r)
                  , f = r.pos
                  , header = f - n.pos
                  , sub = null
                  , l = function() {
                    var e = [];
                    if (null !== c) {
                        for (var n = f + c; r.pos < n; )
                            e[e.length] = t.decode(r);
                        if (r.pos != n)
                            throw new Error("Content size is not correct for container starting at offset " + f)
                    } else
                        try {
                            for (; ; ) {
                                var s = t.decode(r);
                                if (s.tag.isEOC())
                                    break;
                                e[e.length] = s
                            }
                            c = f - r.pos
                        } catch (t) {
                            throw new Error("Exception while decoding undefined length content: " + t)
                        }
                    return e
                };
                if (o.tagConstructed)
                    sub = l();
                else if (o.isUniversal() && (3 == o.tagNumber || 4 == o.tagNumber))
                    try {
                        if (3 == o.tagNumber && 0 != r.get())
                            throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
                        sub = l();
                        for (var i = 0; i < sub.length; ++i)
                            if (sub[i].tag.isEOC())
                                throw new Error("EOC is not supposed to be actual content.")
                    } catch (t) {
                        sub = null
                    }
                if (null === sub) {
                    if (null === c)
                        throw new Error("We can't skip over an invalid tag with undefined length at offset " + f);
                    r.pos = f + Math.abs(c)
                }
                return new t(n,header,c,o,sub)
            }
            ,
            t
        }(), D = function() {
            function t(t) {
                var e = t.get();
                if (this.tagClass = e >> 6,
                this.tagConstructed = 0 != (32 & e),
                this.tagNumber = 31 & e,
                31 == this.tagNumber) {
                    var r = new T;
                    do {
                        e = t.get(),
                        r.mulAdd(128, 127 & e)
                    } while (128 & e);this.tagNumber = r.simplify()
                }
            }
            return t.prototype.isUniversal = function() {
                return 0 === this.tagClass
            }
            ,
            t.prototype.isEOC = function() {
                return 0 === this.tagClass && 0 === this.tagNumber
            }
            ,
            t
        }(), M = !0, $ = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997], L = (1 << 26) / $[$.length - 1], B = function() {
            function t(a, b, t) {
                null != a && ("number" == typeof a ? this.fromNumber(a, b, t) : null == b && "string" != typeof a ? this.fromString(a, 256) : this.fromString(a, b))
            }
            return t.prototype.toString = function(b) {
                if (this.s < 0)
                    return "-" + this.negate().toString(b);
                var t;
                if (16 == b)
                    t = 4;
                else if (8 == b)
                    t = 3;
                else if (2 == b)
                    t = 1;
                else if (32 == b)
                    t = 5;
                else {
                    if (4 != b)
                        return this.toRadix(b);
                    t = 2
                }
                var e, n = (1 << t) - 1, o = !1, c = "", i = this.t, p = this.DB - i * this.DB % t;
                if (i-- > 0)
                    for (p < this.DB && (e = this[i] >> p) > 0 && (o = !0,
                    c = r(e)); i >= 0; )
                        p < t ? (e = (this[i] & (1 << p) - 1) << t - p,
                        e |= this[--i] >> (p += this.DB - t)) : (e = this[i] >> (p -= t) & n,
                        p <= 0 && (p += this.DB,
                        --i)),
                        e > 0 && (o = !0),
                        o && (c += r(e));
                return o ? c : "0"
            }
            ,
            t.prototype.negate = function() {
                var e = z();
                return t.ZERO.subTo(this, e),
                e
            }
            ,
            t.prototype.abs = function() {
                return this.s < 0 ? this.negate() : this
            }
            ,
            t.prototype.compareTo = function(a) {
                var t = this.s - a.s;
                if (0 != t)
                    return t;
                var i = this.t;
                if (0 != (t = i - a.t))
                    return this.s < 0 ? -t : t;
                for (; --i >= 0; )
                    if (0 != (t = this[i] - a[i]))
                        return t;
                return 0
            }
            ,
            t.prototype.bitLength = function() {
                return this.t <= 0 ? 0 : this.DB * (this.t - 1) + nt(this[this.t - 1] ^ this.s & this.DM)
            }
            ,
            t.prototype.mod = function(a) {
                var e = z();
                return this.abs().divRemTo(a, null, e),
                this.s < 0 && e.compareTo(t.ZERO) > 0 && a.subTo(e, e),
                e
            }
            ,
            t.prototype.modPowInt = function(t, e) {
                var r;
                return r = t < 256 || e.isEven() ? new U(e) : new F(e),
                this.exp(t, r)
            }
            ,
            t.prototype.clone = function() {
                var t = z();
                return this.copyTo(t),
                t
            }
            ,
            t.prototype.intValue = function() {
                if (this.s < 0) {
                    if (1 == this.t)
                        return this[0] - this.DV;
                    if (0 == this.t)
                        return -1
                } else {
                    if (1 == this.t)
                        return this[0];
                    if (0 == this.t)
                        return 0
                }
                return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
            }
            ,
            t.prototype.byteValue = function() {
                return 0 == this.t ? this.s : this[0] << 24 >> 24
            }
            ,
            t.prototype.shortValue = function() {
                return 0 == this.t ? this.s : this[0] << 16 >> 16
            }
            ,
            t.prototype.signum = function() {
                return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
            }
            ,
            t.prototype.toByteArray = function() {
                var i = this.t
                  , t = [];
                t[0] = this.s;
                var e, p = this.DB - i * this.DB % 8, r = 0;
                if (i-- > 0)
                    for (p < this.DB && (e = this[i] >> p) != (this.s & this.DM) >> p && (t[r++] = e | this.s << this.DB - p); i >= 0; )
                        p < 8 ? (e = (this[i] & (1 << p) - 1) << 8 - p,
                        e |= this[--i] >> (p += this.DB - 8)) : (e = this[i] >> (p -= 8) & 255,
                        p <= 0 && (p += this.DB,
                        --i)),
                        0 != (128 & e) && (e |= -256),
                        0 == r && (128 & this.s) != (128 & e) && ++r,
                        (r > 0 || e != this.s) && (t[r++] = e);
                return t
            }
            ,
            t.prototype.equals = function(a) {
                return 0 == this.compareTo(a)
            }
            ,
            t.prototype.min = function(a) {
                return this.compareTo(a) < 0 ? this : a
            }
            ,
            t.prototype.max = function(a) {
                return this.compareTo(a) > 0 ? this : a
            }
            ,
            t.prototype.and = function(a) {
                var t = z();
                return this.bitwiseTo(a, n, t),
                t
            }
            ,
            t.prototype.or = function(a) {
                var t = z();
                return this.bitwiseTo(a, o, t),
                t
            }
            ,
            t.prototype.xor = function(a) {
                var t = z();
                return this.bitwiseTo(a, c, t),
                t
            }
            ,
            t.prototype.andNot = function(a) {
                var t = z();
                return this.bitwiseTo(a, f, t),
                t
            }
            ,
            t.prototype.not = function() {
                for (var t = z(), i = 0; i < this.t; ++i)
                    t[i] = this.DM & ~this[i];
                return t.t = this.t,
                t.s = ~this.s,
                t
            }
            ,
            t.prototype.shiftLeft = function(t) {
                var e = z();
                return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e),
                e
            }
            ,
            t.prototype.shiftRight = function(t) {
                var e = z();
                return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e),
                e
            }
            ,
            t.prototype.getLowestSetBit = function() {
                for (var i = 0; i < this.t; ++i)
                    if (0 != this[i])
                        return i * this.DB + l(this[i]);
                return this.s < 0 ? this.t * this.DB : -1
            }
            ,
            t.prototype.bitCount = function() {
                for (var t = 0, e = this.s & this.DM, i = 0; i < this.t; ++i)
                    t += h(this[i] ^ e);
                return t
            }
            ,
            t.prototype.testBit = function(t) {
                var e = Math.floor(t / this.DB);
                return e >= this.t ? 0 != this.s : 0 != (this[e] & 1 << t % this.DB)
            }
            ,
            t.prototype.setBit = function(t) {
                return this.changeBit(t, o)
            }
            ,
            t.prototype.clearBit = function(t) {
                return this.changeBit(t, f)
            }
            ,
            t.prototype.flipBit = function(t) {
                return this.changeBit(t, c)
            }
            ,
            t.prototype.add = function(a) {
                var t = z();
                return this.addTo(a, t),
                t
            }
            ,
            t.prototype.subtract = function(a) {
                var t = z();
                return this.subTo(a, t),
                t
            }
            ,
            t.prototype.multiply = function(a) {
                var t = z();
                return this.multiplyTo(a, t),
                t
            }
            ,
            t.prototype.divide = function(a) {
                var t = z();
                return this.divRemTo(a, t, null),
                t
            }
            ,
            t.prototype.remainder = function(a) {
                var t = z();
                return this.divRemTo(a, null, t),
                t
            }
            ,
            t.prototype.divideAndRemainder = function(a) {
                var q = z()
                  , t = z();
                return this.divRemTo(a, q, t),
                [q, t]
            }
            ,
            t.prototype.modPow = function(t, e) {
                var r, n, i = t.bitLength(), o = et(1);
                if (i <= 0)
                    return o;
                r = i < 18 ? 1 : i < 48 ? 3 : i < 144 ? 4 : i < 768 ? 5 : 6,
                n = i < 8 ? new U(e) : e.isEven() ? new V(e) : new F(e);
                var g = []
                  , c = 3
                  , f = r - 1
                  , l = (1 << r) - 1;
                if (g[1] = n.convert(this),
                r > 1) {
                    var h = z();
                    for (n.sqrTo(g[1], h); c <= l; )
                        g[c] = z(),
                        n.mulTo(h, g[c - 2], g[c]),
                        c += 2
                }
                var d, v, y = t.t - 1, m = !0, w = z();
                for (i = nt(t[y]) - 1; y >= 0; ) {
                    for (i >= f ? d = t[y] >> i - f & l : (d = (t[y] & (1 << i + 1) - 1) << f - i,
                    y > 0 && (d |= t[y - 1] >> this.DB + i - f)),
                    c = r; 0 == (1 & d); )
                        d >>= 1,
                        --c;
                    if ((i -= c) < 0 && (i += this.DB,
                    --y),
                    m)
                        g[d].copyTo(o),
                        m = !1;
                    else {
                        for (; c > 1; )
                            n.sqrTo(o, w),
                            n.sqrTo(w, o),
                            c -= 2;
                        c > 0 ? n.sqrTo(o, w) : (v = o,
                        o = w,
                        w = v),
                        n.mulTo(w, g[d], o)
                    }
                    for (; y >= 0 && 0 == (t[y] & 1 << i); )
                        n.sqrTo(o, w),
                        v = o,
                        o = w,
                        w = v,
                        --i < 0 && (i = this.DB - 1,
                        --y)
                }
                return n.revert(o)
            }
            ,
            t.prototype.modInverse = function(e) {
                var r = e.isEven();
                if (this.isEven() && r || 0 == e.signum())
                    return t.ZERO;
                for (var u = e.clone(), n = this.clone(), a = et(1), b = et(0), o = et(0), c = et(1); 0 != u.signum(); ) {
                    for (; u.isEven(); )
                        u.rShiftTo(1, u),
                        r ? (a.isEven() && b.isEven() || (a.addTo(this, a),
                        b.subTo(e, b)),
                        a.rShiftTo(1, a)) : b.isEven() || b.subTo(e, b),
                        b.rShiftTo(1, b);
                    for (; n.isEven(); )
                        n.rShiftTo(1, n),
                        r ? (o.isEven() && c.isEven() || (o.addTo(this, o),
                        c.subTo(e, c)),
                        o.rShiftTo(1, o)) : c.isEven() || c.subTo(e, c),
                        c.rShiftTo(1, c);
                    u.compareTo(n) >= 0 ? (u.subTo(n, u),
                    r && a.subTo(o, a),
                    b.subTo(c, b)) : (n.subTo(u, n),
                    r && o.subTo(a, o),
                    c.subTo(b, c))
                }
                return 0 != n.compareTo(t.ONE) ? t.ZERO : c.compareTo(e) >= 0 ? c.subtract(e) : c.signum() < 0 ? (c.addTo(e, c),
                c.signum() < 0 ? c.add(e) : c) : c
            }
            ,
            t.prototype.pow = function(t) {
                return this.exp(t, new H)
            }
            ,
            t.prototype.gcd = function(a) {
                var t = this.s < 0 ? this.negate() : this.clone()
                  , e = a.s < 0 ? a.negate() : a.clone();
                if (t.compareTo(e) < 0) {
                    var r = t;
                    t = e,
                    e = r
                }
                var i = t.getLowestSetBit()
                  , g = e.getLowestSetBit();
                if (g < 0)
                    return t;
                for (i < g && (g = i),
                g > 0 && (t.rShiftTo(g, t),
                e.rShiftTo(g, e)); t.signum() > 0; )
                    (i = t.getLowestSetBit()) > 0 && t.rShiftTo(i, t),
                    (i = e.getLowestSetBit()) > 0 && e.rShiftTo(i, e),
                    t.compareTo(e) >= 0 ? (t.subTo(e, t),
                    t.rShiftTo(1, t)) : (e.subTo(t, e),
                    e.rShiftTo(1, e));
                return g > 0 && e.lShiftTo(g, e),
                e
            }
            ,
            t.prototype.isProbablePrime = function(t) {
                var i, e = this.abs();
                if (1 == e.t && e[0] <= $[$.length - 1]) {
                    for (i = 0; i < $.length; ++i)
                        if (e[0] == $[i])
                            return !0;
                    return !1
                }
                if (e.isEven())
                    return !1;
                for (i = 1; i < $.length; ) {
                    for (var r = $[i], n = i + 1; n < $.length && r < L; )
                        r *= $[n++];
                    for (r = e.modInt(r); i < n; )
                        if (r % $[i++] == 0)
                            return !1
                }
                return e.millerRabin(t)
            }
            ,
            t.prototype.copyTo = function(t) {
                for (var i = this.t - 1; i >= 0; --i)
                    t[i] = this[i];
                t.t = this.t,
                t.s = this.s
            }
            ,
            t.prototype.fromInt = function(t) {
                this.t = 1,
                this.s = t < 0 ? -1 : 0,
                t > 0 ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0
            }
            ,
            t.prototype.fromString = function(s, b) {
                var e;
                if (16 == b)
                    e = 4;
                else if (8 == b)
                    e = 3;
                else if (256 == b)
                    e = 8;
                else if (2 == b)
                    e = 1;
                else if (32 == b)
                    e = 5;
                else {
                    if (4 != b)
                        return void this.fromRadix(s, b);
                    e = 2
                }
                this.t = 0,
                this.s = 0;
                for (var i = s.length, r = !1, n = 0; --i >= 0; ) {
                    var o = 8 == e ? 255 & +s[i] : tt(s, i);
                    o < 0 ? "-" == s.charAt(i) && (r = !0) : (r = !1,
                    0 == n ? this[this.t++] = o : n + e > this.DB ? (this[this.t - 1] |= (o & (1 << this.DB - n) - 1) << n,
                    this[this.t++] = o >> this.DB - n) : this[this.t - 1] |= o << n,
                    (n += e) >= this.DB && (n -= this.DB))
                }
                8 == e && 0 != (128 & +s[0]) && (this.s = -1,
                n > 0 && (this[this.t - 1] |= (1 << this.DB - n) - 1 << n)),
                this.clamp(),
                r && t.ZERO.subTo(this, this)
            }
            ,
            t.prototype.clamp = function() {
                for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t; )
                    --this.t
            }
            ,
            t.prototype.dlShiftTo = function(t, e) {
                var i;
                for (i = this.t - 1; i >= 0; --i)
                    e[i + t] = this[i];
                for (i = t - 1; i >= 0; --i)
                    e[i] = 0;
                e.t = this.t + t,
                e.s = this.s
            }
            ,
            t.prototype.drShiftTo = function(t, e) {
                for (var i = t; i < this.t; ++i)
                    e[i - t] = this[i];
                e.t = Math.max(this.t - t, 0),
                e.s = this.s
            }
            ,
            t.prototype.lShiftTo = function(t, e) {
                for (var r = t % this.DB, n = this.DB - r, o = (1 << n) - 1, c = Math.floor(t / this.DB), f = this.s << r & this.DM, i = this.t - 1; i >= 0; --i)
                    e[i + c + 1] = this[i] >> n | f,
                    f = (this[i] & o) << r;
                for (i = c - 1; i >= 0; --i)
                    e[i] = 0;
                e[c] = f,
                e.t = this.t + c + 1,
                e.s = this.s,
                e.clamp()
            }
            ,
            t.prototype.rShiftTo = function(t, e) {
                e.s = this.s;
                var r = Math.floor(t / this.DB);
                if (r >= this.t)
                    e.t = 0;
                else {
                    var n = t % this.DB
                      , o = this.DB - n
                      , c = (1 << n) - 1;
                    e[0] = this[r] >> n;
                    for (var i = r + 1; i < this.t; ++i)
                        e[i - r - 1] |= (this[i] & c) << o,
                        e[i - r] = this[i] >> n;
                    n > 0 && (e[this.t - r - 1] |= (this.s & c) << o),
                    e.t = this.t - r,
                    e.clamp()
                }
            }
            ,
            t.prototype.subTo = function(a, t) {
                for (var i = 0, e = 0, r = Math.min(a.t, this.t); i < r; )
                    e += this[i] - a[i],
                    t[i++] = e & this.DM,
                    e >>= this.DB;
                if (a.t < this.t) {
                    for (e -= a.s; i < this.t; )
                        e += this[i],
                        t[i++] = e & this.DM,
                        e >>= this.DB;
                    e += this.s
                } else {
                    for (e += this.s; i < a.t; )
                        e -= a[i],
                        t[i++] = e & this.DM,
                        e >>= this.DB;
                    e -= a.s
                }
                t.s = e < 0 ? -1 : 0,
                e < -1 ? t[i++] = this.DV + e : e > 0 && (t[i++] = e),
                t.t = i,
                t.clamp()
            }
            ,
            t.prototype.multiplyTo = function(a, e) {
                var r = this.abs()
                  , n = a.abs()
                  , i = r.t;
                for (e.t = i + n.t; --i >= 0; )
                    e[i] = 0;
                for (i = 0; i < n.t; ++i)
                    e[i + r.t] = r.am(0, n[i], e, i, 0, r.t);
                e.s = 0,
                e.clamp(),
                this.s != a.s && t.ZERO.subTo(e, e)
            }
            ,
            t.prototype.squareTo = function(t) {
                for (var e = this.abs(), i = t.t = 2 * e.t; --i >= 0; )
                    t[i] = 0;
                for (i = 0; i < e.t - 1; ++i) {
                    var r = e.am(i, e[i], t, 2 * i, 0, 1);
                    (t[i + e.t] += e.am(i + 1, 2 * e[i], t, 2 * i + 1, r, e.t - i - 1)) >= e.DV && (t[i + e.t] -= e.DV,
                    t[i + e.t + 1] = 1)
                }
                t.t > 0 && (t[t.t - 1] += e.am(i, e[i], t, 2 * i, 0, 1)),
                t.s = 0,
                t.clamp()
            }
            ,
            t.prototype.divRemTo = function(e, q, r) {
                var n = e.abs();
                if (!(n.t <= 0)) {
                    var o = this.abs();
                    if (o.t < n.t)
                        return null != q && q.fromInt(0),
                        void (null != r && this.copyTo(r));
                    null == r && (r = z());
                    var c = z()
                      , f = this.s
                      , l = e.s
                      , h = this.DB - nt(n[n.t - 1]);
                    h > 0 ? (n.lShiftTo(h, c),
                    o.lShiftTo(h, r)) : (n.copyTo(c),
                    o.copyTo(r));
                    var d = c.t
                      , v = c[d - 1];
                    if (0 != v) {
                        var y = v * (1 << this.F1) + (d > 1 ? c[d - 2] >> this.F2 : 0)
                          , m = this.FV / y
                          , w = (1 << this.F1) / y
                          , S = 1 << this.F2
                          , i = r.t
                          , x = i - d
                          , _ = null == q ? z() : q;
                        for (c.dlShiftTo(x, _),
                        r.compareTo(_) >= 0 && (r[r.t++] = 1,
                        r.subTo(_, r)),
                        t.ONE.dlShiftTo(d, _),
                        _.subTo(c, c); c.t < d; )
                            c[c.t++] = 0;
                        for (; --x >= 0; ) {
                            var E = r[--i] == v ? this.DM : Math.floor(r[i] * m + (r[i - 1] + S) * w);
                            if ((r[i] += c.am(0, E, r, x, 0, d)) < E)
                                for (c.dlShiftTo(x, _),
                                r.subTo(_, r); r[i] < --E; )
                                    r.subTo(_, r)
                        }
                        null != q && (r.drShiftTo(d, q),
                        f != l && t.ZERO.subTo(q, q)),
                        r.t = d,
                        r.clamp(),
                        h > 0 && r.rShiftTo(h, r),
                        f < 0 && t.ZERO.subTo(r, r)
                    }
                }
            }
            ,
            t.prototype.invDigit = function() {
                if (this.t < 1)
                    return 0;
                var t = this[0];
                if (0 == (1 & t))
                    return 0;
                var e = 3 & t;
                return (e = (e = (e = (e = e * (2 - (15 & t) * e) & 15) * (2 - (255 & t) * e) & 255) * (2 - ((65535 & t) * e & 65535)) & 65535) * (2 - t * e % this.DV) % this.DV) > 0 ? this.DV - e : -e
            }
            ,
            t.prototype.isEven = function() {
                return 0 == (this.t > 0 ? 1 & this[0] : this.s)
            }
            ,
            t.prototype.exp = function(e, r) {
                if (e > 4294967295 || e < 1)
                    return t.ONE;
                var n = z()
                  , o = z()
                  , g = r.convert(this)
                  , i = nt(e) - 1;
                for (g.copyTo(n); --i >= 0; )
                    if (r.sqrTo(n, o),
                    (e & 1 << i) > 0)
                        r.mulTo(o, g, n);
                    else {
                        var c = n;
                        n = o,
                        o = c
                    }
                return r.revert(n)
            }
            ,
            t.prototype.chunkSize = function(t) {
                return Math.floor(Math.LN2 * this.DB / Math.log(t))
            }
            ,
            t.prototype.toRadix = function(b) {
                if (null == b && (b = 10),
                0 == this.signum() || b < 2 || b > 36)
                    return "0";
                var t = this.chunkSize(b)
                  , a = Math.pow(b, t)
                  , e = et(a)
                  , r = z()
                  , n = z()
                  , o = "";
                for (this.divRemTo(e, r, n); r.signum() > 0; )
                    o = (a + n.intValue()).toString(b).substr(1) + o,
                    r.divRemTo(e, r, n);
                return n.intValue().toString(b) + o
            }
            ,
            t.prototype.fromRadix = function(s, b) {
                this.fromInt(0),
                null == b && (b = 10);
                for (var e = this.chunkSize(b), r = Math.pow(b, e), n = !1, o = 0, c = 0, i = 0; i < s.length; ++i) {
                    var f = tt(s, i);
                    f < 0 ? "-" == s.charAt(i) && 0 == this.signum() && (n = !0) : (c = b * c + f,
                    ++o >= e && (this.dMultiply(r),
                    this.dAddOffset(c, 0),
                    o = 0,
                    c = 0))
                }
                o > 0 && (this.dMultiply(Math.pow(b, o)),
                this.dAddOffset(c, 0)),
                n && t.ZERO.subTo(this, this)
            }
            ,
            t.prototype.fromNumber = function(a, b, e) {
                if ("number" == typeof b)
                    if (a < 2)
                        this.fromInt(1);
                    else
                        for (this.fromNumber(a, e),
                        this.testBit(a - 1) || this.bitwiseTo(t.ONE.shiftLeft(a - 1), o, this),
                        this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(b); )
                            this.dAddOffset(2, 0),
                            this.bitLength() > a && this.subTo(t.ONE.shiftLeft(a - 1), this);
                else {
                    var r = []
                      , n = 7 & a;
                    r.length = 1 + (a >> 3),
                    b.nextBytes(r),
                    n > 0 ? r[0] &= (1 << n) - 1 : r[0] = 0,
                    this.fromString(r, 256)
                }
            }
            ,
            t.prototype.bitwiseTo = function(a, t, e) {
                var i, r, n = Math.min(a.t, this.t);
                for (i = 0; i < n; ++i)
                    e[i] = t(this[i], a[i]);
                if (a.t < this.t) {
                    for (r = a.s & this.DM,
                    i = n; i < this.t; ++i)
                        e[i] = t(this[i], r);
                    e.t = this.t
                } else {
                    for (r = this.s & this.DM,
                    i = n; i < a.t; ++i)
                        e[i] = t(r, a[i]);
                    e.t = a.t
                }
                e.s = t(this.s, a.s),
                e.clamp()
            }
            ,
            t.prototype.changeBit = function(e, r) {
                var n = t.ONE.shiftLeft(e);
                return this.bitwiseTo(n, r, n),
                n
            }
            ,
            t.prototype.addTo = function(a, t) {
                for (var i = 0, e = 0, r = Math.min(a.t, this.t); i < r; )
                    e += this[i] + a[i],
                    t[i++] = e & this.DM,
                    e >>= this.DB;
                if (a.t < this.t) {
                    for (e += a.s; i < this.t; )
                        e += this[i],
                        t[i++] = e & this.DM,
                        e >>= this.DB;
                    e += this.s
                } else {
                    for (e += this.s; i < a.t; )
                        e += a[i],
                        t[i++] = e & this.DM,
                        e >>= this.DB;
                    e += a.s
                }
                t.s = e < 0 ? -1 : 0,
                e > 0 ? t[i++] = e : e < -1 && (t[i++] = this.DV + e),
                t.t = i,
                t.clamp()
            }
            ,
            t.prototype.dMultiply = function(t) {
                this[this.t] = this.am(0, t - 1, this, 0, 0, this.t),
                ++this.t,
                this.clamp()
            }
            ,
            t.prototype.dAddOffset = function(t, e) {
                if (0 != t) {
                    for (; this.t <= e; )
                        this[this.t++] = 0;
                    for (this[e] += t; this[e] >= this.DV; )
                        this[e] -= this.DV,
                        ++e >= this.t && (this[this.t++] = 0),
                        ++this[e]
                }
            }
            ,
            t.prototype.multiplyLowerTo = function(a, t, e) {
                var i = Math.min(this.t + a.t, t);
                for (e.s = 0,
                e.t = i; i > 0; )
                    e[--i] = 0;
                for (var r = e.t - this.t; i < r; ++i)
                    e[i + this.t] = this.am(0, a[i], e, i, 0, this.t);
                for (r = Math.min(a.t, t); i < r; ++i)
                    this.am(0, a[i], e, i, 0, t - i);
                e.clamp()
            }
            ,
            t.prototype.multiplyUpperTo = function(a, t, e) {
                --t;
                var i = e.t = this.t + a.t - t;
                for (e.s = 0; --i >= 0; )
                    e[i] = 0;
                for (i = Math.max(t - this.t, 0); i < a.t; ++i)
                    e[this.t + i - t] = this.am(t - i, a[i], e, 0, 0, this.t + i - t);
                e.clamp(),
                e.drShiftTo(1, e)
            }
            ,
            t.prototype.modInt = function(t) {
                if (t <= 0)
                    return 0;
                var e = this.DV % t
                  , r = this.s < 0 ? t - 1 : 0;
                if (this.t > 0)
                    if (0 == e)
                        r = this[0] % t;
                    else
                        for (var i = this.t - 1; i >= 0; --i)
                            r = (e * r + this[i]) % t;
                return r
            }
            ,
            t.prototype.millerRabin = function(e) {
                var r = this.subtract(t.ONE)
                  , n = r.getLowestSetBit();
                if (n <= 0)
                    return !1;
                var o = r.shiftRight(n);
                (e = e + 1 >> 1) > $.length && (e = $.length);
                for (var a = z(), i = 0; i < e; ++i) {
                    a.fromInt($[Math.floor(Math.random() * $.length)]);
                    var c = a.modPow(o, this);
                    if (0 != c.compareTo(t.ONE) && 0 != c.compareTo(r)) {
                        for (var f = 1; f++ < n && 0 != c.compareTo(r); )
                            if (0 == (c = c.modPowInt(2, this)).compareTo(t.ONE))
                                return !1;
                        if (0 != c.compareTo(r))
                            return !1
                    }
                }
                return !0
            }
            ,
            t.prototype.square = function() {
                var t = z();
                return this.squareTo(t),
                t
            }
            ,
            t.prototype.gcda = function(a, t) {
                var e = this.s < 0 ? this.negate() : this.clone()
                  , r = a.s < 0 ? a.negate() : a.clone();
                if (e.compareTo(r) < 0) {
                    var n = e;
                    e = r,
                    r = n
                }
                var i = e.getLowestSetBit()
                  , g = r.getLowestSetBit();
                if (g < 0)
                    t(e);
                else {
                    i < g && (g = i),
                    g > 0 && (e.rShiftTo(g, e),
                    r.rShiftTo(g, r));
                    var o = function() {
                        (i = e.getLowestSetBit()) > 0 && e.rShiftTo(i, e),
                        (i = r.getLowestSetBit()) > 0 && r.rShiftTo(i, r),
                        e.compareTo(r) >= 0 ? (e.subTo(r, e),
                        e.rShiftTo(1, e)) : (r.subTo(e, r),
                        r.rShiftTo(1, r)),
                        e.signum() > 0 ? setTimeout(o, 0) : (g > 0 && r.lShiftTo(g, r),
                        setTimeout((function() {
                            t(r)
                        }
                        ), 0))
                    };
                    setTimeout(o, 10)
                }
            }
            ,
            t.prototype.fromNumberAsync = function(a, b, e, r) {
                if ("number" == typeof b)
                    if (a < 2)
                        this.fromInt(1);
                    else {
                        this.fromNumber(a, e),
                        this.testBit(a - 1) || this.bitwiseTo(t.ONE.shiftLeft(a - 1), o, this),
                        this.isEven() && this.dAddOffset(1, 0);
                        var n = this
                          , c = function() {
                            n.dAddOffset(2, 0),
                            n.bitLength() > a && n.subTo(t.ONE.shiftLeft(a - 1), n),
                            n.isProbablePrime(b) ? setTimeout((function() {
                                r()
                            }
                            ), 0) : setTimeout(c, 0)
                        };
                        setTimeout(c, 0)
                    }
                else {
                    var f = []
                      , l = 7 & a;
                    f.length = 1 + (a >> 3),
                    b.nextBytes(f),
                    l > 0 ? f[0] &= (1 << l) - 1 : f[0] = 0,
                    this.fromString(f, 256)
                }
            }
            ,
            t
        }(), H = function() {
            function t() {}
            return t.prototype.convert = function(t) {
                return t
            }
            ,
            t.prototype.revert = function(t) {
                return t
            }
            ,
            t.prototype.mulTo = function(t, e, r) {
                t.multiplyTo(e, r)
            }
            ,
            t.prototype.sqrTo = function(t, e) {
                t.squareTo(e)
            }
            ,
            t
        }(), U = function() {
            function t(t) {
                this.m = t
            }
            return t.prototype.convert = function(t) {
                return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
            }
            ,
            t.prototype.revert = function(t) {
                return t
            }
            ,
            t.prototype.reduce = function(t) {
                t.divRemTo(this.m, null, t)
            }
            ,
            t.prototype.mulTo = function(t, e, r) {
                t.multiplyTo(e, r),
                this.reduce(r)
            }
            ,
            t.prototype.sqrTo = function(t, e) {
                t.squareTo(e),
                this.reduce(e)
            }
            ,
            t
        }(), F = function() {
            function t(t) {
                this.m = t,
                this.mp = t.invDigit(),
                this.mpl = 32767 & this.mp,
                this.mph = this.mp >> 15,
                this.um = (1 << t.DB - 15) - 1,
                this.mt2 = 2 * t.t
            }
            return t.prototype.convert = function(t) {
                var e = z();
                return t.abs().dlShiftTo(this.m.t, e),
                e.divRemTo(this.m, null, e),
                t.s < 0 && e.compareTo(B.ZERO) > 0 && this.m.subTo(e, e),
                e
            }
            ,
            t.prototype.revert = function(t) {
                var e = z();
                return t.copyTo(e),
                this.reduce(e),
                e
            }
            ,
            t.prototype.reduce = function(t) {
                for (; t.t <= this.mt2; )
                    t[t.t++] = 0;
                for (var i = 0; i < this.m.t; ++i) {
                    var e = 32767 & t[i]
                      , r = e * this.mpl + ((e * this.mph + (t[i] >> 15) * this.mpl & this.um) << 15) & t.DM;
                    for (t[e = i + this.m.t] += this.m.am(0, r, t, i, 0, this.m.t); t[e] >= t.DV; )
                        t[e] -= t.DV,
                        t[++e]++
                }
                t.clamp(),
                t.drShiftTo(this.m.t, t),
                t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
            }
            ,
            t.prototype.mulTo = function(t, e, r) {
                t.multiplyTo(e, r),
                this.reduce(r)
            }
            ,
            t.prototype.sqrTo = function(t, e) {
                t.squareTo(e),
                this.reduce(e)
            }
            ,
            t
        }(), V = function() {
            function t(t) {
                this.m = t,
                this.r2 = z(),
                this.q3 = z(),
                B.ONE.dlShiftTo(2 * t.t, this.r2),
                this.mu = this.r2.divide(t)
            }
            return t.prototype.convert = function(t) {
                if (t.s < 0 || t.t > 2 * this.m.t)
                    return t.mod(this.m);
                if (t.compareTo(this.m) < 0)
                    return t;
                var e = z();
                return t.copyTo(e),
                this.reduce(e),
                e
            }
            ,
            t.prototype.revert = function(t) {
                return t
            }
            ,
            t.prototype.reduce = function(t) {
                for (t.drShiftTo(this.m.t - 1, this.r2),
                t.t > this.m.t + 1 && (t.t = this.m.t + 1,
                t.clamp()),
                this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
                this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0; )
                    t.dAddOffset(1, this.m.t + 1);
                for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0; )
                    t.subTo(this.m, t)
            }
            ,
            t.prototype.mulTo = function(t, e, r) {
                t.multiplyTo(e, r),
                this.reduce(r)
            }
            ,
            t.prototype.sqrTo = function(t, e) {
                t.squareTo(e),
                this.reduce(e)
            }
            ,
            t
        }();
        function z() {
            return new B(null)
        }
        function K(t, e) {
            return new B(t,e)
        }
        function G(i, t, e, r, n, o) {
            for (; --o >= 0; ) {
                var c = t * this[i++] + e[r] + n;
                n = Math.floor(c / 67108864),
                e[r++] = 67108863 & c
            }
            return n
        }
        function W(i, t, e, r, n, o) {
            for (var c = 32767 & t, f = t >> 15; --o >= 0; ) {
                var l = 32767 & this[i]
                  , h = this[i++] >> 15
                  , d = f * l + h * c;
                n = ((l = c * l + ((32767 & d) << 15) + e[r] + (1073741823 & n)) >>> 30) + (d >>> 15) + f * h + (n >>> 30),
                e[r++] = 1073741823 & l
            }
            return n
        }
        function X(i, t, e, r, n, o) {
            for (var c = 16383 & t, f = t >> 14; --o >= 0; ) {
                var l = 16383 & this[i]
                  , h = this[i++] >> 14
                  , d = f * l + h * c;
                n = ((l = c * l + ((16383 & d) << 14) + e[r] + n) >> 28) + (d >> 14) + f * h,
                e[r++] = 268435455 & l
            }
            return n
        }
        M && "Microsoft Internet Explorer" == navigator.appName ? (B.prototype.am = W,
        P = 30) : M && "Netscape" != navigator.appName ? (B.prototype.am = G,
        P = 26) : (B.prototype.am = X,
        P = 28),
        B.prototype.DB = P,
        B.prototype.DM = (1 << P) - 1,
        B.prototype.DV = 1 << P;
        var J = 52;
        B.prototype.FV = Math.pow(2, J),
        B.prototype.F1 = J - P,
        B.prototype.F2 = 2 * P - J;
        var Y, Z, Q = [];
        for (Y = "0".charCodeAt(0),
        Z = 0; Z <= 9; ++Z)
            Q[Y++] = Z;
        for (Y = "a".charCodeAt(0),
        Z = 10; Z < 36; ++Z)
            Q[Y++] = Z;
        for (Y = "A".charCodeAt(0),
        Z = 10; Z < 36; ++Z)
            Q[Y++] = Z;
        function tt(s, i) {
            var t = Q[s.charCodeAt(i)];
            return null == t ? -1 : t
        }
        function et(i) {
            var t = z();
            return t.fromInt(i),
            t
        }
        function nt(t) {
            var e, r = 1;
            return 0 != (e = t >>> 16) && (t = e,
            r += 16),
            0 != (e = t >> 8) && (t = e,
            r += 8),
            0 != (e = t >> 4) && (t = e,
            r += 4),
            0 != (e = t >> 2) && (t = e,
            r += 2),
            0 != (e = t >> 1) && (t = e,
            r += 1),
            r
        }
        B.ZERO = et(0),
        B.ONE = et(1);
        var ot = function() {
            function t() {
                this.i = 0,
                this.j = 0,
                this.S = []
            }
            return t.prototype.init = function(t) {
                var i, e, r;
                for (i = 0; i < 256; ++i)
                    this.S[i] = i;
                for (e = 0,
                i = 0; i < 256; ++i)
                    e = e + this.S[i] + t[i % t.length] & 255,
                    r = this.S[i],
                    this.S[i] = this.S[e],
                    this.S[e] = r;
                this.i = 0,
                this.j = 0
            }
            ,
            t.prototype.next = function() {
                var t;
                return this.i = this.i + 1 & 255,
                this.j = this.j + this.S[this.i] & 255,
                t = this.S[this.i],
                this.S[this.i] = this.S[this.j],
                this.S[this.j] = t,
                this.S[t + this.S[this.i] & 255]
            }
            ,
            t
        }();
        function it() {
            return new ot
        }
        var at, st, ut = 256, ct = null;
        if (null == ct) {
            ct = [],
            st = 0;
            var ft = void 0;
            if (window.crypto && window.crypto.getRandomValues) {
                var lt = new Uint32Array(256);
                for (window.crypto.getRandomValues(lt),
                ft = 0; ft < lt.length; ++ft)
                    ct[st++] = 255 & lt[ft]
            }
            var pt = function(t) {
                if (this.count = this.count || 0,
                this.count >= 256 || st >= ut)
                    window.removeEventListener ? window.removeEventListener("mousemove", pt, !1) : window.detachEvent && window.detachEvent("onmousemove", pt);
                else
                    try {
                        var e = t.x + t.y;
                        ct[st++] = 255 & e,
                        this.count += 1
                    } catch (t) {}
            };
            window.addEventListener ? window.addEventListener("mousemove", pt, !1) : window.attachEvent && window.attachEvent("onmousemove", pt)
        }
        function ht() {
            if (null == at) {
                for (at = it(); st < ut; ) {
                    var t = Math.floor(65536 * Math.random());
                    ct[st++] = 255 & t
                }
                for (at.init(ct),
                st = 0; st < ct.length; ++st)
                    ct[st] = 0;
                st = 0
            }
            return at.next()
        }
        var vt = function() {
            function t() {}
            return t.prototype.nextBytes = function(t) {
                for (var i = 0; i < t.length; ++i)
                    t[i] = ht()
            }
            ,
            t
        }();
        function yt(s, t) {
            if (t < s.length + 22)
                return console.error("Message too long for RSA"),
                null;
            for (var e = t - s.length - 6, r = "", n = 0; n < e; n += 2)
                r += "ff";
            return K("0001" + r + "00" + s, 16)
        }
        function gt(s, t) {
            if (t < s.length + 11)
                return console.error("Message too long for RSA"),
                null;
            for (var e = [], i = s.length - 1; i >= 0 && t > 0; ) {
                var r = s.charCodeAt(i--);
                r < 128 ? e[--t] = r : r > 127 && r < 2048 ? (e[--t] = 63 & r | 128,
                e[--t] = r >> 6 | 192) : (e[--t] = 63 & r | 128,
                e[--t] = r >> 6 & 63 | 128,
                e[--t] = r >> 12 | 224)
            }
            e[--t] = 0;
            for (var n = new vt, o = []; t > 2; ) {
                for (o[0] = 0; 0 == o[0]; )
                    n.nextBytes(o);
                e[--t] = o[0]
            }
            return e[--t] = 2,
            e[--t] = 0,
            new B(e)
        }
        var mt = function() {
            function t() {
                this.n = null,
                this.e = 0,
                this.d = null,
                this.p = null,
                this.q = null,
                this.dmp1 = null,
                this.dmq1 = null,
                this.coeff = null
            }
            return t.prototype.doPublic = function(t) {
                return t.modPowInt(this.e, this.n)
            }
            ,
            t.prototype.doPrivate = function(t) {
                if (null == this.p || null == this.q)
                    return t.modPow(this.d, this.n);
                for (var e = t.mod(this.p).modPow(this.dmp1, this.p), r = t.mod(this.q).modPow(this.dmq1, this.q); e.compareTo(r) < 0; )
                    e = e.add(this.p);
                return e.subtract(r).multiply(this.coeff).mod(this.p).multiply(this.q).add(r)
            }
            ,
            t.prototype.setPublic = function(t, e) {
                null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = K(t, 16),
                this.e = parseInt(e, 16)) : console.error("Invalid RSA public key")
            }
            ,
            t.prototype.encrypt = function(text) {
                var t = gt(text, this.n.bitLength() + 7 >> 3);
                if (null == t)
                    return null;
                var e = this.doPublic(t);
                if (null == e)
                    return null;
                var r = e.toString(16);
                return 0 == (1 & r.length) ? r : "0" + r
            }
            ,
            t.prototype.setPrivate = function(t, e, r) {
                null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = K(t, 16),
                this.e = parseInt(e, 16),
                this.d = K(r, 16)) : console.error("Invalid RSA private key")
            }
            ,
            t.prototype.setPrivateEx = function(t, e, r, n, o, c, f, l) {
                null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = K(t, 16),
                this.e = parseInt(e, 16),
                this.d = K(r, 16),
                this.p = K(n, 16),
                this.q = K(o, 16),
                this.dmp1 = K(c, 16),
                this.dmq1 = K(f, 16),
                this.coeff = K(l, 16)) : console.error("Invalid RSA private key")
            }
            ,
            t.prototype.generate = function(t, e) {
                var r = new vt
                  , n = t >> 1;
                this.e = parseInt(e, 16);
                for (var o = new B(e,16); ; ) {
                    for (; this.p = new B(t - n,1,r),
                    0 != this.p.subtract(B.ONE).gcd(o).compareTo(B.ONE) || !this.p.isProbablePrime(10); )
                        ;
                    for (; this.q = new B(n,1,r),
                    0 != this.q.subtract(B.ONE).gcd(o).compareTo(B.ONE) || !this.q.isProbablePrime(10); )
                        ;
                    if (this.p.compareTo(this.q) <= 0) {
                        var c = this.p;
                        this.p = this.q,
                        this.q = c
                    }
                    var f = this.p.subtract(B.ONE)
                      , l = this.q.subtract(B.ONE)
                      , h = f.multiply(l);
                    if (0 == h.gcd(o).compareTo(B.ONE)) {
                        this.n = this.p.multiply(this.q),
                        this.d = o.modInverse(h),
                        this.dmp1 = this.d.mod(f),
                        this.dmq1 = this.d.mod(l),
                        this.coeff = this.q.modInverse(this.p);
                        break
                    }
                }
            }
            ,
            t.prototype.decrypt = function(t) {
                var e = K(t, 16)
                  , r = this.doPrivate(e);
                return null == r ? null : bt(r, this.n.bitLength() + 7 >> 3)
            }
            ,
            t.prototype.generateAsync = function(t, e, r) {
                var n = new vt
                  , o = t >> 1;
                this.e = parseInt(e, 16);
                var c = new B(e,16)
                  , f = this
                  , l = function() {
                    var e = function() {
                        if (f.p.compareTo(f.q) <= 0) {
                            var t = f.p;
                            f.p = f.q,
                            f.q = t
                        }
                        var e = f.p.subtract(B.ONE)
                          , n = f.q.subtract(B.ONE)
                          , o = e.multiply(n);
                        0 == o.gcd(c).compareTo(B.ONE) ? (f.n = f.p.multiply(f.q),
                        f.d = c.modInverse(o),
                        f.dmp1 = f.d.mod(e),
                        f.dmq1 = f.d.mod(n),
                        f.coeff = f.q.modInverse(f.p),
                        setTimeout((function() {
                            r()
                        }
                        ), 0)) : setTimeout(l, 0)
                    }
                      , h = function() {
                        f.q = z(),
                        f.q.fromNumberAsync(o, 1, n, (function() {
                            f.q.subtract(B.ONE).gcda(c, (function(t) {
                                0 == t.compareTo(B.ONE) && f.q.isProbablePrime(10) ? setTimeout(e, 0) : setTimeout(h, 0)
                            }
                            ))
                        }
                        ))
                    }
                      , d = function() {
                        f.p = z(),
                        f.p.fromNumberAsync(t - o, 1, n, (function() {
                            f.p.subtract(B.ONE).gcda(c, (function(t) {
                                0 == t.compareTo(B.ONE) && f.p.isProbablePrime(10) ? setTimeout(h, 0) : setTimeout(d, 0)
                            }
                            ))
                        }
                        ))
                    };
                    setTimeout(d, 0)
                };
                setTimeout(l, 0)
            }
            ,
            t.prototype.sign = function(text, t, e) {
                var r = yt(St(e) + t(text).toString(), this.n.bitLength() / 4);
                if (null == r)
                    return null;
                var n = this.doPrivate(r);
                if (null == n)
                    return null;
                var o = n.toString(16);
                return 0 == (1 & o.length) ? o : "0" + o
            }
            ,
            t.prototype.verify = function(text, t, e) {
                var r = K(t, 16)
                  , n = this.doPublic(r);
                return null == n ? null : xt(n.toString(16).replace(/^1f+00/, "")) == e(text).toString()
            }
            ,
            t
        }();
        function bt(t, e) {
            for (var b = t.toByteArray(), i = 0; i < b.length && 0 == b[i]; )
                ++i;
            if (b.length - i != e - 1 || 2 != b[i])
                return null;
            for (++i; 0 != b[i]; )
                if (++i >= b.length)
                    return null;
            for (var r = ""; ++i < b.length; ) {
                var n = 255 & b[i];
                n < 128 ? r += String.fromCharCode(n) : n > 191 && n < 224 ? (r += String.fromCharCode((31 & n) << 6 | 63 & b[i + 1]),
                ++i) : (r += String.fromCharCode((15 & n) << 12 | (63 & b[i + 1]) << 6 | 63 & b[i + 2]),
                i += 2)
            }
            return r
        }
        var wt = {
            md2: "3020300c06082a864886f70d020205000410",
            md5: "3020300c06082a864886f70d020505000410",
            sha1: "3021300906052b0e03021a05000414",
            sha224: "302d300d06096086480165030402040500041c",
            sha256: "3031300d060960864801650304020105000420",
            sha384: "3041300d060960864801650304020205000430",
            sha512: "3051300d060960864801650304020305000440",
            ripemd160: "3021300906052b2403020105000414"
        };
        function St(t) {
            return wt[t] || ""
        }
        function xt(t) {
            for (var e in wt)
                if (wt.hasOwnProperty(e)) {
                    var header = wt[e]
                      , r = header.length;
                    if (t.substr(0, r) == header)
                        return t.substr(r)
                }
            return t
        }
        var _t = {};
        _t.lang = {
            extend: function(t, e, r) {
                if (!e || !t)
                    throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
                var n = function() {};
                if (n.prototype = e.prototype,
                t.prototype = new n,
                t.prototype.constructor = t,
                t.superclass = e.prototype,
                e.prototype.constructor == Object.prototype.constructor && (e.prototype.constructor = e),
                r) {
                    var i;
                    for (i in r)
                        t.prototype[i] = r[i];
                    var o = function() {}
                      , c = ["toString", "valueOf"];
                    try {
                        /MSIE/.test(navigator.userAgent) && (o = function(t, s) {
                            for (i = 0; i < c.length; i += 1) {
                                var e = c[i]
                                  , r = s[e];
                                "function" == typeof r && r != Object.prototype[e] && (t[e] = r)
                            }
                        }
                        )
                    } catch (t) {}
                    o(t.prototype, r)
                }
            }
        };
        var Et = {};
        void 0 !== Et.asn1 && Et.asn1 || (Et.asn1 = {}),
        Et.asn1.ASN1Util = new function() {
            this.integerToByteHex = function(i) {
                var t = i.toString(16);
                return t.length % 2 == 1 && (t = "0" + t),
                t
            }
            ,
            this.bigIntToMinTwosComplementsHex = function(t) {
                var e = t.toString(16);
                if ("-" != e.substr(0, 1))
                    e.length % 2 == 1 ? e = "0" + e : e.match(/^[0-7]/) || (e = "00" + e);
                else {
                    var r = e.substr(1).length;
                    r % 2 == 1 ? r += 1 : e.match(/^[0-7]/) || (r += 2);
                    for (var n = "", i = 0; i < r; i++)
                        n += "f";
                    e = new B(n,16).xor(t).add(B.ONE).toString(16).replace(/^-/, "")
                }
                return e
            }
            ,
            this.getPEMStringFromHex = function(t, e) {
                return hextopem(t, e)
            }
            ,
            this.newObject = function(param) {
                var t = Et.asn1
                  , e = t.DERBoolean
                  , r = t.DERInteger
                  , n = t.DERBitString
                  , o = t.DEROctetString
                  , c = t.DERNull
                  , f = t.DERObjectIdentifier
                  , l = t.DEREnumerated
                  , h = t.DERUTF8String
                  , d = t.DERNumericString
                  , v = t.DERPrintableString
                  , y = t.DERTeletexString
                  , m = t.DERIA5String
                  , w = t.DERUTCTime
                  , S = t.DERGeneralizedTime
                  , x = t.DERSequence
                  , _ = t.DERSet
                  , E = t.DERTaggedObject
                  , O = t.ASN1Util.newObject
                  , A = Object.keys(param);
                if (1 != A.length)
                    throw "key of param shall be only one.";
                var T = A[0];
                if (-1 == ":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + T + ":"))
                    throw "undefined key: " + T;
                if ("bool" == T)
                    return new e(param[T]);
                if ("int" == T)
                    return new r(param[T]);
                if ("bitstr" == T)
                    return new n(param[T]);
                if ("octstr" == T)
                    return new o(param[T]);
                if ("null" == T)
                    return new c(param[T]);
                if ("oid" == T)
                    return new f(param[T]);
                if ("enum" == T)
                    return new l(param[T]);
                if ("utf8str" == T)
                    return new h(param[T]);
                if ("numstr" == T)
                    return new d(param[T]);
                if ("prnstr" == T)
                    return new v(param[T]);
                if ("telstr" == T)
                    return new y(param[T]);
                if ("ia5str" == T)
                    return new m(param[T]);
                if ("utctime" == T)
                    return new w(param[T]);
                if ("gentime" == T)
                    return new S(param[T]);
                if ("seq" == T) {
                    for (var j = param[T], a = [], i = 0; i < j.length; i++) {
                        var C = O(j[i]);
                        a.push(C)
                    }
                    return new x({
                        array: a
                    })
                }
                if ("set" == T) {
                    for (j = param[T],
                    a = [],
                    i = 0; i < j.length; i++)
                        C = O(j[i]),
                        a.push(C);
                    return new _({
                        array: a
                    })
                }
                if ("tag" == T) {
                    var k = param[T];
                    if ("[object Array]" === Object.prototype.toString.call(k) && 3 == k.length) {
                        var R = O(k[2]);
                        return new E({
                            tag: k[0],
                            explicit: k[1],
                            obj: R
                        })
                    }
                    var P = {};
                    if (void 0 !== k.explicit && (P.explicit = k.explicit),
                    void 0 !== k.tag && (P.tag = k.tag),
                    void 0 === k.obj)
                        throw "obj shall be specified for 'tag'.";
                    return P.obj = O(k.obj),
                    new E(P)
                }
            }
            ,
            this.jsonToASN1HEX = function(param) {
                return this.newObject(param).getEncodedHex()
            }
        }
        ,
        Et.asn1.ASN1Util.oidHexToInt = function(t) {
            for (var s = "", e = parseInt(t.substr(0, 2), 16), r = (s = Math.floor(e / 40) + "." + e % 40,
            ""), i = 2; i < t.length; i += 2) {
                var n = ("00000000" + parseInt(t.substr(i, 2), 16).toString(2)).slice(-8);
                r += n.substr(1, 7),
                "0" == n.substr(0, 1) && (s = s + "." + new B(r,2).toString(10),
                r = "")
            }
            return s
        }
        ,
        Et.asn1.ASN1Util.oidIntToHex = function(t) {
            var e = function(i) {
                var t = i.toString(16);
                return 1 == t.length && (t = "0" + t),
                t
            }
              , r = function(t) {
                var r = ""
                  , b = new B(t,10).toString(2)
                  , n = 7 - b.length % 7;
                7 == n && (n = 0);
                for (var o = "", i = 0; i < n; i++)
                    o += "0";
                for (b = o + b,
                i = 0; i < b.length - 1; i += 7) {
                    var c = b.substr(i, 7);
                    i != b.length - 7 && (c = "1" + c),
                    r += e(parseInt(c, 2))
                }
                return r
            };
            if (!t.match(/^[0-9.]+$/))
                throw "malformed oid string: " + t;
            var n = ""
              , a = t.split(".")
              , o = 40 * parseInt(a[0]) + parseInt(a[1]);
            n += e(o),
            a.splice(0, 2);
            for (var i = 0; i < a.length; i++)
                n += r(a[i]);
            return n
        }
        ,
        Et.asn1.ASN1Object = function() {
            var t = "";
            this.getLengthHexFromValue = function() {
                if (void 0 === this.hV || null == this.hV)
                    throw "this.hV is null or undefined.";
                if (this.hV.length % 2 == 1)
                    throw "value hex must be even length: n=" + t.length + ",v=" + this.hV;
                var e = this.hV.length / 2
                  , r = e.toString(16);
                if (r.length % 2 == 1 && (r = "0" + r),
                e < 128)
                    return r;
                var n = r.length / 2;
                if (n > 15)
                    throw "ASN.1 length too long to represent by 8x: n = " + e.toString(16);
                return (128 + n).toString(16) + r
            }
            ,
            this.getEncodedHex = function() {
                return (null == this.hTLV || this.isModified) && (this.hV = this.getFreshValueHex(),
                this.hL = this.getLengthHexFromValue(),
                this.hTLV = this.hT + this.hL + this.hV,
                this.isModified = !1),
                this.hTLV
            }
            ,
            this.getValueHex = function() {
                return this.getEncodedHex(),
                this.hV
            }
            ,
            this.getFreshValueHex = function() {
                return ""
            }
        }
        ,
        Et.asn1.DERAbstractString = function(t) {
            Et.asn1.DERAbstractString.superclass.constructor.call(this),
            this.getString = function() {
                return this.s
            }
            ,
            this.setString = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.s = t,
                this.hV = stohex(this.s)
            }
            ,
            this.setStringHex = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.s = null,
                this.hV = t
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            void 0 !== t && ("string" == typeof t ? this.setString(t) : void 0 !== t.str ? this.setString(t.str) : void 0 !== t.hex && this.setStringHex(t.hex))
        }
        ,
        _t.lang.extend(Et.asn1.DERAbstractString, Et.asn1.ASN1Object),
        Et.asn1.DERAbstractTime = function(t) {
            Et.asn1.DERAbstractTime.superclass.constructor.call(this),
            this.localDateToUTC = function(t) {
                return utc = t.getTime() + 6e4 * t.getTimezoneOffset(),
                new Date(utc)
            }
            ,
            this.formatDate = function(t, e, r) {
                var n = this.zeroPadding
                  , o = this.localDateToUTC(t)
                  , c = String(o.getFullYear());
                "utc" == e && (c = c.substr(2, 2));
                var s = c + n(String(o.getMonth() + 1), 2) + n(String(o.getDate()), 2) + n(String(o.getHours()), 2) + n(String(o.getMinutes()), 2) + n(String(o.getSeconds()), 2);
                if (!0 === r) {
                    var f = o.getMilliseconds();
                    if (0 != f) {
                        var l = n(String(f), 3);
                        s = s + "." + (l = l.replace(/[0]+$/, ""))
                    }
                }
                return s + "Z"
            }
            ,
            this.zeroPadding = function(s, t) {
                return s.length >= t ? s : new Array(t - s.length + 1).join("0") + s
            }
            ,
            this.getString = function() {
                return this.s
            }
            ,
            this.setString = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.s = t,
                this.hV = stohex(t)
            }
            ,
            this.setByDateValue = function(t, e, r, n, o, c) {
                var f = new Date(Date.UTC(t, e - 1, r, n, o, c, 0));
                this.setByDate(f)
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
        }
        ,
        _t.lang.extend(Et.asn1.DERAbstractTime, Et.asn1.ASN1Object),
        Et.asn1.DERAbstractStructured = function(t) {
            Et.asn1.DERAbstractString.superclass.constructor.call(this),
            this.setByASN1ObjectArray = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.asn1Array = t
            }
            ,
            this.appendASN1Object = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.asn1Array.push(t)
            }
            ,
            this.asn1Array = new Array,
            void 0 !== t && void 0 !== t.array && (this.asn1Array = t.array)
        }
        ,
        _t.lang.extend(Et.asn1.DERAbstractStructured, Et.asn1.ASN1Object),
        Et.asn1.DERBoolean = function() {
            Et.asn1.DERBoolean.superclass.constructor.call(this),
            this.hT = "01",
            this.hTLV = "0101ff"
        }
        ,
        _t.lang.extend(Et.asn1.DERBoolean, Et.asn1.ASN1Object),
        Et.asn1.DERInteger = function(t) {
            Et.asn1.DERInteger.superclass.constructor.call(this),
            this.hT = "02",
            this.setByBigInteger = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.hV = Et.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
            }
            ,
            this.setByInteger = function(t) {
                var e = new B(String(t),10);
                this.setByBigInteger(e)
            }
            ,
            this.setValueHex = function(t) {
                this.hV = t
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            void 0 !== t && (void 0 !== t.bigint ? this.setByBigInteger(t.bigint) : void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
        }
        ,
        _t.lang.extend(Et.asn1.DERInteger, Et.asn1.ASN1Object),
        Et.asn1.DERBitString = function(t) {
            if (void 0 !== t && void 0 !== t.obj) {
                var e = Et.asn1.ASN1Util.newObject(t.obj);
                t.hex = "00" + e.getEncodedHex()
            }
            Et.asn1.DERBitString.superclass.constructor.call(this),
            this.hT = "03",
            this.setHexValueIncludingUnusedBits = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.hV = t
            }
            ,
            this.setUnusedBitsAndHexValue = function(t, e) {
                if (t < 0 || 7 < t)
                    throw "unused bits shall be from 0 to 7: u = " + t;
                var r = "0" + t;
                this.hTLV = null,
                this.isModified = !0,
                this.hV = r + e
            }
            ,
            this.setByBinaryString = function(t) {
                var e = 8 - (t = t.replace(/0+$/, "")).length % 8;
                8 == e && (e = 0);
                for (var i = 0; i <= e; i++)
                    t += "0";
                var r = "";
                for (i = 0; i < t.length - 1; i += 8) {
                    var b = t.substr(i, 8)
                      , n = parseInt(b, 2).toString(16);
                    1 == n.length && (n = "0" + n),
                    r += n
                }
                this.hTLV = null,
                this.isModified = !0,
                this.hV = "0" + e + r
            }
            ,
            this.setByBooleanArray = function(t) {
                for (var s = "", i = 0; i < t.length; i++)
                    1 == t[i] ? s += "1" : s += "0";
                this.setByBinaryString(s)
            }
            ,
            this.newFalseArray = function(t) {
                for (var a = new Array(t), i = 0; i < t; i++)
                    a[i] = !1;
                return a
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            void 0 !== t && ("string" == typeof t && t.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(t) : void 0 !== t.hex ? this.setHexValueIncludingUnusedBits(t.hex) : void 0 !== t.bin ? this.setByBinaryString(t.bin) : void 0 !== t.array && this.setByBooleanArray(t.array))
        }
        ,
        _t.lang.extend(Et.asn1.DERBitString, Et.asn1.ASN1Object),
        Et.asn1.DEROctetString = function(t) {
            if (void 0 !== t && void 0 !== t.obj) {
                var e = Et.asn1.ASN1Util.newObject(t.obj);
                t.hex = e.getEncodedHex()
            }
            Et.asn1.DEROctetString.superclass.constructor.call(this, t),
            this.hT = "04"
        }
        ,
        _t.lang.extend(Et.asn1.DEROctetString, Et.asn1.DERAbstractString),
        Et.asn1.DERNull = function() {
            Et.asn1.DERNull.superclass.constructor.call(this),
            this.hT = "05",
            this.hTLV = "0500"
        }
        ,
        _t.lang.extend(Et.asn1.DERNull, Et.asn1.ASN1Object),
        Et.asn1.DERObjectIdentifier = function(t) {
            var e = function(i) {
                var t = i.toString(16);
                return 1 == t.length && (t = "0" + t),
                t
            }
              , r = function(t) {
                var r = ""
                  , b = new B(t,10).toString(2)
                  , n = 7 - b.length % 7;
                7 == n && (n = 0);
                for (var o = "", i = 0; i < n; i++)
                    o += "0";
                for (b = o + b,
                i = 0; i < b.length - 1; i += 7) {
                    var c = b.substr(i, 7);
                    i != b.length - 7 && (c = "1" + c),
                    r += e(parseInt(c, 2))
                }
                return r
            };
            Et.asn1.DERObjectIdentifier.superclass.constructor.call(this),
            this.hT = "06",
            this.setValueHex = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.s = null,
                this.hV = t
            }
            ,
            this.setValueOidString = function(t) {
                if (!t.match(/^[0-9.]+$/))
                    throw "malformed oid string: " + t;
                var n = ""
                  , a = t.split(".")
                  , o = 40 * parseInt(a[0]) + parseInt(a[1]);
                n += e(o),
                a.splice(0, 2);
                for (var i = 0; i < a.length; i++)
                    n += r(a[i]);
                this.hTLV = null,
                this.isModified = !0,
                this.s = null,
                this.hV = n
            }
            ,
            this.setValueName = function(t) {
                var e = Et.asn1.x509.OID.name2oid(t);
                if ("" === e)
                    throw "DERObjectIdentifier oidName undefined: " + t;
                this.setValueOidString(e)
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            void 0 !== t && ("string" == typeof t ? t.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(t) : this.setValueName(t) : void 0 !== t.oid ? this.setValueOidString(t.oid) : void 0 !== t.hex ? this.setValueHex(t.hex) : void 0 !== t.name && this.setValueName(t.name))
        }
        ,
        _t.lang.extend(Et.asn1.DERObjectIdentifier, Et.asn1.ASN1Object),
        Et.asn1.DEREnumerated = function(t) {
            Et.asn1.DEREnumerated.superclass.constructor.call(this),
            this.hT = "0a",
            this.setByBigInteger = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.hV = Et.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
            }
            ,
            this.setByInteger = function(t) {
                var e = new B(String(t),10);
                this.setByBigInteger(e)
            }
            ,
            this.setValueHex = function(t) {
                this.hV = t
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            void 0 !== t && (void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
        }
        ,
        _t.lang.extend(Et.asn1.DEREnumerated, Et.asn1.ASN1Object),
        Et.asn1.DERUTF8String = function(t) {
            Et.asn1.DERUTF8String.superclass.constructor.call(this, t),
            this.hT = "0c"
        }
        ,
        _t.lang.extend(Et.asn1.DERUTF8String, Et.asn1.DERAbstractString),
        Et.asn1.DERNumericString = function(t) {
            Et.asn1.DERNumericString.superclass.constructor.call(this, t),
            this.hT = "12"
        }
        ,
        _t.lang.extend(Et.asn1.DERNumericString, Et.asn1.DERAbstractString),
        Et.asn1.DERPrintableString = function(t) {
            Et.asn1.DERPrintableString.superclass.constructor.call(this, t),
            this.hT = "13"
        }
        ,
        _t.lang.extend(Et.asn1.DERPrintableString, Et.asn1.DERAbstractString),
        Et.asn1.DERTeletexString = function(t) {
            Et.asn1.DERTeletexString.superclass.constructor.call(this, t),
            this.hT = "14"
        }
        ,
        _t.lang.extend(Et.asn1.DERTeletexString, Et.asn1.DERAbstractString),
        Et.asn1.DERIA5String = function(t) {
            Et.asn1.DERIA5String.superclass.constructor.call(this, t),
            this.hT = "16"
        }
        ,
        _t.lang.extend(Et.asn1.DERIA5String, Et.asn1.DERAbstractString),
        Et.asn1.DERUTCTime = function(t) {
            Et.asn1.DERUTCTime.superclass.constructor.call(this, t),
            this.hT = "17",
            this.setByDate = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.date = t,
                this.s = this.formatDate(this.date, "utc"),
                this.hV = stohex(this.s)
            }
            ,
            this.getFreshValueHex = function() {
                return void 0 === this.date && void 0 === this.s && (this.date = new Date,
                this.s = this.formatDate(this.date, "utc"),
                this.hV = stohex(this.s)),
                this.hV
            }
            ,
            void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{12}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date))
        }
        ,
        _t.lang.extend(Et.asn1.DERUTCTime, Et.asn1.DERAbstractTime),
        Et.asn1.DERGeneralizedTime = function(t) {
            Et.asn1.DERGeneralizedTime.superclass.constructor.call(this, t),
            this.hT = "18",
            this.withMillis = !1,
            this.setByDate = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.date = t,
                this.s = this.formatDate(this.date, "gen", this.withMillis),
                this.hV = stohex(this.s)
            }
            ,
            this.getFreshValueHex = function() {
                return void 0 === this.date && void 0 === this.s && (this.date = new Date,
                this.s = this.formatDate(this.date, "gen", this.withMillis),
                this.hV = stohex(this.s)),
                this.hV
            }
            ,
            void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{14}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date),
            !0 === t.millis && (this.withMillis = !0))
        }
        ,
        _t.lang.extend(Et.asn1.DERGeneralizedTime, Et.asn1.DERAbstractTime),
        Et.asn1.DERSequence = function(t) {
            Et.asn1.DERSequence.superclass.constructor.call(this, t),
            this.hT = "30",
            this.getFreshValueHex = function() {
                for (var t = "", i = 0; i < this.asn1Array.length; i++)
                    t += this.asn1Array[i].getEncodedHex();
                return this.hV = t,
                this.hV
            }
        }
        ,
        _t.lang.extend(Et.asn1.DERSequence, Et.asn1.DERAbstractStructured),
        Et.asn1.DERSet = function(t) {
            Et.asn1.DERSet.superclass.constructor.call(this, t),
            this.hT = "31",
            this.sortFlag = !0,
            this.getFreshValueHex = function() {
                for (var a = new Array, i = 0; i < this.asn1Array.length; i++) {
                    var t = this.asn1Array[i];
                    a.push(t.getEncodedHex())
                }
                return 1 == this.sortFlag && a.sort(),
                this.hV = a.join(""),
                this.hV
            }
            ,
            void 0 !== t && void 0 !== t.sortflag && 0 == t.sortflag && (this.sortFlag = !1)
        }
        ,
        _t.lang.extend(Et.asn1.DERSet, Et.asn1.DERAbstractStructured),
        Et.asn1.DERTaggedObject = function(t) {
            Et.asn1.DERTaggedObject.superclass.constructor.call(this),
            this.hT = "a0",
            this.hV = "",
            this.isExplicit = !0,
            this.asn1Object = null,
            this.setASN1Object = function(t, e, r) {
                this.hT = e,
                this.isExplicit = t,
                this.asn1Object = r,
                this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(),
                this.hTLV = null,
                this.isModified = !0) : (this.hV = null,
                this.hTLV = r.getEncodedHex(),
                this.hTLV = this.hTLV.replace(/^../, e),
                this.isModified = !1)
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            void 0 !== t && (void 0 !== t.tag && (this.hT = t.tag),
            void 0 !== t.explicit && (this.isExplicit = t.explicit),
            void 0 !== t.obj && (this.asn1Object = t.obj,
            this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
        }
        ,
        _t.lang.extend(Et.asn1.DERTaggedObject, Et.asn1.ASN1Object);
        var Ot = function(t) {
            function e(r) {
                var n = t.call(this) || this;
                return r && ("string" == typeof r ? n.parseKey(r) : (e.hasPrivateKeyProperty(r) || e.hasPublicKeyProperty(r)) && n.parsePropertiesFrom(r)),
                n
            }
            return x(e, t),
            e.prototype.parseKey = function(t) {
                try {
                    var e = 0
                      , r = 0
                      , n = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(t) ? E.decode(t) : O.unarmor(t)
                      , o = N.decode(n);
                    if (3 === o.sub.length && (o = o.sub[2].sub[0]),
                    9 === o.sub.length) {
                        e = o.sub[1].getHexStringValue(),
                        this.n = K(e, 16),
                        r = o.sub[2].getHexStringValue(),
                        this.e = parseInt(r, 16);
                        var c = o.sub[3].getHexStringValue();
                        this.d = K(c, 16);
                        var f = o.sub[4].getHexStringValue();
                        this.p = K(f, 16);
                        var l = o.sub[5].getHexStringValue();
                        this.q = K(l, 16);
                        var h = o.sub[6].getHexStringValue();
                        this.dmp1 = K(h, 16);
                        var d = o.sub[7].getHexStringValue();
                        this.dmq1 = K(d, 16);
                        var v = o.sub[8].getHexStringValue();
                        this.coeff = K(v, 16)
                    } else {
                        if (2 !== o.sub.length)
                            return !1;
                        var y = o.sub[1].sub[0];
                        e = y.sub[0].getHexStringValue(),
                        this.n = K(e, 16),
                        r = y.sub[1].getHexStringValue(),
                        this.e = parseInt(r, 16)
                    }
                    return !0
                } catch (t) {
                    return !1
                }
            }
            ,
            e.prototype.getPrivateBaseKey = function() {
                var t = {
                    array: [new Et.asn1.DERInteger({
                        int: 0
                    }), new Et.asn1.DERInteger({
                        bigint: this.n
                    }), new Et.asn1.DERInteger({
                        int: this.e
                    }), new Et.asn1.DERInteger({
                        bigint: this.d
                    }), new Et.asn1.DERInteger({
                        bigint: this.p
                    }), new Et.asn1.DERInteger({
                        bigint: this.q
                    }), new Et.asn1.DERInteger({
                        bigint: this.dmp1
                    }), new Et.asn1.DERInteger({
                        bigint: this.dmq1
                    }), new Et.asn1.DERInteger({
                        bigint: this.coeff
                    })]
                };
                return new Et.asn1.DERSequence(t).getEncodedHex()
            }
            ,
            e.prototype.getPrivateBaseKeyB64 = function() {
                return y(this.getPrivateBaseKey())
            }
            ,
            e.prototype.getPublicBaseKey = function() {
                var t = new Et.asn1.DERSequence({
                    array: [new Et.asn1.DERObjectIdentifier({
                        oid: "1.2.840.113549.1.1.1"
                    }), new Et.asn1.DERNull]
                })
                  , e = new Et.asn1.DERSequence({
                    array: [new Et.asn1.DERInteger({
                        bigint: this.n
                    }), new Et.asn1.DERInteger({
                        int: this.e
                    })]
                })
                  , r = new Et.asn1.DERBitString({
                    hex: "00" + e.getEncodedHex()
                });
                return new Et.asn1.DERSequence({
                    array: [t, r]
                }).getEncodedHex()
            }
            ,
            e.prototype.getPublicBaseKeyB64 = function() {
                return y(this.getPublicBaseKey())
            }
            ,
            e.wordwrap = function(t, e) {
                if (!t)
                    return t;
                var r = "(.{1," + (e = e || 64) + "})( +|$\n?)|(.{1," + e + "})";
                return t.match(RegExp(r, "g")).join("\n")
            }
            ,
            e.prototype.getPrivateKey = function() {
                var t = "-----BEGIN RSA PRIVATE KEY-----\n";
                return t += e.wordwrap(this.getPrivateBaseKeyB64()) + "\n",
                t += "-----END RSA PRIVATE KEY-----"
            }
            ,
            e.prototype.getPublicKey = function() {
                var t = "-----BEGIN PUBLIC KEY-----\n";
                return t += e.wordwrap(this.getPublicBaseKeyB64()) + "\n",
                t += "-----END PUBLIC KEY-----"
            }
            ,
            e.hasPublicKeyProperty = function(t) {
                return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e")
            }
            ,
            e.hasPrivateKeyProperty = function(t) {
                return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e") && t.hasOwnProperty("d") && t.hasOwnProperty("p") && t.hasOwnProperty("q") && t.hasOwnProperty("dmp1") && t.hasOwnProperty("dmq1") && t.hasOwnProperty("coeff")
            }
            ,
            e.prototype.parsePropertiesFrom = function(t) {
                this.n = t.n,
                this.e = t.e,
                t.hasOwnProperty("d") && (this.d = t.d,
                this.p = t.p,
                this.q = t.q,
                this.dmp1 = t.dmp1,
                this.dmq1 = t.dmq1,
                this.coeff = t.coeff)
            }
            ,
            e
        }(mt)
          , At = function() {
            function t(t) {
                t = t || {},
                this.default_key_size = parseInt(t.default_key_size, 10) || 1024,
                this.default_public_exponent = t.default_public_exponent || "010001",
                this.log = t.log || !1,
                this.key = null
            }
            return t.prototype.setKey = function(t) {
                this.log && this.key && console.warn("A key was already set, overriding existing."),
                this.key = new Ot(t)
            }
            ,
            t.prototype.setPrivateKey = function(t) {
                this.setKey(t)
            }
            ,
            t.prototype.setPublicKey = function(t) {
                this.setKey(t)
            }
            ,
            t.prototype.decrypt = function(t) {
                try {
                    return this.getKey().decrypt(m(t))
                } catch (t) {
                    return !1
                }
            }
            ,
            t.prototype.encrypt = function(t) {
                try {
                    return y(this.getKey().encrypt(t))
                } catch (t) {
                    return !1
                }
            }
            ,
            t.prototype.sign = function(t, e, r) {
                try {
                    return y(this.getKey().sign(t, e, r))
                } catch (t) {
                    return !1
                }
            }
            ,
            t.prototype.verify = function(t, e, r) {
                try {
                    return this.getKey().verify(t, m(e), r)
                } catch (t) {
                    return !1
                }
            }
            ,
            t.prototype.getKey = function(t) {
                if (!this.key) {
                    if (this.key = new Ot,
                    t && "[object Function]" === {}.toString.call(t))
                        return void this.key.generateAsync(this.default_key_size, this.default_public_exponent, t);
                    this.key.generate(this.default_key_size, this.default_public_exponent)
                }
                return this.key
            }
            ,
            t.prototype.getPrivateKey = function() {
                return this.getKey().getPrivateKey()
            }
            ,
            t.prototype.getPrivateKeyB64 = function() {
                return this.getKey().getPrivateBaseKeyB64()
            }
            ,
            t.prototype.getPublicKey = function() {
                return this.getKey().getPublicKey()
            }
            ,
            t.prototype.getPublicKeyB64 = function() {
                return this.getKey().getPublicBaseKeyB64()
            }
            ,
            t.version = "3.0.0-rc.1",
            t
        }();
        window.JSEncrypt = At;
        t.JSEncrypt = At;

    }(e)

function getpwd(pwd){
var t = new e.JSEncrypt();
t.setPublicKey("MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAOAvi4p9BUpNeXgXyNLM1uSnK4uIvfREAM72lhb5MwHmfO6FD7SyId1auo3JtCEG8oUS6AKYmxcTGj+yrI728G0CAwEAAQ==");
return t.encrypt(pwd);
}
//账号密码为同一个加密函数
//sign为对"MOBILE=D7X1KC30U9SBZLUAMHDJLLDBR7IXFKWC5V0RTDJWASFFX7BXJU+36B9+ZY4+3TMCKZHFYSM3P4DEW1M8HD63RG==&PASSWORD=WF3FZQAULLDOQWL4EKZ9LXARZMZYVGLFVB+TWAODBIGRZMSJX8UXI0UJ36LSSSB+DZWLRSWBUM2PFN3K0NPUBG==&HXWcjvQWVG1wI4FQBLZpQ3pWj48AV63d"进行sha1加密