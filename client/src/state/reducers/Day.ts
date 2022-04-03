
export interface Day {
    dayIndex: number
}

const defaultDay: Day = {
    dayIndex: 0
}

const reducer = (state: Day | null = defaultDay, action: any) => {
    switch (action.type) {
        case 'changeDay':
            return action.payload;
        default:
            return state;
    }
};

export default reducer;
