
export const userSubmit = (data) => {
    return {
        type: "USER_SUBMIT",
        payload: data
    }
}

export const userDelete = (data) => {
    return {
        type: "USER_DELETE",
        payload: data
    }
}

export const userEdit = (data) => {
    return {
        type: "USER_EDIT",
        payload: data
    }
} 