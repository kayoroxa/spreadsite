import { ContainerEditCodeDT } from './styles-edit-code-dt'
import {
  Dispatch,
  SetStateAction,
} from 'hoist-non-react-statics/node_modules/@types/react'

interface IProps {
  setMode: Dispatch<SetStateAction<'js' | 'html' | 'css'>>
  children: React.ReactNode
  close: () => any
  mode: 'js' | 'html' | 'css'
}
const EditCodeDT = ({ setMode, children, close, mode }: IProps) => {
  return (
    <ContainerEditCodeDT>
      <div className="head">
        <button
          onClick={() => setMode('js')}
          className={mode === 'js' ? 'toggle' : ''}
        >
          js
        </button>
        <button
          onClick={() => setMode('html')}
          className={mode === 'html' ? 'toggle' : ''}
        >
          html
        </button>
        <button
          onClick={() => setMode('css')}
          className={mode === 'css' ? 'toggle' : ''}
        >
          css
        </button>
        <button onClick={() => close()} className="close">
          X
        </button>
      </div>
      <main>{children}</main>
    </ContainerEditCodeDT>
  )
}

export default EditCodeDT
