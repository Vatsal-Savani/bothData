import { configureStore } from '@reduxjs/toolkit'
import employeeSlice from '../slices/employeeSlice'

export const store = configureStore({
    reducer: {
        employee: employeeSlice,
    },
})