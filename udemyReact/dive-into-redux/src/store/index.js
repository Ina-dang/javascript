import { configureStore, createSlice } from "@reduxjs/toolkit"

const initialState = { counter: 0, showCounter: true }

/* 상태가 여러 조각으로 나뉘어져 있을 때 유용
서로다른 리듀서에 해당하는 고유 액션 식별자를 자동으로 생성
(액션 객체 타입, 액션 기본생성자 자동 생성)
*/
const counterSlice = createSlice({
    name: 'counter',
    initialState,
    // 객체 혹은 맵이라 생각하면됨
    reducers: {
        /* 기존의 if reducer들을 이렇게 변경. 자동으로 최근의 값을 받는다
         어떤액션을 했느냐에따라 자동으로 메서드를 호출해줌
         how? 리듀서를 구분해놓고 각각의 리듀서에 해당하는 액션을 발생시킴
         */
        increment(state) {
            /* 
            이전엔 리턴객체에 무조건 담아줘야했는데 (state.increment++ 처럼 바로 변경하는 코드사용불가했음)
            지금은 적어줄 수 있다
             why? 툴킷이 내부적으로 immer이라는 다른 패키지를 사용하는데 
            immer가 이런 코드를 감지하고 자동으로 원래 있는 상태를 복제한다. 
            그리고 새로운 상태 객체를 생성하고 모든 상태를 변경할 수 없게 유지하고
            이 상태가 변하지않도록 오버라이드를 해줌
            ==> 내부적으로 알아서 변경할 수 없는 코드로 변환해줌
            */
            state.counter++;
        },
        decrement(state) {
            state.counter--
        },
        increase(state, action) {
            // 툴킷이 자동으로 액션생성자를 생성하기 때문에 필드명을 꼭 payload로 해줘야함
            state.counter = state.counter + action.payload
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter
        }
    }
})


/* 
여러개의 리듀서를 하나의 리듀서로 합칠 수 있음

*/
const store = configureStore({
    // 객체를 설정해서 그 안에 속성을 정할 수 있음. configureStore가 병합해줌
    // reducer: { counter: counterSlice.reducer }
    // 근데 키 값 하나라 객체에 안넣고 곧바로 주요 리듀서로 할당함
    reducer: counterSlice.reducer

});

export const counterActions = counterSlice.actions;
export default store