export type I_CodeLanguage = 'js' | 'html' | 'css'

export interface I_Code {
  css: string
  html: string
  js: string
}

export interface I_Layout {
  h: number
  i: string
  w: number
  x: number
  y: number
  minH?: number
  minW?: number
}

export interface I_Cell {
  layout: I_Layout
  code: I_Code
}

export interface I_Page {
  name: string
  cells: I_Cell[]
}

export interface I_Project {
  name: string | null
  pages: I_Page[]
}
