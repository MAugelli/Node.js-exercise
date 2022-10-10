const {
    generateKeySync,
  } = require('node:crypto');

  const ID = generateKeySync('hmac', { length: 64 });
  console.log(ID.export().toString('hex'));
