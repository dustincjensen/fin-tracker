export interface IOptionalDisplayProps {
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
  component: React.ReactType;
}
