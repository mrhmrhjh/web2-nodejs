// function a() {
//   console.log('A');
// }

var a = function() {
  console.log('AA');
}

// a();


function slowfunc(callback) {
  callback();
}

slowfunc(a);
