function convertInputToPatterns(matchUnique: any) {
  const inputInsideReplace = matchUnique
    .replace(/html\.replace\(/g, '')
    .replace(/\)/g, '')

  const [pattern, replacement] = inputInsideReplace
    .split(',')
    .map((s: string) => s.trim())
  // console.log({ pattern, replacement })

  // return
  const patternWithoutAspas = pattern.slice(1, -1)
  const patternWithParenthesis = patternWithoutAspas
    .split('$')
    .map((v: any) => `(${v})`)
    .join('.*?')

  return {
    pattern: new RegExp(patternWithParenthesis, 'g'),
    replacement: `$1${replacement.replace(/['|"|`]/g, '')}$2`,
  }
}

function mainInputToReplaces(input: string) {
  const match = input.match(/html\.replace\((.*?)\)/g)
  return match?.map(m => convertInputToPatterns(m)) || []
}

function replaceHtmlByPattern(html: string, replacePatterns: any[]) {
  replacePatterns.forEach(pattern => {
    html = html.replace(pattern.pattern, pattern.replacement)
  })
  return html
}

// const htmlFake = `
// <img src="" alt="">
// <button>Clique em mim</button>
// `

// const input = `html.replace('<button>$</button>', "Ganhar Dinheiro")`

function main(input: string, html: string) {
  const replacePatterns = mainInputToReplaces(input)
  return replaceHtmlByPattern(html, replacePatterns)
}

// main(input, htmlFake)

export default main

///html

// <img src="https://imagem.png" alt="">

/////js

// html.replace('<img src="$"', "https://imagem.png")
