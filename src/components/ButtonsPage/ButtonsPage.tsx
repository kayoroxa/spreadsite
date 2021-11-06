import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { useActions, useStore } from '../../../store/models'

import { ContainerButtonsPage } from './styles-buttons-page'

interface IProps {}
const ButtonsPage = ({}: IProps) => {
  const router = useRouter()
  const projectData = useStore(state => state.project.data)
  const projectName = useStore(state => state.project.data.name)
  const { setCurrentPageIndex, setCurrentPageName } = useActions(
    actions => actions.project
  )
  function handleClickPage(pageName: string) {
    router.replace(`/${projectName}/${pageName}`)
    setCurrentPageName(pageName)
    setCurrentPageIndex(
      projectData.pages.findIndex(page => page.name === pageName)
    )
  }
  return (
    <ContainerButtonsPage>
      {projectData.pages.map(p => (
        <button onClick={() => handleClickPage(p.name)} key={p.name}>
          {p.name}
        </button>
      ))}
    </ContainerButtonsPage>
  )
}

export default ButtonsPage
