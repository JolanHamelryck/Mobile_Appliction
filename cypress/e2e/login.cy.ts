describe('Login screen', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('renders the login form', () => {
    cy.get('[data-testid="email-input"]').should('exist');
    cy.get('[data-testid="password-input"]').should('exist');
    cy.get('[data-testid="login-button"]').should('exist');
    cy.get('[role="tablist"]').within(() => {
      cy.contains('[role="tab"]', 'Tour').should('be.visible');
      cy.contains('[role="tab"]', 'Map').should('be.visible');
      cy.contains('[role="tab"]', 'Profile').should('be.visible');
      cy.contains('[role="tab"]', 'Login').should('not.exist');
    });
  });

  if (Cypress.env('SUPABASE_E2E') === true) {
    it('signs in, navigates to the app, and restores the session', () => {
      const email = 'student@example.com';
      const expiresAt = Math.floor(Date.now() / 1000) + 3600;
      const jwtPayload = btoa(JSON.stringify({
        sub: '00000000-0000-4000-8000-000000000001',
        aud: 'authenticated',
        role: 'authenticated',
        email,
        exp: expiresAt,
      })).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
      const accessToken = `eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.${jwtPayload}.test-signature`;

      cy.intercept('POST', '**/auth/v1/token*', {
        statusCode: 200,
        body: {
          access_token: accessToken,
          token_type: 'bearer',
          expires_in: 3600,
          expires_at: expiresAt,
          refresh_token: 'test-refresh-token',
          user: {
            id: '00000000-0000-4000-8000-000000000001',
            aud: 'authenticated',
            role: 'authenticated',
            email,
            email_confirmed_at: new Date().toISOString(),
            app_metadata: { provider: 'email', providers: ['email'] },
            user_metadata: { full_name: 'Test Student' },
            identities: [],
            created_at: new Date().toISOString(),
          },
        },
      }).as('supabaseLogin');

      cy.get('[data-testid="email-input"]').type(email);
      cy.get('[data-testid="password-input"]').type('test-password');
      cy.get('[data-testid="login-button"]').click();
      cy.wait('@supabaseLogin').its('request.body.email').should('eq', email);
      cy.contains('Welcome to UCLL').should('be.visible');

      cy.get('[role="tab"]').contains('Profile').click();
      cy.contains('Hello, Test Student').should('be.visible');
      cy.reload();
      cy.contains('Hello, Test Student').should('be.visible');
    });
  } else {
    it('shows a useful error when Supabase is not configured or rejects sign-in', () => {
      cy.intercept('POST', '**/auth/v1/token*', {
        statusCode: 400,
        body: { code: 'invalid_credentials', message: 'Invalid login credentials' },
      });

      cy.get('[data-testid="email-input"]').type('student@example.com');
      cy.get('[data-testid="password-input"]').type('incorrect-password');
      cy.get('[data-testid="login-button"]').click();

      cy.contains(/Supabase is not configured|Invalid login credentials/).should('be.visible');
    });
  }
});
