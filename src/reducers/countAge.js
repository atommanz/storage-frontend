

export default function countAge(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        case 'ATOM':
            return state * 10
        default:
            return state
    }
}