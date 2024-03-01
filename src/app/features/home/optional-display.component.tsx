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
import React from 'react';
import { useLocalStorage } from '../../hooks/use-local-storage.hook';

export type OptionalDisplayProps = {
    /**
     * The name of the local storage key that will be toggled.
     */
    displayKey: string;

    /**
     * The title of the optional component that will be rendered.
     */
    title: string;

    /**
     * If the component should render the locked state or not.
     */
    locked: boolean;

    /**
     * A method to inform the parent to update the ordering of the optional components.
     */
    updateOrder: (key: string, direction: 'up' | 'down') => void;

    /**
     * The optional component to render.
     */
    component: React.FunctionComponent;
};

export const OptionalDisplay = ({
    displayKey,
    title,
    locked,
    updateOrder,
    component: OptionalComponent,
}: OptionalDisplayProps) => {
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
                            <IconButton
                                icon={ArrowUpIcon}
                                onClick={() => updateOrder(displayKey, 'up')}
                                marginLeft={5}
                            />
                        </Tooltip>
                        <Tooltip content='Move down'>
                            <IconButton
                                icon={ArrowDownIcon}
                                onClick={() => updateOrder(displayKey, 'down')}
                                marginLeft={5}
                            />
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
            <Pane position='relative' padding={!locked ? 25 : 0} overflow='hidden'>
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
