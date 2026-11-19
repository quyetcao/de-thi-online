import { configureStore } from '@reduxjs/toolkit'

import sectorReducer from './sectors/sectorSlice'
import levelReducer from './levels/levelSlice'
import examReducer from './exams/examSlice'
import examDetailReducer from './exams/examDetailSlice'
import examQuestionReducer from './exams/examQuestionSlice'

const store = configureStore({
  reducer: {
    sectors: sectorReducer,
    levels: levelReducer,
    exams: examReducer,
    examDetail: examDetailReducer,
    examQuestion: examQuestionReducer,
  },
})

export default store
