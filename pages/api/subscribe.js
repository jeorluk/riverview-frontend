const mailchimp = require('@mailchimp/mailchimp_marketing')
const crypto = require('crypto')

console.log(process.env.MAILCHIMP_LIST_ID)
const listId = process.env.MAILCHIMP_LIST_ID

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_SECRET,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
})

export default async (req, res) => {
  const email = req.body.email.toLowerCase()

  if (!email) {
    // 2. Throw an error if an email wasn't provided.
    return res.status(400).json({ error: 'Email is required' })
  }

  const generateSubscriberFields = (values) => ({
    ...(values.firstName && { FNAME: values.firstName }),
    ...(values.lastName && { LNAME: values.lastName }),
  })

  const generateAddressFields = (values) => ({
    ...(values.address && { addr1: values.address }),
    ...(values.addressLine2 && { addr2: values.addressLine2 }),
    ...(values.city && { city: values.city }),
    ...(values.state && { state: values.state }),
    ...(values.zip && { zip: values.zip }),
    ...(values.country && { country: values.country }),
  })

  const subscriberHash = crypto.createHash('md5').update(email).digest('hex')
  const subscriberFields = generateSubscriberFields(req.body)
  const addressFields = generateAddressFields(req.body)
  const mergeFields = { ...subscriberFields }
  if (JSON.stringify(addressFields) !== JSON.stringify({})) {
    mergeFields.ADDRESS = { ...addressFields }
  }
  const data = {
    email_address: email,
    merge_fields: mergeFields,
    status: 'subscribed',
  }

  try {
    // const response = await mailchimp.lists.setListMember(
    //   listId,
    //   subscriberHash,
    //   data
    // )

    const response = await mailchimp.ping.get()
    res.body = response
    res.send(response)
  } catch (err) {
    console.log({ err })
    return res.status(err.status).json({ error: 'There was an error' })
  }
}

/*
  try {
    // 3. Fetch the environment variables.
    const LIST_ID = process.env.MAILCHIMP_LIST_ID
    const API_KEY = process.env.MAILCHIMP_API_KEY
    // 4. API keys are in the form <key>-us3.
    const DATACENTER = API_KEY.split('-')[1]

    // 5. The status of 'subscribed' is equivalent to a double opt-in.
    const data = {
      email_address: email,
      status: 'subscribed',
    }

    // 6. Send a POST request to Mailchimp.
    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
      {
        body: JSON.stringify(data),
        headers: {
          Authorization: `apikey ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    )

    // 7. Swallow any errors from Mailchimp and return a better error message.
    if (response.status >= 400) {
      return res.status(400).json({
        error: `There was an error subscribing to the newsletter. Shoot me an email at [me@leerob.io] and I'll add you to the list.`,
      })
    }

    // 8. If we made it this far, it was a success! 🎉
    return res.status(201).json({ error: '' })
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() })
  }
}
*/
