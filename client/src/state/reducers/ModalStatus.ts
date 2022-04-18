export const defaultModalOn:boolean = false

const reducer = (state: boolean = defaultModalOn, action: any) => {
    switch (action.type) {
        case 'setModalStatus':
            return action.payload;
        default:
            return state;
    }
};

export default reducer
