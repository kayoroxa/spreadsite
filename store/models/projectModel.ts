import { I_Cell } from './../../src/utils/@types/projectTypes'
import axios from 'axios'
import { action, Action, thunk, Thunk } from 'easy-peasy'
import { I_Page, I_Project } from '../../src/utils/@types/projectTypes'
import getNewLayout from '../../src/utils/getNewLayout'

type MyActionPrev<T> = T | ((prev: T) => T)

export interface ProjectModel {
  name: string | null
  pages: I_Page[]
  loadProject: Action<ProjectModel, I_Project>
  setProject: Action<ProjectModel, MyActionPrev<I_Project>>
  saveProjectInDb: Thunk<ProjectModel, I_Project>

  addLayout: Action<ProjectModel>
  resetLayout: Action<ProjectModel>
  deleteCell: Action<ProjectModel, number>
}

const project: ProjectModel = {
  name: null,
  pages: [],
  loadProject: action((state, payload) => {
    state.name = payload.name
    console.log({ pages: payload.pages })
    state.pages = payload.pages
  }),
  setProject: action((state, payload) => {
    if (typeof payload === 'function') {
      payload(state)
    } else {
      state = payload
    }
  }),
  saveProjectInDb: thunk(async (_, payload, { getState }) => {
    const state = getState()
    const response = await axios.put(
      'http://localhost:3000/api/projects/' + state.name,
      payload
    )
    console.log(response)
  }),
  addLayout: action(state => {
    state.pages[0].cells.push(getNewLayout(state.pages))
  }),
  resetLayout: action(state => {
    state.pages[0].cells = []
  }),
  deleteCell: action((state, payload) => {
    state.pages[0].cells.splice(payload, 1)
  }),
}

export default project
