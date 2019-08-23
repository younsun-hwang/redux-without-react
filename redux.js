//각 DOM엘리먼트에 대한 레퍼런스를 만들어준다
const elNumber = document.getElementById('number');
const btnIncrement = document.getElementById('increment');
const btnDecrement = document.getElementById('decrement');

//액션 타입 정의
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

//액션 객체를 만들어주는 액션 생성 함수
const increment = (diff) => ({ type: INCREMENT, diff: diff });
const decrement = () => ({ type: DECREMENT });

//초기값설정. 상태 형태는 개발자 마음
const initialState = {
  number: 0
};

/*리듀서 함수
state와 action을 파라미터로 받아와서
그에 따라 다음 상태를 정의한 다음 반환해 줌
*/

const counter = (state = initialState, action) => {
  console.log(action);
  switch(action.type) {
    case INCREMENT:
      return { 
        number: state.number + action.diff
      };
    case DECREMENT:
      return { 
        number: state.number - 1
      };
    default:
      return state;
  }
}

//스토어를 만들 땐 createStore에 리듀서 함수를 넣어서 호출
const { createStore } = Redux;
const store = createStore(counter);


//상태 변경될 때마다 호출시킬 listener를 등록
const render = () => {
  //아까 getElementById로 불러온 DOM요소의 값을
  //스토어에 저장된 number라는 스테이트에서 가져와서 바꿔줌
  elNumber.innerText = store.getState().number;
  console.log('내가 실행됨');
}

//스토어에 구독하고, 뭔가 변화가 있다면 render함수를 실행
store.subscribe(render);

//초기렌더링을 위해 직접 실행시켜줌
render();

//버튼에 이벤트를 달아서
//스토어에 변화를 일으키려할 때는 dispatch에 action객체 넣어서 호출
btnIncrement.addEventListener('click', () => {
  store.dispatch(increment(25));
})

btnDecrement.addEventListener('click', () => {
  store.dispatch(decrement());
})


