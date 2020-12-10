// const mailchimp = require('@mailchimp/mailchimp_marketing')

// mailchimp.setConfig({
//   apiKey: process.env.MAILCHIMP_SECRET,
//   server: process.env.MAILCHIMP_SERVER_PREFIX,
// })

// export default async (req, res) => {
//   //   try {
//   //     const response = await mailchimp.lists.getAllLists()
//   //     res.body = response
//   //     res.send(response)
//   //   } catch {}

//   try {
//     const response = await fetch(
//       'https://us7.list-manage.com/contact-form/post?u=879caf7fc9bd0b4709cafe745&form_id=68befb12c250c0859d9d91fed0b644ba',
//       {
//         method: 'POST',
//         body: JSON.stringify({
//           fields: {
//             256: 'jim.orluk@gmail.com',
//             260: 'Test 3',
//             264: 'This is another test message',
//           },
//           subscribe: false,
//         }),
//         headers: {
//           Authorization: `apikey ${process.env.MAILCHIMP_SECRET}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     )
//     console.log(response)
//     res.body = response
//     res.send(response)
//   } catch {}
// }
