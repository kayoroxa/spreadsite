import React from 'react'
import { useActions, useStore } from '../../../store/models'

import { ContainerButtonsMenu } from './styles-buttons-menu'

const ButtonsMenu = () => {
  const { allowEdit, staticCells } = useStore(state => state.pageSettings)
  const { setAllowEdit, toggleStaticCells } = useActions(
    actions => actions.pageSettings
  )
  const {
    addLayout,
    // duplicateLayout,
    resetLayout,
    // deleteCell,
    // saveProjectInDb,
  } = useActions(actions => actions.project)
  const { isSaved } = useStore(state => state.project)

  return (
    <ContainerButtonsMenu
      onClick={() => {
        console.log('Oi')
      }}
    >
      <button onClick={() => addLayout()}>+</button>
      <button onClick={() => setAllowEdit(!allowEdit)}>
        {allowEdit ? 'Not Allow Edit' : 'Allow Edit'}
      </button>
      <button onClick={() => toggleStaticCells()}>
        {!staticCells ? 'Not Allow Drag' : 'Allow Drag'}
      </button>

      <button onClick={() => resetLayout()} style={{ opacity: 0.5 }}>
        Reset Layout
      </button>

      {/* {lastCLickCellIndex !== null && allowEdit && (
        <button
          className="delete"
          onClick={() => deleteCell(lastCLickCellIndex)}
        >
          Delete Select
        </button>
      )} */}
      {/* <button
        style={{ display: isSaved ? 'none' : 'block' }}
        onClick={() => saveProjectInDb()}
      >
        Save
      </button> */}
      {/* <button
        onClick={() => {
          duplicateLayout(lastCLickCellIndex)
          if (currentPageIndex !== null) {
            setLastCLickCellIndex(data.pages[currentPageIndex].cells.length)
          }
        }}
      >
        Duplicate
      </button> */}
      {!isSaved ? (
        <p style={{ color: 'red', fontWeight: 'bold' }}>Not Saved</p>
      ) : (
        <p>Saved</p>
      )}
    </ContainerButtonsMenu>
  )
}

export default ButtonsMenu
