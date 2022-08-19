const initialState = {
    history: []
}

function rootReducer(state = initialState, action){

let newState;

    switch (action.type) {
        case "ADD_ITEM_HISTORY":
            newState = {
                ...state,
                history: state.history.concat([action.payload])
            }
            // console.log('ici la', newState);
            return newState;
    
        default:
            return state;
    }
}

export default rootReducer;