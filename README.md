## 2020.09.08 우아한테크러닝 4회차(19:00~)


### Intro
- Redux middleware
- 비동기

###  Generator & Async
```
function* foo()
{
}
```
- Generator function은 function키워드 앞에 *을 붙여서 선언한다. 함수명 앞에 써도 무방하다.

```
async function bar()
{
}
```
- 비동기 함수는 funtion 키워드 앞에 async 를 붙여 사용한다. 이 함수는 `Promise` 객체를 반환한다

###Hoisting
```
var x = 10
var y = x* 10
```
- 위와 같이 코드가 있다고 했을때, 변수 x와 y는 동시에 실행이 가능한가? 그럴 수 없다. `x`가 선언되지 않은 상태에서 `y`가 `x`의 값을 참조하기 때문. 

``` 
var x = x => 10
vat y = x() * 10
```
- 이런 코드는 동시에 실행이 가능하다. 지연 호출로  값이 확정되는 순간을 지연시켰기 때문이다.


```
num = 6;
num + 7;
var num; 
```
- 위 코드는 에러를 내지 않는데, 이는 자바스크립트가 코드를 실행하기 전, 함수 선언을 메모리에 저장하기 때문이다. 이는 함수를 선언하기 전에 함수를 호출해도 문제가 없도록 한다.

- 다만 초기화가 아닌 선언만 끌어올리므로, 변수의 경우 선언하기 전에 초기화하여 사용해야하기 때문에 아래와 같은 코드는 에러를 뱉는다.

```
var x = 1; // x 초기화
console.log(x + " " + y); // '1 undefined'
var y = 2;


var x = 1; // Initialize x
var y; // Declare y
console.log(x + " " + y); // '1 undefined'
y = 2; // Initialize y
```

- 변수를 선언한 뒤 나중에 초기화시켜 사용한다면, 그 값은 undefined로 지정된다.
-

### Generator function
- Generator function는 yield를 통해 호출 된 곳으로 빠졌다가 나중에 다시 돌아올 수 있는 함수이다.  Generator function이 리턴하는 것을 Iterator 객체  Generator라고 하고, 이때 컨텍스트는 출입 과정에서 저장된 상태로 남아있다.
-Iterator의 next() 메서드를 호출하면 Generator 함수가 실행되어 yield 문을 만날 때까지 진행하고, 해당 표현식이 명시하는 Iterator로부터의 반환값을 반환한다.
- yield나 return 이 나올때까지 yield는 retrun 과 달리 함수를 끝내지 않는다. 값을 내보내기만 할뿐이다.
-  이후 `next()` 메서드가 호출되면 진행이 멈췄던 위치에서부터 재실행한다. 
-  `next()` 가 반환하는 객체는 yield문이 반환할 값(yielded value)을 나타내는 `value` 속성과, Generator 함수 안의 모든 yield 문의 실행 여부를 표시하는 `boolean` 타입의 `done` 속성을 갖는다.
-  next() 를 인자값과 함께 호출할 경우, 진행을 멈췄던 위치의 yield 문을  next() 메서드에서 받은 인자값으로 치환하고 그 위치에서 다시 실행하게 된다.


```
function* makeNumber() {
  let num = 1;
  while (true) {
    console.log(yield);
    yield num++;
  }
}

const y = makeNumber(); 
//실제로 실행되지는 않고, 실행할 수 있는 메소드가 담긴 객체
console.log(y.next());

y.next("x"); //값을 안쪽으로 보낼 수도 있다! 마치 커뮤니케이션 하는 느낌
```

```
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

```

### Async Function
- `AsyncFunction` 생성자는 새로운 `async function` 객체를 만든다. 자바스크립트에서 모든 비동기 함수는 사실상 `AsyncFunction` 객체이다.
- 비동기 함수는 이벤트 루프를 통해 비동기적으로 작동하는 함수
- Promise : `async` 함수에 의해 반환 된 값으로 해결되거나 `async`함수 내에서 발생하는 캐치되지 않는 예외로 거부되는 값. async 함수는 항상 promise를 반환합니다. 만약 `async` 함수의 반환값이 명시적으로 `promis`e가 아니라면 암묵적으로 `promise`로 감싸진다. 

```
async function main2() {
  console.log("시작");
  await delay(3000);
  console.log("3초뒤");
}

main2();
```
-  async 함수는 await와 꼭 함께 써야하는데, `async` 함수의 본문은 0개 이상의 `await` 문으로 분할된 것으로 생각할 수 있기 때문이다. `await` 문이 없는`async` 함수는 동기적으로 실행된다.
