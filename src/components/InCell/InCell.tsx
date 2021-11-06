import styled from 'styled-components'
const Title = styled.h1`
  color: red;
  font-size: 50px;
`
import InsideBox from '../InsideBox/InsideBox'
import { I_Code } from '../../utils/@types/projectTypes'
import { mainMethodsPlanilha } from '../../utils/funcsForSheet'
import { useActions, useStore } from '../../../store/models'

interface IProps {
  code: I_Code
  index: number
  mode: 'js' | 'html' | 'css'
  allowEdit: boolean
  showIndex?: boolean
  handleSetAllCodes: (index: number, valuesFunc: ValuesFunc) => void
}

type ValuesFunc = (prev: I_Code) => I_Code

export default function InCell({
  code,
  index,
  mode,
  allowEdit,
  showIndex = true,
  handleSetAllCodes,
}: IProps) {
  const projectData = useStore(store => store.project.data)
  const { currentPageName } = useStore(store => store.project)
  const { setProject } = useActions(actions => actions.project)

  // function handleCodeChange(codes: I_Code[]) {
  //   setProject(prev => {
  //     const newProject = { ...prev }
  //     newProject.pages[0].cells = newProject.pages[0].cells.map((cell, i) => {
  //       return { ...cell, code: codes[i] }
  //     })
  //     return newProject
  //   })
  // }
  const allValues = projectData.pages.map(page => ({
    codes: page.cells.map(cell => cell.code),
    pageName: page.name,
  }))

  if (currentPageName === null) return <div>Page Name NULL</div>
  const { tryEval } = mainMethodsPlanilha(allValues, currentPageName)
  // const tryEval = (v: any) => console.log({ eval: v })

  return (
    <>
      {showIndex && (
        <span
          style={{
            position: 'absolute',
            background: 'gray',
            opacity: '0.3',
            borderRadius: '5px',
            padding: '0px 5px',
            fontSize: '30px',
            color: 'white',
          }}
        >
          {index}
        </span>
      )}

      <InsideBox
        value={code}
        onValueChange={valueFunc => handleSetAllCodes(index, valueFunc)}
        modeLang={mode}
        tryEval={tryEval}
        allowEdit={allowEdit}
      />
    </>
  )
}
