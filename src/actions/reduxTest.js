export default function mapDispatchToProps(dispatch) {
    return {
        increteAge: () => {
            dispatch({ type: 'INCREMENT' })
        },
        decreteAge: () => {
            dispatch({ type: 'DECREMENT' })
        },
        atomAge: () => {
            dispatch({ type: 'ATOM' })
        },
        plus10: () => {
            dispatch({ type: 'plus10' })
        },
        not: () => {
            dispatch({ type: 'not' })
        }
    }
}