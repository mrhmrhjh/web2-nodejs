var fs = require('fs');

// //readFileSync
// console.log('A');
// var result = fs.readFileSync('nodejs/sample.txt', 'utf8');
// console.log(result);
// console.log('C');


//readFile
console.log('A');
var result;
fs.readFile('nodejs/sample.txt', 'utf8', (error, result)=>{
  if (error) {
    console.log('fs.readFile--error');
  }

  console.log(result);
});
console.log('C');
