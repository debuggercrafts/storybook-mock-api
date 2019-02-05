import React from 'react'
import addons, { makeDecorator } from '@storybook/addons'
import fetchMock from 'fetch-mock'

const fetchMockSpy = applyFetchMockSpy(fetchMock)

const mockFetch = makeDecorator({
  name: 'mockFetch',
  parameterName: 'mockFetch',
  // This means don't run this decorator if the notes decorator is not set
  skipIfNoParametersOrOptions: true,
  wrapper: (storyFn, context, { options, parameters }) => {
    fetchMock.resetHistory()
    fetchMock.reset()
    fetchMock.config = Object.assign(fetchMock.config, options)
    parameters(fetchMockSpy)
    return storyFn(context)
  },
})

function applyFetchMockSpy(fetchMockApi) {
  let fetchMockApiSpy = {}
  for (let m in fetchMockApi) {
    const prop = fetchMockApi[m]
    fetchMockApiSpy[m] =
      typeof prop === 'function' ? applySpy(prop, fetchMockApi) : prop
  }

  return fetchMockApiSpy
}

function applySpy(fn, context) {
  function spyWrapper() {
    var args = Array.prototype.slice.call(arguments)
    const response = args[1]
    args[1] = (path, opts) => {
      logFetch(path, opts, response)
      return response
    }
    return fn.apply(context, args)
  }

  spyWrapper.prototype = fn.prototype

  return spyWrapper
}

function logFetch(url, options, response) {
  console.log(`${url}`, {
    Response: response,
    Options: options,
  })
}

export default mockFetch
