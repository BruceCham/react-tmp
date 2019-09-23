/*
 * 生成唯一的uuid
 */
let uuid = {
  s4() {
    // eslint-disable-next-line no-bitwise
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  },
  guid() {
    return (uuid.s4() + uuid.s4() + uuid.s4() + uuid.s4());
  },
}

/*
 * 测评参数
 */
let evalParam = {
  connect: {
    cmd: 'connect',
    param: {
      sdk: {
        version: 50528256,
        source: 2,
        protocol: 2,
      },
      app: {
        applicationId: 't275',
        sig: '',
        timestamp: '',
      },
    },
  },
  start: {
    cmd: 'start',
    param: {
      app: {
        userId: 'wechat',
        applicationId: 't275',
        sig: '',
        timestamp: '',
      },
      audio: {
        audioType: 'ogg',
        sampleRate: 16000,
        channel: 1,
        sampleBytes: 2,
      },
      request: {
        typeThres: 0,
        precision: 0.1,
        rateScale: 1.5,
        attachAudioUrl: 1,
        coreType: '',
        refText: 'hello world',
        rank: 100,
        tokenId: uuid.guid(),
      },
    },
  },
}

/*
 * 获取source
 */
function source() {
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // g
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
  if (isAndroid) {
    return 1;
  }
  if (isIOS) {
    return 5;
  }
  return 7
}

/*
 * 产生版本号
 */
function getVersion() {
  let vers = '2.0.0';
  let strs = vers.split('.');
  // eslint-disable-next-line no-restricted-properties
  let version = (parseInt(strs[0], 10) * Math.pow(2, 16)
    // eslint-disable-next-line no-restricted-properties
    + parseInt(strs[1], 10) * Math.pow(2, 8)
    // eslint-disable-next-line no-restricted-properties
    + parseInt(strs[2], 10)) * Math.pow(2, 8);
  return version;
}

/*
* 获取评测的json
* @param userId 微信用户Id
* @param refText 测评内容
* @param coreType 测评类型
*/
// eslint-disable-next-line import/prefer-default-export
export const getEvalJson = (userId, refText, coreType = 'en.sent.score') => {
  evalParam.connect.param.sdk.version = getVersion();
  evalParam.connect.param.sdk.source = source();
  evalParam.start.param.app.userId = userId;
  evalParam.start.param.request.refText = refText;
  evalParam.start.param.request.coreType = coreType;
  return JSON.stringify(evalParam)
}