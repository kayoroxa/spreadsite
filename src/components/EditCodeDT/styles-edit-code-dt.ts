import styled from 'styled-components'

export const ContainerEditCodeDT = styled.div`
  position: fixed;
  background-color: #242424;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  width: 40vh;
  height: 100vh;
  top: 0;
  right: 0;
  color: white;
  z-index: 1000;

  display: flex;
  flex-direction: column;

  .head {
    display: flex;
    justify-content: space-between;

    * {
      margin: 0;
      flex: 1;
      margin: 10px;
    }
  }

  main {
    //padding top 30px bottom  30px left 30px right 30px
    padding: 15px;
    flex: 1;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;

    * {
      flex: 1;
    }
  }

  textarea {
    border: none;
    padding: 5px;
    background-color: #242424;
    color: white;
    font-size: 15px;
    font-family: 'Fira Code', monospace;
    flex: 1;
    box-sizing: border-box;
    resize: none;
  }

  button.toggle {
    background-color: gray;
    color: white;
    border: none;
    padding: 5px 0px;

    font-size: 15px;
  }
`
