const fs = require('fs');

const content = 'Some content!';

fs.writeFile('test.txt', content, err => {
    if (err) throw err;
    console.log('The file has been saved!')
});
