//import { useSelector } from "react-redux";

export const setUserState = (payload: any) => {
    return { type: 'SET_USER_STATE', payload}
}

/*export const userIsLoggedIn = () => {
    return useSelector((state: any) => {
        return state !== undefined;
    })
}*/