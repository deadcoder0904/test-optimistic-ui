const { GraphQLServer } = require('graphql-yoga')
const { join } = require('path')
const { makeSchema, objectType, idArg, booleanArg } = require('nexus')
const { Photon } = require('@generated/photon')
const { nexusPrismaPlugin } = require('@generated/nexus-prisma')

const photon = new Photon()

const nexusPrisma = nexusPrismaPlugin({
  photon: ctx => ctx.photon,
})

const Blog = objectType({
  name: 'Blog',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.published()
  },
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.blogs()
    t.crud.blog()
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneBlog({ alias: 'createBlog' })
    t.crud.deleteOneBlog()

    t.field('publishBlog', {
      type: 'Blog',
      nullable: true,
      args: {
        id: idArg(),
        published: booleanArg(),
      },
      resolve: (_, { id, published }, ctx) => {
        return ctx.photon.blogs.update({
          where: { id },
          data: { published: !published },
        })
      },
    })
  },
})

const schema = makeSchema({
  types: [Query, Mutation, Blog, nexusPrisma],
  outputs: {
    schema: join(__dirname, '/schema.graphql'),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@generated/photon',
        alias: 'photon',
      },
    ],
  },
})

const server = new GraphQLServer({
  schema,
  context: request => {
    return {
      ...request,
      photon,
    }
  },
})

const opts = {
  port: 4000,
}

server.start(opts, ({ port }) =>
  console.log(
    `🚀 Server ready at: http://localhost:${port}\n⭐️ See sample queries: http://pris.ly/e/js/graphql#6-using-the-graphql-api`,
  ),
)
module.exports = { Blog }
