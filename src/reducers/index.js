import { combineReducers } from 'redux'
import countAge from './countAge'
import plusTen from './plusTen'
import staff from './staff'

const reducers = combineReducers({
    counter: countAge,
    plus: plusTen,
    staff: staff
})
export default reducers