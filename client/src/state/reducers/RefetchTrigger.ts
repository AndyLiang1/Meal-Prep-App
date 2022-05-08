

const reducer = (state: boolean = false, action: any) => {
    switch (action.type) {
        case `refetchTrigger`: 
            return !state
        default: 
            return state;
    }
}

export default reducer