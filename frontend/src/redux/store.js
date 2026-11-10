import { configureStore } from '@reduxjs/toolkit'

import sectorReducer from './sectors/sectorSlice'
import levelReducer from './levels/levelSlice'
import examReducer from './exams/examSlice'

const store = configureStore({
  reducer: {
    sectors: sectorReducer,
    levels: levelReducer,
    exams: examReducer,
  },
})

export default store
