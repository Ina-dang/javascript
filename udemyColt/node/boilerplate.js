const fs = require('fs');
const folderName = process.argv[2] || 'Project';

// 비동기 방식
// fs.mkdir(folderName, { recursive: true }, (err) => {
//   if (err) throw err;
// });

// 동기 방식
try {
  fs.mkdirSync(folderName);
  fs.writeFileSync(`${folderName}/index.html`);
  fs.writeFileSync(`${folderName}/app.js`);
  fs.writeFileSync(`${folderName}/styles.css`);
} catch (error) {
  console.log(error);
}
