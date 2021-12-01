import fetch from 'node-fetch';
const api = `https://api.chucknorris.io/jokes/random`;

fetch(api).then((response) => {
	console.log(response.constructor);   // => ƒ Response() { [native code] } OR [class Response extends Body]
	// console.log(response);
});

// Response {
//   size: 0,
//   [Symbol(Body internals)]: {
//     body: BrotliDecompress {
//       _writeState: [Uint32Array],
//       _readableState: [ReadableState],
//       _events: [Object: null prototype],
//       _eventsCount: 6,
//       _maxListeners: undefined,
//       _writableState: [WritableState],
//       allowHalfOpen: true,
//       bytesWritten: 0,
//       _handle: [BrotliDecoder],
//       _outBuffer: <Buffer 7b 22 63 61 74 65 67 6f 72 69 65 73 22 3a 5b 5d 2c 22 63 72 65 61 74 65 64 5f 61 74 22 3a 22 32 30 32 30 2d 30 31 2d 30 35 20 31 33 3a 34 32 3a 32 30 ... 16334 more bytes>,
//       _outOffset: 0,
//       _chunkSize: 16384,
//       _defaultFlushFlag: 0,
//       _finishFlushFlag: 2,
//       _defaultFullFlushFlag: 1,
//       _info: undefined,
//       _maxOutputLength: 4294967296,
//       [Symbol(kCapture)]: false,
//       [Symbol(kCallback)]: null,
//       [Symbol(kError)]: null
//     },
//     stream: BrotliDecompress {
//       _writeState: [Uint32Array],
//       _readableState: [ReadableState],
//       _events: [Object: null prototype],
//       _eventsCount: 6,
//       _maxListeners: undefined,
//       _writableState: [WritableState],
//       allowHalfOpen: true,
//       bytesWritten: 0,
//       _handle: [BrotliDecoder],
//       _outBuffer: <Buffer 7b 22 63 61 74 65 67 6f 72 69 65 73 22 3a 5b 5d 2c 22 63 72 65 61 74 65 64 5f 61 74 22 3a 22 32 30 32 30 2d 30 31 2d 30 35 20 31 33 3a 34 32 3a 32 30 ... 16334 more bytes>,
//       _outOffset: 0,
//       _chunkSize: 16384,
//       _defaultFlushFlag: 0,
//       _finishFlushFlag: 2,
//       _defaultFullFlushFlag: 1,
//       _info: undefined,
//       _maxOutputLength: 4294967296,
//       [Symbol(kCapture)]: false,
//       [Symbol(kCallback)]: null,
//       [Symbol(kError)]: null
//     },
//     boundary: null,
//     disturbed: false,
//     error: null
//   },
//   [Symbol(Response internals)]: {
//     type: 'default',
//     url: 'https://api.chucknorris.io/jokes/random',
//     status: 200,
//     statusText: 'OK',
//     headers: {
//       'alt-svc': 'h3=":443"; ma=86400, h3-29=":443"; ma=86400, h3-28=":443"; ma=86400, h3-27=":443"; ma=86400',
//       'cf-cache-status': 'DYNAMIC',
//       'cf-ray': '6b6d8273db4b7583-LHR',
//       connection: 'close',
//       'content-encoding': 'br',
//       'content-type': 'application/json;charset=UTF-8',
//       date: 'Wed, 01 Dec 2021 15:57:09 GMT',
//       'expect-ct': 'max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"',
//       nel: '{"success_fraction":0,"report_to":"cf-nel","max_age":604800}',
//       'report-to': '{"endpoints":[{"url":"https:\\/\\/a.nel.cloudflare.com\\/report\\/v3?s=eKFvc0KLd%2FrDActJgGU6nQzjJZRzltR51vxZ9OkiLj%2BuhQEg28Vy5ud68KkggDYulXAL%2BhzjZ3ajDKPqe0rxaQi2kNkmY1zrMfZdVNLDl2sBdUZrfski3wl7sR1%2BuRJ50dFB%2B04%3D"}],"group":"cf-nel","max_age":604800}',
//       server: 'cloudflare',
//       'transfer-encoding': 'chunked',
//       via: '1.1 vegur'
//     },
//     counter: 0,
//     highWaterMark: 16384
//   }
// }
