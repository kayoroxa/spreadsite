import { I_Code } from './@types/projectTypes'

import _ from 'lodash'
import { PageAndCode } from './@types/othersTypes'

export function mainMethodsPlanilha(
  pageCodes: PageAndCode[],
  // handleCodeChange: (codes: PageAndCode[]) => void,
  currentPageName: string | null
) {
  // console.log(codes)
  function replaceCode(code: string) {
    const replaces: [RegExp, string][] = [
      [/R(\d+)/gi, 'pegar($1).get.result()'],
      [/R_(.*?)_(\d+)/gi, 'pegar($2, "$1").get.result()'],
      [/C(\d+)/gi, 'pegar($1).get.code()'],
      [/C_(.*?)_(\d+)/gi, 'pegar($2, "$1").get.code()'],
      [/S(\d+)/gi, 'pegar($1).get.style()'],
      [/S_(.*?)_(\d+)/gi, 'pegar($2, "$1").get.style()'],
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

  function pegar(index: number, pageName = currentPageName) {
    // console.log({ codes, pegar: true })
    if (!pageName) return 'Error no page name'
    const code = pageCodes.find(pageCode => pageCode.pageName === pageName)
      ?.codes[index]

    if (code) {
      return {
        set: {
          code: () => {
            console.log('wait')
            // setCode((code: I_Code[]) => {
            //   const newCode = _.cloneDeep(code)
            //   newCode[index].js = value
            //   return newCode
            // })
          },
        },
        get: {
          code: () => code.js,
          css: () => code.css,
          result: () => tryEval(code.js),
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
