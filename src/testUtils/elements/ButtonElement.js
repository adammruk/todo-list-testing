import { fireEvent, getByText } from '@testing-library/react';

export class ButtonElement {
  constructor(container, label) {
    this.container = container;
    this.element = getByText(this.container, label).parentElement;
  }

  click() {
    fireEvent.click(this.element);
  }
}
