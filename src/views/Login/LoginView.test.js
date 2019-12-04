import { LoginViewPresenter } from 'views/Login/LoginViewPresenter';

describe('LoginView', () => {
  let page;
  beforeEach(() => {
    page = LoginViewPresenter.render();
  });

  describe('submit with valid credentials', () => {
    it.todo('calls api with data from form');
    it.todo('redirects to app page');
    it.todo('renders snackbar with success message');
  });

  describe('submit with invalid credentials', () => {
    it.todo('does not call api');
    it.todo('stays on login page');
    it.todo('clears password field, but not email');
    it.todo('renders snackbar with error message');
  });

  describe('with invalid input values', () => {
    it('display required errors for email and password when empty', async () => {
      await page.submitForm({ email: '', password: ''});
      expect(page.emailRequiredError).toBeTruthy();
      expect(page.passwordRequiredError).toBeTruthy();
    });

    it('display incorrect email address on invalid email', async () => {
      await page.submitForm({ email: 'invalidemail' });
      expect(page.emailInvalidError).toBeTruthy();
    });

    it.todo('does not call api when i click the login button');
  });
});