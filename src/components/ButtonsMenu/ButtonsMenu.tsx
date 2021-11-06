import React from 'react'
import { useActions, useStore } from '../../../store/models'

import { ContainerButtonsMenu } from './styles-buttons-menu'

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
  const { isSaved } = useStore(state => state.project)
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
      <button
        style={{ display: isSaved ? 'none' : 'block' }}
        onClick={() => saveProjectInDb()}
      >
        Save
      </button>
    </ContainerButtonsMenu>
  )
}

export default ButtonsMenu
