import { useEffect } from 'react'
import { useActions, useStore } from '../../../store/models'
import { I_Project } from '../../utils/@types/projectTypes'
import axios from 'axios'

interface IProps {
  data: I_Project
}

function ProjectHome({ data }: IProps) {
  const project = useStore(state => state.project)
  const { loadProject, setProject, saveProjectInDb } = useActions(
    actions => actions.project
  )

  useEffect(() => {
    if (!project.name || project.name !== data.name) {
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
            static: true,
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
      <h1>{project.name}</h1>
      {/* <ul>
        {project.pages.map(item => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul> */}
      {JSON.stringify(project.pages)}
      <button onClick={handleClick}>Click</button>
      <button onClick={handleSave}>Save</button>
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
