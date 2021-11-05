import GridLayout from 'react-grid-layout'
import InCell from '../InCell'
import { ContainerMainCells } from './styles-main-cells'
import { I_Cell, I_Code, I_Layout } from '../../utils/@types/projectTypes'
import { useMemo } from 'react'
import useWindowSize from '../../utils/useWindowSize'
type ValuesFunc = (prev: I_Code) => I_Code

export default function MainCells({
  onLayoutChange,
  onLastCellClick,
  lastCellCLickIndex,
  cells,
  isDraggable,
  allowEdit,
  mode,
  index,
}: any) {
  const [width, _] = useWindowSize()
  const layouts: I_Layout[] = useMemo(() => {
    return cells.map((cell: I_Cell) => cell.layout)
  }, [])

  function handleSetAllValues(index: number, valuesFunc: ValuesFunc) {
    // setAllValues(prev => {
    //   const newValues = [...prev]
    //   newValues[index] = valuesFunc(prev[index])
    //   return newValues
    // })
  }

  return (
    <ContainerMainCells>
      <GridLayout
        className="layout"
        compactType={null}
        layout={layouts}
        cols={80}
        rowHeight={6}
        width={width}
        onLayoutChange={(layout: I_Layout[]) => {
          onLayoutChange(layout)
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
                handleSetAllCodes={handleSetAllValues}
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
