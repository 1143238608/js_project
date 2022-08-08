var CryptoJS = new CryptoJS;
function CryptoJS (root, factory) {
    var CryptoJS = CryptoJS || (function(Math, undefined) {
        var create = Object.create || (function() {
            function F() {};
            return function(obj) {
                var subtype;
                F.prototype = obj;
                subtype = new F();
                F.prototype = null;
                return subtype;
            };
        }())
        var C = {};
        var C_lib = C.lib = {};
        var Base = C_lib.Base = (function() {
            return {
                extend: function(overrides) {
                    var subtype = create(this);
                    if (overrides) {
                        subtype.mixIn(overrides);
                    }
                    if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
                        subtype.init = function() {
                            subtype.$super.init.apply(this, arguments);
                        };
                    }
                    subtype.init.prototype = subtype;
                    subtype.$super = this;
                    return subtype;
                },
                create: function() {
                    var instance = this.extend();
                    instance.init.apply(instance, arguments);
                    return instance;
                },
                init: function() {},
                mixIn: function(properties) {
                    for (var propertyName in properties) {
                        if (properties.hasOwnProperty(propertyName)) {
                            this[propertyName] = properties[propertyName];
                        }
                    }
                    if (properties.hasOwnProperty('toString')) {
                        this.toString = properties.toString;
                    }
                },
                clone: function() {
                    return this.init.prototype.extend(this);
                }
            };
        }());
        var WordArray = C_lib.WordArray = Base.extend({
            init: function(words, sigBytes) {
                words = this.words = words || [];
                if (sigBytes != undefined) {
                    this.sigBytes = sigBytes;
                } else {
                    this.sigBytes = words.length * 4;
                }
            },
            toString: function(encoder) {
                return (encoder || Hex).stringify(this);
            },
            concat: function(wordArray) {
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
                } else {
                    for (var i = 0; i < thatSigBytes; i += 4) {
                        thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
                    }
                }
                this.sigBytes += thatSigBytes;
                return this;
            },
            clamp: function() {
                var words = this.words;
                var sigBytes = this.sigBytes;
                words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
                words.length = Math.ceil(sigBytes / 4);
            },
            clone: function() {
                var clone = Base.clone.call(this);
                clone.words = this.words.slice(0);
                return clone;
            },
            random: function(nBytes) {
                var words = [];
                var r = (function(m_w) {
                    var m_w = m_w;
                    var m_z = 0x3ade68b1;
                    var mask = 0xffffffff;
                    return function() {
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
            stringify: function(wordArray) {
                var words = wordArray.words;
                var sigBytes = wordArray.sigBytes;
                var hexChars = [];
                for (var i = 0; i < sigBytes; i++) {
                    var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                    hexChars.push((bite >>> 4).toString(16));
                    hexChars.push((bite & 0x0f).toString(16));
                }
                return hexChars.join('');
            },
            parse: function(hexStr) {
                var hexStrLength = hexStr.length;
                var words = [];
                for (var i = 0; i < hexStrLength; i += 2) {
                    words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
                }
                return new WordArray.init(words, hexStrLength / 2);
            }
        };
        var Latin1 = C_enc.Latin1 = {
            stringify: function(wordArray) {
                var words = wordArray.words;
                var sigBytes = wordArray.sigBytes;
                var latin1Chars = [];
                for (var i = 0; i < sigBytes; i++) {
                    var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                    latin1Chars.push(String.fromCharCode(bite));
                }
                return latin1Chars.join('');
            },
            parse: function(latin1Str) {
                var latin1StrLength = latin1Str.length;
                var words = [];
                for (var i = 0; i < latin1StrLength; i++) {
                    words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
                }
                return new WordArray.init(words, latin1StrLength);
            }
        };
        var Utf8 = C_enc.Utf8 = {
            stringify: function(wordArray) {
                try {
                    return decodeURIComponent(escape(Latin1.stringify(wordArray)));
                } catch (e) {
                    throw new Error('Malformed UTF-8 data');
                }
            },
            parse: function(utf8Str) {
                return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
            }
        };
        var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
            reset: function() {
                this._data = new WordArray.init();
                this._nDataBytes = 0;
            },
            _append: function(data) {
                if (typeof data == 'string') {
                    data = Utf8.parse(data);
                }
                this._data.concat(data);
                this._nDataBytes += data.sigBytes;
            },
            _process: function(doFlush) {
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
            },
            clone: function() {
                var clone = Base.clone.call(this);
                clone._data = this._data.clone();
                return clone;
            },
            _minBufferSize: 0
        });
        var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
            cfg: Base.extend(),
            init: function(cfg) {
                this.cfg = this.cfg.extend(cfg);
                this.reset();
            },
            reset: function() {
                BufferedBlockAlgorithm.reset.call(this);
                this._doReset();
            },
            update: function(messageUpdate) {
                this._append(messageUpdate);
                this._process();
                return this;
            },
            finalize: function(messageUpdate) {
                if (messageUpdate) {
                    this._append(messageUpdate);
                }
                var hash = this._doFinalize();
                return hash;
            },
            blockSize: 512 / 32,
            _createHelper: function(hasher) {
                return function(message, cfg) {
                    return new hasher.init(cfg).finalize(message);
                };
            },
            _createHmacHelper: function(hasher) {
                return function(message, key) {
                    return new C_algo.HMAC.init(hasher, key).finalize(message);
                };
            }
        });
        var C_algo = C.algo = {};
        return C;
    }(Math));
    (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_enc = C.enc;
        var Base64 = C_enc.Base64 = {
            stringify: function(wordArray) {
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
            },
            parse: function(base64Str) {
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
            },
            _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
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
    (function(Math) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var T = [];
        (function() {
            for (var i = 0; i < 64; i++) {
                T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
            }
        }());
        var MD5 = C_algo.MD5 = Hasher.extend({
            _doReset: function() {
                this._hash = new WordArray.init([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476]);
            },
            _doProcessBlock: function(M, offset) {
                for (var i = 0; i < 16; i++) {
                    var offset_i = offset + i;
                    var M_offset_i = M[offset_i];
                    M[offset_i] = ((((M_offset_i << 8) | (M_offset_i >>> 24)) & 0x00ff00ff) | (((M_offset_i << 24) | (M_offset_i >>> 8)) & 0xff00ff00));
                }
                var H = this._hash.words;
                var M_offset_0 = M[offset + 0];
                var M_offset_1 = M[offset + 1];
                var M_offset_2 = M[offset + 2];
                var M_offset_3 = M[offset + 3];
                var M_offset_4 = M[offset + 4];
                var M_offset_5 = M[offset + 5];
                var M_offset_6 = M[offset + 6];
                var M_offset_7 = M[offset + 7];
                var M_offset_8 = M[offset + 8];
                var M_offset_9 = M[offset + 9];
                var M_offset_10 = M[offset + 10];
                var M_offset_11 = M[offset + 11];
                var M_offset_12 = M[offset + 12];
                var M_offset_13 = M[offset + 13];
                var M_offset_14 = M[offset + 14];
                var M_offset_15 = M[offset + 15];
                var a = H[0];
                var b = H[1];
                var c = H[2];
                var d = H[3];
                a = FF(a, b, c, d, M_offset_0, 7, T[0]);
                d = FF(d, a, b, c, M_offset_1, 12, T[1]);
                c = FF(c, d, a, b, M_offset_2, 17, T[2]);
                b = FF(b, c, d, a, M_offset_3, 22, T[3]);
                a = FF(a, b, c, d, M_offset_4, 7, T[4]);
                d = FF(d, a, b, c, M_offset_5, 12, T[5]);
                c = FF(c, d, a, b, M_offset_6, 17, T[6]);
                b = FF(b, c, d, a, M_offset_7, 22, T[7]);
                a = FF(a, b, c, d, M_offset_8, 7, T[8]);
                d = FF(d, a, b, c, M_offset_9, 12, T[9]);
                c = FF(c, d, a, b, M_offset_10, 17, T[10]);
                b = FF(b, c, d, a, M_offset_11, 22, T[11]);
                a = FF(a, b, c, d, M_offset_12, 7, T[12]);
                d = FF(d, a, b, c, M_offset_13, 12, T[13]);
                c = FF(c, d, a, b, M_offset_14, 17, T[14]);
                b = FF(b, c, d, a, M_offset_15, 22, T[15]);
                a = GG(a, b, c, d, M_offset_1, 5, T[16]);
                d = GG(d, a, b, c, M_offset_6, 9, T[17]);
                c = GG(c, d, a, b, M_offset_11, 14, T[18]);
                b = GG(b, c, d, a, M_offset_0, 20, T[19]);
                a = GG(a, b, c, d, M_offset_5, 5, T[20]);
                d = GG(d, a, b, c, M_offset_10, 9, T[21]);
                c = GG(c, d, a, b, M_offset_15, 14, T[22]);
                b = GG(b, c, d, a, M_offset_4, 20, T[23]);
                a = GG(a, b, c, d, M_offset_9, 5, T[24]);
                d = GG(d, a, b, c, M_offset_14, 9, T[25]);
                c = GG(c, d, a, b, M_offset_3, 14, T[26]);
                b = GG(b, c, d, a, M_offset_8, 20, T[27]);
                a = GG(a, b, c, d, M_offset_13, 5, T[28]);
                d = GG(d, a, b, c, M_offset_2, 9, T[29]);
                c = GG(c, d, a, b, M_offset_7, 14, T[30]);
                b = GG(b, c, d, a, M_offset_12, 20, T[31]);
                a = HH(a, b, c, d, M_offset_5, 4, T[32]);
                d = HH(d, a, b, c, M_offset_8, 11, T[33]);
                c = HH(c, d, a, b, M_offset_11, 16, T[34]);
                b = HH(b, c, d, a, M_offset_14, 23, T[35]);
                a = HH(a, b, c, d, M_offset_1, 4, T[36]);
                d = HH(d, a, b, c, M_offset_4, 11, T[37]);
                c = HH(c, d, a, b, M_offset_7, 16, T[38]);
                b = HH(b, c, d, a, M_offset_10, 23, T[39]);
                a = HH(a, b, c, d, M_offset_13, 4, T[40]);
                d = HH(d, a, b, c, M_offset_0, 11, T[41]);
                c = HH(c, d, a, b, M_offset_3, 16, T[42]);
                b = HH(b, c, d, a, M_offset_6, 23, T[43]);
                a = HH(a, b, c, d, M_offset_9, 4, T[44]);
                d = HH(d, a, b, c, M_offset_12, 11, T[45]);
                c = HH(c, d, a, b, M_offset_15, 16, T[46]);
                b = HH(b, c, d, a, M_offset_2, 23, T[47]);
                a = II(a, b, c, d, M_offset_0, 6, T[48]);
                d = II(d, a, b, c, M_offset_7, 10, T[49]);
                c = II(c, d, a, b, M_offset_14, 15, T[50]);
                b = II(b, c, d, a, M_offset_5, 21, T[51]);
                a = II(a, b, c, d, M_offset_12, 6, T[52]);
                d = II(d, a, b, c, M_offset_3, 10, T[53]);
                c = II(c, d, a, b, M_offset_10, 15, T[54]);
                b = II(b, c, d, a, M_offset_1, 21, T[55]);
                a = II(a, b, c, d, M_offset_8, 6, T[56]);
                d = II(d, a, b, c, M_offset_15, 10, T[57]);
                c = II(c, d, a, b, M_offset_6, 15, T[58]);
                b = II(b, c, d, a, M_offset_13, 21, T[59]);
                a = II(a, b, c, d, M_offset_4, 6, T[60]);
                d = II(d, a, b, c, M_offset_11, 10, T[61]);
                c = II(c, d, a, b, M_offset_2, 15, T[62]);
                b = II(b, c, d, a, M_offset_9, 21, T[63]);
                H[0] = (H[0] + a) | 0;
                H[1] = (H[1] + b) | 0;
                H[2] = (H[2] + c) | 0;
                H[3] = (H[3] + d) | 0;
            },
            _doFinalize: function() {
                var data = this._data;
                var dataWords = data.words;
                var nBitsTotal = this._nDataBytes * 8;
                var nBitsLeft = data.sigBytes * 8;
                dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
                var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
                var nBitsTotalL = nBitsTotal;
                dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = ((((nBitsTotalH << 8) | (nBitsTotalH >>> 24)) & 0x00ff00ff) | (((nBitsTotalH << 24) | (nBitsTotalH >>> 8)) & 0xff00ff00));
                dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = ((((nBitsTotalL << 8) | (nBitsTotalL >>> 24)) & 0x00ff00ff) | (((nBitsTotalL << 24) | (nBitsTotalL >>> 8)) & 0xff00ff00));
                data.sigBytes = (dataWords.length + 1) * 4;
                this._process();
                var hash = this._hash;
                var H = hash.words;
                for (var i = 0; i < 4; i++) {
                    var H_i = H[i];
                    H[i] = (((H_i << 8) | (H_i >>> 24)) & 0x00ff00ff) | (((H_i << 24) | (H_i >>> 8)) & 0xff00ff00);
                }
                return hash;
            },
            clone: function() {
                var clone = Hasher.clone.call(this);
                clone._hash = this._hash.clone();
                return clone;
            }
        });

        function FF(a, b, c, d, x, s, t) {
            var n = a + ((b & c) | (~b & d)) + x + t;
            return ((n << s) | (n >>> (32 - s))) + b;
        }

        function GG(a, b, c, d, x, s, t) {
            var n = a + ((b & d) | (c & ~d)) + x + t;
            return ((n << s) | (n >>> (32 - s))) + b;
        }

        function HH(a, b, c, d, x, s, t) {
            var n = a + (b ^ c ^ d) + x + t;
            return ((n << s) | (n >>> (32 - s))) + b;
        }

        function II(a, b, c, d, x, s, t) {
            var n = a + (c ^ (b | ~d)) + x + t;
            return ((n << s) | (n >>> (32 - s))) + b;
        }
        C.MD5 = Hasher._createHelper(MD5);
        C.HmacMD5 = Hasher._createHmacHelper(MD5);
    }(Math));
    (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var W = [];
        var SHA1 = C_algo.SHA1 = Hasher.extend({
            _doReset: function() {
                this._hash = new WordArray.init([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0]);
            },
            _doProcessBlock: function(M, offset) {
                var H = this._hash.words;
                var a = H[0];
                var b = H[1];
                var c = H[2];
                var d = H[3];
                var e = H[4];
                for (var i = 0; i < 80; i++) {
                    if (i < 16) {
                        W[i] = M[offset + i] | 0;
                    } else {
                        var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                        W[i] = (n << 1) | (n >>> 31);
                    }
                    var t = ((a << 5) | (a >>> 27)) + e + W[i];
                    if (i < 20) {
                        t += ((b & c) | (~b & d)) + 0x5a827999;
                    } else if (i < 40) {
                        t += (b ^ c ^ d) + 0x6ed9eba1;
                    } else if (i < 60) {
                        t += ((b & c) | (b & d) | (c & d)) - 0x70e44324;
                    } else {
                        t += (b ^ c ^ d) - 0x359d3e2a;
                    }
                    e = d;
                    d = c;
                    c = (b << 30) | (b >>> 2);
                    b = a;
                    a = t;
                }
                H[0] = (H[0] + a) | 0;
                H[1] = (H[1] + b) | 0;
                H[2] = (H[2] + c) | 0;
                H[3] = (H[3] + d) | 0;
                H[4] = (H[4] + e) | 0;
            },
            _doFinalize: function() {
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
            },
            clone: function() {
                var clone = Hasher.clone.call(this);
                clone._hash = this._hash.clone();
                return clone;
            }
        });
        C.SHA1 = Hasher._createHelper(SHA1);
        C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
    }());
    (function(Math) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var H = [];
        var K = [];
        (function() {
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
            _doReset: function() {
                this._hash = new WordArray.init(H.slice(0));
            },
            _doProcessBlock: function(M, offset) {
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
            },
            _doFinalize: function() {
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
            },
            clone: function() {
                var clone = Hasher.clone.call(this);
                clone._hash = this._hash.clone();
                return clone;
            }
        });
        C.SHA256 = Hasher._createHelper(SHA256);
        C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
    }(Math));
    (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_enc = C.enc;
        var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {
            stringify: function(wordArray) {
                var words = wordArray.words;
                var sigBytes = wordArray.sigBytes;
                var utf16Chars = [];
                for (var i = 0; i < sigBytes; i += 2) {
                    var codePoint = (words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff;
                    utf16Chars.push(String.fromCharCode(codePoint));
                }
                return utf16Chars.join('');
            },
            parse: function(utf16Str) {
                var utf16StrLength = utf16Str.length;
                var words = [];
                for (var i = 0; i < utf16StrLength; i++) {
                    words[i >>> 1] |= utf16Str.charCodeAt(i) << (16 - (i % 2) * 16);
                }
                return WordArray.create(words, utf16StrLength * 2);
            }
        };
        C_enc.Utf16LE = {
            stringify: function(wordArray) {
                var words = wordArray.words;
                var sigBytes = wordArray.sigBytes;
                var utf16Chars = [];
                for (var i = 0; i < sigBytes; i += 2) {
                    var codePoint = swapEndian((words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff);
                    utf16Chars.push(String.fromCharCode(codePoint));
                }
                return utf16Chars.join('');
            },
            parse: function(utf16Str) {
                var utf16StrLength = utf16Str.length;
                var words = [];
                for (var i = 0; i < utf16StrLength; i++) {
                    words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << (16 - (i % 2) * 16));
                }
                return WordArray.create(words, utf16StrLength * 2);
            }
        };

        function swapEndian(word) {
            return ((word << 8) & 0xff00ff00) | ((word >>> 8) & 0x00ff00ff);
        }
    }());
    (function() {
        if (typeof ArrayBuffer != 'function') {
            return;
        }
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var superInit = WordArray.init;
        var subInit = WordArray.init = function(typedArray) {
            if (typedArray instanceof ArrayBuffer) {
                typedArray = new Uint8Array(typedArray);
            }
            if (typedArray instanceof Int8Array || (typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray) || typedArray instanceof Int16Array || typedArray instanceof Uint16Array || typedArray instanceof Int32Array || typedArray instanceof Uint32Array || typedArray instanceof Float32Array || typedArray instanceof Float64Array) {
                typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
            }
            if (typedArray instanceof Uint8Array) {
                var typedArrayByteLength = typedArray.byteLength;
                var words = [];
                for (var i = 0; i < typedArrayByteLength; i++) {
                    words[i >>> 2] |= typedArray[i] << (24 - (i % 4) * 8);
                }
                superInit.call(this, words, typedArrayByteLength);
            } else {
                superInit.apply(this, arguments);
            }
        };
        subInit.prototype = WordArray;
    }());
    (function(Math) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var _zl = WordArray.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]);
        var _zr = WordArray.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]);
        var _sl = WordArray.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]);
        var _sr = WordArray.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]);
        var _hl = WordArray.create([0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E]);
        var _hr = WordArray.create([0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000]);
        var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
            _doReset: function() {
                this._hash = WordArray.create([0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]);
            },
            _doProcessBlock: function(M, offset) {
                for (var i = 0; i < 16; i++) {
                    var offset_i = offset + i;
                    var M_offset_i = M[offset_i];
                    M[offset_i] = ((((M_offset_i << 8) | (M_offset_i >>> 24)) & 0x00ff00ff) | (((M_offset_i << 24) | (M_offset_i >>> 8)) & 0xff00ff00));
                }
                var H = this._hash.words;
                var hl = _hl.words;
                var hr = _hr.words;
                var zl = _zl.words;
                var zr = _zr.words;
                var sl = _sl.words;
                var sr = _sr.words;
                var al, bl, cl, dl, el;
                var ar, br, cr, dr, er;
                ar = al = H[0];
                br = bl = H[1];
                cr = cl = H[2];
                dr = dl = H[3];
                er = el = H[4];
                var t;
                for (var i = 0; i < 80; i += 1) {
                    t = (al + M[offset + zl[i]]) | 0;
                    if (i < 16) {
                        t += f1(bl, cl, dl) + hl[0];
                    } else if (i < 32) {
                        t += f2(bl, cl, dl) + hl[1];
                    } else if (i < 48) {
                        t += f3(bl, cl, dl) + hl[2];
                    } else if (i < 64) {
                        t += f4(bl, cl, dl) + hl[3];
                    } else {
                        t += f5(bl, cl, dl) + hl[4];
                    }
                    t = t | 0;
                    t = rotl(t, sl[i]);
                    t = (t + el) | 0;
                    al = el;
                    el = dl;
                    dl = rotl(cl, 10);
                    cl = bl;
                    bl = t;
                    t = (ar + M[offset + zr[i]]) | 0;
                    if (i < 16) {
                        t += f5(br, cr, dr) + hr[0];
                    } else if (i < 32) {
                        t += f4(br, cr, dr) + hr[1];
                    } else if (i < 48) {
                        t += f3(br, cr, dr) + hr[2];
                    } else if (i < 64) {
                        t += f2(br, cr, dr) + hr[3];
                    } else {
                        t += f1(br, cr, dr) + hr[4];
                    }
                    t = t | 0;
                    t = rotl(t, sr[i]);
                    t = (t + er) | 0;
                    ar = er;
                    er = dr;
                    dr = rotl(cr, 10);
                    cr = br;
                    br = t;
                }
                t = (H[1] + cl + dr) | 0;
                H[1] = (H[2] + dl + er) | 0;
                H[2] = (H[3] + el + ar) | 0;
                H[3] = (H[4] + al + br) | 0;
                H[4] = (H[0] + bl + cr) | 0;
                H[0] = t;
            },
            _doFinalize: function() {
                var data = this._data;
                var dataWords = data.words;
                var nBitsTotal = this._nDataBytes * 8;
                var nBitsLeft = data.sigBytes * 8;
                dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
                dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = ((((nBitsTotal << 8) | (nBitsTotal >>> 24)) & 0x00ff00ff) | (((nBitsTotal << 24) | (nBitsTotal >>> 8)) & 0xff00ff00));
                data.sigBytes = (dataWords.length + 1) * 4;
                this._process();
                var hash = this._hash;
                var H = hash.words;
                for (var i = 0; i < 5; i++) {
                    var H_i = H[i];
                    H[i] = (((H_i << 8) | (H_i >>> 24)) & 0x00ff00ff) | (((H_i << 24) | (H_i >>> 8)) & 0xff00ff00);
                }
                return hash;
            },
            clone: function() {
                var clone = Hasher.clone.call(this);
                clone._hash = this._hash.clone();
                return clone;
            }
        });

        function f1(x, y, z) {
            return ((x) ^ (y) ^ (z));
        }

        function f2(x, y, z) {
            return (((x) & (y)) | ((~x) & (z)));
        }

        function f3(x, y, z) {
            return (((x) | (~ (y))) ^ (z));
        }

        function f4(x, y, z) {
            return (((x) & (z)) | ((y) & (~ (z))));
        }

        function f5(x, y, z) {
            return ((x) ^ ((y) | (~ (z))));
        }

        function rotl(x, n) {
            return (x << n) | (x >>> (32 - n));
        }
        C.RIPEMD160 = Hasher._createHelper(RIPEMD160);
        C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
    }(Math));
    (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var C_enc = C.enc;
        var Utf8 = C_enc.Utf8;
        var C_algo = C.algo;
        var HMAC = C_algo.HMAC = Base.extend({
            init: function(hasher, key) {
                hasher = this._hasher = new hasher.init();
                if (typeof key == 'string') {
                    key = Utf8.parse(key);
                }
                var hasherBlockSize = hasher.blockSize;
                var hasherBlockSizeBytes = hasherBlockSize * 4;
                if (key.sigBytes > hasherBlockSizeBytes) {
                    key = hasher.finalize(key);
                }
                key.clamp();
                var oKey = this._oKey = key.clone();
                var iKey = this._iKey = key.clone();
                var oKeyWords = oKey.words;
                var iKeyWords = iKey.words;
                for (var i = 0; i < hasherBlockSize; i++) {
                    oKeyWords[i] ^= 0x5c5c5c5c;
                    iKeyWords[i] ^= 0x36363636;
                }
                oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
                this.reset();
            },
            reset: function() {
                var hasher = this._hasher;
                hasher.reset();
                hasher.update(this._iKey);
            },
            update: function(messageUpdate) {
                this._hasher.update(messageUpdate);
                return this;
            },
            finalize: function(messageUpdate) {
                var hasher = this._hasher;
                var innerHash = hasher.finalize(messageUpdate);
                hasher.reset();
                var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));
                return hmac;
            }
        });
    }());
    (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var C_algo = C.algo;
        var SHA1 = C_algo.SHA1;
        var HMAC = C_algo.HMAC;
        var PBKDF2 = C_algo.PBKDF2 = Base.extend({
            cfg: Base.extend({
                keySize: 128 / 32,
                hasher: SHA1,
                iterations: 1
            }),
            init: function(cfg) {
                this.cfg = this.cfg.extend(cfg);
            },
            compute: function(password, salt) {
                var cfg = this.cfg;
                var hmac = HMAC.create(cfg.hasher, password);
                var derivedKey = WordArray.create();
                var blockIndex = WordArray.create([0x00000001]);
                var derivedKeyWords = derivedKey.words;
                var blockIndexWords = blockIndex.words;
                var keySize = cfg.keySize;
                var iterations = cfg.iterations;
                while (derivedKeyWords.length < keySize) {
                    var block = hmac.update(salt).finalize(blockIndex);
                    hmac.reset();
                    var blockWords = block.words;
                    var blockWordsLength = blockWords.length;
                    var intermediate = block;
                    for (var i = 1; i < iterations; i++) {
                        intermediate = hmac.finalize(intermediate);
                        hmac.reset();
                        var intermediateWords = intermediate.words;
                        for (var j = 0; j < blockWordsLength; j++) {
                            blockWords[j] ^= intermediateWords[j];
                        }
                    }
                    derivedKey.concat(block);
                    blockIndexWords[0]++;
                }
                derivedKey.sigBytes = keySize * 4;
                return derivedKey;
            }
        });
        C.PBKDF2 = function(password, salt, cfg) {
            return PBKDF2.create(cfg).compute(password, salt);
        };
    }());
    (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var C_algo = C.algo;
        var MD5 = C_algo.MD5;
        var EvpKDF = C_algo.EvpKDF = Base.extend({
            cfg: Base.extend({
                keySize: 128 / 32,
                hasher: MD5,
                iterations: 1
            }),
            init: function(cfg) {
                this.cfg = this.cfg.extend(cfg);
            },
            compute: function(password, salt) {
                var cfg = this.cfg;
                var hasher = cfg.hasher.create();
                var derivedKey = WordArray.create();
                var derivedKeyWords = derivedKey.words;
                var keySize = cfg.keySize;
                var iterations = cfg.iterations;
                while (derivedKeyWords.length < keySize) {
                    if (block) {
                        hasher.update(block);
                    }
                    var block = hasher.update(password).finalize(salt);
                    hasher.reset();
                    for (var i = 1; i < iterations; i++) {
                        block = hasher.finalize(block);
                        hasher.reset();
                    }
                    derivedKey.concat(block);
                }
                derivedKey.sigBytes = keySize * 4;
                return derivedKey;
            }
        });
        C.EvpKDF = function(password, salt, cfg) {
            return EvpKDF.create(cfg).compute(password, salt);
        };
    }());
    (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_algo = C.algo;
        var SHA256 = C_algo.SHA256;
        var SHA224 = C_algo.SHA224 = SHA256.extend({
            _doReset: function() {
                this._hash = new WordArray.init([0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939, 0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4]);
            },
            _doFinalize: function() {
                var hash = SHA256._doFinalize.call(this);
                hash.sigBytes -= 4;
                return hash;
            }
        });
        C.SHA224 = SHA256._createHelper(SHA224);
        C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
    }());
    (function(undefined) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var X32WordArray = C_lib.WordArray;
        var C_x64 = C.x64 = {};
        var X64Word = C_x64.Word = Base.extend({
            init: function(high, low) {
                this.high = high;
                this.low = low;
            }
        });
        var X64WordArray = C_x64.WordArray = Base.extend({
            init: function(words, sigBytes) {
                words = this.words = words || [];
                if (sigBytes != undefined) {
                    this.sigBytes = sigBytes;
                } else {
                    this.sigBytes = words.length * 8;
                }
            },
            toX32: function() {
                var x64Words = this.words;
                var x64WordsLength = x64Words.length;
                var x32Words = [];
                for (var i = 0; i < x64WordsLength; i++) {
                    var x64Word = x64Words[i];
                    x32Words.push(x64Word.high);
                    x32Words.push(x64Word.low);
                }
                return X32WordArray.create(x32Words, this.sigBytes);
            },
            clone: function() {
                var clone = Base.clone.call(this);
                var words = clone.words = this.words.slice(0);
                var wordsLength = words.length;
                for (var i = 0; i < wordsLength; i++) {
                    words[i] = words[i].clone();
                }
                return clone;
            }
        });
    }());
    (function(Math) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_x64 = C.x64;
        var X64Word = C_x64.Word;
        var C_algo = C.algo;
        var RHO_OFFSETS = [];
        var PI_INDEXES = [];
        var ROUND_CONSTANTS = [];
        (function() {
            var x = 1,
                y = 0;
            for (var t = 0; t < 24; t++) {
                RHO_OFFSETS[x + 5 * y] = ((t + 1) * (t + 2) / 2) % 64;
                var newX = y % 5;
                var newY = (2 * x + 3 * y) % 5;
                x = newX;
                y = newY;
            }
            for (var x = 0; x < 5; x++) {
                for (var y = 0; y < 5; y++) {
                    PI_INDEXES[x + 5 * y] = y + ((2 * x + 3 * y) % 5) * 5;
                }
            }
            var LFSR = 0x01;
            for (var i = 0; i < 24; i++) {
                var roundConstantMsw = 0;
                var roundConstantLsw = 0;
                for (var j = 0; j < 7; j++) {
                    if (LFSR & 0x01) {
                        var bitPosition = (1 << j) - 1;
                        if (bitPosition < 32) {
                            roundConstantLsw ^= 1 << bitPosition;
                        } else {
                            roundConstantMsw ^= 1 << (bitPosition - 32);
                        }
                    }
                    if (LFSR & 0x80) {
                        LFSR = (LFSR << 1) ^ 0x71;
                    } else {
                        LFSR <<= 1;
                    }
                }
                ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
            }
        }());
        var T = [];
        (function() {
            for (var i = 0; i < 25; i++) {
                T[i] = X64Word.create();
            }
        }());
        var SHA3 = C_algo.SHA3 = Hasher.extend({
            cfg: Hasher.cfg.extend({
                outputLength: 512
            }),
            _doReset: function() {
                var state = this._state = []
                for (var i = 0; i < 25; i++) {
                    state[i] = new X64Word.init();
                }
                this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
            },
            _doProcessBlock: function(M, offset) {
                var state = this._state;
                var nBlockSizeLanes = this.blockSize / 2;
                for (var i = 0; i < nBlockSizeLanes; i++) {
                    var M2i = M[offset + 2 * i];
                    var M2i1 = M[offset + 2 * i + 1];
                    M2i = ((((M2i << 8) | (M2i >>> 24)) & 0x00ff00ff) | (((M2i << 24) | (M2i >>> 8)) & 0xff00ff00));
                    M2i1 = ((((M2i1 << 8) | (M2i1 >>> 24)) & 0x00ff00ff) | (((M2i1 << 24) | (M2i1 >>> 8)) & 0xff00ff00));
                    var lane = state[i];
                    lane.high ^= M2i1;
                    lane.low ^= M2i;
                }
                for (var round = 0; round < 24; round++) {
                    for (var x = 0; x < 5; x++) {
                        var tMsw = 0,
                            tLsw = 0;
                        for (var y = 0; y < 5; y++) {
                            var lane = state[x + 5 * y];
                            tMsw ^= lane.high;
                            tLsw ^= lane.low;
                        }
                        var Tx = T[x];
                        Tx.high = tMsw;
                        Tx.low = tLsw;
                    }
                    for (var x = 0; x < 5; x++) {
                        var Tx4 = T[(x + 4) % 5];
                        var Tx1 = T[(x + 1) % 5];
                        var Tx1Msw = Tx1.high;
                        var Tx1Lsw = Tx1.low;
                        var tMsw = Tx4.high ^ ((Tx1Msw << 1) | (Tx1Lsw >>> 31));
                        var tLsw = Tx4.low ^ ((Tx1Lsw << 1) | (Tx1Msw >>> 31));
                        for (var y = 0; y < 5; y++) {
                            var lane = state[x + 5 * y];
                            lane.high ^= tMsw;
                            lane.low ^= tLsw;
                        }
                    }
                    for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
                        var lane = state[laneIndex];
                        var laneMsw = lane.high;
                        var laneLsw = lane.low;
                        var rhoOffset = RHO_OFFSETS[laneIndex];
                        if (rhoOffset < 32) {
                            var tMsw = (laneMsw << rhoOffset) | (laneLsw >>> (32 - rhoOffset));
                            var tLsw = (laneLsw << rhoOffset) | (laneMsw >>> (32 - rhoOffset));
                        } else {
                            var tMsw = (laneLsw << (rhoOffset - 32)) | (laneMsw >>> (64 - rhoOffset));
                            var tLsw = (laneMsw << (rhoOffset - 32)) | (laneLsw >>> (64 - rhoOffset));
                        }
                        var TPiLane = T[PI_INDEXES[laneIndex]];
                        TPiLane.high = tMsw;
                        TPiLane.low = tLsw;
                    }
                    var T0 = T[0];
                    var state0 = state[0];
                    T0.high = state0.high;
                    T0.low = state0.low;
                    for (var x = 0; x < 5; x++) {
                        for (var y = 0; y < 5; y++) {
                            var laneIndex = x + 5 * y;
                            var lane = state[laneIndex];
                            var TLane = T[laneIndex];
                            var Tx1Lane = T[((x + 1) % 5) + 5 * y];
                            var Tx2Lane = T[((x + 2) % 5) + 5 * y];
                            lane.high = TLane.high ^ (~Tx1Lane.high & Tx2Lane.high);
                            lane.low = TLane.low ^ (~Tx1Lane.low & Tx2Lane.low);
                        }
                    }
                    var lane = state[0];
                    var roundConstant = ROUND_CONSTANTS[round];
                    lane.high ^= roundConstant.high;
                    lane.low ^= roundConstant.low;;
                }
            },
            _doFinalize: function() {
                var data = this._data;
                var dataWords = data.words;
                var nBitsTotal = this._nDataBytes * 8;
                var nBitsLeft = data.sigBytes * 8;
                var blockSizeBits = this.blockSize * 32;
                dataWords[nBitsLeft >>> 5] |= 0x1 << (24 - nBitsLeft % 32);
                dataWords[((Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits) >>> 5) - 1] |= 0x80;
                data.sigBytes = dataWords.length * 4;
                this._process();
                var state = this._state;
                var outputLengthBytes = this.cfg.outputLength / 8;
                var outputLengthLanes = outputLengthBytes / 8;
                var hashWords = [];
                for (var i = 0; i < outputLengthLanes; i++) {
                    var lane = state[i];
                    var laneMsw = lane.high;
                    var laneLsw = lane.low;
                    laneMsw = ((((laneMsw << 8) | (laneMsw >>> 24)) & 0x00ff00ff) | (((laneMsw << 24) | (laneMsw >>> 8)) & 0xff00ff00));
                    laneLsw = ((((laneLsw << 8) | (laneLsw >>> 24)) & 0x00ff00ff) | (((laneLsw << 24) | (laneLsw >>> 8)) & 0xff00ff00));
                    hashWords.push(laneLsw);
                    hashWords.push(laneMsw);
                }
                return new WordArray.init(hashWords, outputLengthBytes);
            },
            clone: function() {
                var clone = Hasher.clone.call(this);
                var state = clone._state = this._state.slice(0);
                for (var i = 0; i < 25; i++) {
                    state[i] = state[i].clone();
                }
                return clone;
            }
        });
        C.SHA3 = Hasher._createHelper(SHA3);
        C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
    }(Math));
    (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Hasher = C_lib.Hasher;
        var C_x64 = C.x64;
        var X64Word = C_x64.Word;
        var X64WordArray = C_x64.WordArray;
        var C_algo = C.algo;

        function X64Word_create() {
            return X64Word.create.apply(X64Word, arguments);
        }
        var K = [X64Word_create(0x428a2f98, 0xd728ae22), X64Word_create(0x71374491, 0x23ef65cd), X64Word_create(0xb5c0fbcf, 0xec4d3b2f), X64Word_create(0xe9b5dba5, 0x8189dbbc), X64Word_create(0x3956c25b, 0xf348b538), X64Word_create(0x59f111f1, 0xb605d019), X64Word_create(0x923f82a4, 0xaf194f9b), X64Word_create(0xab1c5ed5, 0xda6d8118), X64Word_create(0xd807aa98, 0xa3030242), X64Word_create(0x12835b01, 0x45706fbe), X64Word_create(0x243185be, 0x4ee4b28c), X64Word_create(0x550c7dc3, 0xd5ffb4e2), X64Word_create(0x72be5d74, 0xf27b896f), X64Word_create(0x80deb1fe, 0x3b1696b1), X64Word_create(0x9bdc06a7, 0x25c71235), X64Word_create(0xc19bf174, 0xcf692694), X64Word_create(0xe49b69c1, 0x9ef14ad2), X64Word_create(0xefbe4786, 0x384f25e3), X64Word_create(0x0fc19dc6, 0x8b8cd5b5), X64Word_create(0x240ca1cc, 0x77ac9c65), X64Word_create(0x2de92c6f, 0x592b0275), X64Word_create(0x4a7484aa, 0x6ea6e483), X64Word_create(0x5cb0a9dc, 0xbd41fbd4), X64Word_create(0x76f988da, 0x831153b5), X64Word_create(0x983e5152, 0xee66dfab), X64Word_create(0xa831c66d, 0x2db43210), X64Word_create(0xb00327c8, 0x98fb213f), X64Word_create(0xbf597fc7, 0xbeef0ee4), X64Word_create(0xc6e00bf3, 0x3da88fc2), X64Word_create(0xd5a79147, 0x930aa725), X64Word_create(0x06ca6351, 0xe003826f), X64Word_create(0x14292967, 0x0a0e6e70), X64Word_create(0x27b70a85, 0x46d22ffc), X64Word_create(0x2e1b2138, 0x5c26c926), X64Word_create(0x4d2c6dfc, 0x5ac42aed), X64Word_create(0x53380d13, 0x9d95b3df), X64Word_create(0x650a7354, 0x8baf63de), X64Word_create(0x766a0abb, 0x3c77b2a8), X64Word_create(0x81c2c92e, 0x47edaee6), X64Word_create(0x92722c85, 0x1482353b), X64Word_create(0xa2bfe8a1, 0x4cf10364), X64Word_create(0xa81a664b, 0xbc423001), X64Word_create(0xc24b8b70, 0xd0f89791), X64Word_create(0xc76c51a3, 0x0654be30), X64Word_create(0xd192e819, 0xd6ef5218), X64Word_create(0xd6990624, 0x5565a910), X64Word_create(0xf40e3585, 0x5771202a), X64Word_create(0x106aa070, 0x32bbd1b8), X64Word_create(0x19a4c116, 0xb8d2d0c8), X64Word_create(0x1e376c08, 0x5141ab53), X64Word_create(0x2748774c, 0xdf8eeb99), X64Word_create(0x34b0bcb5, 0xe19b48a8), X64Word_create(0x391c0cb3, 0xc5c95a63), X64Word_create(0x4ed8aa4a, 0xe3418acb), X64Word_create(0x5b9cca4f, 0x7763e373), X64Word_create(0x682e6ff3, 0xd6b2b8a3), X64Word_create(0x748f82ee, 0x5defb2fc), X64Word_create(0x78a5636f, 0x43172f60), X64Word_create(0x84c87814, 0xa1f0ab72), X64Word_create(0x8cc70208, 0x1a6439ec), X64Word_create(0x90befffa, 0x23631e28), X64Word_create(0xa4506ceb, 0xde82bde9), X64Word_create(0xbef9a3f7, 0xb2c67915), X64Word_create(0xc67178f2, 0xe372532b), X64Word_create(0xca273ece, 0xea26619c), X64Word_create(0xd186b8c7, 0x21c0c207), X64Word_create(0xeada7dd6, 0xcde0eb1e), X64Word_create(0xf57d4f7f, 0xee6ed178), X64Word_create(0x06f067aa, 0x72176fba), X64Word_create(0x0a637dc5, 0xa2c898a6), X64Word_create(0x113f9804, 0xbef90dae), X64Word_create(0x1b710b35, 0x131c471b), X64Word_create(0x28db77f5, 0x23047d84), X64Word_create(0x32caab7b, 0x40c72493), X64Word_create(0x3c9ebe0a, 0x15c9bebc), X64Word_create(0x431d67c4, 0x9c100d4c), X64Word_create(0x4cc5d4be, 0xcb3e42b6), X64Word_create(0x597f299c, 0xfc657e2a), X64Word_create(0x5fcb6fab, 0x3ad6faec), X64Word_create(0x6c44198c, 0x4a475817)];
        var W = [];
        (function() {
            for (var i = 0; i < 80; i++) {
                W[i] = X64Word_create();
            }
        }());
        var SHA512 = C_algo.SHA512 = Hasher.extend({
            _doReset: function() {
                this._hash = new X64WordArray.init([new X64Word.init(0x6a09e667, 0xf3bcc908), new X64Word.init(0xbb67ae85, 0x84caa73b), new X64Word.init(0x3c6ef372, 0xfe94f82b), new X64Word.init(0xa54ff53a, 0x5f1d36f1), new X64Word.init(0x510e527f, 0xade682d1), new X64Word.init(0x9b05688c, 0x2b3e6c1f), new X64Word.init(0x1f83d9ab, 0xfb41bd6b), new X64Word.init(0x5be0cd19, 0x137e2179)]);
            },
            _doProcessBlock: function(M, offset) {
                var H = this._hash.words;
                var H0 = H[0];
                var H1 = H[1];
                var H2 = H[2];
                var H3 = H[3];
                var H4 = H[4];
                var H5 = H[5];
                var H6 = H[6];
                var H7 = H[7];
                var H0h = H0.high;
                var H0l = H0.low;
                var H1h = H1.high;
                var H1l = H1.low;
                var H2h = H2.high;
                var H2l = H2.low;
                var H3h = H3.high;
                var H3l = H3.low;
                var H4h = H4.high;
                var H4l = H4.low;
                var H5h = H5.high;
                var H5l = H5.low;
                var H6h = H6.high;
                var H6l = H6.low;
                var H7h = H7.high;
                var H7l = H7.low;
                var ah = H0h;
                var al = H0l;
                var bh = H1h;
                var bl = H1l;
                var ch = H2h;
                var cl = H2l;
                var dh = H3h;
                var dl = H3l;
                var eh = H4h;
                var el = H4l;
                var fh = H5h;
                var fl = H5l;
                var gh = H6h;
                var gl = H6l;
                var hh = H7h;
                var hl = H7l;
                for (var i = 0; i < 80; i++) {
                    var Wi = W[i];
                    if (i < 16) {
                        var Wih = Wi.high = M[offset + i * 2] | 0;
                        var Wil = Wi.low = M[offset + i * 2 + 1] | 0;
                    } else {
                        var gamma0x = W[i - 15];
                        var gamma0xh = gamma0x.high;
                        var gamma0xl = gamma0x.low;
                        var gamma0h = ((gamma0xh >>> 1) | (gamma0xl << 31)) ^ ((gamma0xh >>> 8) | (gamma0xl << 24)) ^ (gamma0xh >>> 7);
                        var gamma0l = ((gamma0xl >>> 1) | (gamma0xh << 31)) ^ ((gamma0xl >>> 8) | (gamma0xh << 24)) ^ ((gamma0xl >>> 7) | (gamma0xh << 25));
                        var gamma1x = W[i - 2];
                        var gamma1xh = gamma1x.high;
                        var gamma1xl = gamma1x.low;
                        var gamma1h = ((gamma1xh >>> 19) | (gamma1xl << 13)) ^ ((gamma1xh << 3) | (gamma1xl >>> 29)) ^ (gamma1xh >>> 6);
                        var gamma1l = ((gamma1xl >>> 19) | (gamma1xh << 13)) ^ ((gamma1xl << 3) | (gamma1xh >>> 29)) ^ ((gamma1xl >>> 6) | (gamma1xh << 26));
                        var Wi7 = W[i - 7];
                        var Wi7h = Wi7.high;
                        var Wi7l = Wi7.low;
                        var Wi16 = W[i - 16];
                        var Wi16h = Wi16.high;
                        var Wi16l = Wi16.low;
                        var Wil = gamma0l + Wi7l;
                        var Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);
                        var Wil = Wil + gamma1l;
                        var Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);
                        var Wil = Wil + Wi16l;
                        var Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);
                        Wi.high = Wih;
                        Wi.low = Wil;
                    }
                    var chh = (eh & fh) ^ (~eh & gh);
                    var chl = (el & fl) ^ (~el & gl);
                    var majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
                    var majl = (al & bl) ^ (al & cl) ^ (bl & cl);
                    var sigma0h = ((ah >>> 28) | (al << 4)) ^ ((ah << 30) | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));
                    var sigma0l = ((al >>> 28) | (ah << 4)) ^ ((al << 30) | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));
                    var sigma1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((eh << 23) | (el >>> 9));
                    var sigma1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((el << 23) | (eh >>> 9));
                    var Ki = K[i];
                    var Kih = Ki.high;
                    var Kil = Ki.low;
                    var t1l = hl + sigma1l;
                    var t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
                    var t1l = t1l + chl;
                    var t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
                    var t1l = t1l + Kil;
                    var t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);
                    var t1l = t1l + Wil;
                    var t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);
                    var t2l = sigma0l + majl;
                    var t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);
                    hh = gh;
                    hl = gl;
                    gh = fh;
                    gl = fl;
                    fh = eh;
                    fl = el;
                    el = (dl + t1l) | 0;
                    eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
                    dh = ch;
                    dl = cl;
                    ch = bh;
                    cl = bl;
                    bh = ah;
                    bl = al;
                    al = (t1l + t2l) | 0;
                    ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
                }
                H0l = H0.low = (H0l + al);
                H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0));
                H1l = H1.low = (H1l + bl);
                H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0));
                H2l = H2.low = (H2l + cl);
                H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0));
                H3l = H3.low = (H3l + dl);
                H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0));
                H4l = H4.low = (H4l + el);
                H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0));
                H5l = H5.low = (H5l + fl);
                H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0));
                H6l = H6.low = (H6l + gl);
                H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0));
                H7l = H7.low = (H7l + hl);
                H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0));
            },
            _doFinalize: function() {
                var data = this._data;
                var dataWords = data.words;
                var nBitsTotal = this._nDataBytes * 8;
                var nBitsLeft = data.sigBytes * 8;
                dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
                dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
                dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
                data.sigBytes = dataWords.length * 4;
                this._process();
                var hash = this._hash.toX32();
                return hash;
            },
            clone: function() {
                var clone = Hasher.clone.call(this);
                clone._hash = this._hash.clone();
                return clone;
            },
            blockSize: 1024 / 32
        });
        C.SHA512 = Hasher._createHelper(SHA512);
        C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
    }());
    (function() {
        var C = CryptoJS;
        var C_x64 = C.x64;
        var X64Word = C_x64.Word;
        var X64WordArray = C_x64.WordArray;
        var C_algo = C.algo;
        var SHA512 = C_algo.SHA512;
        var SHA384 = C_algo.SHA384 = SHA512.extend({
            _doReset: function() {
                this._hash = new X64WordArray.init([new X64Word.init(0xcbbb9d5d, 0xc1059ed8), new X64Word.init(0x629a292a, 0x367cd507), new X64Word.init(0x9159015a, 0x3070dd17), new X64Word.init(0x152fecd8, 0xf70e5939), new X64Word.init(0x67332667, 0xffc00b31), new X64Word.init(0x8eb44a87, 0x68581511), new X64Word.init(0xdb0c2e0d, 0x64f98fa7), new X64Word.init(0x47b5481d, 0xbefa4fa4)]);
            },
            _doFinalize: function() {
                var hash = SHA512._doFinalize.call(this);
                hash.sigBytes -= 16;
                return hash;
            }
        });
        C.SHA384 = SHA512._createHelper(SHA384);
        C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
    }());
    CryptoJS.lib.Cipher || (function(undefined) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
        var C_enc = C.enc;
        var Utf8 = C_enc.Utf8;
        var Base64 = C_enc.Base64;
        var C_algo = C.algo;
        var EvpKDF = C_algo.EvpKDF;
        var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
            cfg: Base.extend(),
            createEncryptor: function(key, cfg) {
                return this.create(this._ENC_XFORM_MODE, key, cfg);
            },
            createDecryptor: function(key, cfg) {
                return this.create(this._DEC_XFORM_MODE, key, cfg);
            },
            init: function(xformMode, key, cfg) {
                this.cfg = this.cfg.extend(cfg);
                this._xformMode = xformMode;
                this._key = key;
                this.reset();
            },
            reset: function() {
                BufferedBlockAlgorithm.reset.call(this);
                this._doReset();
            },
            process: function(dataUpdate) {
                this._append(dataUpdate);
                return this._process();
            },
            finalize: function(dataUpdate) {
                if (dataUpdate) {
                    this._append(dataUpdate);
                }
                var finalProcessedData = this._doFinalize();
                return finalProcessedData;
            },
            keySize: 128 / 32,
            ivSize: 128 / 32,
            _ENC_XFORM_MODE: 1,
            _DEC_XFORM_MODE: 2,
            _createHelper: (function() {
                function selectCipherStrategy(key) {
                    if (typeof key == 'string') {
                        return PasswordBasedCipher;
                    } else {
                        return SerializableCipher;
                    }
                }
                return function(cipher) {
                    return {
                        encrypt: function(message, key, cfg) {
                            return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
                        },
                        decrypt: function(ciphertext, key, cfg) {
                            return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
                        }
                    };
                };
            }())
        });
        var StreamCipher = C_lib.StreamCipher = Cipher.extend({
            _doFinalize: function() {
                var finalProcessedBlocks = this._process( !! 'flush');
                return finalProcessedBlocks;
            },
            blockSize: 1
        });
        var C_mode = C.mode = {};
        var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
            createEncryptor: function(cipher, iv) {
                return this.Encryptor.create(cipher, iv);
            },
            createDecryptor: function(cipher, iv) {
                return this.Decryptor.create(cipher, iv);
            },
            init: function(cipher, iv) {
                this._cipher = cipher;
                this._iv = iv;
            }
        });
        var CBC = C_mode.CBC = (function() {
            var CBC = BlockCipherMode.extend();
            CBC.Encryptor = CBC.extend({
                processBlock: function(words, offset) {
                    var cipher = this._cipher;
                    var blockSize = cipher.blockSize;
                    xorBlock.call(this, words, offset, blockSize);
                    cipher.encryptBlock(words, offset);
                    this._prevBlock = words.slice(offset, offset + blockSize);
                }
            });
            CBC.Decryptor = CBC.extend({
                processBlock: function(words, offset) {
                    var cipher = this._cipher;
                    var blockSize = cipher.blockSize;
                    var thisBlock = words.slice(offset, offset + blockSize);
                    cipher.decryptBlock(words, offset);
                    xorBlock.call(this, words, offset, blockSize);
                    this._prevBlock = thisBlock;
                }
            });

            function xorBlock(words, offset, blockSize) {
                var iv = this._iv;
                if (iv) {
                    var block = iv;
                    this._iv = undefined;
                } else {
                    var block = this._prevBlock;
                }
                for (var i = 0; i < blockSize; i++) {
                    words[offset + i] ^= block[i];
                }
            }
            return CBC;
        }());
        var C_pad = C.pad = {};
        var Pkcs7 = C_pad.Pkcs7 = {
            pad: function(data, blockSize) {
                var blockSizeBytes = blockSize * 4;
                var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
                var paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;
                var paddingWords = [];
                for (var i = 0; i < nPaddingBytes; i += 4) {
                    paddingWords.push(paddingWord);
                }
                var padding = WordArray.create(paddingWords, nPaddingBytes);
                data.concat(padding);
            },
            unpad: function(data) {
                var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;
                data.sigBytes -= nPaddingBytes;
            }
        };
        var BlockCipher = C_lib.BlockCipher = Cipher.extend({
            cfg: Cipher.cfg.extend({
                mode: CBC,
                padding: Pkcs7
            }),
            reset: function() {
                Cipher.reset.call(this);
                var cfg = this.cfg;
                var iv = cfg.iv;
                var mode = cfg.mode;
                if (this._xformMode == this._ENC_XFORM_MODE) {
                    var modeCreator = mode.createEncryptor;
                } else {
                    var modeCreator = mode.createDecryptor;
                    this._minBufferSize = 1;
                }
                if (this._mode && this._mode.__creator == modeCreator) {
                    this._mode.init(this, iv && iv.words);
                } else {
                    this._mode = modeCreator.call(mode, this, iv && iv.words);
                    this._mode.__creator = modeCreator;
                }
            },
            _doProcessBlock: function(words, offset) {
                this._mode.processBlock(words, offset);
            },
            _doFinalize: function() {
                var padding = this.cfg.padding;
                if (this._xformMode == this._ENC_XFORM_MODE) {
                    padding.pad(this._data, this.blockSize);
                    var finalProcessedBlocks = this._process( !! 'flush');
                } else {
                    var finalProcessedBlocks = this._process( !! 'flush');
                    padding.unpad(finalProcessedBlocks);
                }
                return finalProcessedBlocks;
            },
            blockSize: 128 / 32
        });
        var CipherParams = C_lib.CipherParams = Base.extend({
            init: function(cipherParams) {
                this.mixIn(cipherParams);
            },
            toString: function(formatter) {
                return (formatter || this.formatter).stringify(this);
            }
        });
        var C_format = C.format = {};
        var OpenSSLFormatter = C_format.OpenSSL = {
            stringify: function(cipherParams) {
                var ciphertext = cipherParams.ciphertext;
                var salt = cipherParams.salt;
                if (salt) {
                    var wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
                } else {
                    var wordArray = ciphertext;
                }
                return wordArray.toString(Base64);
            },
            parse: function(openSSLStr) {
                var ciphertext = Base64.parse(openSSLStr);
                var ciphertextWords = ciphertext.words;
                if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
                    var salt = WordArray.create(ciphertextWords.slice(2, 4));
                    ciphertextWords.splice(0, 4);
                    ciphertext.sigBytes -= 16;
                }
                return CipherParams.create({
                    ciphertext: ciphertext,
                    salt: salt
                });
            }
        };
        var SerializableCipher = C_lib.SerializableCipher = Base.extend({
            cfg: Base.extend({
                format: OpenSSLFormatter
            }),
            encrypt: function(cipher, message, key, cfg) {
                cfg = this.cfg.extend(cfg);
                var encryptor = cipher.createEncryptor(key, cfg);
                var ciphertext = encryptor.finalize(message);
                var cipherCfg = encryptor.cfg;
                return CipherParams.create({
                    ciphertext: ciphertext,
                    key: key,
                    iv: cipherCfg.iv,
                    algorithm: cipher,
                    mode: cipherCfg.mode,
                    padding: cipherCfg.padding,
                    blockSize: cipher.blockSize,
                    formatter: cfg.format
                });
            },
            decrypt: function(cipher, ciphertext, key, cfg) {
                cfg = this.cfg.extend(cfg);
                ciphertext = this._parse(ciphertext, cfg.format);
                var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
                return plaintext;
            },
            _parse: function(ciphertext, format) {
                if (typeof ciphertext == 'string') {
                    return format.parse(ciphertext, this);
                } else {
                    return ciphertext;
                }
            }
        });
        var C_kdf = C.kdf = {};
        var OpenSSLKdf = C_kdf.OpenSSL = {
            execute: function(password, keySize, ivSize, salt) {
                if (!salt) {
                    salt = WordArray.random(64 / 8);
                }
                var key = EvpKDF.create({
                    keySize: keySize + ivSize
                }).compute(password, salt);
                var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
                key.sigBytes = keySize * 4;
                return CipherParams.create({
                    key: key,
                    iv: iv,
                    salt: salt
                });
            }
        };
        var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
            cfg: SerializableCipher.cfg.extend({
                kdf: OpenSSLKdf
            }),
            encrypt: function(cipher, message, password, cfg) {
                cfg = this.cfg.extend(cfg);
                var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);
                cfg.iv = derivedParams.iv;
                var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);
                ciphertext.mixIn(derivedParams);
                return ciphertext;
            },
            decrypt: function(cipher, ciphertext, password, cfg) {
                cfg = this.cfg.extend(cfg);
                ciphertext = this._parse(ciphertext, cfg.format);
                var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);
                cfg.iv = derivedParams.iv;
                var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
                return plaintext;
            }
        });
    }());
    CryptoJS.mode.CFB = (function() {
        var CFB = CryptoJS.lib.BlockCipherMode.extend();
        CFB.Encryptor = CFB.extend({
            processBlock: function(words, offset) {
                var cipher = this._cipher;
                var blockSize = cipher.blockSize;
                generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
                this._prevBlock = words.slice(offset, offset + blockSize);
            }
        });
        CFB.Decryptor = CFB.extend({
            processBlock: function(words, offset) {
                var cipher = this._cipher;
                var blockSize = cipher.blockSize;
                var thisBlock = words.slice(offset, offset + blockSize);
                generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
                this._prevBlock = thisBlock;
            }
        });

        function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
            var iv = this._iv;
            if (iv) {
                var keystream = iv.slice(0);
                this._iv = undefined;
            } else {
                var keystream = this._prevBlock;
            }
            cipher.encryptBlock(keystream, 0);
            for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
            }
        }
        return CFB;
    }());
    CryptoJS.mode.ECB = (function() {
        var ECB = CryptoJS.lib.BlockCipherMode.extend();
        ECB.Encryptor = ECB.extend({
            processBlock: function(words, offset) {
                this._cipher.encryptBlock(words, offset);
            }
        });
        ECB.Decryptor = ECB.extend({
            processBlock: function(words, offset) {
                this._cipher.decryptBlock(words, offset);
            }
        });
        return ECB;
    }());
    CryptoJS.pad.AnsiX923 = {
        pad: function(data, blockSize) {
            var dataSigBytes = data.sigBytes;
            var blockSizeBytes = blockSize * 4;
            var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;
            var lastBytePos = dataSigBytes + nPaddingBytes - 1;
            data.clamp();
            data.words[lastBytePos >>> 2] |= nPaddingBytes << (24 - (lastBytePos % 4) * 8);
            data.sigBytes += nPaddingBytes;
        },
        unpad: function(data) {
            var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;
            data.sigBytes -= nPaddingBytes;
        }
    };
    CryptoJS.pad.Iso10126 = {
        pad: function(data, blockSize) {
            var blockSizeBytes = blockSize * 4;
            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
            data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));
        },
        unpad: function(data) {
            var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;
            data.sigBytes -= nPaddingBytes;
        }
    };
    CryptoJS.pad.Iso97971 = {
        pad: function(data, blockSize) {
            data.concat(CryptoJS.lib.WordArray.create([0x80000000], 1));
            CryptoJS.pad.ZeroPadding.pad(data, blockSize);
        },
        unpad: function(data) {
            CryptoJS.pad.ZeroPadding.unpad(data);
            data.sigBytes--;
        }
    };
    CryptoJS.mode.OFB = (function() {
        var OFB = CryptoJS.lib.BlockCipherMode.extend();
        var Encryptor = OFB.Encryptor = OFB.extend({
            processBlock: function(words, offset) {
                var cipher = this._cipher
                var blockSize = cipher.blockSize;
                var iv = this._iv;
                var keystream = this._keystream;
                if (iv) {
                    keystream = this._keystream = iv.slice(0);
                    this._iv = undefined;
                }
                cipher.encryptBlock(keystream, 0);
                for (var i = 0; i < blockSize; i++) {
                    words[offset + i] ^= keystream[i];
                }
            }
        });
        OFB.Decryptor = Encryptor;
        return OFB;
    }());
    CryptoJS.pad.NoPadding = {
        pad: function() {},
        unpad: function() {}
    };
    (function(undefined) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var CipherParams = C_lib.CipherParams;
        var C_enc = C.enc;
        var Hex = C_enc.Hex;
        var C_format = C.format;
        var HexFormatter = C_format.Hex = {
            stringify: function(cipherParams) {
                return cipherParams.ciphertext.toString(Hex);
            },
            parse: function(input) {
                var ciphertext = Hex.parse(input);
                return CipherParams.create({
                    ciphertext: ciphertext
                });
            }
        };
    }());
    (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var BlockCipher = C_lib.BlockCipher;
        var C_algo = C.algo;
        var SBOX = [];
        var INV_SBOX = [];
        var SUB_MIX_0 = [];
        var SUB_MIX_1 = [];
        var SUB_MIX_2 = [];
        var SUB_MIX_3 = [];
        var INV_SUB_MIX_0 = [];
        var INV_SUB_MIX_1 = [];
        var INV_SUB_MIX_2 = [];
        var INV_SUB_MIX_3 = [];
        (function() {
            var d = [];
            for (var i = 0; i < 256; i++) {
                if (i < 128) {
                    d[i] = i << 1;
                } else {
                    d[i] = (i << 1) ^ 0x11b;
                }
            }
            var x = 0;
            var xi = 0;
            for (var i = 0; i < 256; i++) {
                var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
                sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
                SBOX[x] = sx;
                INV_SBOX[sx] = x;
                var x2 = d[x];
                var x4 = d[x2];
                var x8 = d[x4];
                var t = (d[sx] * 0x101) ^ (sx * 0x1010100);
                SUB_MIX_0[x] = (t << 24) | (t >>> 8);
                SUB_MIX_1[x] = (t << 16) | (t >>> 16);
                SUB_MIX_2[x] = (t << 8) | (t >>> 24);
                SUB_MIX_3[x] = t;
                var t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
                INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
                INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
                INV_SUB_MIX_2[sx] = (t << 8) | (t >>> 24);
                INV_SUB_MIX_3[sx] = t;
                if (!x) {
                    x = xi = 1;
                } else {
                    x = x2 ^ d[d[d[x8 ^ x2]]];
                    xi ^= d[d[xi]];
                }
            }
        }());
        var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];
        var AES = C_algo.AES = BlockCipher.extend({
            _doReset: function() {
                if (this._nRounds && this._keyPriorReset === this._key) {
                    return;
                }
                var key = this._keyPriorReset = this._key;
                var keyWords = key.words;
                var keySize = key.sigBytes / 4;
                var nRounds = this._nRounds = keySize + 6;
                var ksRows = (nRounds + 1) * 4;
                var keySchedule = this._keySchedule = [];
                for (var ksRow = 0; ksRow < ksRows; ksRow++) {
                    if (ksRow < keySize) {
                        keySchedule[ksRow] = keyWords[ksRow];
                    } else {
                        var t = keySchedule[ksRow - 1];
                        if (!(ksRow % keySize)) {
                            t = (t << 8) | (t >>> 24);
                            t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
                            t ^= RCON[(ksRow / keySize) | 0] << 24;
                        } else if (keySize > 6 && ksRow % keySize == 4) {
                            t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
                        }
                        keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
                    }
                }
                var invKeySchedule = this._invKeySchedule = [];
                for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
                    var ksRow = ksRows - invKsRow;
                    if (invKsRow % 4) {
                        var t = keySchedule[ksRow];
                    } else {
                        var t = keySchedule[ksRow - 4];
                    }
                    if (invKsRow < 4 || ksRow <= 4) {
                        invKeySchedule[invKsRow] = t;
                    } else {
                        invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^ INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
                    }
                }
            },
            encryptBlock: function(M, offset) {
                this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
            },
            decryptBlock: function(M, offset) {
                var t = M[offset + 1];
                M[offset + 1] = M[offset + 3];
                M[offset + 3] = t;
                this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
                var t = M[offset + 1];
                M[offset + 1] = M[offset + 3];
                M[offset + 3] = t;
            },
            _doCryptBlock: function(M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
                var nRounds = this._nRounds;
                var s0 = M[offset] ^ keySchedule[0];
                var s1 = M[offset + 1] ^ keySchedule[1];
                var s2 = M[offset + 2] ^ keySchedule[2];
                var s3 = M[offset + 3] ^ keySchedule[3];
                var ksRow = 4;
                for (var round = 1; round < nRounds; round++) {
                    var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[(s1 >>> 16) & 0xff] ^ SUB_MIX_2[(s2 >>> 8) & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
                    var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[(s2 >>> 16) & 0xff] ^ SUB_MIX_2[(s3 >>> 8) & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
                    var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[(s3 >>> 16) & 0xff] ^ SUB_MIX_2[(s0 >>> 8) & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
                    var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[(s0 >>> 16) & 0xff] ^ SUB_MIX_2[(s1 >>> 8) & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];
                    s0 = t0;
                    s1 = t1;
                    s2 = t2;
                    s3 = t3;
                }
                var t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
                var t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
                var t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
                var t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];
                M[offset] = t0;
                M[offset + 1] = t1;
                M[offset + 2] = t2;
                M[offset + 3] = t3;
            },
            keySize: 256 / 32
        });
        C.AES = BlockCipher._createHelper(AES);
    }());
    (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var BlockCipher = C_lib.BlockCipher;
        var C_algo = C.algo;
        var PC1 = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4];
        var PC2 = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32];
        var BIT_SHIFTS = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];
        var SBOX_P = [{
            0x0: 0x808200,
            0x10000000: 0x8000,
            0x20000000: 0x808002,
            0x30000000: 0x2,
            0x40000000: 0x200,
            0x50000000: 0x808202,
            0x60000000: 0x800202,
            0x70000000: 0x800000,
            0x80000000: 0x202,
            0x90000000: 0x800200,
            0xa0000000: 0x8200,
            0xb0000000: 0x808000,
            0xc0000000: 0x8002,
            0xd0000000: 0x800002,
            0xe0000000: 0x0,
            0xf0000000: 0x8202,
            0x8000000: 0x0,
            0x18000000: 0x808202,
            0x28000000: 0x8202,
            0x38000000: 0x8000,
            0x48000000: 0x808200,
            0x58000000: 0x200,
            0x68000000: 0x808002,
            0x78000000: 0x2,
            0x88000000: 0x800200,
            0x98000000: 0x8200,
            0xa8000000: 0x808000,
            0xb8000000: 0x800202,
            0xc8000000: 0x800002,
            0xd8000000: 0x8002,
            0xe8000000: 0x202,
            0xf8000000: 0x800000,
            0x1: 0x8000,
            0x10000001: 0x2,
            0x20000001: 0x808200,
            0x30000001: 0x800000,
            0x40000001: 0x808002,
            0x50000001: 0x8200,
            0x60000001: 0x200,
            0x70000001: 0x800202,
            0x80000001: 0x808202,
            0x90000001: 0x808000,
            0xa0000001: 0x800002,
            0xb0000001: 0x8202,
            0xc0000001: 0x202,
            0xd0000001: 0x800200,
            0xe0000001: 0x8002,
            0xf0000001: 0x0,
            0x8000001: 0x808202,
            0x18000001: 0x808000,
            0x28000001: 0x800000,
            0x38000001: 0x200,
            0x48000001: 0x8000,
            0x58000001: 0x800002,
            0x68000001: 0x2,
            0x78000001: 0x8202,
            0x88000001: 0x8002,
            0x98000001: 0x800202,
            0xa8000001: 0x202,
            0xb8000001: 0x808200,
            0xc8000001: 0x800200,
            0xd8000001: 0x0,
            0xe8000001: 0x8200,
            0xf8000001: 0x808002
        }, {
            0x0: 0x40084010,
            0x1000000: 0x4000,
            0x2000000: 0x80000,
            0x3000000: 0x40080010,
            0x4000000: 0x40000010,
            0x5000000: 0x40084000,
            0x6000000: 0x40004000,
            0x7000000: 0x10,
            0x8000000: 0x84000,
            0x9000000: 0x40004010,
            0xa000000: 0x40000000,
            0xb000000: 0x84010,
            0xc000000: 0x80010,
            0xd000000: 0x0,
            0xe000000: 0x4010,
            0xf000000: 0x40080000,
            0x800000: 0x40004000,
            0x1800000: 0x84010,
            0x2800000: 0x10,
            0x3800000: 0x40004010,
            0x4800000: 0x40084010,
            0x5800000: 0x40000000,
            0x6800000: 0x80000,
            0x7800000: 0x40080010,
            0x8800000: 0x80010,
            0x9800000: 0x0,
            0xa800000: 0x4000,
            0xb800000: 0x40080000,
            0xc800000: 0x40000010,
            0xd800000: 0x84000,
            0xe800000: 0x40084000,
            0xf800000: 0x4010,
            0x10000000: 0x0,
            0x11000000: 0x40080010,
            0x12000000: 0x40004010,
            0x13000000: 0x40084000,
            0x14000000: 0x40080000,
            0x15000000: 0x10,
            0x16000000: 0x84010,
            0x17000000: 0x4000,
            0x18000000: 0x4010,
            0x19000000: 0x80000,
            0x1a000000: 0x80010,
            0x1b000000: 0x40000010,
            0x1c000000: 0x84000,
            0x1d000000: 0x40004000,
            0x1e000000: 0x40000000,
            0x1f000000: 0x40084010,
            0x10800000: 0x84010,
            0x11800000: 0x80000,
            0x12800000: 0x40080000,
            0x13800000: 0x4000,
            0x14800000: 0x40004000,
            0x15800000: 0x40084010,
            0x16800000: 0x10,
            0x17800000: 0x40000000,
            0x18800000: 0x40084000,
            0x19800000: 0x40000010,
            0x1a800000: 0x40004010,
            0x1b800000: 0x80010,
            0x1c800000: 0x0,
            0x1d800000: 0x4010,
            0x1e800000: 0x40080010,
            0x1f800000: 0x84000
        }, {
            0x0: 0x104,
            0x100000: 0x0,
            0x200000: 0x4000100,
            0x300000: 0x10104,
            0x400000: 0x10004,
            0x500000: 0x4000004,
            0x600000: 0x4010104,
            0x700000: 0x4010000,
            0x800000: 0x4000000,
            0x900000: 0x4010100,
            0xa00000: 0x10100,
            0xb00000: 0x4010004,
            0xc00000: 0x4000104,
            0xd00000: 0x10000,
            0xe00000: 0x4,
            0xf00000: 0x100,
            0x80000: 0x4010100,
            0x180000: 0x4010004,
            0x280000: 0x0,
            0x380000: 0x4000100,
            0x480000: 0x4000004,
            0x580000: 0x10000,
            0x680000: 0x10004,
            0x780000: 0x104,
            0x880000: 0x4,
            0x980000: 0x100,
            0xa80000: 0x4010000,
            0xb80000: 0x10104,
            0xc80000: 0x10100,
            0xd80000: 0x4000104,
            0xe80000: 0x4010104,
            0xf80000: 0x4000000,
            0x1000000: 0x4010100,
            0x1100000: 0x10004,
            0x1200000: 0x10000,
            0x1300000: 0x4000100,
            0x1400000: 0x100,
            0x1500000: 0x4010104,
            0x1600000: 0x4000004,
            0x1700000: 0x0,
            0x1800000: 0x4000104,
            0x1900000: 0x4000000,
            0x1a00000: 0x4,
            0x1b00000: 0x10100,
            0x1c00000: 0x4010000,
            0x1d00000: 0x104,
            0x1e00000: 0x10104,
            0x1f00000: 0x4010004,
            0x1080000: 0x4000000,
            0x1180000: 0x104,
            0x1280000: 0x4010100,
            0x1380000: 0x0,
            0x1480000: 0x10004,
            0x1580000: 0x4000100,
            0x1680000: 0x100,
            0x1780000: 0x4010004,
            0x1880000: 0x10000,
            0x1980000: 0x4010104,
            0x1a80000: 0x10104,
            0x1b80000: 0x4000004,
            0x1c80000: 0x4000104,
            0x1d80000: 0x4010000,
            0x1e80000: 0x4,
            0x1f80000: 0x10100
        }, {
            0x0: 0x80401000,
            0x10000: 0x80001040,
            0x20000: 0x401040,
            0x30000: 0x80400000,
            0x40000: 0x0,
            0x50000: 0x401000,
            0x60000: 0x80000040,
            0x70000: 0x400040,
            0x80000: 0x80000000,
            0x90000: 0x400000,
            0xa0000: 0x40,
            0xb0000: 0x80001000,
            0xc0000: 0x80400040,
            0xd0000: 0x1040,
            0xe0000: 0x1000,
            0xf0000: 0x80401040,
            0x8000: 0x80001040,
            0x18000: 0x40,
            0x28000: 0x80400040,
            0x38000: 0x80001000,
            0x48000: 0x401000,
            0x58000: 0x80401040,
            0x68000: 0x0,
            0x78000: 0x80400000,
            0x88000: 0x1000,
            0x98000: 0x80401000,
            0xa8000: 0x400000,
            0xb8000: 0x1040,
            0xc8000: 0x80000000,
            0xd8000: 0x400040,
            0xe8000: 0x401040,
            0xf8000: 0x80000040,
            0x100000: 0x400040,
            0x110000: 0x401000,
            0x120000: 0x80000040,
            0x130000: 0x0,
            0x140000: 0x1040,
            0x150000: 0x80400040,
            0x160000: 0x80401000,
            0x170000: 0x80001040,
            0x180000: 0x80401040,
            0x190000: 0x80000000,
            0x1a0000: 0x80400000,
            0x1b0000: 0x401040,
            0x1c0000: 0x80001000,
            0x1d0000: 0x400000,
            0x1e0000: 0x40,
            0x1f0000: 0x1000,
            0x108000: 0x80400000,
            0x118000: 0x80401040,
            0x128000: 0x0,
            0x138000: 0x401000,
            0x148000: 0x400040,
            0x158000: 0x80000000,
            0x168000: 0x80001040,
            0x178000: 0x40,
            0x188000: 0x80000040,
            0x198000: 0x1000,
            0x1a8000: 0x80001000,
            0x1b8000: 0x80400040,
            0x1c8000: 0x1040,
            0x1d8000: 0x80401000,
            0x1e8000: 0x400000,
            0x1f8000: 0x401040
        }, {
            0x0: 0x80,
            0x1000: 0x1040000,
            0x2000: 0x40000,
            0x3000: 0x20000000,
            0x4000: 0x20040080,
            0x5000: 0x1000080,
            0x6000: 0x21000080,
            0x7000: 0x40080,
            0x8000: 0x1000000,
            0x9000: 0x20040000,
            0xa000: 0x20000080,
            0xb000: 0x21040080,
            0xc000: 0x21040000,
            0xd000: 0x0,
            0xe000: 0x1040080,
            0xf000: 0x21000000,
            0x800: 0x1040080,
            0x1800: 0x21000080,
            0x2800: 0x80,
            0x3800: 0x1040000,
            0x4800: 0x40000,
            0x5800: 0x20040080,
            0x6800: 0x21040000,
            0x7800: 0x20000000,
            0x8800: 0x20040000,
            0x9800: 0x0,
            0xa800: 0x21040080,
            0xb800: 0x1000080,
            0xc800: 0x20000080,
            0xd800: 0x21000000,
            0xe800: 0x1000000,
            0xf800: 0x40080,
            0x10000: 0x40000,
            0x11000: 0x80,
            0x12000: 0x20000000,
            0x13000: 0x21000080,
            0x14000: 0x1000080,
            0x15000: 0x21040000,
            0x16000: 0x20040080,
            0x17000: 0x1000000,
            0x18000: 0x21040080,
            0x19000: 0x21000000,
            0x1a000: 0x1040000,
            0x1b000: 0x20040000,
            0x1c000: 0x40080,
            0x1d000: 0x20000080,
            0x1e000: 0x0,
            0x1f000: 0x1040080,
            0x10800: 0x21000080,
            0x11800: 0x1000000,
            0x12800: 0x1040000,
            0x13800: 0x20040080,
            0x14800: 0x20000000,
            0x15800: 0x1040080,
            0x16800: 0x80,
            0x17800: 0x21040000,
            0x18800: 0x40080,
            0x19800: 0x21040080,
            0x1a800: 0x0,
            0x1b800: 0x21000000,
            0x1c800: 0x1000080,
            0x1d800: 0x40000,
            0x1e800: 0x20040000,
            0x1f800: 0x20000080
        }, {
            0x0: 0x10000008,
            0x100: 0x2000,
            0x200: 0x10200000,
            0x300: 0x10202008,
            0x400: 0x10002000,
            0x500: 0x200000,
            0x600: 0x200008,
            0x700: 0x10000000,
            0x800: 0x0,
            0x900: 0x10002008,
            0xa00: 0x202000,
            0xb00: 0x8,
            0xc00: 0x10200008,
            0xd00: 0x202008,
            0xe00: 0x2008,
            0xf00: 0x10202000,
            0x80: 0x10200000,
            0x180: 0x10202008,
            0x280: 0x8,
            0x380: 0x200000,
            0x480: 0x202008,
            0x580: 0x10000008,
            0x680: 0x10002000,
            0x780: 0x2008,
            0x880: 0x200008,
            0x980: 0x2000,
            0xa80: 0x10002008,
            0xb80: 0x10200008,
            0xc80: 0x0,
            0xd80: 0x10202000,
            0xe80: 0x202000,
            0xf80: 0x10000000,
            0x1000: 0x10002000,
            0x1100: 0x10200008,
            0x1200: 0x10202008,
            0x1300: 0x2008,
            0x1400: 0x200000,
            0x1500: 0x10000000,
            0x1600: 0x10000008,
            0x1700: 0x202000,
            0x1800: 0x202008,
            0x1900: 0x0,
            0x1a00: 0x8,
            0x1b00: 0x10200000,
            0x1c00: 0x2000,
            0x1d00: 0x10002008,
            0x1e00: 0x10202000,
            0x1f00: 0x200008,
            0x1080: 0x8,
            0x1180: 0x202000,
            0x1280: 0x200000,
            0x1380: 0x10000008,
            0x1480: 0x10002000,
            0x1580: 0x2008,
            0x1680: 0x10202008,
            0x1780: 0x10200000,
            0x1880: 0x10202000,
            0x1980: 0x10200008,
            0x1a80: 0x2000,
            0x1b80: 0x202008,
            0x1c80: 0x200008,
            0x1d80: 0x0,
            0x1e80: 0x10000000,
            0x1f80: 0x10002008
        }, {
            0x0: 0x100000,
            0x10: 0x2000401,
            0x20: 0x400,
            0x30: 0x100401,
            0x40: 0x2100401,
            0x50: 0x0,
            0x60: 0x1,
            0x70: 0x2100001,
            0x80: 0x2000400,
            0x90: 0x100001,
            0xa0: 0x2000001,
            0xb0: 0x2100400,
            0xc0: 0x2100000,
            0xd0: 0x401,
            0xe0: 0x100400,
            0xf0: 0x2000000,
            0x8: 0x2100001,
            0x18: 0x0,
            0x28: 0x2000401,
            0x38: 0x2100400,
            0x48: 0x100000,
            0x58: 0x2000001,
            0x68: 0x2000000,
            0x78: 0x401,
            0x88: 0x100401,
            0x98: 0x2000400,
            0xa8: 0x2100000,
            0xb8: 0x100001,
            0xc8: 0x400,
            0xd8: 0x2100401,
            0xe8: 0x1,
            0xf8: 0x100400,
            0x100: 0x2000000,
            0x110: 0x100000,
            0x120: 0x2000401,
            0x130: 0x2100001,
            0x140: 0x100001,
            0x150: 0x2000400,
            0x160: 0x2100400,
            0x170: 0x100401,
            0x180: 0x401,
            0x190: 0x2100401,
            0x1a0: 0x100400,
            0x1b0: 0x1,
            0x1c0: 0x0,
            0x1d0: 0x2100000,
            0x1e0: 0x2000001,
            0x1f0: 0x400,
            0x108: 0x100400,
            0x118: 0x2000401,
            0x128: 0x2100001,
            0x138: 0x1,
            0x148: 0x2000000,
            0x158: 0x100000,
            0x168: 0x401,
            0x178: 0x2100400,
            0x188: 0x2000001,
            0x198: 0x2100000,
            0x1a8: 0x0,
            0x1b8: 0x2100401,
            0x1c8: 0x100401,
            0x1d8: 0x400,
            0x1e8: 0x2000400,
            0x1f8: 0x100001
        }, {
            0x0: 0x8000820,
            0x1: 0x20000,
            0x2: 0x8000000,
            0x3: 0x20,
            0x4: 0x20020,
            0x5: 0x8020820,
            0x6: 0x8020800,
            0x7: 0x800,
            0x8: 0x8020000,
            0x9: 0x8000800,
            0xa: 0x20800,
            0xb: 0x8020020,
            0xc: 0x820,
            0xd: 0x0,
            0xe: 0x8000020,
            0xf: 0x20820,
            0x80000000: 0x800,
            0x80000001: 0x8020820,
            0x80000002: 0x8000820,
            0x80000003: 0x8000000,
            0x80000004: 0x8020000,
            0x80000005: 0x20800,
            0x80000006: 0x20820,
            0x80000007: 0x20,
            0x80000008: 0x8000020,
            0x80000009: 0x820,
            0x8000000a: 0x20020,
            0x8000000b: 0x8020800,
            0x8000000c: 0x0,
            0x8000000d: 0x8020020,
            0x8000000e: 0x8000800,
            0x8000000f: 0x20000,
            0x10: 0x20820,
            0x11: 0x8020800,
            0x12: 0x20,
            0x13: 0x800,
            0x14: 0x8000800,
            0x15: 0x8000020,
            0x16: 0x8020020,
            0x17: 0x20000,
            0x18: 0x0,
            0x19: 0x20020,
            0x1a: 0x8020000,
            0x1b: 0x8000820,
            0x1c: 0x8020820,
            0x1d: 0x20800,
            0x1e: 0x820,
            0x1f: 0x8000000,
            0x80000010: 0x20000,
            0x80000011: 0x800,
            0x80000012: 0x8020020,
            0x80000013: 0x20820,
            0x80000014: 0x20,
            0x80000015: 0x8020000,
            0x80000016: 0x8000000,
            0x80000017: 0x8000820,
            0x80000018: 0x8020820,
            0x80000019: 0x8000020,
            0x8000001a: 0x8000800,
            0x8000001b: 0x0,
            0x8000001c: 0x20800,
            0x8000001d: 0x820,
            0x8000001e: 0x20020,
            0x8000001f: 0x8020800
        }];
        var SBOX_MASK = [0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000, 0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f];
        var DES = C_algo.DES = BlockCipher.extend({
            _doReset: function() {
                var key = this._key;
                var keyWords = key.words;
                var keyBits = [];
                for (var i = 0; i < 56; i++) {
                    var keyBitPos = PC1[i] - 1;
                    keyBits[i] = (keyWords[keyBitPos >>> 5] >>> (31 - keyBitPos % 32)) & 1;
                }
                var subKeys = this._subKeys = [];
                for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
                    var subKey = subKeys[nSubKey] = [];
                    var bitShift = BIT_SHIFTS[nSubKey];
                    for (var i = 0; i < 24; i++) {
                        subKey[(i / 6) | 0] |= keyBits[((PC2[i] - 1) + bitShift) % 28] << (31 - i % 6);
                        subKey[4 + ((i / 6) | 0)] |= keyBits[28 + (((PC2[i + 24] - 1) + bitShift) % 28)] << (31 - i % 6);
                    }
                    subKey[0] = (subKey[0] << 1) | (subKey[0] >>> 31);
                    for (var i = 1; i < 7; i++) {
                        subKey[i] = subKey[i] >>> ((i - 1) * 4 + 3);
                    }
                    subKey[7] = (subKey[7] << 5) | (subKey[7] >>> 27);
                }
                var invSubKeys = this._invSubKeys = [];
                for (var i = 0; i < 16; i++) {
                    invSubKeys[i] = subKeys[15 - i];
                }
            },
            encryptBlock: function(M, offset) {
                this._doCryptBlock(M, offset, this._subKeys);
            },
            decryptBlock: function(M, offset) {
                this._doCryptBlock(M, offset, this._invSubKeys);
            },
            _doCryptBlock: function(M, offset, subKeys) {
                this._lBlock = M[offset];
                this._rBlock = M[offset + 1];
                exchangeLR.call(this, 4, 0x0f0f0f0f);
                exchangeLR.call(this, 16, 0x0000ffff);
                exchangeRL.call(this, 2, 0x33333333);
                exchangeRL.call(this, 8, 0x00ff00ff);
                exchangeLR.call(this, 1, 0x55555555);
                for (var round = 0; round < 16; round++) {
                    var subKey = subKeys[round];
                    var lBlock = this._lBlock;
                    var rBlock = this._rBlock;
                    var f = 0;
                    for (var i = 0; i < 8; i++) {
                        f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
                    }
                    this._lBlock = rBlock;
                    this._rBlock = lBlock ^ f;
                }
                var t = this._lBlock;
                this._lBlock = this._rBlock;
                this._rBlock = t;
                exchangeLR.call(this, 1, 0x55555555);
                exchangeRL.call(this, 8, 0x00ff00ff);
                exchangeRL.call(this, 2, 0x33333333);
                exchangeLR.call(this, 16, 0x0000ffff);
                exchangeLR.call(this, 4, 0x0f0f0f0f);
                M[offset] = this._lBlock;
                M[offset + 1] = this._rBlock;
            },
            keySize: 64 / 32,
            ivSize: 64 / 32,
            blockSize: 64 / 32
        });

        function exchangeLR(offset, mask) {
            var t = ((this._lBlock >>> offset) ^ this._rBlock) & mask;
            this._rBlock ^= t;
            this._lBlock ^= t << offset;
        }

        function exchangeRL(offset, mask) {
            var t = ((this._rBlock >>> offset) ^ this._lBlock) & mask;
            this._lBlock ^= t;
            this._rBlock ^= t << offset;
        }
        C.DES = BlockCipher._createHelper(DES);
        var TripleDES = C_algo.TripleDES = BlockCipher.extend({
            _doReset: function() {
                var key = this._key;
                var keyWords = key.words;
                this._des1 = DES.createEncryptor(WordArray.create(keyWords.slice(0, 2)));
                this._des2 = DES.createEncryptor(WordArray.create(keyWords.slice(2, 4)));
                this._des3 = DES.createEncryptor(WordArray.create(keyWords.slice(4, 6)));
            },
            encryptBlock: function(M, offset) {
                this._des1.encryptBlock(M, offset);
                this._des2.decryptBlock(M, offset);
                this._des3.encryptBlock(M, offset);
            },
            decryptBlock: function(M, offset) {
                this._des3.decryptBlock(M, offset);
                this._des2.encryptBlock(M, offset);
                this._des1.decryptBlock(M, offset);
            },
            keySize: 192 / 32,
            ivSize: 64 / 32,
            blockSize: 64 / 32
        });
        C.TripleDES = BlockCipher._createHelper(TripleDES);
    }());
    (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var StreamCipher = C_lib.StreamCipher;
        var C_algo = C.algo;
        var RC4 = C_algo.RC4 = StreamCipher.extend({
            _doReset: function() {
                var key = this._key;
                var keyWords = key.words;
                var keySigBytes = key.sigBytes;
                var S = this._S = [];
                for (var i = 0; i < 256; i++) {
                    S[i] = i;
                }
                for (var i = 0, j = 0; i < 256; i++) {
                    var keyByteIndex = i % keySigBytes;
                    var keyByte = (keyWords[keyByteIndex >>> 2] >>> (24 - (keyByteIndex % 4) * 8)) & 0xff;
                    j = (j + S[i] + keyByte) % 256;
                    var t = S[i];
                    S[i] = S[j];
                    S[j] = t;
                }
                this._i = this._j = 0;
            },
            _doProcessBlock: function(M, offset) {
                M[offset] ^= generateKeystreamWord.call(this);
            },
            keySize: 256 / 32,
            ivSize: 0
        });

        function generateKeystreamWord() {
            var S = this._S;
            var i = this._i;
            var j = this._j;
            var keystreamWord = 0;
            for (var n = 0; n < 4; n++) {
                i = (i + 1) % 256;
                j = (j + S[i]) % 256;
                var t = S[i];
                S[i] = S[j];
                S[j] = t;
                keystreamWord |= S[(S[i] + S[j]) % 256] << (24 - n * 8);
            }
            this._i = i;
            this._j = j;
            return keystreamWord;
        }
        C.RC4 = StreamCipher._createHelper(RC4);
        var RC4Drop = C_algo.RC4Drop = RC4.extend({
            cfg: RC4.cfg.extend({
                drop: 192
            }),
            _doReset: function() {
                RC4._doReset.call(this);
                for (var i = this.cfg.drop; i > 0; i--) {
                    generateKeystreamWord.call(this);
                }
            }
        });
        C.RC4Drop = StreamCipher._createHelper(RC4Drop);
    }());
    CryptoJS.mode.CTRGladman = (function() {
        var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();

        function incWord(word) {
            if (((word >> 24) & 0xff) === 0xff) {
                var b1 = (word >> 16) & 0xff;
                var b2 = (word >> 8) & 0xff;
                var b3 = word & 0xff;
                if (b1 === 0xff) {
                    b1 = 0;
                    if (b2 === 0xff) {
                        b2 = 0;
                        if (b3 === 0xff) {
                            b3 = 0;
                        } else {
                            ++b3;
                        }
                    } else {
                        ++b2;
                    }
                } else {
                    ++b1;
                }
                word = 0;
                word += (b1 << 16);
                word += (b2 << 8);
                word += b3;
            } else {
                word += (0x01 << 24);
            }
            return word;
        }

        function incCounter(counter) {
            if ((counter[0] = incWord(counter[0])) === 0) {
                counter[1] = incWord(counter[1]);
            }
            return counter;
        }
        var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
            processBlock: function(words, offset) {
                var cipher = this._cipher
                var blockSize = cipher.blockSize;
                var iv = this._iv;
                var counter = this._counter;
                if (iv) {
                    counter = this._counter = iv.slice(0);
                    this._iv = undefined;
                }
                incCounter(counter);
                var keystream = counter.slice(0);
                cipher.encryptBlock(keystream, 0);
                for (var i = 0; i < blockSize; i++) {
                    words[offset + i] ^= keystream[i];
                }
            }
        });
        CTRGladman.Decryptor = Encryptor;
        return CTRGladman;
    }());
    (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var StreamCipher = C_lib.StreamCipher;
        var C_algo = C.algo;
        var S = [];
        var C_ = [];
        var G = [];
        var Rabbit = C_algo.Rabbit = StreamCipher.extend({
            _doReset: function() {
                var K = this._key.words;
                var iv = this.cfg.iv;
                for (var i = 0; i < 4; i++) {
                    K[i] = (((K[i] << 8) | (K[i] >>> 24)) & 0x00ff00ff) | (((K[i] << 24) | (K[i] >>> 8)) & 0xff00ff00);
                }
                var X = this._X = [K[0], (K[3] << 16) | (K[2] >>> 16), K[1], (K[0] << 16) | (K[3] >>> 16), K[2], (K[1] << 16) | (K[0] >>> 16), K[3], (K[2] << 16) | (K[1] >>> 16)];
                var C = this._C = [(K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff), (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff), (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff), (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)];
                this._b = 0;
                for (var i = 0; i < 4; i++) {
                    nextState.call(this);
                }
                for (var i = 0; i < 8; i++) {
                    C[i] ^= X[(i + 4) & 7];
                }
                if (iv) {
                    var IV = iv.words;
                    var IV_0 = IV[0];
                    var IV_1 = IV[1];
                    var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
                    var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
                    var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
                    var i3 = (i2 << 16) | (i0 & 0x0000ffff);
                    C[0] ^= i0;
                    C[1] ^= i1;
                    C[2] ^= i2;
                    C[3] ^= i3;
                    C[4] ^= i0;
                    C[5] ^= i1;
                    C[6] ^= i2;
                    C[7] ^= i3;
                    for (var i = 0; i < 4; i++) {
                        nextState.call(this);
                    }
                }
            },
            _doProcessBlock: function(M, offset) {
                var X = this._X;
                nextState.call(this);
                S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
                S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
                S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
                S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);
                for (var i = 0; i < 4; i++) {
                    S[i] = (((S[i] << 8) | (S[i] >>> 24)) & 0x00ff00ff) | (((S[i] << 24) | (S[i] >>> 8)) & 0xff00ff00);
                    M[offset + i] ^= S[i];
                }
            },
            blockSize: 128 / 32,
            ivSize: 64 / 32
        });

        function nextState() {
            var X = this._X;
            var C = this._C;
            for (var i = 0; i < 8; i++) {
                C_[i] = C[i];
            }
            C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
            C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
            C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
            C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
            C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
            C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
            C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
            C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
            this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;
            for (var i = 0; i < 8; i++) {
                var gx = X[i] + C[i];
                var ga = gx & 0xffff;
                var gb = gx >>> 16;
                var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
                var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);
                G[i] = gh ^ gl;
            }
            X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
            X[1] = (G[1] + ((G[0] << 8) | (G[0] >>> 24)) + G[7]) | 0;
            X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
            X[3] = (G[3] + ((G[2] << 8) | (G[2] >>> 24)) + G[1]) | 0;
            X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
            X[5] = (G[5] + ((G[4] << 8) | (G[4] >>> 24)) + G[3]) | 0;
            X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
            X[7] = (G[7] + ((G[6] << 8) | (G[6] >>> 24)) + G[5]) | 0;
        }
        C.Rabbit = StreamCipher._createHelper(Rabbit);
    }());
    CryptoJS.mode.CTR = (function() {
        var CTR = CryptoJS.lib.BlockCipherMode.extend();
        var Encryptor = CTR.Encryptor = CTR.extend({
            processBlock: function(words, offset) {
                var cipher = this._cipher
                var blockSize = cipher.blockSize;
                var iv = this._iv;
                var counter = this._counter;
                if (iv) {
                    counter = this._counter = iv.slice(0);
                    this._iv = undefined;
                }
                var keystream = counter.slice(0);
                cipher.encryptBlock(keystream, 0);
                counter[blockSize - 1] = (counter[blockSize - 1] + 1) | 0
                for (var i = 0; i < blockSize; i++) {
                    words[offset + i] ^= keystream[i];
                }
            }
        });
        CTR.Decryptor = Encryptor;
        return CTR;
    }());
    (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var StreamCipher = C_lib.StreamCipher;
        var C_algo = C.algo;
        var S = [];
        var C_ = [];
        var G = [];
        var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
            _doReset: function() {
                var K = this._key.words;
                var iv = this.cfg.iv;
                var X = this._X = [K[0], (K[3] << 16) | (K[2] >>> 16), K[1], (K[0] << 16) | (K[3] >>> 16), K[2], (K[1] << 16) | (K[0] >>> 16), K[3], (K[2] << 16) | (K[1] >>> 16)];
                var C = this._C = [(K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff), (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff), (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff), (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)];
                this._b = 0;
                for (var i = 0; i < 4; i++) {
                    nextState.call(this);
                }
                for (var i = 0; i < 8; i++) {
                    C[i] ^= X[(i + 4) & 7];
                }
                if (iv) {
                    var IV = iv.words;
                    var IV_0 = IV[0];
                    var IV_1 = IV[1];
                    var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
                    var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
                    var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
                    var i3 = (i2 << 16) | (i0 & 0x0000ffff);
                    C[0] ^= i0;
                    C[1] ^= i1;
                    C[2] ^= i2;
                    C[3] ^= i3;
                    C[4] ^= i0;
                    C[5] ^= i1;
                    C[6] ^= i2;
                    C[7] ^= i3;
                    for (var i = 0; i < 4; i++) {
                        nextState.call(this);
                    }
                }
            },
            _doProcessBlock: function(M, offset) {
                var X = this._X;
                nextState.call(this);
                S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
                S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
                S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
                S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);
                for (var i = 0; i < 4; i++) {
                    S[i] = (((S[i] << 8) | (S[i] >>> 24)) & 0x00ff00ff) | (((S[i] << 24) | (S[i] >>> 8)) & 0xff00ff00);
                    M[offset + i] ^= S[i];
                }
            },
            blockSize: 128 / 32,
            ivSize: 64 / 32
        });

        function nextState() {
            var X = this._X;
            var C = this._C;
            for (var i = 0; i < 8; i++) {
                C_[i] = C[i];
            }
            C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
            C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
            C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
            C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
            C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
            C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
            C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
            C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
            this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;
            for (var i = 0; i < 8; i++) {
                var gx = X[i] + C[i];
                var ga = gx & 0xffff;
                var gb = gx >>> 16;
                var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
                var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);
                G[i] = gh ^ gl;
            }
            X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
            X[1] = (G[1] + ((G[0] << 8) | (G[0] >>> 24)) + G[7]) | 0;
            X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
            X[3] = (G[3] + ((G[2] << 8) | (G[2] >>> 24)) + G[1]) | 0;
            X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
            X[5] = (G[5] + ((G[4] << 8) | (G[4] >>> 24)) + G[3]) | 0;
            X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
            X[7] = (G[7] + ((G[6] << 8) | (G[6] >>> 24)) + G[5]) | 0;
        }
        C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
    }());
    CryptoJS.pad.ZeroPadding = {
        pad: function(data, blockSize) {
            var blockSizeBytes = blockSize * 4;
            data.clamp();
            data.sigBytes += blockSizeBytes - ((data.sigBytes % blockSizeBytes) || blockSizeBytes);
        },
        unpad: function(data) {
            var dataWords = data.words;
            var i = data.sigBytes - 1;
            while (!((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff)) {
                i--;
            }
            data.sigBytes = i + 1;
        }
    };
    return CryptoJS;
}




