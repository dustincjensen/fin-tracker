import { shell } from 'electron';
import { Pane, Heading, Icon, majorScale, Paragraph, Button } from 'evergreen-ui';
import * as React from 'react';
import { IErrorBoundaryState } from './error-boundary.state.interface';

export class ErrorBoundary extends React.Component<{}, IErrorBoundaryState> {
  constructor(props: {}) {
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
          <Icon icon='warning-sign' color='default' size={majorScale(5)} />
          <Heading size={700} marginBottom={majorScale(2)}>
            Something went wrong
          </Heading>
          <Paragraph maxWidth={400} marginBottom={majorScale(2)}>
            We are sorry for the inconvenience. If you want to head over to our Github page and let us know what you
            were doing when this happened it would be greatly appreciated.
          </Paragraph>
          <Button appearance='minimal' onClick={this.onLinkClick}>
            New Issue on GitHub
          </Button>
        </Pane>
      );
    }

    return this.props.children;
  }

  private onLinkClick = () => shell.openExternal('https://github.com/dustincjensen/fin-tracker/issues');
}
