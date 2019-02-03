import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import mockFetch from '../../src/index'

const storyOptions = {
  mockFetch: (mockFetch, response) => {
    mockFetch.get(
      '/apples',
      response({
        status: 200,
        body: [1, 3, 4]
      })
    )
  },
}

storiesOf('About mocking api calls', module)
  .addDecorator(
    mockFetch({
      sendAsJson: true,
      fallbackToNetwork: true,
      overwriteRoutes: false,
    })
  )
  .add(
    'Fetch',
    () => (
      <Fragment>
        <h2>No fetch calls shall pass!!!</h2>
        <button
          onClick={() => {
            fetch('/apples')
          }}
        >
          Fetch those Apples
        </button>
      </Fragment>
    ),
    storyOptions
  )
  .add(
    'Fetch Others',
    () => (
      <Fragment>
        <h2>No Other fetch calls shall pass!!!</h2>
      </Fragment>
    ),
    storyOptions
  )
