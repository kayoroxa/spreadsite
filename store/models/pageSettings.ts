import { Action, action, Thunk, thunk } from 'easy-peasy'
import { I_CodeLanguage } from '../../src/utils/@types/projectTypes'

type MyActionPrev<T> = T | ((prev: T) => T)

export interface PageSettingsModel {
  allowEdit: boolean
  setAllowEdit: Action<PageSettingsModel, MyActionPrev<boolean>>
  toggleAllowEdit: Thunk<PageSettingsModel>

  staticCells: boolean
  setStaticCells: Action<PageSettingsModel, MyActionPrev<boolean>>
  toggleStaticCells: Thunk<PageSettingsModel>

  modeLanguage: I_CodeLanguage
  setModeLanguage: Action<PageSettingsModel, MyActionPrev<I_CodeLanguage>>

  lastCLickCellIndex: number | null
  setLastCLickCellIndex: Action<PageSettingsModel, number>

  // pageRoute: I_PageRoutes | null
  // setPageRoute: Action<PageSettingsModel, I_PageRoutes>
}

const pageSettings: PageSettingsModel = {
  allowEdit: false,
  setAllowEdit: action((state, payload) => {
    if (typeof payload === 'function') {
      state.allowEdit = payload(state.allowEdit)
    } else {
      state.allowEdit = payload
    }
  }),
  toggleAllowEdit: thunk(async actions => {
    actions.setAllowEdit(prev => !prev)
  }),

  staticCells: true,
  setStaticCells: action((state, payload) => {
    if (typeof payload === 'function') {
      state.staticCells = payload(state.staticCells)
    } else {
      state.staticCells = payload
    }
  }),
  toggleStaticCells: thunk(async actions => {
    actions.setStaticCells(prev => !prev)
  }),

  modeLanguage: 'js',
  setModeLanguage: action((state, payload) => {
    if (typeof payload === 'function') {
      state.modeLanguage = payload(state.modeLanguage)
    } else {
      state.modeLanguage = payload
    }
  }),

  // pageRoute: null,
  // setPageRoute: action((state, payload) => {
  //   state.pageRoute = payload
  // }),

  lastCLickCellIndex: null,
  setLastCLickCellIndex: action((state, payload) => {
    state.lastCLickCellIndex = payload
  }),
}

export default pageSettings
