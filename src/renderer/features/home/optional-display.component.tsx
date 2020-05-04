import { useLocalStorage, writeStorage } from '@rehooks/local-storage';
import { IconButton, Pane, Heading, Tooltip, Text } from 'evergreen-ui';
import * as React from 'react';
import { IOptionalDisplayProps } from './optional-display.props.interface';

export const OptionalDisplay: React.FC<IOptionalDisplayProps> = props => {
  const { displayKey, title, locked, updateOrder, component: OptionalComponent } = props;
  const [displayed] = useLocalStorage<boolean>(displayKey, true);

  if (!displayed && locked) {
    return null;
  }

  return (
    <Pane border={!locked ? true : undefined} borderRadius={!locked ? 3 : undefined} marginBottom={20}>
      {!locked && (
        <Pane
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          padding={10}
          borderBottom
          background='tint1'
        >
          <Heading>{title}</Heading>
          <Pane display='flex'>
            <Tooltip content='Move up' hideDelay={0}>
              <IconButton icon='arrow-up' onClick={() => updateOrder(displayKey, 'up')} marginLeft={5} />
            </Tooltip>
            <Tooltip content='Move down' hideDelay={0}>
              <IconButton icon='arrow-down' onClick={() => updateOrder(displayKey, 'down')} marginLeft={5} />
            </Tooltip>
            <Tooltip content={displayed ? 'Hide on Home page' : 'Show on Home page'}>
              <IconButton
                icon={displayed ? 'eye-off' : 'eye-on'}
                onClick={() => writeStorage(displayKey, !displayed)}
                marginLeft={5}
              />
            </Tooltip>
          </Pane>
        </Pane>
      )}
      <Pane position='relative' padding={!locked ? 25 : 0}>
        <OptionalComponent />
        {!locked && !displayed && (
          <Pane
            position='absolute'
            top={0}
            left={0}
            right={0}
            bottom={0}
            background='overlay'
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
          >
            <Text color='white'>Hidden</Text>
          </Pane>
        )}
      </Pane>
    </Pane>
  );
};
