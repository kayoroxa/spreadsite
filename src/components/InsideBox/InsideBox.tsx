import EditInPlace from '../EditInPlace'
import { useState } from 'react'
// import { tryEval } from '../../../utils/funcsForSheet'
import styled from 'styled-components'
import { I_Code } from '../../utils/@types/projectTypes'

// interface ObjLang {
//   js: ''
//   html: ''
//   css: ''
// }
interface Props {
  value: I_Code
  onValueChange: (callBack: (prev: I_Code) => I_Code) => void
  modeLang: 'js' | 'html' | 'css'
  tryEval: Function
  allowEdit: boolean
}

InsideBox.defaultProps = {
  value: { js: '', html: '', css: '' },
  onValueChange: () => {},
  modeLang: 'js',
}

interface SProps {
  cssInput: string
}

const MainStyle = styled.div<SProps>`
  width: 100%;
  height: 100%;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  text-align: center;
  * {
    width: 100%;
  }

  ${({ cssInput }) => {
    return cssInput
  }};
`

export default function InsideBox({
  value,
  modeLang,
  tryEval,
  allowEdit,
}: Props) {
  const [isEditing, setIsEditing] = useState(false)
  // console.log({ id: value, printBrothers: printBrothers() })
  const showCode = !isEditing || !allowEdit
  return (
    <MainStyle
      className="InsideBox"
      onClick={() => setIsEditing(true)}
      style={{ cursor: allowEdit ? 'pointer' : 'default' }}
      cssInput={value.css}
    >
      {/* <div>{value.css}</div> */}
      {modeLang === 'html' && showCode && (
        <div dangerouslySetInnerHTML={{ __html: value.html }} />
      )}
      {modeLang === 'css' && showCode && <div>{value.css}</div>}
      {modeLang === 'js' && showCode && (
        <div style={{ width: '100%' }}>{tryEval(value.js || '')}</div>
      )}
      {isEditing && allowEdit && (
        <EditInPlace
          value={value[modeLang]}
          onChange={() => {
            // console.log({ value })
            // onValueChange((prev: ObjLang) => ({ ...prev, [modeLang]: value }))
          }}
          breakLine={false}
          colors={true}
          isEditing={isEditing}
          onBlur={() => setIsEditing(false)}
          showDivResult={false}
        />
      )}
    </MainStyle>
  )
}
