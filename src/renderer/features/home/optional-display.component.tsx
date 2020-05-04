import { useLocalStorage, writeStorage } from '@rehooks/local-storage';
import { IconButton, Pane, Heading } from 'evergreen-ui';
import * as React from 'react';
import { IOptionalDisplayProps } from './optional-display.props.interface';

export const OptionalDisplay: React.FC<IOptionalDisplayProps> = props => {
  const { displayKey, title, locked, updateOrder, component: OptionalComponent } = props;
  const [displayed] = useLocalStorage<boolean>(displayKey, true);

  if (!displayed && locked) {
    return null;
  }

  return (
    <Pane
      background={!displayed ? 'redTint' : !locked ? 'greenTint' : undefined}
      padding={!locked ? 10 : 0}
      border={!locked ? true : undefined}
      borderRadius={!locked ? 3 : undefined}
      marginBottom={20}
    >
      {!locked && (
        <Pane display='flex' justifyContent='space-between' alignItems='center' paddingBottom={5} borderBottom>
          <Heading>{title}</Heading>
          <Pane display='flex'>
            <IconButton icon='arrow-up' onClick={() => updateOrder(displayKey, 'up')} marginLeft={5} />
            <IconButton icon='arrow-down' onClick={() => updateOrder(displayKey, 'down')} marginLeft={5} />
            <IconButton
              icon='plus'
              intent='success'
              appearance='primary'
              onClick={() => writeStorage(displayKey, true)}
              disabled={displayed}
              marginLeft={5}
            />
            <IconButton
              icon='cross'
              intent='danger'
              appearance='primary'
              onClick={() => writeStorage(displayKey, false)}
              disabled={!displayed}
              marginLeft={5}
            />
          </Pane>
        </Pane>
      )}
      <Pane padding={!locked ? 15 : 0}>
        <OptionalComponent />
      </Pane>
    </Pane>
  );
};
