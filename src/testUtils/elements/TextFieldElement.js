import { fireEvent, getByText } from '@testing-library/react';

export class TextFieldElement {
  constructor(container, label) {
    this.container = container;
    this.element = getByText(this.container, label).nextSibling.firstChild;
  }

  blur() {
    fireEvent.blur(this.element);
  }

  setValue(value) {
    fireEvent.change(this.element, { target: { value } });
    this.blur();
  }
}
