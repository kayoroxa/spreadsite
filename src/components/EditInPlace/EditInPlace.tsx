import { useEffect, useRef } from 'react'

import { ContainerEditInPlace } from './styles-edit-in-place'

interface IProps {
  value: string
  onChange: Function
  onBlur: Function
  breakLine?: boolean
  colors?: boolean
  isEditing: boolean
  showDivResult?: boolean
}
const EditInPlace = ({
  value,
  onChange,
  isEditing,
  onBlur,
  showDivResult = true,
}: IProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (isEditing) {
      textAreaRef?.current?.focus()
    }
  }, [isEditing])

  return (
    <ContainerEditInPlace>
      {isEditing ? (
        <textarea
          className="code-input"
          onBlur={() => onBlur()}
          onChange={e => onChange(e.target.value)}
          ref={textAreaRef}
        >
          {value}
        </textarea>
      ) : (
        showDivResult && <div className="result">{value}</div>
      )}
    </ContainerEditInPlace>
  )
}

export default EditInPlace
