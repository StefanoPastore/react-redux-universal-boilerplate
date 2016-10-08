import React from 'react';
import { storiesOf } from '@kadira/storybook';
import PlaygroundWrapper from '../containers/PlaygroundWrapper';

storiesOf('Test', module)
  .add('Default', () => (
    <PlaygroundWrapper>
      <p>
        Test
      </p>
    </PlaygroundWrapper>
  ))
;