var wordToHex = function(lValue) {
        var WordToHexValue = "", WordToHexValueTemp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValueTemp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2)
        }
        return WordToHexValue
    };
var I = function(x, y, z) {
        return (y ^ (x | (~z)))
    };
var II = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b)
    };
var H = function(x, y, z) {
        return (x ^ y ^ z)
    };
var HH = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b)
    };
var G = function(x, y, z) {
        return (x & z) | (y & (~z))
    };
var GG = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b)
    };
var rotateLeft = function(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits))
    };
var F = function(x, y, z) {
        return (x & y) | ((~x) & z)
    };
var addUnsigned = function(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 2147483648);
        lY8 = (lY & 2147483648);
        lX4 = (lX & 1073741824);
        lY4 = (lY & 1073741824);
        lResult = (lX & 1073741823) + (lY & 1073741823);
        if (lX4 & lY4) {
            return (lResult ^ 2147483648 ^ lX8 ^ lY8)
        }
        if (lX4 | lY4) {
            if (lResult & 1073741824) {
                return (lResult ^ 3221225472 ^ lX8 ^ lY8)
            } else {
                return (lResult ^ 1073741824 ^ lX8 ^ lY8)
            }
        } else {
            return (lResult ^ lX8 ^ lY8)
        }
    };
