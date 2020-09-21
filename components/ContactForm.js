import React from 'react'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import { FORM_ERROR } from 'final-form'

const FormStyles = styled.div`
  form {
    margin: auto;
    display: grid;
    width: 100%;
    max-width: 500px;
  }
  button {
    margin: 1rem auto;
    border: 2px solid ${(props) => props.theme.color.darkShade};
  }
`

const Fields = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: auto 1fr;
`

const ContactForm = () => {
  // const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const onSubmit = async (values) => {
    const result = await fetch('/api/send-email', {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    if (result.status !== 200) {
      return { [FORM_ERROR]: `Error ${result.status}: ${result.statusText}` }
    }
    return result
  }

  const required = (value) => (value ? undefined : 'Required')

  return (
    <FormStyles>
      <Form
        onSubmit={onSubmit}
        render={({
          handleSubmit,
          submitting,
          submitSucceeded,
          submitError,
        }) => (
          <form
            onSubmit={async (event) => {
              const result = await handleSubmit(event)
              console.log(result)
              return result
            }}
          >
            <Fields>
              <Field name='name' validate={required}>
                {({ input, meta }) => (
                  <>
                    <label>Name{meta.error && meta.touched && '*'}</label>
                    <input {...input} type='text' placeholder='Name' />
                  </>
                )}
              </Field>
              <Field name='email' validate={required}>
                {({ input, meta }) => (
                  <>
                    <label>Email{meta.error && meta.touched && '*'}</label>
                    <input {...input} type='email' placeholder='Email' />
                  </>
                )}
              </Field>
              <Field name='message' validate={required}>
                {({ input, meta }) => (
                  <>
                    <label>Message{meta.error && meta.touched && '*'}</label>
                    <textarea {...input} placeholder='Message' />
                  </>
                )}
              </Field>
            </Fields>

            <button className='text_large' type='submit' disabled={submitting}>
              {submitting ? 'Submitting' : 'Submit'}
            </button>
            {submitSucceeded && (
              <div>
                Thank you for contacting us. You will receive an email
                confirmation shortly.
              </div>
            )}
            {submitError && (
              <div>There was an error with your submission: {submitError}</div>
            )}
          </form>
        )}
      />
    </FormStyles>
  )
}

export default ContactForm
