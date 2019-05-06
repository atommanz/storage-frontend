

export default function plusTen(state = 0, action) {
    switch (action.type) {
        case 'plus10':
            return state + 10
        case 'not':
            return state - 10
        default:
            return state
    }
}