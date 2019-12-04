import React from 'react';
import { getByText, wait } from '@testing-library/react';
import { ButtonElement } from 'testUtils/elements/ButtonElement';
import { TextFieldElement } from 'testUtils/elements/TextFieldElement';
import { renderApp } from 'testUtils/renderApp';
import { LoginView } from 'views/Login/LoginView';

export class LoginViewPresenter {
  constructor(container) {
    this.container = container;
  }

  static render() {
    const { container } = renderApp(<LoginView />);
    return new LoginViewPresenter(container);
  }

  get emailInput() {
    return new TextFieldElement(this.container, /email address/i);
  }

  get passwordInput() {
    return new TextFieldElement(this.container, /password/i);
  }

  get signInButton() {
    return new ButtonElement(this.container, /sign in/i);
  }

  get emailRequiredError() {
    return getByText(this.container, 'Email is required');
  }

  get emailInvalidError() {
    return getByText(this.container, 'Invalid email');
  }

  get passwordRequiredError() {
    return getByText(this.container, 'Password is required');
  }

  async submitForm({ email, password }) {
    this.emailInput.setValue(email);
    this.passwordInput.setValue(password);
    this.signInButton.click();
    await wait();
  }
}