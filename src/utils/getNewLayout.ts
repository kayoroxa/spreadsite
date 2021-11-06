import { I_Cell, I_Page } from './@types/projectTypes'

export default function getNewLayout(
  pages: I_Page[],
  indexPage: number
): I_Cell {
  // if (!myLayout) throw new Error('MyLayout não existe')
  const layoutResult = {
    h: 10,
    i: '0',
    w: 10,
    x: 0,
    y: 0,
    minH: 2.5,
    minW: 1.4,
  }
  const code = { js: '', css: '', html: '' }

  const lastCell = pages[indexPage].cells[pages[indexPage].cells.length - 1]
  const len = pages[indexPage].cells.length
  if (len === 0) {
    return { layout: layoutResult, code }
  }
  if (lastCell.layout && len) {
    layoutResult.i = len?.toString()
    layoutResult.x = lastCell.layout.x + lastCell.layout.w
  }
  return { layout: layoutResult, code }
}
