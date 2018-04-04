import { createStore, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import PropTypes from 'prop-types'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

let reducers = combineReducers(
    {
        router: routerReducer
    }
)

const store = (history) => createStore(reducers,
    applyMiddleware(
        logger,
        thunk,
        routerMiddleware(history),
    )
);

store.propTypes = {
    history: PropTypes.object.isRequired
};



export default store;