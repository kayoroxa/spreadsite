import styled from 'styled-components'

export const ContainerMainCells = styled.div`
  .buttons {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;

    * {
      box-sizing: border-box;
      margin: 10px;
    }

    .delete {
      background-color: #ff0000;
      opacity: 0.5;
      color: #fff;
    }
  }

  .layout * {
    /* background: #fff; */
    margin: 0;
    overflow: hidden !important;
  }
`
