import { Pane, Text } from 'evergreen-ui';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { IEmptyAccountProps } from './empty-account.props.interface';

export const EmptyAccount = ({ accountId }: IEmptyAccountProps) => {
  return (
    <Pane height='100%' display='flex' alignItems='center' justifyContent='center'>
      <Text size={600}>
        Empty! Import records{' '}
        <Text size={600} is={Link} to={`/import/${accountId}`}>
          here
        </Text>
        .
      </Text>
    </Pane>
  );
};
