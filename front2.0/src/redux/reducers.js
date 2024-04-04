import { createSlice } from "@reduxjs/toolkit"

const userDataLocalStorage = localStorage.getItem('purezaLiquidaUser');
const data = userDataLocalStorage ? JSON.parse(JSON.stringify(JSON.parse(userDataLocalStorage))) : {login:false, user: {_id:'', firstName:'', lastName: '', email: '', phoneNum: '', credentials: '', orders: [], userType: ''}};

const resetValue = {
    data
}

const initialState = resetValue //* ESTO HARA QUE INITIAL STATE SEA EL USER DE LOCALSTORAGE SI ES QUE EXSITE, DE LO CONTRARIO EL RESETVALUE

export const userSlice = createSlice({
    name: 'globalUser',
    initialState,
    reducers: {
        setGlobalUser: (state, action) => {
            localStorage.setItem('purezaLiquidaUser', JSON.stringify(action.payload));
            state.data = action.payload;
        },
        setUser: (state, action) => {
            state.data.user = action.payload;
            localStorage.setItem('purezaLiquidaUser', JSON.stringify(state.data));
        },
        resetGlobalUser: (state) => {
            localStorage.removeItem('purezaLiquidaUser');
            state.data = resetValue;
        }
    }
})

export const { setGlobalUser, resetGlobalUser, setUser } = userSlice.actions;