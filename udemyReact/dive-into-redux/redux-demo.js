const redux = require("redux");
// import { legacy_createStore as createStore } from 'redux';

const counterReducer = (state = { counter: 0 }, action) => {
    if (action.type === 'increment') {
        return {
            counter: state.counter + 1
        }
    }
    return state;

    if (action.type === 'decrement') {
        return {
            counter: state.counter - 1
        }
    }
};

const store = redux.createStore(counterReducer)

const counterSubscriber = () => {
    const latestState = store.getState()
    console.log(latestState)
}

// react-redux 를 사용하면 자동으로 섭스크립션 설정해준다
// 따로 설정없이도 자동으로 최신의 업데이트 상태를 받을 수 있음
store.subscribe(counterSubscriber);

store.dispatch({ type: 'increment' })
store.dispatch({ type: 'decrement' })