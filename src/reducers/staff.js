

export default function staff(state = '', action) {
    switch (action.type) {
        case 'getStaff':
            return action.value
        case 'clear':
            return ''
        default:
            return state
    }
}