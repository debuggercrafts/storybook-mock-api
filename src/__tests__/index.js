import addons from '@storybook/addons'
import fetchMock from '../index'
import mock_fetchMock from '../../__mocks__/fetch-mock'

addons.getChannel = jest.fn().mockImplementation

describe('Storybook addon fetchMock', () => {
  let setupMocksFn, getStory, context
  beforeEach(() => {
    setupMocksFn = jest.fn()
    getStory = jest.fn()
    context = {
      options: {},
      parameters: { mockFetch: setupMocksFn },
    }
  })

  it('should call story function', () => {
    fetchMock(getStory, context)
    expect(getStory).toHaveBeenCalledWith(context)
  })

  it('should setup fetch mocks if `mockFetch` parameter is provided', () => {
    fetchMock(getStory, context)

    expect(mock_fetchMock.resetHistory).toHaveBeenCalledTimes(1)
    expect(mock_fetchMock.reset).toHaveBeenCalledTimes(1)
    expect(setupMocksFn).toHaveBeenCalledTimes(1)
  })

  it('should log fetch calls from `mockFetch` function', () => {
    const path = '/api',
      options = {},
      expectedResponse = {
        status: 204,
      }
    global.console = {
      log: jest.fn(),
    }
    setupMocksFn = jest.fn().mockImplementation(mockFetch => {
      mockFetch.get(path, expectedResponse)
    })
    context.parameters.mockFetch = setupMocksFn
    fetchMock(getStory, context)

    // Original `get` method should be called
    expect(mock_fetchMock.get).toHaveBeenCalledTimes(1)

    // Invoke wrapped `get` call
    mock_fetchMock.get.mock.calls[0][1](path, options)

    expect(global.console.log).toHaveBeenCalledTimes(1)
    expect(global.console.log).toHaveBeenCalledWith(path, {
      Response: expectedResponse,
      Options: options,
    })
  })
})
