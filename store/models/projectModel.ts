import axios from 'axios'
import { action, Action, thunk, Thunk, thunkOn, ThunkOn } from 'easy-peasy'
import { I_Page, I_Project } from '../../src/utils/@types/projectTypes'
import getNewLayout from '../../src/utils/getNewLayout'

type MyActionPrev<T> = T | ((prev: T) => T)
export interface ProjectModel {
  data: {
    name: string | null
    pages: I_Page[]
  }
  currentPageName: string | null
  currentPageIndex: number | null
  setCurrentPageName: Action<ProjectModel, string>
  setCurrentPageIndex: Action<ProjectModel, number>

  isSaved: boolean
  setIsSaved: Action<ProjectModel, MyActionPrev<boolean>>

  loadProject: Action<ProjectModel, I_Project>
  setProject: Action<ProjectModel, MyActionPrev<I_Project>>
  onSetProject: ThunkOn<ProjectModel, MyActionPrev<I_Project>>
  saveProjectInDb: Thunk<ProjectModel>

  addLayout: Action<ProjectModel>
  resetLayout: Action<ProjectModel>
  deleteCell: Action<ProjectModel, number>
}

const project: ProjectModel = {
  data: {
    name: null,
    pages: [],
  },
  currentPageName: null,
  setCurrentPageName: action((state, payload) => {
    state.currentPageName = payload
  }),

  currentPageIndex: null,
  setCurrentPageIndex: action((state, payload) => {
    state.currentPageIndex = payload
  }),

  isSaved: true,
  setIsSaved: action((state, payload) => {
    if (typeof payload === 'function') {
      state.isSaved = payload(state.isSaved)
    } else {
      state.isSaved = payload
    }
  }),
  loadProject: action((state, payload) => {
    state.data.name = payload.name
    console.log({ pages: payload.pages })
    state.data.pages = payload.pages
  }),
  setProject: action((state, payload) => {
    if (typeof payload === 'function') {
      state.data = payload(state.data)
    } else {
      state.data = payload
    }
  }),
  onSetProject: thunkOn(
    actions => actions.setProject,
    async actions => {
      actions.setIsSaved(false)
    }
  ),

  saveProjectInDb: thunk(async (actions, _, { getState }) => {
    const project = getState()
    actions.setIsSaved(true)
    const response = await axios.put(
      'http://localhost:3000/api/projects/' + project.data.name,
      project.data
    )
    console.log({ response })
  }),

  addLayout: action(state => {
    if (state.currentPageIndex === null) return
    state.data.pages[state.currentPageIndex].cells.push(
      getNewLayout(state.data.pages)
    )
  }),
  resetLayout: action(state => {
    if (state.currentPageIndex === null) return
    state.data.pages[state.currentPageIndex].cells = []
  }),
  deleteCell: action((state, payload) => {
    if (state.currentPageIndex === null) return
    state.data.pages[state.currentPageIndex].cells.splice(payload, 1)
  }),
}

export default project
