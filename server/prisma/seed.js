const { Photon } = require('@generated/photon')
const photon = new Photon()
const faker = require('faker')

const blogs = Array(20)
  .fill(0)
  .map(i => ({
    title: faker.hacker.phrase(),
  }))

async function main() {
  for (let blog of blogs) {
    const temp = await photon.blogs.create({
      data: {
        title: blog.title,
      },
    })
    console.log(temp)
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await photon.disconnect()
  })
