import mongoose from 'mongoose'

// (project) {
//   name : string,
//   pages: [
//     {
//       name : string,
//       cells: [
//         {
//           layout : {h, i ...},
//           code: {css, js...},
//         }
//         ...
//       ]
//     }
//     ...
//   ],
// }

/* PetSchema will correspond to a collection in your MongoDB database. */
const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this project.'],
    maxlength: [20, 'Name cannot be more than 20 characters'],
  },

  pages: {
    type: [
      {
        name: {
          type: String,
          required: [true, 'Please provide a name for this page.'],
          maxlength: [20, 'Name cannot be more than 20 characters'],
        },
        cells: {
          type: Array,
          required: [true, 'Please provide cells for this page.'],
        },
      },
    ],
  },
})

export default mongoose.models.Project ||
  mongoose.model('Project', ProjectSchema)
