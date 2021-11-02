import {
  IconButton,
  Pane,
  Heading,
  Tooltip,
  Text,
  ArrowUpIcon,
  EyeOffIcon,
  EyeOnIcon,
  ArrowDownIcon,
} from 'evergreen-ui';
import * as React from 'react';
import { useLocalStorage } from '../../../hooks/use-local-storage.hook';
import { IOptionalDisplayProps } from './optional-display.props.interface';

export const OptionalDisplay = ({
  displayKey,
  title,
  locked,
  updateOrder,
  component: OptionalComponent,
}: IOptionalDisplayProps) => {
  const [displayed, setDisplayed] = useLocalStorage<boolean>(displayKey, true);

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
            <Tooltip content='Move up'>
              <IconButton icon={ArrowUpIcon} onClick={() => updateOrder(displayKey, 'up')} marginLeft={5} />
            </Tooltip>
            <Tooltip content='Move down'>
              <IconButton icon={ArrowDownIcon} onClick={() => updateOrder(displayKey, 'down')} marginLeft={5} />
            </Tooltip>
            <Tooltip content={displayed ? 'Hide on Home page' : 'Show on Home page'}>
              <IconButton
                icon={displayed ? EyeOffIcon : EyeOnIcon}
                onClick={() => setDisplayed(!displayed)}
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
