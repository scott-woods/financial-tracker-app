import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface SelectedPageState {
    value: number
}

const initialState : SelectedPageState = {
    value: 0
}

export const selectedPageSlice = createSlice({
    name: 'selectedPage',
    initialState,
    reducers: {
        setSelectedPage: (state:SelectedPageState, action:PayloadAction<number>) => {
            state.value = action.payload
        }
    }
})

export const { setSelectedPage } = selectedPageSlice.actions

export default selectedPageSlice.reducer

export const selectSelectedPage = (state:any) => state.selectedPage.value