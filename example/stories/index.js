import React, {Fragment} from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('About mocking api calls', module)
  .add('Fetch', () => (
    <Fragment>
        <h2>No fetch calls shall pass!!!</h2>
    </Fragment>
  ))