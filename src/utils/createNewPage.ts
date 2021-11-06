import { I_Page } from './@types/projectTypes'

export function createNewPage(pageName: string): I_Page {
  return {
    name: pageName,
    cells: [],
  }
}
