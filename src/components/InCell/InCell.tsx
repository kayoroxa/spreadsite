import styled from 'styled-components'
const Title = styled.h1`
  color: red;
  font-size: 50px;
`
import InsideBox from '../InsideBox/InsideBox'
import { I_Code } from '../../utils/@types/projectTypes'

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
  // const { tryEval } = mainMethodsPlanilha(allValues, setAllValues)
  const tryEval = (v: any) => console.log(v)

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
