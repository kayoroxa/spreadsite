import { useEffect, useState } from 'react'
import { useActions, useStore } from '../../../store/models'
import { I_Layout, I_Project } from '../../utils/@types/projectTypes'
import axios from 'axios'
import MainCells from '../../components/MainCells'
import ButtonsMenu from '../../components/ButtonsMenu'
import EditCodeDT from '../../components/EditCodeDT'
import { createNewPage } from '../../utils/createNewPage'

interface IProps {
  data: I_Project
  pageName: string
}

function Page({ data, pageName }: IProps) {
  const projectData = useStore(state => state.project.data)
  const project = useStore(state => state.project)
  const { currentPageIndex } = useStore(state => state.project)
  const { setCurrentPageIndex, setCurrentPageName } = useActions(
    actions => actions.project
  )

  const { allowEdit, lastCLickCellIndex, modeLanguage, staticCells } = useStore(
    state => state.pageSettings
  )

  const { setModeLanguage, setLastCLickCellIndex } = useActions(
    state => state.pageSettings
  )

  const { loadProject, setProject } = useActions(actions => actions.project)

  useEffect(() => {
    if (currentPageIndex === null) {
      const index = data.pages.findIndex(page => page.name === pageName)
      if (index < 0) {
        console.log('Page not found')
        setProject(project => {
          const newData = { ...data }
          newData.pages = [...data.pages, createNewPage(pageName)]
          console.log({ newData, data })
          return newData
        })
        setCurrentPageIndex(data.pages.length)
        console.log({ indexBotado: data.pages.length })
      } else {
        loadProject(data)
        setCurrentPageIndex(index)
      }
      setCurrentPageName(pageName)
      // const index2 =
      //   projectData.pages.length > 0 ? projectData.pages.length - 1 : 0
    }

    // if (!projectData.name || projectData.name !== data.name) {
    //   console.log({ data })
    //   loadProject(data)
    // }
  }, [])

  if (!projectData.name) {
    return <div>Carregando</div>
  }

  if (currentPageIndex === null || currentPageIndex < 0) {
    return (
      <div>
        <div>Não tem</div>
        <ButtonsMenu />
      </div>
    )
  }

  console.log(project.isSaved)
  return (
    <div>
      {/* {JSON.stringify(lastCLickCellIndex)} */}
      {allowEdit ||
        (!staticCells && (
          <p style={{ position: 'fixed' }}>
            {!project.isSaved && 'Is Not Saved'}
          </p>
        ))}
      {lastCLickCellIndex !== null && allowEdit && (
        <EditCodeDT
          setMode={setModeLanguage}
          close={() => console.log('oi')}
          mode={modeLanguage}
        >
          <textarea
            className="code-input"
            // onBlur={() => setLastClickIndex(null)}
            onChange={e => {
              setProject(prev => {
                const newProject = { ...prev }
                newProject.pages[currentPageIndex].cells[
                  lastCLickCellIndex
                ].code[modeLanguage] = e.target.value
                return newProject
              })
            }}
            value={
              projectData.pages[currentPageIndex]?.cells[lastCLickCellIndex]
                ?.code[modeLanguage]
            }
          />
        </EditCodeDT>
      )}

      <MainCells
        onLayoutChange={(layouts: I_Layout[]) => {
          console.log({ onLayoutChange: layouts })
          if (layouts.length === 0) {
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
        }}
        onLastCellClick={(index: number) => setLastCLickCellIndex(index)}
        lastCellCLickIndex={lastCLickCellIndex}
        cells={projectData.pages[currentPageIndex].cells}
        isDraggable={!staticCells}
        allowEdit={allowEdit}
        mode={modeLanguage}
      />
      <ButtonsMenu />
    </div>
  )
}

export async function getServerSideProps(context: any) {
  // await dbConnect()
  const projectName = context.params.projectName
  // const data = await Project.find({ name: projectName })

  const res = await axios.get(
    `http://localhost:3000/api/projects/${projectName}`
  )
  const data = res.data
  // const data = await res.json()
  // console.log(data[0])
  return {
    props: {
      data: data.data,
      pageName: context.params.pageName,
    },
  }
}

export default Page
