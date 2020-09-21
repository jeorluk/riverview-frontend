// import fetch from 'node-fetch'

// const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send'
// const CONTACT_EMAIL = 'jim.oruk@gmail.com'

// const sendEmail = async ({ name, email, message }) => {
//   await fetch(SENDGRID_API, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
//     },
//     body: JSON.stringify({
//       personalizations: [
//         {
//           to: [
//             {
//               CONTACT_EMAIL,
//             },
//           ],
//           subject: 'New Contact Message',
//         },
//       ],
//       from: {
//         email: 'jim.orluk@gmail.com',
//         name: 'Riverview Contact Notification',
//       },
//       content: [
//         {
//           type: 'text/html',
//           value: `${name} <${email}> sent you this message: ${message}`,
//         },
//       ],
//     }),
//   })
// }

const sgMail = require('@sendgrid/mail')

const sendEmail = async ({ name, email, message }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const CONTACT_EMAIL = 'jim.oruk@gmail.com'

  const content = {
    to: CONTACT_EMAIL,
    from: email,
    subject: `New Message From - ${name} <${email}>`,
    text: message,
    html: `<p>${message}</p>`,
  }

  try {
    await sgMail.send(content)
    res.status(200).send('Message sent successfully.')
  } catch (error) {
    console.log('ERROR', error)
    res.status(400).send('Message not sent.')
  }
}

export { sendEmail }
