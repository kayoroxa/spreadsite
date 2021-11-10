import styled from 'styled-components'
import { useEffect, useState, useRef } from 'react'
// import Moveable from 'react-moveable'
import ResizableRect from 'react-resizable-rotatable-draggable'
import { Fragment } from 'react'

const ComponentStyle = styled.div`
  position: absolute;
  overflow: hidden;
  > * {
    width: 100%;
  }
`

export default function ResizableContent({
  coordinate,
  setCoordinate,
  children,
  onClick,
  isFocused,
  onFocused,
}) {
  const main = useRef()

  useEffect(() => {
    if (main) {
      main.current.style.width = `${coordinate.width}px`
      main.current.style.height = `${coordinate.height}px`
      main.current.style.top = `${coordinate.top}px`
      main.current.style.left = `${coordinate.left}px`
      main.current.style.transform = `rotate(${coordinate.rotateAngle}deg)`
    }
  }, [main, coordinate])

  function handleResize(style, isShiftKey, type) {
    let { top, left, width, height } = style

    setCoordinate({
      ...coordinate,
      top: Math.round(top),
      left: Math.round(left),
      width: Math.round(width),
      height: Math.round(height),
    })
  }

  // function handleRotate(rotateAngle) {
  //   setCoordinate({
  //     ...coordinate,
  //     rotateAngle,
  //   })
  // }

  function handleDrag(deltaX, deltaY) {
    // console.log({ deltaX, deltaY })
    onFocused(true)
    setCoordinate({
      ...coordinate,
      left: coordinate.left + deltaX,
      top: coordinate.top + deltaY,
    })
  }

  // const { width, top, left, height, rotateAngle } = state
  return (
    <div
      onClick={() => onClick()}
      style={{
        position: 'relative',
        // zIndex: isFocused ? 1000 : 0
      }}
    >
      <ComponentStyle ref={main} className="subBloco selectDisable">
        {children}
      </ComponentStyle>
      <div className="hover">
        <div
          style={{
            opacity: isFocused ? 1 : 0,
            zIndex: isFocused ? 1000 : -900,
          }}
        >
          <ResizableRect
            className="hover"
            left={coordinate.left}
            top={coordinate.top}
            width={coordinate.width}
            height={coordinate.height}
            rotateAngle={coordinate.rotateAngle}
            // aspectRatio={false}
            // minWidth={10}
            // minHeight={10}
            zoomable="n, w, s, e, nw, ne, se, sw"
            // rotatable={true}
            // onRotateStart={this.handleRotateStart}
            // onRotate={handleRotate}
            // onRotateEnd={handleRotate}
            // onResizeStart={this.handleResizeStart}
            onResize={handleResize}
            // onResizeEnd={this.handleUp}
            // onDragStart={this.handleDragStart}
            onDrag={handleDrag}
            // onDragEnd={this.handleDragEnd}
          />
        </div>
      </div>
    </div>
  )
}
