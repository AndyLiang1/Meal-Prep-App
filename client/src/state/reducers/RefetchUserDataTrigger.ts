

const reducer = (state: boolean = false, action: any) => {
    switch (action.type) {
        case `refreshTrigger`: 
            return !state
        default: 
            return state;
    }
}

export default reducer