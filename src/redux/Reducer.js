const initialState = {
    data: [],
    editData: {
        firstName: "",
        lastName: "",
        country: "",
        language: "",
        interests: [],
    },
};

const handleFormDetails = (state = initialState, Action) => {
    switch (Action.type) {
        case 'USER_SUBMIT':
            return {
                ...state,
                data: [...Action.payload],
            };
        case 'USER_DELETE':
            let deletedData = state.data.filter(
                (item, index) => index !== Action.payload
            );
            return {
                ...state,
                data: [...deletedData],
            };
        case 'USER_EDIT':
            let editedData = state.data.find(
                (item, index) => index === Action.payload
            );
            return {
                ...state,
                editData: { ...editedData },
            };
        default:
            break;
    }
}

export default handleFormDetails