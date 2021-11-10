import InCell from '../InCell'
import { ContainerMainCells } from './styles-main-cells'
import {
  I_Cell,
  I_Coordinates,
  I_Layout,
} from '../../utils/@types/projectTypes'
import { useMemo } from 'react'
// import useWindowSize from '../../utils/useWindowSize'
import ResizableContent from '../ResizableContent'

export default function MainCells({
  onLayoutChange,
  onLastCellClick,
  lastCellCLickIndex,
  cells,
  allowEdit,
  mode,
}: any) {
  // const [width, _] = useWindowSize()
  const layouts: I_Layout[] = useMemo(() => {
    return cells.map((cell: I_Cell) => cell.layout)
  }, [cells])

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

  return (
    <ContainerMainCells>
      {layouts.map((layout: I_Layout, index: number) => (
        <ResizableContent
          onClick={() => onLastCellClick(index)}
          coordinate={convert(layout)}
          setCoordinate={(layout2: I_Coordinates) => {
            onLayoutChangeHandler(index, layout2)
          }}
          isFocused={lastCellCLickIndex === index}
          onFocused={() => onLastCellClick(index)}
        >
          <InCell
            code={cells[index].code}
            handleSetAllCodes={() => {
              onLayoutChange()
            }}
            index={index}
            mode={mode}
            allowEdit={false}
            showIndex={lastCellCLickIndex !== null && allowEdit ? true : false}
          />
        </ResizableContent>
      ))}
    </ContainerMainCells>
  )
}
