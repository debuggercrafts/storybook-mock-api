import React from 'react'
import { makeDecorator } from '@storybook/addons'
import fetchMock from 'fetch-mock'

const fetchMockSpy = applyFetchMockSpy(fetchMock, [
  'get',
  'getOnce',
  'post',
  'postOnce',
])

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

function applyFetchMockSpy(fetchMockApi, apiNames) {
  let fetchMockApiSpy = {}
  for (let apiName in fetchMockApi) {
    if (fetchMockApi.hasOwnProperty(apiName)) {
      const apiFn = fetchMockApi[apiName]
      fetchMockApiSpy[apiName] =
        apiNames.indexOf(apiName) >= 0 ? applySpy(apiFn, fetchMockApi) : apiFn
    }
  }

  return fetchMockApiSpy
}

function applySpy(fn, context) {
  function fetchSpyWrapper() {
    const args = Array.prototype.slice.call(arguments)
    const origResponse = args[1]
    args[1] = (path, opts) => {
      logFetch(path, opts, origResponse)
      return origResponse
    }
    return fn.apply(context, args)
  }

  fetchSpyWrapper.prototype = fn.prototype

  return fetchSpyWrapper
}

function logFetch(url, options, response) {
  console.log(`${url}`, {
    Response: response,
    Options: options,
  })
}

export default mockFetch
