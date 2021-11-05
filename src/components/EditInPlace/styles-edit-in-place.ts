import styled from 'styled-components'

export const ContainerEditInPlace = styled.div`
  width: 100%;
  height: 100px;

  span {
    width: 100%;
    height: 100%;
    /* background-color: pink; */
    -webkit-user-modify: read-write-plaintext-only;
    margin-top: 0px;
    margin-left: 5px;
    height: 100px;
    padding-top: 0px;
    vertical-align: top;
  }
  textarea {
    width: 100%;
    height: 100%;

    background-color: #242424;
    -webkit-user-modify: read-write-plaintext-only;
    resize: none;
  }

  /* display: flex;
   flex-direction: column;
   align-items: center; */
  :hover {
    cursor: pointer;
  }
  .edit-in-place:hover {
    cursor: pointer;
  }
`
