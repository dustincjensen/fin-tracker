export interface IRootLayoutProps {
  /**
   * True if the application is initializing.
   */
  initializing: boolean;

  /**
   * Function to load the application data.
   */
  loadApplication: () => void;
}
