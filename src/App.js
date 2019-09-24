import { ApolloProvider, useMutation, useQuery } from '@apollo/react-hooks'
import ApolloClient, { gql } from 'apollo-boost'
import React from 'react'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  connectToDevTools: true,
})

const BLOGS_QUERY = gql`
  query blogs {
    blogs {
      id
      title
      published
    }
  }
`

const PUBLISH_BLOG_MUTATION = gql`
  mutation publishBlog($id: ID, $published: Boolean) {
    publishBlog(id: $id, published: $published) {
      id
    }
  }
`

const Blog = () => {
  const { loading, error, data } = useQuery(BLOGS_QUERY)
  const [publishBlog] = useMutation(PUBLISH_BLOG_MUTATION)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error</div>
  return (
    <div>
      <h1>Blog</h1>
      {data.blogs.map(({ id, title, published }) => {
        return (
          <div key={id}>
            <span>{title}</span>
            <button
              style={{
                backgroundColor: published ? 'green' : 'red',
                color: 'white',
              }}
              onClick={() => {
                publishBlog({
                  variables: {
                    id,
                    published,
                  },
                  optimisticResponse: {
                    __typename: 'Mutation',
                    publishBlog: {
                      __typename: 'Blog',
                      id,
                      published: !published,
                    },
                  },
                })
              }}
            >
              {published ? 'Published' : 'Not yet'}
            </button>
          </div>
        )
      })}
    </div>
  )
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Blog />
    </ApolloProvider>
  )
}

export default App
