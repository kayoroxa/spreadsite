import axios from 'axios'
import Page from '../[projectName]/[pageName]'

export default function PageInPage({ data }: { data: any }) {
  return <Page data={data} />
}

export async function getServerSideProps(context: any) {
  // await dbConnect()
  const projectName = 'canva-insta'
  // const data = await Project.find({ name: projectName })
  try {
    const res = await axios.get(
      `https://spreadsite.vercel.app/api/projects/${projectName}`
    )
    const data = res.data
    return { props: { data: data.data } }
  } catch (error) {
    return {
      props: {
        data: {
          name: projectName,
          pages: [],
        },
      },
    }
  }
}
