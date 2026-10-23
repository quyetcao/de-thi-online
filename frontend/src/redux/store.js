import { configureStore } from '@reduxjs/toolkit'
import sectorReducer from './sectors/sectorSlice'

const store = configureStore({
  reducer: {
    sectors: sectorReducer,
  },
})

export default store
