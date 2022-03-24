import { I_CodeLanguage } from './@types/projectTypes'
import _ from 'lodash'
import { PageAndCode } from './@types/othersTypes'

export function mainMethodsPlanilha(
  pageCodes: PageAndCode[],
  currentPageName: string | null,
  setProject: (data: {
    index: number
    code: string
    language: I_CodeLanguage
  }) => void,
  replaceMyCode: (data: {
    index: number
    input: string
    language: I_CodeLanguage
  }) => void
  // handleCodeChange: (codes: PageAndCode[]) => void,
) {
  // console.log(codes)
  function replaceCode(code: string) {
    const replaces: [RegExp, string][] = [
      [/R(\d+)_(\S+)/gi, 'pegar($1, "$2").get.result()'],
      [/R(\d+)/gi, 'pegar($1).get.result()'],
      [/C(\d+)_(\S+)/gi, 'pegar($1, "$2").get.code()'],
      [/C(\d+)/gi, 'pegar($1).get.code()'],
      [/S(\d+)_(\S+)/gi, 'pegar($1, "$2").get.style()'],
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
  }
  //pegar(1).replace.html(`html.replace('<button>$</button>', "Ganhar Dinheiro")`)
  //<button>oi</button>

  function pegar(index: number, pageName = currentPageName) {
    // console.log({ codes, pegar: true })
    if (!pageName) return 'Error no page name'
    const code = pageCodes.find(pageCode => pageCode.pageName === pageName)
      ?.codes[index]

    if (code) {
      return {
        set: {
          code: (code: string) => {
            setProject({ index, code, language: 'js' })
          },
        },
        replace: {
          html: (input: string) => {
            replaceMyCode({ index, input, language: 'html' })
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
    pegar,
  }
}

export function tryEval(code: string) {
  if (code?.[0] !== '=') return code
  try {
    return eval(code.slice(1))
  } catch (e: any) {
    return e.message
  }
}
