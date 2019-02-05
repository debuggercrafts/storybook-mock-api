import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import mockFetch from '../../src/index'

const storyOptions = {
  mockFetch: mockFetch => {
    mockFetch.get('/apples', {
      status: 200,
      body: [1, 3, 4],
    })
    mockFetch.post('/apples', {
      status: 204,
    })
  },
}

storiesOf('About mocking api calls')
  .addDecorator(
    mockFetch({
      fallbackToNetwork: true,
      sendAsJson: true,
      overwriteRoutes: false,
    })
  )
  .add(
    'Fetch apples',
    () => (
      <Fragment>
        <h2>No fetch calls shall pass!!!</h2>
        <pre>{`fetch('/apples')`}</pre>
        <button
          onClick={() => {
            fetch('/apples')
          }}
        >
          Fetch those Apples
        </button>
        <h2>No fetch POST calls shall pass!!!</h2>
        <pre>{`fetch('/apples', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
})`}</pre>
        <button
          onClick={() => {
            fetch('/apples', {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
            })
          }}
        >
          Send those Apples
        </button>
      </Fragment>
    ),
    storyOptions
  )
