import { I_Code } from './@types/projectTypes'

import _ from 'lodash'
import { Dispatch, SetStateAction } from 'react'

interface IProps {
  codes: I_Code[]
  setCode: Dispatch<SetStateAction<I_Code[]>>
}

export function mainMethodsPlanilha(
  codes: I_Code[],
  setCode: (codes: I_Code[]) => void
) {
  // console.log(codes)
  function replaceCode(code: string) {
    const replaces: [RegExp, string][] = [
      [/R(\d+)/gi, 'pegar($1).get.result()'],
      [/C(\d+)/gi, 'pegar($1).get.code()'],
      [/S(\d+)/gi, 'pegar($1).get.style()'],
    ]
    let newCode = code
    replaces.forEach(replace => {
      newCode = newCode.replace(replace[0], replace[1])
    })
    return newCode
  }
  function tryEval(code: string) {
    try {
      if (!code || typeof code !== 'string') return ''
      else if (code?.[0] !== '=') return code
      const codeReplaced = replaceCode(code.slice(1))
      // console.log(codeReplaced)
      const haveReturn = codeReplaced.includes('return')
      const haveAwait = codeReplaced.includes('await')

      if (haveAwait) return eval(`(async () => {${codeReplaced}})()`)
      else if (haveReturn) return eval(`(() => {${codeReplaced}})()`)
      else {
        return eval(codeReplaced)
      }
    } catch (e) {
      return 'error: ' + e
    }

    if (code?.[0] !== '=') return code
    try {
      return eval(code.slice(1))
    } catch (e: any) {
      return e.message
    }
  }

  function pegar(index: number) {
    // console.log({ codes, pegar: true })
    const celula = codes[index]

    if (celula) {
      return {
        set: {
          code: (value: any) => {
            setCode((code: I_Code[]) => {
              const newCode = _.cloneDeep(code)
              newCode[index].js = value
              return newCode
            })
          },
        },
        get: {
          code: () => celula.js,
          css: () => celula.css,
          result: () => tryEval(celula.js),
        },
      }
    } else return ''
  }

  return {
    tryEval,
  }
}

export function tryEval(code: string, context: I_Code[]) {
  if (code?.[0] !== '=') return code
  try {
    return eval(code.slice(1))
  } catch (e: any) {
    return e.message
  }
}
