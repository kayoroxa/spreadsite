import InCell from '../InCell'
import { ContainerMainCells } from './styles-main-cells'
import {
  I_Cell,
  I_Coordinates,
  I_Layout,
  I_Project,
} from '../../utils/@types/projectTypes'
import { useMemo } from 'react'
// import useWindowSize from '../../utils/useWindowSize'
import ResizableContent from '../ResizableContent'
import { useHotkeys } from 'react-hotkeys-hook'
import { useActions, useStore } from '../../../store/models'

export default function MainCells({
  onLayoutChange,
  staticCells,
  lastCellCLickIndex,
  cells,
  staticCells: boolean
  mode,
}: any) {
  // const [width, _] = useWindowSize()
  const layouts: I_Layout[] = useMemo(() => {
    return cells.map((cell: I_Cell) => cell.layout)
  }, [cells])

  function onLayoutChange(layouts: I_Layout[]) {
    if (layouts.length === 0 || currentPageIndex === null) {
      console.log('vazio')
      return
    }
    setProject((prev: I_Project) => {
      const newProject = { ...prev }
      newProject.pages[currentPageIndex].cells = newProject.pages[
        currentPageIndex
      ].cells.map((c, i) => ({ ...c, layout: layouts[i] }))
      return newProject
    })
  }

  function onLastCellClick(index: number) {
    setLastCLickCellIndex(index)
  }

  // const [width, _] = useWindowSize()

  const { duplicateLayout, deleteCell, saveProjectInDb } = useActions(
    actions => actions.project
  )

  function convert(layout: I_Layout) {
    // h: 44
    // i: "0"
    // minH: 2.5
    // minW: 1.4
    // w: 41
    // x: 9
    // y: 0
    return {
      width: layout?.w * 20,
      height: layout?.h * 20,
      top: layout?.y * 20,
      left: layout?.x * 20,
      rotateAngle: 0,
    }
  }
  function onLayoutChangeHandler(index: number, layout: I_Coordinates) {
    const newLayout = {
      h: layout.height / 20,
      i: index.toString(),
      w: layout.width / 20,
      x: layout.left / 20,
      y: layout.top / 20,
      minH: 2.5,
      minW: 1.4,
    }

    const joinWithOthersLayouts: I_Layout[] = layouts.map(
      (layout: I_Layout, i: number) => {
        if (i === index) {
          return newLayout
        }
        return layout
      }
    )
    return onLayoutChange(joinWithOthersLayouts)
  }

  useHotkeys(
    'ctrl+d',
    event => {
      event.preventDefault()
      if (currentPageIndex !== null && lastCLickCellIndex !== null) {
        duplicateLayout(lastCLickCellIndex)
        setLastCLickCellIndex(projectData.pages[currentPageIndex].cells.length)
      }
    },
    [lastCLickCellIndex]
  )
  useHotkeys(
    'delete',
    event => {
      event.preventDefault()
      if (currentPageIndex !== null && lastCLickCellIndex !== null) {
        deleteCell(lastCLickCellIndex)
        setLastCLickCellIndex(projectData.pages[currentPageIndex].cells.length)
      }
    },
    [lastCLickCellIndex]
  )
  useHotkeys(
    'ctrl+s',
    event => {
      event.preventDefault()
      if (currentPageIndex !== null && lastCLickCellIndex !== null) {
        saveProjectInDb()
      }
    },
    [lastCLickCellIndex]
  )
  useHotkeys(
    'esc',
    event => {
      event.preventDefault()
      if (currentPageIndex !== null && lastCLickCellIndex !== null) {
        setLastCLickCellIndex(null)
      }
    },
    [lastCLickCellIndex]
  )

  return (
    <ContainerMainCells>
      {layouts.map((layout: I_Layout, index: number) => (
        <ResizableContent
          onClick={() => onLastCellClick(index)}
          coordinate={convert(layout)}
          setCoordinate={(layout2: I_Coordinates) => {
            onLayoutChangeHandler(index, layout2)
          }}
          isFocused={lastCLickCellIndex === index}
          onFocused={() => onLastCellClick(index)}
          staticCells={staticCells}
        >
          <InCell
            code={cells[index].code}
            handleSetAllCodes={() => {
              onLayoutChange(layouts)
            }}
            index={index}
            mode={mode}
            allowEdit={false}
            showIndex={lastCLickCellIndex !== null && allowEdit ? true : false}
          />
        </ResizableContent>
      ))}
    </ContainerMainCells>
  )
}
