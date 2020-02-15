export default function  reducer(state = {}, {type, payload}: {type: string, payload: any}):any {
    //work with state
    switch(type) {
        case 'SET_USER_STATE':
            return {
                ...state,
                userData: payload
            }
    }
}