import React from 'react'
import addons, { makeDecorator } from '@storybook/addons'
import fetchMock from 'fetch-mock'

const mockFetch = makeDecorator({
  name: 'mockFetch',
  parameterName: 'mockFetch',
  // This means don't run this decorator if the notes decorator is not set
  skipIfNoParametersOrOptions: true,
  wrapper: (storyFn, context, { options, parameters }) => {
    fetchMock.resetHistory()
    fetchMock.reset()
    fetchMock.config = Object.assign(fetchMock.config, options)

    parameters(fetchMock, fetchMockResponseGenerator)

    return storyFn(context)
  },
})

function fetchMockResponseGenerator(mockResponse) {
  return (url, options, req) => {
    logApi(url, req, mockResponse)
    return mockResponse
  }
}

function logApi(url, req, resp) {
  console.log(`${url}`, {
    Request: req, 
    Response: resp
  })
}


export default mockFetch
