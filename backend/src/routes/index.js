export default async function (fastify) {
  fastify.get('/', async () => {
   return { hello: 'Anh Quyết đẹp zai ' }
  })
}
