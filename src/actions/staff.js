export default function mapDispatchToProps(dispatch) {
    return {
        getStaff: (staffData) => {
            dispatch({ type: 'getStaff',value: staffData})
        },
        clear: () => {
            dispatch({ type: 'clear',value:'' })
        }
    }
}