vkey生成方式：
Aes加密
mode: ECB
pad: Pkcs7
key: loveme@nxflv@com

获取解析后url:
对 https://www.nxflv.com/Api.php 发起post请求
'url': url,
'wap': '0',
'ios': '0',
'vkey': vkey,
'type': ''
然后将获取的url进行AES解密


var Url = 'https://www.bilibili.com/bangumi/play/ss41074?from_spmid=666.22.0.0';
var ather = 'https://www.nxflv.com/?url=';
var colour = '#00CCFF';
var online = '0';
var dptext = '→诺讯智能解析系统←';
var dplink = 'https://www.nxflv.com';
var danmuku = '/Danku/';
var danmuon = '0';
var danmuid = 'd364610942a2a99957bf';
var type = '';
var clickon = 'contextnxflv';
var autoplay = 'autoplay:true,';
var wapautoplay = '';
var _0xodx = 'www.nxflv.com', _0xodx_ = ['_0xodx'], _0x4475 = [_0xodx, '\x2e\x74\x69\x6d\x65\x6d\x73\x67', '\x74\x65\x78\x74', '\x2e\x74\x69\x70\x73', '\x68\x69\x64\x65', '\x2e\x74\x69\x6d\x65\x6f\x75\x74', '\x73\x68\x6f\x77', '\x75\x73\x65\x72\x41\x67\x65\x6e\x74', '\x6d\x61\x74\x63\x68', '\x65\x6e\x63', '\x55\x74\x66\x38', '\x70\x61\x72\x73\x65', '\x6d\x6f\x64\x65', '\x45\x43\x42', '\x70\x61\x64', '\x50\x6b\x63\x73\x37', '\x79\x6f\x75\x72\x6d\x65\x40\x6e\x78\x66\x6c\x76\x40\x63\x6f\x6d', '\x41\x45\x53', '\x65\x6e\x63\x72\x79\x70\x74', '\x74\x6f\x53\x74\x72\x69\x6e\x67', '\x61\x6a\x61\x78', '\x70\x6f\x73\x74', '\x41\x70\x69\x2e\x70\x68\x70', '\x6a\x73\x6f\x6e', '\x63\x6f\x64\x65', '\x32\x30\x30', '\x72\x65\x66\x65\x72\x72\x65\x72', '\x74\x72\x75\x65', '\x63\x72\x65\x61\x74\x65\x45\x6c\x65\x6d\x65\x6e\x74', '\x6d\x65\x74\x61', '\x6e\x61\x6d\x65', '\x63\x6f\x6e\x74\x65\x6e\x74', '\x6f\x72\x69\x67\x69\x6e', '\x67\x65\x74\x45\x6c\x65\x6d\x65\x6e\x74\x73\x42\x79\x54\x61\x67\x4e\x61\x6d\x65', '\x68\x65\x61\x64', '\x61\x70\x70\x65\x6e\x64\x43\x68\x69\x6c\x64', '\x6e\x65\x76\x65\x72', '\x75\x72\x6c', '\x69\x6e\x64\x65\x78\x4f\x66', '\x41\x49\x4e\x58', '\x72\x65\x70\x6c\x61\x63\x65', '\x6c\x6f\x76\x65\x6d\x65\x40\x6e\x78\x66\x6c\x76\x40\x63\x6f\x6d', '\x64\x65\x63\x72\x79\x70\x74', '\x74\x79\x70\x65', '\x69\x66\x72\x61\x6d\x65', '\x23\x76\x69\x64\x65\x6f', '\x68\x74\x6d\x6c', '\x3c\x69\x66\x72\x61\x6d\x65\x20\x69\x64\x3d\x22\x76\x69\x64\x65\x6f\x22\x20\x73\x63\x72\x6f\x6c\x6c\x69\x6e\x67\x3d\x22\x6e\x6f\x22\x20\x61\x6c\x6c\x6f\x77\x74\x72\x61\x6e\x73\x70\x61\x72\x65\x6e\x63\x79\x3d\x22\x74\x72\x75\x65\x22\x20\x73\x72\x63\x3d\x22', '\x22\x20\x77\x69\x64\x74\x68\x3d\x22\x31\x30\x30\x25\x22\x20\x68\x65\x69\x67\x68\x74\x3d\x22\x31\x30\x30\x25\x22\x20\x73\x74\x79\x6c\x65\x3d\x22\x62\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x3a\x20\x23\x30\x30\x30\x30\x30\x30\x22\x20\x66\x72\x61\x6d\x65\x62\x6f\x72\x64\x65\x72\x3d\x22\x30\x22\x20\x62\x6f\x72\x64\x65\x72\x3d\x22\x30\x22\x20\x6d\x61\x72\x67\x69\x6e\x77\x69\x64\x74\x68\x3d\x22\x30\x22\x20\x6d\x61\x72\x67\x69\x6e\x68\x65\x69\x67\x68\x74\x3d\x22\x30\x22\x20\x61\x6c\x6c\x6f\x77\x66\x75\x6c\x6c\x73\x63\x72\x65\x65\x6e\x3d\x22\x61\x6c\x6c\x6f\x77\x66\x75\x6c\x6c\x73\x63\x72\x65\x65\x6e\x22\x20\x6d\x6f\x7a\x61\x6c\x6c\x6f\x77\x66\x75\x6c\x6c\x73\x63\x72\x65\x65\x6e\x3d\x22\x6d\x6f\x7a\x61\x6c\x6c\x6f\x77\x66\x75\x6c\x6c\x73\x63\x72\x65\x65\x6e\x22\x20\x6d\x73\x61\x6c\x6c\x6f\x77\x66\x75\x6c\x6c\x73\x63\x72\x65\x65\x6e\x3d\x22\x6d\x73\x61\x6c\x6c\x6f\x77\x66\x75\x6c\x6c\x73\x63\x72\x65\x65\x6e\x22\x20\x6f\x61\x6c\x6c\x6f\x77\x66\x75\x6c\x6c\x73\x63\x72\x65\x65\x6e\x3d\x22\x6f\x61\x6c\x6c\x6f\x77\x66\x75\x6c\x6c\x73\x63\x72\x65\x65\x6e\x22\x20\x77\x65\x62\x6b\x69\x74\x61\x6c\x6c\x6f\x77\x66\x75\x6c\x6c\x73\x63\x72\x65\x65\x6e\x3d\x22\x77\x65\x62\x6b\x69\x74\x61\x6c\x6c\x6f\x77\x66\x75\x6c\x6c\x73\x63\x72\x65\x65\x6e\x22\x3e\x3c\x2f\x69\x66\x72\x61\x6d\x65\x3e', '\x70\x6c\x61\x79', '\x74\x78\x76\x64', '\x76\x69\x6e\x66\x6f', '\x6d\x61\x69\x6e', '\x3f\x76\x6b\x65\x79\x3d', '\x66\x76\x6b\x65\x79', '\x6d\x65\x74\x65', '\x74\x78\x76\x76', '\x6a\x73\x6f\x6e\x70', '\x74\x78\x6d\x75', '\x68\x74\x74\x70\x73', '\x2e\x6d\x33\x75\x38', '\x68\x6c\x73', '\x6d\x67\x74\x76', '\x69\x6e\x66\x6f', '\x69\x71\x69\x79\x69', '\x3c\x65\x6d\x62\x65\x64\x20\x64\x61\x74\x61\x2d\x77\x69\x64\x67\x65\x74\x2d\x70\x6c\x61\x79\x65\x72\x3d\x22\x66\x6c\x61\x73\x68\x22\x20\x70\x6c\x75\x67\x69\x6e\x73\x70\x61\x67\x65\x3d\x22\x68\x74\x74\x70\x3a\x2f\x2f\x67\x65\x74\x2e\x61\x64\x6f\x62\x65\x2e\x63\x6f\x6d\x2f\x63\x6e\x2f\x66\x6c\x61\x73\x68\x70\x6c\x61\x79\x65\x72\x2f\x22\x20\x6c\x6f\x6f\x70\x3d\x22\x74\x72\x75\x65\x22\x20\x70\x6c\x61\x79\x3d\x22\x74\x72\x75\x65\x22\x20\x71\x75\x61\x6c\x69\x74\x79\x3d\x22\x68\x69\x67\x68\x74\x22\x20\x64\x65\x76\x69\x63\x65\x66\x6f\x6e\x74\x3d\x22\x66\x61\x6c\x73\x65\x22\x20\x61\x6c\x6c\x6f\x77\x66\x75\x6c\x6c\x73\x63\x72\x65\x65\x6e\x3d\x22\x74\x72\x75\x65\x22\x20\x6d\x65\x6e\x75\x3d\x22\x74\x72\x75\x65\x22\x20\x74\x79\x70\x65\x3d\x22\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x2f\x78\x2d\x73\x68\x6f\x63\x6b\x77\x61\x76\x65\x2d\x66\x6c\x61\x73\x68\x22\x20\x77\x69\x64\x74\x68\x3d\x22\x31\x30\x30\x25\x22\x20\x68\x65\x69\x67\x68\x74\x3d\x22\x31\x30\x30\x25\x22\x20\x73\x72\x63\x3d\x22', '\x22\x20\x69\x64\x3d\x22\x66\x6c\x61\x73\x68\x22\x20\x62\x67\x63\x6f\x6c\x6f\x72\x3d\x22\x23\x30\x30\x30\x30\x30\x30\x22\x20\x77\x6d\x6f\x64\x65\x3d\x22\x74\x72\x61\x6e\x73\x70\x61\x72\x65\x6e\x74\x22\x20\x61\x6c\x69\x67\x6e\x3d\x22\x6d\x69\x64\x64\x6c\x65\x22\x20\x68\x69\x6e\x74\x3d\x22\x74\x72\x75\x65\x22\x20\x61\x6c\x6c\x6f\x77\x73\x63\x72\x69\x70\x74\x61\x63\x63\x65\x73\x73\x3d\x22\x61\x6c\x77\x61\x79\x73\x22\x20\x73\x63\x61\x6c\x65\x3d\x22\x4e\x6f\x53\x63\x61\x6c\x65\x22\x3e', '\x70\x6c\x61\x79\x65\x72', '\x64\x70\x6c\x61\x79\x65\x72', '\x67\x65\x74\x45\x6c\x65\x6d\x65\x6e\x74\x42\x79\x49\x64', '\x76\x69\x64\x65\x6f', '\x6c\x6f\x64\x69\x6e\x67\x2e\x6a\x70\x67', '\x73\x65\x73\x73\x69\x6f\x6e\x53\x74\x6f\x72\x61\x67\x65', '\x73\x65\x74\x49\x74\x65\x6d', '\x67\x65\x74\x49\x74\x65\x6d', '\x72\x65\x6d\x6f\x76\x65\x49\x74\x65\x6d', '\x63\x6c\x65\x61\x72', '\x73\x65\x65\x6b', '\x67\x65\x74', '\x4e\x78\x46\x6c\x76', '\x73\x65\x74', '\x63\x75\x72\x72\x65\x6e\x74\x54\x69\x6d\x65', '\x63\x6b\x70\x6c\x61\x79\x65\x72', '\x69\x6e\x6e\x65\x72\x48\x54\x4d\x4c', '\x3c\x65\x6d\x62\x65\x64\x20\x73\x72\x63\x3d\x22\x4e\x78\x70\x6c\x61\x79\x65\x72\x2f\x43\x6b\x70\x6c\x61\x79\x65\x72\x2e\x73\x77\x66\x22\x20\x66\x6c\x61\x73\x68\x76\x61\x72\x73\x3d\x22\x66\x3d\x4e\x78\x70\x6c\x61\x79\x65\x72\x2f\x43\x6b\x6d\x33\x75\x38\x2e\x73\x77\x66\x26\x73\x3d\x34\x26\x70\x3d\x31\x26\x65\x3d\x30\x26\x61\x3d', '\x22\x20\x71\x75\x61\x6c\x69\x74\x79\x3d\x22\x68\x69\x67\x68\x22\x20\x77\x69\x64\x74\x68\x3d\x22\x31\x30\x30\x25\x22\x20\x68\x65\x69\x67\x68\x74\x3d\x22\x31\x30\x30\x25\x22\x20\x61\x6c\x69\x67\x6e\x3d\x22\x6d\x69\x64\x64\x6c\x65\x22\x20\x61\x6c\x6c\x6f\x77\x53\x63\x72\x69\x70\x74\x41\x63\x63\x65\x73\x73\x3d\x22\x61\x6c\x77\x61\x79\x73\x22\x20\x61\x6c\x6c\x6f\x77\x46\x75\x6c\x6c\x73\x63\x72\x65\x65\x6e\x3d\x22\x74\x72\x75\x65\x22\x20\x74\x79\x70\x65\x3d\x22\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x2f\x78\x2d\x73\x68\x6f\x63\x6b\x77\x61\x76\x65\x2d\x66\x6c\x61\x73\x68\x22\x3e\x3c\x2f\x65\x6d\x62\x65\x64\x3e', '\x3c\x76\x69\x64\x65\x6f\x20\x73\x72\x63\x3d\x22', '\x22\x20\x63\x6f\x6e\x74\x72\x6f\x6c\x73\x3d\x22\x63\x6f\x6e\x74\x72\x6f\x6c\x73\x22\x20', '\x20\x70\x72\x65\x6c\x6f\x61\x64\x3d\x22\x70\x72\x65\x6c\x6f\x61\x64\x22\x20\x70\x6f\x73\x74\x65\x72\x3d\x22\x6c\x6f\x61\x64\x69\x6e\x67\x5f\x77\x61\x70\x2e\x67\x69\x66\x22\x20\x77\x69\x64\x74\x68\x3d\x22\x31\x30\x30\x25\x22\x20\x68\x65\x69\x67\x68\x74\x3d\x22\x31\x30\x30\x25\x22\x20\x77\x65\x62\x6b\x69\x74\x2d\x70\x6c\x61\x79\x73\x69\x6e\x6c\x69\x6e\x65\x3d\x22\x74\x72\x75\x65\x22\x20\x70\x6c\x61\x79\x73\x69\x6e\x6c\x69\x6e\x65\x3d\x22\x74\x72\x75\x65\x22\x20\x78\x35\x2d\x70\x6c\x61\x79\x73\x69\x6e\x6c\x69\x6e\x65\x3d\x22\x74\x72\x75\x65\x22\x3e\x3c\x2f\x76\x69\x64\x65\x6f\x3e', '\x35\x30\x30', '\x3c\x69\x66\x72\x61\x6d\x65\x20\x66\x72\x61\x6d\x65\x62\x6f\x72\x64\x65\x72\x3d\x30\x20\x6d\x61\x72\x67\x69\x6e\x68\x65\x69\x67\x68\x74\x3d\x30\x20\x6d\x61\x72\x67\x69\x6e\x77\x69\x64\x74\x68\x3d\x30\x20\x73\x63\x72\x6f\x6c\x6c\x69\x6e\x67\x3d\x6e\x6f\x20\x73\x72\x63\x3d\x22', '\x26\x74\x79\x70\x65\x3d', '\x22\x20\x77\x69\x64\x74\x68\x3d\x22\x31\x30\x30\x25\x22\x20\x68\x65\x69\x67\x68\x74\x3d\x22\x31\x30\x30\x25\x22\x20\x61\x6c\x6c\x6f\x77\x66\x75\x6c\x6c\x73\x63\x72\x65\x65\x6e\x3d\x22\x74\x72\x75\x65\x22\x3e\x3c\x2f\x69\x66\x72\x61\x6d\x65\x3e', '\x34\x30\x34', '\x3c\x64\x69\x76\x20\x73\x74\x79\x6c\x65\x3d\x22\x70\x61\x64\x64\x69\x6e\x67\x2d\x74\x6f\x70\x3a\x32\x30\x25\x3b\x63\x6f\x6c\x6f\x72\x3a\x23\x66\x39\x30\x3b\x74\x65\x78\x74\x2d\x61\x6c\x69\x67\x6e\x3a\x63\x65\x6e\x74\x65\x72\x22\x3e', '\x6d\x73\x67', '\x3c\x2f\x64\x69\x76\x3e', '\x43\x77\x77\x54\x49\x77\x58\x2e\x6e\x72\x79\x4b\x78\x43\x66\x6c\x49\x4a\x76\x72\x48\x2e\x63\x6f\x6d\x59\x4a\x3d\x3d'];
function _0x30db(_0x2091a9, _0x2fca61) {
    _0x2091a9 = ~~'0x'['concat'](_0x2091a9['slice'](0x0));
    var _0x3fc565 = _0x4475[_0x2091a9];
    return _0x3fc565;
};
(function (_0x46d9a7, _0x93e4a8) {
    var _0x4a3e92 = 0x0;
    for (_0x93e4a8 = _0x46d9a7['shift'](_0x4a3e92 >> 0x2); _0x93e4a8 && _0x93e4a8 !== (_0x46d9a7['pop'](_0x4a3e92 >> 0x3) + '')['replace'](/[CTIXryKCIJrHYJ=]/g, ''); _0x4a3e92++) {
        _0x4a3e92 = _0x4a3e92 ^ 0xd32a8;
    }
}
    (_0x4475, _0x30db));
