import { Pane, Text } from 'evergreen-ui';
import React from 'react';
import { Link } from 'react-router-dom';

type EmptyAccountProps = { accountId: string };

export const EmptyAccount = ({ accountId }: EmptyAccountProps) => {
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