var FF = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b)
    };
function convertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWordsTempOne = lMessageLength + 8;
        var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
        var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (128 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray
    };
function uTF8Encode(string) {
        string = string.replace(/\x0d\x0a/g, "\x0a");
        var output = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                output += String.fromCharCode(c)
            } else {
                if ((c > 127) && (c < 2048)) {
                    output += String.fromCharCode((c >> 6) | 192);
                    output += String.fromCharCode((c & 63) | 128)
                } else {
                    output += String.fromCharCode((c >> 12) | 224);
                    output += String.fromCharCode(((c >> 6) & 63) | 128);
                    output += String.fromCharCode((c & 63) | 128)
                }
            }
        }
        return output
    };
function md5(string) {
            var x = Array();
            var k, AA, BB, CC, DD, a, b, c, d;
            var S11 = 7
              , S12 = 12
              , S13 = 17
              , S14 = 22;
            var S21 = 5
              , S22 = 9
              , S23 = 14
              , S24 = 20;
            var S31 = 4
              , S32 = 11
              , S33 = 16
              , S34 = 23;
            var S41 = 6
              , S42 = 10
              , S43 = 15
              , S44 = 21;
            string = uTF8Encode(string);
            x = convertToWordArray(string);
            a = 1732584193;
            b = 4023233417;
            c = 2562383102;
            d = 271733878;
            for (k = 0; k < x.length; k += 16) {
                AA = a;
                BB = b;
                CC = c;
                DD = d;
                a = FF(a, b, c, d, x[k + 0], S11, 3614090360);
                d = FF(d, a, b, c, x[k + 1], S12, 3905402710);
                c = FF(c, d, a, b, x[k + 2], S13, 606105819);
                b = FF(b, c, d, a, x[k + 3], S14, 3250441966);
                a = FF(a, b, c, d, x[k + 4], S11, 4118548399);
                d = FF(d, a, b, c, x[k + 5], S12, 1200080426);
                c = FF(c, d, a, b, x[k + 6], S13, 2821735955);
                b = FF(b, c, d, a, x[k + 7], S14, 4249261313);
                a = FF(a, b, c, d, x[k + 8], S11, 1770035416);
                d = FF(d, a, b, c, x[k + 9], S12, 2336552879);
                c = FF(c, d, a, b, x[k + 10], S13, 4294925233);
                b = FF(b, c, d, a, x[k + 11], S14, 2304563134);
                a = FF(a, b, c, d, x[k + 12], S11, 1804603682);
                d = FF(d, a, b, c, x[k + 13], S12, 4254626195);
                c = FF(c, d, a, b, x[k + 14], S13, 2792965006);
                b = FF(b, c, d, a, x[k + 15], S14, 1236535329);
                a = GG(a, b, c, d, x[k + 1], S21, 4129170786);
                d = GG(d, a, b, c, x[k + 6], S22, 3225465664);
                c = GG(c, d, a, b, x[k + 11], S23, 643717713);
                b = GG(b, c, d, a, x[k + 0], S24, 3921069994);
                a = GG(a, b, c, d, x[k + 5], S21, 3593408605);
                d = GG(d, a, b, c, x[k + 10], S22, 38016083);
                c = GG(c, d, a, b, x[k + 15], S23, 3634488961);
                b = GG(b, c, d, a, x[k + 4], S24, 3889429448);
                a = GG(a, b, c, d, x[k + 9], S21, 568446438);
                d = GG(d, a, b, c, x[k + 14], S22, 3275163606);
                c = GG(c, d, a, b, x[k + 3], S23, 4107603335);
                b = GG(b, c, d, a, x[k + 8], S24, 1163531501);
                a = GG(a, b, c, d, x[k + 13], S21, 2850285829);
                d = GG(d, a, b, c, x[k + 2], S22, 4243563512);
                c = GG(c, d, a, b, x[k + 7], S23, 1735328473);
                b = GG(b, c, d, a, x[k + 12], S24, 2368359562);
                a = HH(a, b, c, d, x[k + 5], S31, 4294588738);
                d = HH(d, a, b, c, x[k + 8], S32, 2272392833);
                c = HH(c, d, a, b, x[k + 11], S33, 1839030562);
                b = HH(b, c, d, a, x[k + 14], S34, 4259657740);
                a = HH(a, b, c, d, x[k + 1], S31, 2763975236);
                d = HH(d, a, b, c, x[k + 4], S32, 1272893353);
                c = HH(c, d, a, b, x[k + 7], S33, 4139469664);
                b = HH(b, c, d, a, x[k + 10], S34, 3200236656);
                a = HH(a, b, c, d, x[k + 13], S31, 681279174);
                d = HH(d, a, b, c, x[k + 0], S32, 3936430074);
                c = HH(c, d, a, b, x[k + 3], S33, 3572445317);
                b = HH(b, c, d, a, x[k + 6], S34, 76029189);
                a = HH(a, b, c, d, x[k + 9], S31, 3654602809);
                d = HH(d, a, b, c, x[k + 12], S32, 3873151461);
                c = HH(c, d, a, b, x[k + 15], S33, 530742520);
                b = HH(b, c, d, a, x[k + 2], S34, 3299628645);
                a = II(a, b, c, d, x[k + 0], S41, 4096336452);
                d = II(d, a, b, c, x[k + 7], S42, 1126891415);
                c = II(c, d, a, b, x[k + 14], S43, 2878612391);
                b = II(b, c, d, a, x[k + 5], S44, 4237533241);
                a = II(a, b, c, d, x[k + 12], S41, 1700485571);
                d = II(d, a, b, c, x[k + 3], S42, 2399980690);
                c = II(c, d, a, b, x[k + 10], S43, 4293915773);
                b = II(b, c, d, a, x[k + 1], S44, 2240044497);
                a = II(a, b, c, d, x[k + 8], S41, 1873313359);
                d = II(d, a, b, c, x[k + 15], S42, 4264355552);
                c = II(c, d, a, b, x[k + 6], S43, 2734768916);
                b = II(b, c, d, a, x[k + 13], S44, 1309151649);
                a = II(a, b, c, d, x[k + 4], S41, 4149444226);
                d = II(d, a, b, c, x[k + 11], S42, 3174756917);
                c = II(c, d, a, b, x[k + 2], S43, 718787259);
                b = II(b, c, d, a, x[k + 9], S44, 3951481745);
                a = addUnsigned(a, AA);
                b = addUnsigned(b, BB);
                c = addUnsigned(c, CC);
                d = addUnsigned(d, DD)
            }
            var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
            return tempValue.toLowerCase()
        }

