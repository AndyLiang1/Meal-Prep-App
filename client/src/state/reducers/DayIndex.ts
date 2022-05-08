const defaultDayIndex = 0

const reducer = (state: number = defaultDayIndex, action: any) => {
    switch (action.type) {
        case 'changeDay':
            return action.payload;
        default:
            return state;
    }
};

export default reducer;
