// array, object

// 처리해야 될 일에 대한 정보를 담고 있는 구분이면서 값임.
// 함수를 변수에 넣을 수 있어서 값이라 볼 수 있다.

var f1  = function() {
  console.log(1+1);
  console.log(1+2);
}

// console.log(f1);
// f1();

// 배열의 원소로서 함수가 존재할 수 있음.
var a = [f1];
a[0](); // a[0]는 f1임 --> f1();가 실행됨.


// 함수는 객체에 담을 수 있음.
var o = {
  func : f1
}
o.func(); // o.func는 f1이 됨어서 f1(); 가 실행됨.
