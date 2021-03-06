# Storybook Mock fetch calls [![Build Status](https://travis-ci.org/debuggercrafts/storybook-mock-api.svg?branch=master)](https://travis-ci.org/debuggercrafts/storybook-mock-api)

Mock fetch calls using [mockFetch](http://www.wheresrhys.co.uk/fetch-mock/#api-mockingmock) api.

## Usage

1. Add decorator to [configure mockFetch](http://www.wheresrhys.co.uk/fetch-mock/#usageconfiguration) library.
2. Setup mocks with [mockFetch api](http://www.wheresrhys.co.uk/fetch-mock/#api-mockingmock).

```js
import mockFetch from '../../src/index'

...
storiesOf('About mocking api calls')
  .addDecorator(
    // Configure mockFetch
    mockFetch({
      fallbackToNetwork: true,
      sendAsJson: true,
      overwriteRoutes: false,
    })
  )
  .add('Fetch ',
    () => <button onClick={fetch('api/apples')}>Fetch the call</button>, 
    {
      mockFetch: mockFetch => {
        // Setup mock fetch 
        mockFetch.get('/api/apples', {
          status: 200,
          body: [1, 3, 4],
        })
      },
    }
  )
```
