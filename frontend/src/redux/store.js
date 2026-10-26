import { configureStore } from '@reduxjs/toolkit'

import sectorReducer from './sectors/sectorSlice'
import levelReducer from './levels/levelSlice'

const store = configureStore({
  reducer: {
    sectors: sectorReducer,
    levels: levelReducer,
  },
})

export default store
