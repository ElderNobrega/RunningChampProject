const defaultState = {
    user: {}
}

export default function  reducer(
    state = defaultState, {type, payload}: {type: string, payload: any}):any {
    //work with state
    switch(type) {
        case 'SET_USER_STATE':
            if (payload === undefined) {
                return payload
            }
            return {
                ...state,
                user: {
                    userEmail: payload.split('@')[0]  
                }
            }
    }
}