var Base64Hex = (function() {
    var encode = function(str) {
        var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var out, i, len;
        var c1, c2, c3;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            c1 = str.charCodeAt(i++) & 255;
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt((c1 & 3) << 4);
                out += "==";
                break
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 3) << 4) | ((c2 & 240) >> 4));
                out += base64EncodeChars.charAt((c2 & 15) << 2);
                out += "=";
                break
            }
            c3 = str.charCodeAt(i++);
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 3) << 4) | ((c2 & 240) >> 4));
            out += base64EncodeChars.charAt(((c2 & 15) << 2) | ((c3 & 192) >> 6));
            out += base64EncodeChars.charAt(c3 & 63)
        }
        return out
    };
    var decode = function(str) {
        var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
        var c1, c2, c3, c4;
        var i, len, out;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            do {
                c1 = base64DecodeChars[str.charCodeAt(i++) & 255]
            } while (i < len && c1 == -1);
            if (c1 == -1) {
                break
            }
            do {
                c2 = base64DecodeChars[str.charCodeAt(i++) & 255]
            } while (i < len && c2 == -1);
            if (c2 == -1) {
                break
            }
            out += String.fromCharCode((c1 << 2) | ((c2 & 48) >> 4));
            do {
                c3 = str.charCodeAt(i++) & 255;
                if (c3 == 61) {
                    return out
                }
                c3 = base64DecodeChars[c3]
            } while (i < len && c3 == -1);
            if (c3 == -1) {
                break
            }
            out += String.fromCharCode(((c2 & 15) << 4) | ((c3 & 60) >> 2));
            do {
                c4 = str.charCodeAt(i++) & 255;
                if (c4 == 61) {
                    return out
                }
                c4 = base64DecodeChars[c4]
            } while (i < len && c4 == -1);
            if (c4 == -1) {
                break
            }
            out += String.fromCharCode(((c3 & 3) << 6) | c4)
        }
        return out
    };
    return {
        encode: encode,
        decode: decode
    }
})();
var authCrypt = (function() {
    var base64Encode = Base64Hex.encode;
    var base64Decode = Base64Hex.decode;
    var time = function() {
        var timeStamp = new Date().getTime();
        return parseInt(timeStamp / 1000)
    };
    var microtime = function(timeFloat) {
        var timeStamp = new Date().getTime();
        var sec = parseInt(timeStamp / 1000);
        return timeFloat ? (timeStamp / 1000) : (timeStamp - (sec * 1000)) / 1000 + " " + sec
    };
    var chr = function(s) {
        return String.fromCharCode(s)
    };
    var ord = function(s) {
        return s.charCodeAt()
    };
    var authcode = function(str, operation, key, expiry) {
        var operation = operation ? operation : "DECODE";
        var key = key ? key : "liangcheng";
        var expiry = expiry ? expiry : 0;
        var ckey_length = 4;
        key = md5(key);
        var keya = md5(key.substr(0, 16));
        var keyb = md5(key.substr(16, 16));
        if (ckey_length) {
            if (operation == "DECODE") {
                var keyc = str.substr(0, ckey_length)
            } else {
                var md5_time = md5(microtime());
                var start = md5_time.length - ckey_length;
                var keyc = md5_time.substr(start, ckey_length)
            }
        } else {
            var keyc = ""
        }
        var cryptkey = keya + md5(keya + keyc);
        var strbuf;
        if (operation == "DECODE") {
            str = str.substr(ckey_length);
            strbuf = base64Decode(str)
        } else {
            expiry = expiry ? expiry + time() : 0;
            tmpstr = expiry.toString();
            if (tmpstr.length >= 10) {
                str = tmpstr.substr(0, 10) + md5(str + keyb).substr(0, 16) + str
            } else {
                var count = 10 - tmpstr.length;
                for (var i = 0; i < count; i++) {
                    tmpstr = "0" + tmpstr
                }
                str = tmpstr + md5(str + keyb).substr(0, 16) + str
            }
            strbuf = str
        }
        var box = new Array(256);
        for (var i = 0; i < 256; i++) {
            box[i] = i
        }
        var rndkey = new Array();
        for (var i = 0; i < 256; i++) {
            rndkey[i] = cryptkey.charCodeAt(i % cryptkey.length)
        }
        for (var j = i = 0; i < 256; i++) {
            j = (j + box[i] + rndkey[i]) % 256;
            tmp = box[i];
            box[i] = box[j];
            box[j] = tmp
        }
        var s = "";
        strbuf = strbuf.split("");
        for (var a = j = i = 0; i < strbuf.length; i++) {
            a = (a + 1) % 256;
            j = (j + box[a]) % 256;
            tmp = box[a];
            box[a] = box[j];
            box[j] = tmp;
            s += chr(ord(strbuf[i]) ^ (box[(box[a] + box[j]) % 256]))
        }
        if (operation == "DECODE") {
            if ((s.substr(0, 10) == 0 || s.substr(0, 10) - time() > 0) && s.substr(10, 16) == md5(s.substr(26) + keyb).substr(0, 16)) {
                s = s.substr(26)
            } else {
                s = ""
            }
        } else {
            s = base64Encode(s);
            var regex = new RegExp("=", "g");
            s = s.replace(regex, "");
            s = keyc + s
        }
        return s
    };
    return {
        authcode: authcode,
        encode: function(string, key, expiry) {
            var result = authcode(string, "ENCODE", key, expiry);
            result = result.replace(/\+/g, "-");
            result = result.replace(/\//g, "_");
            result = result.replace(/=/g, ".");
            return result
        },
        decode: function(string, key) {
            string = string.replace(/-/g, "+");
            string = string.replace(/_/g, "/");
            string = string.replace(/\./g, "=");
            var result = authcode(string, "DECODE", key);
            return result
        }
    }
})();




//-------------------------------------------------------------------------------------------

! function(t) {
    "use strict";
    var h, u;
    void 0 === t.btoa && (t.btoa = (h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),

    function(r) {
        var e, t, n, o, a, c, i;
        for (t = n = 0,
        o = r.length,
        c = (o -= a = o % 3) / 3 << 2,
        0 < a && (c += 4),
        e = new Array(c); t < o;)
        i = r.charCodeAt(t++) << 16 | r.charCodeAt(t++) << 8 | r.charCodeAt(t++),
        e[n++] = h[i >> 18] + h[i >> 12 & 63] + h[i >> 6 & 63] + h[63 & i];
        return 1 == a ? (i = r.charCodeAt(t++),
        e[n++] = h[i >> 2] + h[(3 & i) << 4] + "==") : 2 == a && (i = r.charCodeAt(t++) << 8 | r.charCodeAt(t++),
        e[n++] = h[i >> 10] + h[i >> 4 & 63] + h[(15 & i) << 2] + "="),
        e.join("")
    })),
    void 0 === t.atob && (t.atob = (u = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1],

    function(r) {
        var e, t, n, o, a, c, i, h, f, d;
        if ((i = r.length) % 4 != 0) return "";
        if (/[^ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789\+\/\=]/.test(r)) return "";
        for (f = i,
        0 < (h = "=" == r.charAt(i - 2) ? 1 : "=" == r.charAt(i - 1) ? 2 : 0) && (f -= 4),
        f = 3 * (f >> 2) + h,
        d = new Array(f),
        a = c = 0; a < i && -1 != (e = u[r.charCodeAt(a++)]) && -1 != (t = u[r.charCodeAt(a++)]) && (d[c++] = String.fromCharCode(e << 2 | (48 & t) >> 4), -1 != (n = u[r.charCodeAt(a++)])) && (d[c++] = String.fromCharCode((15 & t) << 4 | (60 & n) >> 2), -1 != (o = u[r.charCodeAt(a++)]));)
        d[c++] = String.fromCharCode((3 & n) << 6 | o);
        return d.join("")
    }));
    var d = 2654435769;

    function n(r, e) {
        var t = r.length,
            n = t << 2;
        if (e) {
            var o = r[t - 1];
            if (o < (n -= 4) - 3 || n < o) return null;
            n = o
        }
        for (var a = 0; a < t; a++)
        r[a] = String.fromCharCode(255 & r[a], r[a] >>> 8 & 255, r[a] >>> 16 & 255, r[a] >>> 24 & 255);
        var c = r.join("");
        return e ? c.substring(0, n) : c
    }

    function o(r, e) {
        var t, n = r.length,
            o = n >> 2;
        0 != (3 & n) && ++o,
        e ? (t = new Array(o + 1))[o] = n : t = new Array(o);
        for (var a = 0; a < n; ++a)
        t[a >> 2] |= r.charCodeAt(a) << ((3 & a) << 3);
        return t
    }

    function s(r) {
        return 4294967295 & r
    }

    function C(r, e, t, n, o, a) {
        return (t >>> 5 ^ e << 2) + (e >>> 3 ^ t << 4) ^ (r ^ e) + (a[3 & n ^ o] ^ t)
    }

    function a(r) {
        return r.length < 4 && (r.length = 4),
        r
    }

    function c(r) {
        if (/^[\x00-\x7f]*$/.test(r)) return r;
        for (var e = [], t = r.length, n = 0, o = 0; n < t; ++n, ++o) {
            var a = r.charCodeAt(n);
            if (a < 128) e[o] = r.charAt(n);
            else if (a < 2048) e[o] = String.fromCharCode(192 | a >> 6, 128 | 63 & a);
            else {
                if (!(a < 55296 || 57343 < a)) {
                    if (n + 1 < t) {
                        var c = r.charCodeAt(n + 1);
                        if (a < 56320 && 56320 <= c && c <= 57343) {
                            var i = 65536 + ((1023 & a) << 10 | 1023 & c);
                            e[o] = String.fromCharCode(240 | i >> 18 & 63, 128 | i >> 12 & 63, 128 | i >> 6 & 63, 128 | 63 & i), ++n;
                            continue
                        }
                    }
                    throw new Error("Malformed string")
                }
                e[o] = String.fromCharCode(224 | a >> 12, 128 | a >> 6 & 63, 128 | 63 & a)
            }
        }
        return e.join("")
    }

    function i(r, e) {
        return (null == e || e < 0) && (e = r.length),
        0 === e ? "" : /^[\x00-\x7f]*$/.test(r) || !/^[\x00-\xff]*$/.test(r) ? e === r.length ? r : r.substr(0, e) : (e < 32767 ? function(r, e) {
            for (var t = new Array(e), n = 0, o = 0, a = r.length; n < e && o < a; n++) {
                var c = r.charCodeAt(o++);
                switch (c >> 4) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        t[n] = c;
                        break;
                    case 12:
                    case 13:
                        if (!(o < a)) throw new Error("Unfinished UTF-8 octet sequence");
                        t[n] = (31 & c) << 6 | 63 & r.charCodeAt(o++);
                        break;
                    case 14:
                        if (!(o + 1 < a)) throw new Error("Unfinished UTF-8 octet sequence");
                        t[n] = (15 & c) << 12 | (63 & r.charCodeAt(o++)) << 6 | 63 & r.charCodeAt(o++);
                        break;
                    case 15:
                        if (!(o + 2 < a)) throw new Error("Unfinished UTF-8 octet sequence");
                        var i = ((7 & c) << 18 | (63 & r.charCodeAt(o++)) << 12 | (63 & r.charCodeAt(o++)) << 6 | 63 & r.charCodeAt(o++)) - 65536;
                        if (!(0 <= i && i <= 1048575)) throw new Error("Character outside valid Unicode range: 0x" + i.toString(16));
                        t[n++] = i >> 10 & 1023 | 55296,
                        t[n] = 1023 & i | 56320;
                        break;
                    default:
                        throw new Error("Bad UTF-8 encoding 0x" + c.toString(16))
                }
            }
            return n < e && (t.length = n),
            String.fromCharCode.apply(String, t)
        } : function(r, e) {
            for (var t = [], n = new Array(32768), o = 0, a = 0, c = r.length; o < e && a < c; o++) {
                var i = r.charCodeAt(a++);
                switch (i >> 4) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        n[o] = i;
                        break;
                    case 12:
                    case 13:
                        if (!(a < c)) throw new Error("Unfinished UTF-8 octet sequence");
                        n[o] = (31 & i) << 6 | 63 & r.charCodeAt(a++);
                        break;
                    case 14:
                        if (!(a + 1 < c)) throw new Error("Unfinished UTF-8 octet sequence");
                        n[o] = (15 & i) << 12 | (63 & r.charCodeAt(a++)) << 6 | 63 & r.charCodeAt(a++);
                        break;
                    case 15:
                        if (!(a + 2 < c)) throw new Error("Unfinished UTF-8 octet sequence");
                        var h = ((7 & i) << 18 | (63 & r.charCodeAt(a++)) << 12 | (63 & r.charCodeAt(a++)) << 6 | 63 & r.charCodeAt(a++)) - 65536;
                        if (!(0 <= h && h <= 1048575)) throw new Error("Character outside valid Unicode range: 0x" + h.toString(16));
                        n[o++] = h >> 10 & 1023 | 55296,
                        n[o] = 1023 & h | 56320;
                        break;
                    default:
                        throw new Error("Bad UTF-8 encoding 0x" + i.toString(16))
                }
                if (32766 <= o) {
                    var f = o + 1;
                    n.length = f,
                    t[t.length] = String.fromCharCode.apply(String, n),
                    e -= f,
                    o = -1
                }
            }
            return 0 < o && (n.length = o,
            t[t.length] = String.fromCharCode.apply(String, n)),
            t.join("")
        })(r, e)
    }

    function f(r, e) {
        return null == r || 0 === r.length ? r : (r = c(r),
        e = c(e),
        n(function(r, e) {
            var t, n, o, a, c, i, h = r.length,
                f = h - 1;
            for (n = r[f],
            i = (o = 0) | Math.floor(6 + 52 / h); 0 < i; --i) {
                for (a = (o = s(o + d)) >>> 2 & 3,
                c = 0; c < f; ++c)
                t = r[c + 1],
                n = r[c] = s(r[c] + C(o, t, n, c, a, e));
                t = r[0],
                n = r[f] = s(r[f] + C(o, t, n, f, a, e))
            }
            return r
        }(o(r, !0), a(o(e, !1))), !1))
    }

    function l(r, e) {
        return null == r || 0 === r.length ? r : (e = c(e),
        i(n(function(r, e) {
            var t, n, o, a, c, i = r.length,
                h = i - 1;
            for (t = r[0],
            o = s(Math.floor(6 + 52 / i) * d); 0 !== o; o = s(o - d)) {
                for (a = o >>> 2 & 3,
                c = h; 0 < c; --c)
                n = r[c - 1],
                t = r[c] = s(r[c] - C(o, t, n, c, a, e));
                n = r[h],
                t = r[0] = s(r[0] - C(o, t, n, 0, a, e))
            }
            return r
        }(o(r, !1), a(o(e, !1))), !0)))
    }
    t.XXTEA = {
        utf8Encode: c,
        utf8Decode: i,
        encrypt: f,
        encryptToBase64: function(r, e) {
            return t.btoa(f(r, e))
        },
        decrypt: l,
        decryptFromBase64: function(r, e) {
            return null == r || 0 === r.length ? r : l(t.atob(r), e)
        }
    }
}(this || [eval][0]("this"));

