const { createStore } = require("redux");
// import { legacy_createStore as createStore } from 'redux';

const counterReducer = (state = { counter: 0 }, action) => {
    return {
        counter: state.counter + 1
    }
};

const store = createStore(counterReducer)

const counterSubscriber = () => {
    const latestState = store.getState()
    console.log(latestState)
}

store.subscribe(counterSubscriber);