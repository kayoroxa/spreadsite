import pageSettings, { PageSettingsModel } from './pageSettings'
import { createTypedHooks } from 'easy-peasy'
import pageMethods, { PageMethodsModel } from './pageMethods'
import project, { ProjectModel } from './projectModel'

export interface StoreModel {
  project: ProjectModel
  pageMethods: PageMethodsModel
  pageSettings: PageSettingsModel
}

const model: StoreModel = {
  project,
  pageMethods,
  pageSettings,
}

export default model

const typedHooks = createTypedHooks<StoreModel>()

export const useActions = typedHooks.useStoreActions
export const useDispatch = typedHooks.useStoreDispatch
export const useStore = typedHooks.useStoreState
