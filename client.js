import { createClient } from 'next-sanity'

export default createClient({
  projectId: 'zr5hl73i', // you can find this in sanity.json
  dataset: 'production', // or the name you chose in step 1
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2023-11-02',
})
