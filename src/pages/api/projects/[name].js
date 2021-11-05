import dbConnect from '../../../lib/dbConnect'
import Project from '../../../models/Project'

export default async function handler(req, res) {
  const {
    query: { name },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const project = await Project.findOne({ name })
        if (!project) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: project })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const project = await Project.findOneAndUpdate({ name }, req.body, {
          new: true,
          runValidators: true,
        })
        if (!project) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: project })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedProject = await Project.deleteOne({ _id: id })
        if (!deletedProject) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
