const franc = require('franc');
const langs = require('langs');
const color = require('colors');

const input = process.argv[2];
// const langCode = franc('Alle mennesker er');

const langCode = franc(input);
console.log(langCode);
if (langCode === 'und') {
  console.log('언어를 찾지 못했습니다.'.red);
} else {
  const language = langs.where('3', langCode);
  language
    ? console.log(`사용중인 언어: ${language?.name}`.green)
    : console.log('언어를 찾지 못했습니다.'.red);
}
