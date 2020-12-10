// // import { sendEmail } from '../../util/sendEmail'

// // export default async (req, res) => {
// //   if (req.method === 'POST') {
// //     const { name, email, message } = req.body
// //     await sendEmail({ name, email, message })
// //     return res.status(200).end()
// //   }
// //   return res.status(404).json({
// //     error: {
// //       code: 'not_found',
// //       messgae:
// //         "The requested endpoint was not found or doesn't support this method.",
// //     },
// //   })
// // }

// const sgMail = require('@sendgrid/mail')

// export default async function (req, res) {
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY)

//   const { email, name, message } = req.body
//   const CONTACT_EMAIL = 'jim.orluk@gmail.com'
//   const FROM_EMAIL = 'no-reply@jimorluk.com'
//   // const CONFIRMATION_MESSAGE =
//   //   'Thank you for contacting us.  We have received your message and will follow up with you soon.'

//   const contact = {
//     to: CONTACT_EMAIL,
//     from: FROM_EMAIL,
//     subject: `New Message From - ${name} <${email}>`,
//     text: message,
//     html: `<p>${message}</p>`,
//   }

//   // const confirmation = {
//   //   to: email,
//   //   from: FROM_EMAIL,
//   //   subject: `Thank you for contacting Riverview Early Music`,
//   //   text: CONFIRMATION_MESSAGE,
//   //   html: `<p>${CONFIRMATION_MESSAGE}</p>`,
//   // }

//   try {
//     await sgMail.send(contact)
//     // try {
//     //   await sgMail.send(confirmation)
//     // } catch (error) {
//     //   console.log('Contact Send', error)
//     //   res.status(400).send(`Contact message not sent: ${error}`)
//     // }
//     res.status(200).send('Message sent successfully.')
//   } catch (error) {
//     console.log('ERROR', error)
//     res.status(400).send(`Message not sent: ${error}`)
//   }
// }
