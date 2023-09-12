const UserController = require('./user.controller')

function userRoutes(fastify) {
  const controller = new UserController()

  fastify.post('/users', async (request, reply) => {
    try {
      const user = await controller.createUser(request.body)
      reply.status(201).send(user)
    } catch (error) {
      reply.status(500).send({ error: 'User creation failed' })
    }
  })

  fastify.get('/users/:userId', async (request, reply) => {
    try {
      const userId = request.params.userId
      const user = await controller.getUserById(userId)
      if (user) {
        reply.send(user)
      } else {
        reply.status(404).send({ error: 'User not found' })
      }
    } catch (error) {
      reply.status(500).send({ error: 'User retrieval failed' })
    }
  })

  fastify.put('/users/:userId', async (request, reply) => {
    try {
      const userId = request.params.userId
      const updatedUser = await controller.updateUser(userId, request.body)
      if (updatedUser) {
        reply.send(updatedUser)
      } else {
        reply.status(404).send({ error: 'User not found' })
      }
    } catch (error) {
      reply.status(500).send({ error: 'User update failed' })
    }
  })

  fastify.delete('/users/:userId', async (request, reply) => {
    try {
      const userId = request.params.userId
      const deletedUser = await controller.deleteUser(userId)
      if (deletedUser) {
        reply.send(deletedUser)
      } else {
        reply.status(404).send({ error: 'User not found' })
      }
    } catch (error) {
      reply.status(500).send({ error: 'User deletion failed' })
    }
  })
}

module.exports = userRoutes
