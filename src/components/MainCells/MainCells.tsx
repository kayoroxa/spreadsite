import GridLayout from 'react-grid-layout'
import InCell from '../InCell'
import { ContainerMainCells } from './styles-main-cells'
import { I_Cell, I_Layout } from '../../utils/@types/projectTypes'
import { useMemo } from 'react'
import useWindowSize from '../../utils/useWindowSize'

export default function MainCells({
  onLayoutChange,
  onLastCellClick,
  lastCellCLickIndex,
  cells,
  isDraggable,
  allowEdit,
  mode,
}: any) {
  const [width, _] = useWindowSize()
  const layouts: I_Layout[] = useMemo(() => {
    return cells.map((cell: I_Cell) => cell.layout)
  }, [cells])

  return (
    <ContainerMainCells>
      <GridLayout
        className="layout"
        compactType={null}
        layout={layouts}
        cols={80}
        rowHeight={6}
        width={width}
        onLayoutChange={(layouts: I_Layout[]) => {
          onLayoutChange(
            layouts.map(({ h, i, w, x, y, minH, minW }: I_Layout) => ({
              h,
              i,
              w,
              x,
              y,
              minH,
              minW,
            }))
          )
        }}
        onDragStop={(layouts: I_Layout[]) => {
          onLayoutChange(
            layouts.map(({ h, i, w, x, y, minH, minW }: I_Layout) => ({
              h,
              i,
              w,
              x,
              y,
              minH,
              minW,
            }))
          )
        }}
        preventCollision={true}
        allowOverlap={true}
        isDraggable={isDraggable}
        isResizable={isDraggable}
      >
        {cells.map((cell: I_Cell, index: number) => {
          return (
            <div
              key={cell.layout.i}
              onClick={() => onLastCellClick(index)}
              className={
                lastCellCLickIndex === index && allowEdit ? 'contorno' : ''
              }
              data-grid={cell.layout}
            >
              <InCell
                code={cell.code}
                handleSetAllCodes={() => {}}
                index={index}
                mode={mode}
                allowEdit={false}
                showIndex={
                  lastCellCLickIndex !== null && allowEdit ? true : false
                }
              />
            </div>
          )
        })}
      </GridLayout>
    </ContainerMainCells>
  )
}
