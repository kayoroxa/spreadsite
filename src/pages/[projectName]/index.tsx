import { useEffect } from 'react'
import { useActions, useStore } from '../../../store/models'
import { I_Code, I_Layout, I_Project } from '../../utils/@types/projectTypes'
import axios from 'axios'
import MainCells from '../../components/MainCells'
import ButtonsMenu from '../../components/ButtonsMenu'
import EditCodeDT from '../../components/EditCodeDT'

interface IProps {
  data: I_Project
}

function ProjectHome({ data }: IProps) {
  const projectData = useStore(state => state.project.data)
  const project = useStore(state => state.project)

  const { allowEdit, lastCLickCellIndex, modeLanguage, staticCells } = useStore(
    state => state.pageSettings
  )

  const { setModeLanguage, setLastCLickCellIndex } = useActions(
    state => state.pageSettings
  )

  const { loadProject, setProject } = useActions(actions => actions.project)

  useEffect(() => {
    if (!projectData.name || projectData.name !== data.name) {
      console.log({ data })
      loadProject(data)
    }
  }, [])

  if (!projectData.name) {
    return <div>Carregando</div>
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
                newProject.pages[0].cells[lastCLickCellIndex].code[
                  modeLanguage
                ] = e.target.value
                return newProject
              })
            }}
            value={
              projectData.pages[0]?.cells[lastCLickCellIndex]?.code[
                modeLanguage
              ]
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
            newProject.pages[0].cells = newProject.pages[0].cells.map(
              (c, i) => ({ ...c, layout: layouts[i] })
            )
            return newProject
          })
        }}
        onLastCellClick={(index: number) => setLastCLickCellIndex(index)}
        lastCellCLickIndex={lastCLickCellIndex}
        cells={projectData.pages[0].cells}
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
