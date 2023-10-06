// import { FastifyInstance } from 'fastify'
// import fastifyMulter from 'fastify-multer'
// import { v4 as uuidv4 } from 'uuid'
// import config from '../config/config'

// // Configure file storage using fastify-multer
// const storage = fastifyMulter.diskStorage({
//   destination: function (_req, _file, cb) {
//     cb(null, './uploads/')
//   },
//   filename: function (_req, file, cb) {
//     const uniqueId = uuidv4().slice(0, 9)
//     const fileExtension = file.originalname.split('.')[1]
//     const userId = '123' // Replace this with your user ID logic
//     const currentTime = new Date().toISOString().replace(/:/g, '-')
//     const filename = `${userId}_${uniqueId}_${currentTime}.${fileExtension}`
//     cb(null, filename)
//   },
// })

// // Create a multer instance for file uploads
// const upload = fastifyMulter({
//   storage,
//   limits: { fileSize: Number(config.fileUpload.sbtMaxFileSize) },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
//       cb(null, true)
//     } else {
//       cb(new Error('Invalid file type'), false)
//     }
//   },
// })

// export default (fastify: FastifyInstance) => {
//   // Define a route for file uploads
//   fastify.post('/upload', { preHandler: upload.single('file') }, async (request, reply) => {
//     try {
//       const { file } = request.req

//       // Access file details
//       const { filename, mimetype } = file

//       // Handle the uploaded file as needed
//       // For example, you can save it to a database, process it, or send a response

//       return { status: 'success', message: 'File uploaded successfully' }
//     } catch (error) {
//       console.error('Error uploading file:', error)
//       reply.status(500).send({ status: 'error', message: 'Internal Server Error' })
//     }
//   })
// }
