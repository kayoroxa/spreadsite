import { action, thunk } from 'easy-peasy'

type MyActionPrev<T> = T | ((prev: T) => T)

export interface PageMethodsModel {}

const pageMethods: PageMethodsModel = {
  addLayoutCell: thunk((_, payload, { getStoreActions }) => {
    getStoreActions().project.loadProject(payload)
  }),
}

export default pageMethods

// found it , thunk receives a parameter called helpers, which offers a getState function.
// code would be:
// const dogModel = {
//   dog: null,
//   getDog: thunk(async (actions, payload, helpers) => {
//     // --> this is what I'm after:
//     let cat = helpers.getState().cat
//     if (cat.isCatAround()) {
//       actions.setPudel()
//     } else {
//       actions.setBulldog()
//     }
//   }),
// }
