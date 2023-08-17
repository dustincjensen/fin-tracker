import { shell } from 'electron';
import { Pane, Heading, majorScale, Paragraph, Button, WarningSignIcon } from 'evergreen-ui';
import React from 'react';

type ErrorBoundaryState = { hasError: boolean };

// eslint-disable-next-line @typescript-eslint/ban-types
export class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    /**
     * Can take an "error" if needed.
     */
    public static getDerivedStateFromError() {
        return {
            hasError: true,
        };
    }

    // Also supports 'componentDidCatch(error, errorInfo)' if you need to
    // log the error to a reporting service.

    public render() {
        // If the error boundary captured an error, display an error message.
        if (this.state.hasError) {
            return (
                <Pane height='100%' display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                    <WarningSignIcon color='default' size={majorScale(5)} />
                    <Heading size={700} marginBottom={majorScale(2)}>
                        Something went wrong
                    </Heading>
                    <Paragraph marginTop={majorScale(3)} maxWidth={400} marginBottom={majorScale(2)}>
                        We are sorry for the inconvenience. If you want to head over to our Github page and let us know
                        what you were doing when this happened it would be greatly appreciated.
                    </Paragraph>
                    <Button appearance='minimal' onClick={this.onLinkClick}>
                        New Issue on GitHub
                    </Button>
                </Pane>
            );
        }

        return <>{this.props.children}</>;
    }

    private onLinkClick = () => shell.openExternal('https://github.com/dustincjensen/fin-tracker/issues');
}
