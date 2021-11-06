import React from 'react'
import { useActions, useStore } from '../../../store/models'

import { ContainerButtonsMenu } from './styles-buttons-menu'

interface IProps {
  setAllowEdit: (allowEdit: boolean) => void
  addLayout: () => void
  resetLayout: () => void
  setIsDraggable: (callBack: (prev: boolean) => any) => void
  deleteCell: (lastCLickIndex: number | null) => void
  allowEdit: boolean
  isDraggable: boolean
}

const ButtonsMenu = () => {
  const { allowEdit, lastCLickCellIndex, staticCells } = useStore(
    state => state.pageSettings
  )
  const { setAllowEdit, toggleStaticCells } = useActions(
    actions => actions.pageSettings
  )
  const { addLayout, resetLayout, deleteCell, saveProjectInDb } = useActions(
    actions => actions.project
  )
  return (
    <ContainerButtonsMenu>
      <button onClick={() => setAllowEdit(!allowEdit)}>
        {allowEdit ? 'Not Allow Edit' : 'Allow Edit'}
      </button>
      <button onClick={() => addLayout()}>Add Layout</button>
      <button onClick={() => resetLayout()}>Reset Layout</button>
      <button onClick={() => toggleStaticCells()}>
        {!staticCells ? 'Not Allow Drag' : 'Allow Drag'}
      </button>
      {lastCLickCellIndex !== null && allowEdit && (
        <button
          className="delete"
          onClick={() => deleteCell(lastCLickCellIndex)}
        >
          Delete Select
        </button>
      )}
      <button onClick={() => saveProjectInDb()}>Save</button>
    </ContainerButtonsMenu>
  )
}

export default ButtonsMenu
