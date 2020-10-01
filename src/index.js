import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

function* makeNumber() {
  let num = 1;
  while (true) {
    console.log(yield);
    yield num++;
  }
}
//기존에는 함수의 값을 리턴하는 것이다. yield

const y = makeNumber(); //실제로 실행되지는 않고, 실행할 수 있는 메소드가 담긴 객체
console.log(y.next()); //yield나 return 이 나올때까지 yield는 retrun 과 달리 함수를 끝내지 않는다. 값을 내보내기만 할뿐이다.
y.next("x"); //값을 안쪽으로 보낼 수도 있다! 마치 커뮤니케이션 하는 느낌

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function* main() {
  console.log("시작");
  yield delay(3000);
  console.log("3초뒤");
}

const it = main();
// { value: xx , done: false }
const { value } = it.next();

value.then(() => {
  it.next();
});

async function main2() {
  console.log("시작");
  await delay(3000);
  console.log("3초뒤");
} //async 함수는 await와 꼭 함께 써야한다.

main2();