//------------------------------------------------------------------------------------------------------------

function lcf(a, b, c, d, x, s, t) {
    return lce((b & c) | ((~b) & d), a, b, x, s, t)
}

function lcg(a, b, c, d, x, s, t) {
    return lce((b & d) | (c & (~d)), a, b, x, s, t)
}

function lce(q, a, b, x, s, t) {
    return lcl(lcc(lcl(lcl(a, q), lcl(x, t)), s), b)
}

function lcc(a, b) {
    return (a << b) | (a >>> (32 - b))
}

function lcl(x, y) {
    var a = (x & 0xFFFF) + (y & 0xFFFF);
    var b = (x >> 16) + (y >> 16) + (a >> 16);
    return (b << 16) | (a & 0xFFFF)
}

function lch(a, b, c, d, x, s, t) {
    return lce(b ^ c ^ d, a, b, x, s, t)
}

function lci(a, b, c, d, x, s, t) {
    return lce(c ^ (b | (~d)), a, b, x, s, t)
}

function lcb(x) {
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    if (x !== "1") {
        for (var i = 0; i < x.length; i += 16) {
            var a1 = a;
            var b1 = b;
            var c1 = c;
            var d1 = d;
            a = lcf(a, b, c, d, x[i + 0], 7, -680876936);
            d = lcf(d, a, b, c, x[i + 1], 12, -389564586);
            c = lcf(c, d, a, b, x[i + 2], 17, 606105819);
            b = lcf(b, c, d, a, x[i + 3], 22, -1044525330);
            a = lcf(a, b, c, d, x[i + 4], 7, -176418897);
            d = lcf(d, a, b, c, x[i + 5], 12, 1200080426);
            c = lcf(c, d, a, b, x[i + 6], 17, -1473231341);
            b = lcf(b, c, d, a, x[i + 7], 22, -45705983);
            a = lcf(a, b, c, d, x[i + 8], 7, 1770035416);
            d = lcf(d, a, b, c, x[i + 9], 12, -1958414417);
            c = lcf(c, d, a, b, x[i + 10], 17, -42063);
            b = lcf(b, c, d, a, x[i + 11], 22, -1990404162);
            a = lcf(a, b, c, d, x[i + 12], 7, 1804603682);
            d = lcf(d, a, b, c, x[i + 13], 12, -40341101);
            c = lcf(c, d, a, b, x[i + 14], 17, -1502002290);
            b = lcf(b, c, d, a, x[i + 15], 22, 1236535329);
            a = lcg(a, b, c, d, x[i + 1], 5, -165796510);
            d = lcg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = lcg(c, d, a, b, x[i + 11], 14, 643717713);
            b = lcg(b, c, d, a, x[i + 0], 20, -373897302);
            a = lcg(a, b, c, d, x[i + 5], 5, -701558691);
            d = lcg(d, a, b, c, x[i + 10], 9, 38016083);
            c = lcg(c, d, a, b, x[i + 15], 14, -660478335);
            b = lcg(b, c, d, a, x[i + 4], 20, -405537848);
            a = lcg(a, b, c, d, x[i + 9], 5, 568446438);
            d = lcg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = lcg(c, d, a, b, x[i + 3], 14, -187363961);
            b = lcg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = lcg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = lcg(d, a, b, c, x[i + 2], 9, -51403784);
            c = lcg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = lcg(b, c, d, a, x[i + 12], 20, -1926607734);
            a = lch(a, b, c, d, x[i + 5], 4, -378558);
            d = lch(d, a, b, c, x[i + 8], 11, -2022574463);
            c = lch(c, d, a, b, x[i + 11], 16, 1839030562);
            b = lch(b, c, d, a, x[i + 14], 23, -35309556);
            a = lch(a, b, c, d, x[i + 1], 4, -1530992060);
            d = lch(d, a, b, c, x[i + 4], 11, 1272893353);
            c = lch(c, d, a, b, x[i + 7], 16, -155497632);
            b = lch(b, c, d, a, x[i + 10], 23, -1094730640);
            a = lch(a, b, c, d, x[i + 13], 4, 681279174);
            d = lch(d, a, b, c, x[i + 0], 11, -358537222);
            c = lch(c, d, a, b, x[i + 3], 16, -722521979);
            b = lch(b, c, d, a, x[i + 6], 23, 76029189);
            a = lch(a, b, c, d, x[i + 9], 4, -640364487);
            d = lch(d, a, b, c, x[i + 12], 11, -421815835);
            c = lch(c, d, a, b, x[i + 15], 16, 530742520);
            b = lch(b, c, d, a, x[i + 2], 23, -995338651);
            a = lci(a, b, c, d, x[i + 0], 6, -198630844);
            d = lci(d, a, b, c, x[i + 7], 10, 1126891415);
            c = lci(c, d, a, b, x[i + 14], 15, -1416354905);
            b = lci(b, c, d, a, x[i + 5], 21, -57434055);
            a = lci(a, b, c, d, x[i + 12], 6, 1700485571);
            d = lci(d, a, b, c, x[i + 3], 10, -1894986606);
            c = lci(c, d, a, b, x[i + 10], 15, -1051523);
            b = lci(b, c, d, a, x[i + 1], 21, -2054922799);
            a = lci(a, b, c, d, x[i + 8], 6, 1873313359);
            d = lci(d, a, b, c, x[i + 15], 10, -30611744);
            c = lci(c, d, a, b, x[i + 6], 15, -1560198380);
            b = lci(b, c, d, a, x[i + 13], 21, 1309151649);
            a = lci(a, b, c, d, x[i + 4], 6, -145523070);
            d = lci(d, a, b, c, x[i + 11], 10, -1120210379);
            c = lci(c, d, a, b, x[i + 2], 15, 718787259);
            b = lci(b, c, d, a, x[i + 9], 21, -343485551);
            a = lcl(a, a1);
            b = lcl(b, b1);
            c = lcl(c, c1);
            d = lcl(d, d1)
        }
        return [a, b, c, d]
    } else {
        return [a, d, c, b]
    }
};

