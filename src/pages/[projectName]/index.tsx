import { useEffect } from 'react'
import { useActions, useStore } from '../../../store/models'
import { I_Layout, I_Project } from '../../utils/@types/projectTypes'
import axios from 'axios'
import MainCells from '../../components/MainCells'
import ButtonsMenu from '../../components/ButtonsMenu'

interface IProps {
  data: I_Project
}

function ProjectHome({ data }: IProps) {
  const project = useStore(state => state.project)
  const { allowEdit, lastCLickCellIndex, modeLanguage, staticCells } = useStore(
    state => state.pageSettings
  )
  const { loadProject, setProject, saveProjectInDb } = useActions(
    actions => actions.project
  )

  useEffect(() => {
    if (!project.name || project.name !== data.name) {
      console.log({ data })
      loadProject(data)
    }
  }, [])

  if (!project.name) {
    return <div>Carregando</div>
  }

  function handleClick() {
    setProject(prev => {
      const newProject = { ...prev }
      newProject.pages[0].cells = [
        {
          layout: {
            i: '1',
            x: 0,
            y: 0,
            w: 1,
            h: 2,
          },
          code: { css: '', js: '', html: '' },
        },
      ]
      return newProject
    })
  }
  function handleSave() {
    saveProjectInDb(project)
  }
  return (
    <div>
      {JSON.stringify(project.pages)}
      <MainCells
        onLayoutChange={(layouts: I_Layout[]) => {
          console.log({ onLayoutChange: layouts })
          if (layouts.length === 0) {
            console.log('vazio')
            return
          }
          setProject((prev: I_Project) => {
            const newProject = { ...prev }
            debugger
            newProject.pages[0].cells = newProject.pages[0].cells.map(
              (c, i) => ({ ...c, layout: layouts[i] })
            )
            return newProject
          })
        }}
        onLastCellClick={(index: any) => console.log({ index })}
        lastCellCLickIndex={lastCLickCellIndex}
        cells={project.pages[0].cells}
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
      oi: projectName,
    },
  }
}

export default ProjectHome