function tipstime(_0x13b374) {
    $(_0x30db('0'))[_0x30db('1')](_0x13b374);
    if (_0x13b374 == 0x14) {
        $(_0x30db('2'))[_0x30db('3')]();
        $(_0x30db('4'))[_0x30db('5')]();
    } else {
        _0x13b374 += 0x1;
        setTimeout(function () {
            tipstime(_0x13b374);
        }, 0x3e8);
    }
}
tipstime(0x0);
function XNXplayer() {
    var _0x2ecc4f = navigator[_0x30db('6')][_0x30db('7')](/iPad|iPhone|iPod/i) != null;
    var _0x53e323 = navigator[_0x30db('6')][_0x30db('7')](/iPad|iPhone|Android|Linux|iPod/i) != null;
    if (_0x2ecc4f) {
        ios = '\x31';
    } else {
        ios = '\x30';
    }
    if (_0x53e323) {
        wap = '\x31';
    } else {
        wap = '\x30';
    }
    var _0x1f23d5 = CryptoJS[_0x30db('8')][_0x30db('9')][_0x30db('a')](Url);
    var _0x5217f1 = {
        '\x6d\x6f\x64\x65': CryptoJS[_0x30db('b')][_0x30db('c')],
        '\x70\x61\x64\x64\x69\x6e\x67': CryptoJS[_0x30db('d')][_0x30db('e')]
    };
    var _0x398e50 = CryptoJS[_0x30db('8')][_0x30db('9')][_0x30db('a')](_0x30db('f'));
    var _0x580f81 = CryptoJS[_0x30db('10')][_0x30db('11')](_0x1f23d5, _0x398e50, _0x5217f1);
    vkey = _0x580f81[_0x30db('12')]();
    $[_0x30db('13')]({
        '\x74\x79\x70\x65': _0x30db('14'),
        '\x75\x72\x6c': _0x30db('15'),
        '\x64\x61\x74\x61\x54\x79\x70\x65': _0x30db('16'),
        '\x64\x61\x74\x61': {
            'url': Url,
            'wap': wap,
            'ios': ios,
            'vkey': vkey,
            'type': type
        },
        '\x73\x75\x63\x63\x65\x73\x73': function (_0x5b6336) {
            if (_0x5b6336[_0x30db('17')] == _0x30db('18')) {
                if (_0x5b6336[_0x30db('19')] == _0x30db('1a')) {
                    var _0x298c28 = document[_0x30db('1b')](_0x30db('1c'));
                    _0x298c28[_0x30db('1d')] = _0x30db('19'),
                    _0x298c28[_0x30db('1e')] = _0x30db('1f');
                    document[_0x30db('20')](_0x30db('21'))[0x0][_0x30db('22')](_0x298c28);
                } else {
                    var _0x298c28 = document[_0x30db('1b')](_0x30db('1c'));
                    _0x298c28[_0x30db('1d')] = _0x30db('19'),
                    _0x298c28[_0x30db('1e')] = _0x30db('23');
                    document[_0x30db('20')](_0x30db('21'))[0x0][_0x30db('22')](_0x298c28);
                }
                if (_0x5b6336[_0x30db('24')][_0x30db('25')](_0x30db('26')) != -0x1) {
                    newurl = _0x5b6336[_0x30db('24')][_0x30db('27')](/AINX/, '');
                    var _0x5217f1 = {
                        '\x6d\x6f\x64\x65': CryptoJS[_0x30db('b')][_0x30db('c')],
                        '\x70\x61\x64\x64\x69\x6e\x67': CryptoJS[_0x30db('d')][_0x30db('e')]
                    };
                    var _0x398e50 = CryptoJS[_0x30db('8')][_0x30db('9')][_0x30db('a')](_0x30db('28'));
                    var _0x580f81 = CryptoJS[_0x30db('10')][_0x30db('29')](newurl, _0x398e50, _0x5217f1);
                    _0x5b6336[_0x30db('24')] = _0x580f81[_0x30db('12')](CryptoJS[_0x30db('8')][_0x30db('9')]);
                }
                if (_0x5b6336[_0x30db('2a')] == _0x30db('2b')) {
                    $(_0x30db('2c'))[_0x30db('2d')](_0x30db('2e') + _0x5b6336[_0x30db('24')] + _0x30db('2f'));
                }
                if (_0x5b6336[_0x30db('30')] == _0x30db('31')) {
                    $[_0x30db('13')]({
                        '\x61\x73\x79\x6e\x63': ![],
                        '\x75\x72\x6c': _0x5b6336[_0x30db('24')],
                        '\x64\x61\x74\x61\x54\x79\x70\x65': _0x30db('16'),
                        '\x73\x75\x63\x63\x65\x73\x73': function (_0x38c1a8) {
                            var _0x1c1e0e = JSON[_0x30db('a')](_0x38c1a8[_0x30db('32')]);
                            _0x5b6336[_0x30db('24')] = _0x5b6336[_0x30db('33')] + _0x1c1e0e['\x76\x6c']['\x76\x69'][0x0]['\x66\x6e'] + _0x30db('34') + _0x1c1e0e['\x76\x6c']['\x76\x69'][0x0][_0x30db('35')] + _0x5b6336[_0x30db('36')];
                            _0x274ee1();
                        }
                    });
                } else if (_0x5b6336[_0x30db('30')] == _0x30db('37')) {
                    $[_0x30db('13')]({
                        '\x61\x73\x79\x6e\x63': ![],
                        '\x75\x72\x6c': _0x5b6336[_0x30db('24')],
                        '\x64\x61\x74\x61\x54\x79\x70\x65': _0x30db('38'),
                        '\x70\x72\x6f\x63\x65\x73\x73\x44\x65\x74\x61': ![],
                        '\x73\x75\x63\x63\x65\x73\x73': function (_0x296839) {
                            _0x5b6336[_0x30db('24')] = _0x296839['\x76\x6c']['\x76\x69'][0x0]['\x75\x6c']['\x75\x69'][0x0][_0x30db('24')] + _0x296839['\x76\x6c']['\x76\x69'][0x0]['\x66\x6e'] + _0x30db('34') + _0x296839['\x76\x6c']['\x76\x69'][0x0][_0x30db('35')];
                            _0x274ee1();
                        }
                    });
                } else if (_0x5b6336[_0x30db('30')] == _0x30db('39')) {
                    $[_0x30db('13')]({
                        '\x61\x73\x79\x6e\x63': ![],
                        '\x75\x72\x6c': _0x5b6336[_0x30db('24')],
                        '\x64\x61\x74\x61\x54\x79\x70\x65': _0x30db('16'),
                        '\x73\x75\x63\x63\x65\x73\x73': function (_0x4709a0) {
                            var _0x1299fb = JSON[_0x30db('a')](_0x4709a0[_0x30db('32')]);
                            var _0x1b2153 = _0x1299fb['\x76\x6c']['\x76\x69'][0x0]['\x75\x6c']['\x75\x69'][0x0][_0x30db('24')];
                            if (_0x1b2153[_0x30db('25')](_0x30db('3a')) == -0x1) {
                                _0x1b2153 = _0x1b2153[_0x30db('27')](/http/, _0x30db('3a'));
                            }
                            _0x5b6336[_0x30db('24')] = _0x1b2153;
                            if (_0x5b6336[_0x30db('24')][_0x30db('25')](_0x30db('3b')) == -0x1) {
                                _0x5b6336[_0x30db('24')] = _0x1b2153 + _0x1299fb['\x76\x6c']['\x76\x69'][0x0]['\x75\x6c']['\x75\x69'][0x0][_0x30db('3c')]['\x70\x74'];
                            }
                            _0x274ee1();
                        }
                    });
                } else if (_0x5b6336[_0x30db('30')] == _0x30db('3d')) {
                    $[_0x30db('13')]({
                        '\x61\x73\x79\x6e\x63': ![],
                        '\x75\x72\x6c': _0x5b6336[_0x30db('24')],
                        '\x64\x61\x74\x61\x54\x79\x70\x65': _0x30db('38'),
                        '\x70\x72\x6f\x63\x65\x73\x73\x44\x65\x74\x61': ![],
                        '\x73\x75\x63\x63\x65\x73\x73': function (_0x1380c3) {
                            _0x5b6336[_0x30db('24')] = _0x1380c3[_0x30db('3e')];
                            _0x274ee1();
                        }
                    });
                } else if (_0x5b6336[_0x30db('30')] == _0x30db('3f')) {
                    $(_0x30db('2c'))[_0x30db('2d')](_0x30db('40') + _0x5b6336[_0x30db('24')] + _0x30db('41'));
                } else {
                    _0x274ee1();
                }
                function _0x274ee1() {
                    if (_0x5b6336[_0x30db('42')] == _0x30db('43')) {
                        if (danmuon == 0x1) {
                            var _0x5d4c64 = new DPlayer({
                                '\x65\x6c\x65\x6d\x65\x6e\x74': document[_0x30db('44')](_0x30db('45')),
                                '\x63\x6f\x6e\x74\x65\x78\x74\x6d\x65\x6e\x75': [{
                                        '\x74\x65\x78\x74': dptext,
                                        '\x6c\x69\x6e\x6b': dplink
                                    }
                                ],
                                '\x61\x75\x74\x6f\x70\x6c\x61\x79': autoplay,
                                '\x73\x63\x72\x65\x65\x6e\x73\x68\x6f\x74': !![],
                                '\x74\x68\x65\x6d\x65': colour,
                                '\x76\x69\x64\x65\x6f': {
                                    '\x75\x72\x6c': _0x5b6336[_0x30db('24')],
                                    '\x74\x79\x70\x65': _0x5b6336[_0x30db('2a')],
                                    '\x6c\x6f\x6f\x70': !![],
                                    '\x70\x69\x63': _0x30db('46')
                                },
                                '\x64\x61\x6e\x6d\x61\x6b\x75': {
                                    '\x69\x64': danmuid,
                                    '\x61\x70\x69': danmuku
                                }
                            });
                        } else {
                            var _0x5d4c64 = new DPlayer({
                                '\x65\x6c\x65\x6d\x65\x6e\x74': document[_0x30db('44')](_0x30db('45')),
                                '\x63\x6f\x6e\x74\x65\x78\x74\x6d\x65\x6e\x75': [{
                                        '\x74\x65\x78\x74': dptext,
                                        '\x6c\x69\x6e\x6b': dplink
                                    }
                                ],
                                '\x61\x75\x74\x6f\x70\x6c\x61\x79': autoplay,
                                '\x73\x63\x72\x65\x65\x6e\x73\x68\x6f\x74': !![],
                                '\x74\x68\x65\x6d\x65': colour,
                                '\x76\x69\x64\x65\x6f': {
                                    '\x75\x72\x6c': _0x5b6336[_0x30db('24')],
                                    '\x74\x79\x70\x65': _0x5b6336[_0x30db('2a')],
                                    '\x6c\x6f\x6f\x70': !![],
                                    '\x70\x69\x63': _0x30db('46')
                                }
                            });
                        }
                        var _0x17e7ef = {
                            '\x73\x65\x74': function (_0x398e50, _0x363aea) {
                                window[_0x30db('47')][_0x30db('48')](_0x398e50, _0x363aea);
                            },
                            '\x67\x65\x74': function (_0x398e50) {
                                return window[_0x30db('47')][_0x30db('49')](_0x398e50);
                            },
                            '\x64\x65\x6c': function (_0x398e50) {
                                window[_0x30db('47')][_0x30db('4a')](_0x398e50);
                            },
                            '\x63\x6c\x65\x61\x72': function (_0x398e50) {
                                window[_0x30db('47')][_0x30db('4b')]();
                            }
                        };
                        _0x5d4c64[_0x30db('4c')](_0x17e7ef[_0x30db('4d')](_0x30db('4e') + _0x5b6336[_0x30db('24')]));
                        setInterval(function () {
                            _0x17e7ef[_0x30db('4f')](_0x30db('4e') + _0x5b6336[_0x30db('24')], _0x5d4c64[_0x30db('45')][_0x30db('50')]);
                        }, 0x3e8);
                    } else if (_0x5b6336[_0x30db('42')] == _0x30db('51')) {
                        document[_0x30db('44')](_0x30db('45'))[_0x30db('52')] = _0x30db('53') + encodeURIComponent(_0x5b6336[_0x30db('24')]) + _0x30db('54');
                    } else if (_0x5b6336[_0x30db('42')] == '\x68\x35') {
                        $(_0x30db('2c'))[_0x30db('2d')](_0x30db('55') + _0x5b6336[_0x30db('24')] + _0x30db('56') + wapautoplay + _0x30db('57'));
                    }
                }
            } else {
                if (online == '\x31') {
                    if (_0x5b6336[_0x30db('17')] == _0x30db('58')) {
                        $(_0x30db('2c'))[_0x30db('3')]();
                        $(_0x30db('2c'))[_0x30db('5')]();
                        $(_0x30db('2c'))[_0x30db('2d')](_0x30db('59') + ather + Url + _0x30db('5a') + type + _0x30db('5b'));
                    };
                    if (_0x5b6336[_0x30db('17')] == _0x30db('5c')) {
                        $(_0x30db('2c'))[_0x30db('3')]();
                        $(_0x30db('2c'))[_0x30db('5')]();
                        $(_0x30db('2c'))[_0x30db('2d')](_0x30db('59') + ather + Url + _0x30db('5a') + type + _0x30db('5b'));
                    }
                } else {
                    $(_0x30db('2c'))[_0x30db('3')]();
                    $(_0x30db('2c'))[_0x30db('5')]();
                    $(_0x30db('2c'))[_0x30db('2d')](_0x30db('5d') + _0x5b6336[_0x30db('5e')] + _0x30db('5f'));
                }
            };
        }
    });
}
XNXplayer();