function lca(t) {
    var a = "0123456789abcdef";
    var b = "";
    for (var i = 0; i < t.length * 4; i++) {
        b += a.charAt((t[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) + a.charAt((t[i >> 2] >> ((i % 4) * 8)) & 0xF)
    };
    return b
};

function lco(t) {
    var a = lcb(1) + t;
    return a.replace(/[\-|\,]/g, '')
};

function lcd(t) {
    var a = ((t.length + 8) >> 6) + 1;
    var b = new Array(a * 16);
    for (var i = 0; i < a * 16; i++)
    b[i] = 0;
    for (var i = 0; i < t.length; i++)
    b[i >> 2] |= (t.charCodeAt(i) & 0xFF) << ((i % 4) * 8);
    b[i >> 2] |= 0x80 << ((i % 4) * 8);
    b[a * 16 - 2] = t.length * 8;
    return b
};

function qiantao(I1iIli, lI1Ill) {
    return I1iIli(lI1Ill);
}

function lc(Iil1II) {
    return qiantao(lca, qiantao(lcb, qiantao(lcd, qiantao(lco, Iil1II))));
};

function encode_url(II11I1, Iii11I) {
    return authCrypt["encode"](II11I1, Iii11I, 0);
}
function decode_url(l1i111, iliII1) {
    return authCrypt['decode'](l1i111, iliII1);
}

function get_sign() {
    return encode_url(lc('c77e4e73ee7272a8b7cd9734831f1ce3'), '971a0e7224fecb61b1868f1211a6360d');
}

function AES_ECB(word,key){
	res = CryptoJS.AES.encrypt(word,key,{
	"mode": CryptoJS["mode"]["ECB"]
});
	return res.ciphertext.toString(); 
}

function TSTKC(IlI1i1) {
        var l1lIl1 = {
            "iii1Il": function (IiiIlI, Iilli1) {
                return IiiIlI(Iilli1);
            },
            "lI1IiI": "time",
            "i1lI": "key",
            "IlI1l": "key1",
            "lilIil": "sign1",
            "i1l11": "token1",
            "i1l1li": "2624",
            "i1ilii": function (I1l1Il, llIll1) {
                return I1l1Il - llIll1;
            },
            "iIIII1": function (Illl1l, Illl1i) {
                return Illl1l < Illl1i;
            },
            "i1l1ll": function (lIIiil, l1lIii) {
                return lIIiil * l1lIii;
            },
            "I1iIiI": function (I11iI1, l1lIil) {
                return I11iI1 - l1lIil;
            }
        };
        var IiiIli = l1lIl1["iii1Il"](String, IlI1i1["time"]),
        iillli = IlI1i1["key"],
        I1l1Ii = IlI1i1["key1"],
        I1i11i = IlI1i1["sign1"],
        I1i11l = IlI1i1["token1"];
        var llIlii = "2624";
        llIlii = llIlii["split"]("");

        for (var llIlil = IiiIli["split"]("")[llIlii[0]] || "e", IIlil = iillli["split"]("")[llIlii[1]] || "t", ilI1lI = I1l1Ii["split"]("")[llIlii[2]] || "c", i1ilil = I1i11i["split"]("")[l1lIl1["i1ilii"](I1i11i["split"]("")["length"], llIlii[3])] || "n", IIlii = I1i11l["split"](""), IlI1il = [], IilliI = 0; l1lIl1["iIIII1"](l1lIl1["i1l1ll"](2, IilliI), IIlii["length"]); IilliI++)
            switch (IlI1il["push"](IIlii[l1lIl1["I1iIiI"](l1lIl1["I1iIiI"](IIlii["length"], IilliI), 1)]), l1lIl1["iIIII1"](IilliI, l1lIl1["I1iIiI"](l1lIl1["I1iIiI"](IIlii["length"], IilliI), 1)) && IlI1il["push"](I1i11l[IilliI]), IilliI) {
            case 1:
                IlI1il["push"](llIlil);
                break;

            case 2:
                IlI1il["push"](IIlil);
                break;

            case 3:
                IlI1il["push"](ilI1lI);
                break;

            case 4:
                IlI1il["push"](i1ilil);
            }

        var IlI1ii = IlI1il["join"]("");
        return IlI1ii;
    }
	
	
	
	
var base64Encode = Base64Hex.encode;
function AES_CBC(i1II1, iIIl11) {
    var lIIilI = CryptoJS.enc.Utf8.parse(i1II1);
    lIIilI = CryptoJS.enc.Base64.stringify(lIIilI);
    var iillll = CryptoJS.enc.Latin1.parse(iIIl11.substring(0, 16));
    var llIllI = CryptoJS.enc.Latin1.parse(iIIl11.substring(16, 32));
    var I1ilI1 = CryptoJS.AES.encrypt(lIIilI, iillll, {
        'iv': llIllI,
        'mode': CryptoJS.mode.CBC,
        'padding': CryptoJS.pad.Pkcs7
    });
    return "110#" + base64Encode(CryptoJS.enc.Base64.stringify(I1ilI1.ciphertext));
}
function AES_CBC_DE(II1li1, l1lIlI) {
        var IiiIl1 = CryptoJS["enc"]["Latin1"]["parse"](l1lIlI["substring"](0, 16));
        var lIIil1 = CryptoJS["enc"]["Latin1"]["parse"](l1lIlI["substring"](16, 32));
        var IIli1 = CryptoJS["AES"]["decrypt"](II1li1, IiiIl1, {
            "iv": lIIil1,
            "mode": CryptoJS["mode"]["CBC"],
            "padding": CryptoJS["pad"]["Pkcs7"]
        });
        return CryptoJS["enc"]["Utf8"]["stringify"](IIli1);
}




