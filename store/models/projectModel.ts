import axios from 'axios'
import { action, Action, thunk, Thunk } from 'easy-peasy'
import { I_Page, I_Project } from '../../src/utils/@types/projectTypes'

type MyActionPrev<T> = T | ((prev: T) => T)

export interface ProjectModel {
  name: string | null
  pages: I_Page[]
  loadProject: Action<ProjectModel, I_Project>
  setProject: Action<ProjectModel, MyActionPrev<I_Project>>
  saveProjectInDb: Thunk<ProjectModel, I_Project>
}

const project: ProjectModel = {
  name: null,
  pages: [],
  loadProject: action((state, payload) => {
    state.name = payload.name
    state.pages = payload.pages
  }),
  setProject: action((state, payload) => {
    if (typeof payload === 'function') {
      payload(state)
    } else {
      state.name = payload.name
      state.pages = payload.pages
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
}

export default project
