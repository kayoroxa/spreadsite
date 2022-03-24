type Replaces = {
  [key: string]: string
}

const replaces: Replaces = {
  'all-center': `
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
}

export function replaceCss(css: string) {
  Object.keys(replaces).forEach(key => {
    const regex = new RegExp(`//${key}`, 'g')
    css = css.replace(regex, replaces[key])
  })
  return css
}
