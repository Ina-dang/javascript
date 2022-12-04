import { legacy_createStore as createStore } from "redux"
import { createSlice } from "@reduxjs/toolkit"

export const INCREMENT = 'increment'

const initialState = { counter: 0, showCounter: true }

// 상태가 여러 조각으로 나뉘어져 있을 때 유용
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
            state.increment++;
        },
        decrement(state) {
            state.counter--
        },
        increase(state, action) {
            state.counter + action.amount
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter
        }
    }
})

const store = createStore(counterSlice.reducer);

export default store