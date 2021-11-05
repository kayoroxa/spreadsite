import { createTypedHooks } from 'easy-peasy'
import pageMethods, { PageMethodsModel } from './pageMethods'
import project, { ProjectModel } from './projectModel'

export interface StoreModel {
  project: ProjectModel
  pageMethods: PageMethodsModel
}

const model: StoreModel = {
  project,
  pageMethods,
}

export default model

const typedHooks = createTypedHooks<StoreModel>()

export const useActions = typedHooks.useStoreActions
export const useDispatch = typedHooks.useStoreDispatch
export const useStore = typedHooks.useStoreState
