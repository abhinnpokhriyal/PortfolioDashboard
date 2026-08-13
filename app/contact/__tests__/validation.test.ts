/**
 * Contact Form Validation Tests
 * 
 * Tests the validation logic extracted from ContactClient.tsx
 * Ensures form validation catches required fields and invalid formats
 */

// Extract validation logic for testing
const validateContactForm = (form: { name: string; email: string; subject: string; message: string }) => {
  const errors: Record<string, string> = {};
  
  if (!form.name.trim()) {
    errors.name = "Name is required";
  }
  
  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address";
  }
  
  if (!form.message.trim()) {
    errors.message = "Message is required";
  }
  
  return errors;
};

describe('Contact Form Validation', () => {
  describe('validateContactForm', () => {
    it('should pass validation with all required fields filled correctly', () => {
      const form = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Job Opportunity',
        message: 'I would like to discuss a role',
      };

      const errors = validateContactForm(form);

      expect(Object.keys(errors)).toHaveLength(0);
    });

    it('should pass validation without optional subject field', () => {
      const form = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: '',
        message: 'Hello',
      };

      const errors = validateContactForm(form);

      expect(Object.keys(errors)).toHaveLength(0);
    });

    it('should fail validation when name is empty', () => {
      const form = {
        name: '',
        email: 'john@example.com',
        subject: '',
        message: 'Hello',
      };

      const errors = validateContactForm(form);

      expect(errors.name).toBe('Name is required');
    });

    it('should fail validation when name is only whitespace', () => {
      const form = {
        name: '   ',
        email: 'john@example.com',
        subject: '',
        message: 'Hello',
      };

      const errors = validateContactForm(form);

      expect(errors.name).toBe('Name is required');
    });

    it('should fail validation when email is empty', () => {
      const form = {
        name: 'John Doe',
        email: '',
        subject: '',
        message: 'Hello',
      };

      const errors = validateContactForm(form);

      expect(errors.email).toBe('Email is required');
    });

    it('should fail validation when email is only whitespace', () => {
      const form = {
        name: 'John Doe',
        email: '   ',
        subject: '',
        message: 'Hello',
      };

      const errors = validateContactForm(form);

      expect(errors.email).toBe('Email is required');
    });

    it('should fail validation when email format is invalid - no @', () => {
      const form = {
        name: 'John Doe',
        email: 'johexample.com',
        subject: '',
        message: 'Hello',
      };

      const errors = validateContactForm(form);

      expect(errors.email).toBe('Enter a valid email address');
    });

    it('should fail validation when email format is invalid - no domain', () => {
      const form = {
        name: 'John Doe',
        email: 'john@',
        subject: '',
        message: 'Hello',
      };

      const errors = validateContactForm(form);

      expect(errors.email).toBe('Enter a valid email address');
    });

    it('should fail validation when email format is invalid - no TLD', () => {
      const form = {
        name: 'John Doe',
        email: 'john@example',
        subject: '',
        message: 'Hello',
      };

      const errors = validateContactForm(form);

      expect(errors.email).toBe('Enter a valid email address');
    });

    it('should fail validation when email has spaces', () => {
      const form = {
        name: 'John Doe',
        email: 'john doe@example.com',
        subject: '',
        message: 'Hello',
      };

      const errors = validateContactForm(form);

      expect(errors.email).toBe('Enter a valid email address');
    });

    it('should pass validation with valid complex emails', () => {
      const validEmails = [
        'john.doe@example.com',
        'john+tag@company.co.uk',
        'user_123@test-domain.org',
        'first.last@subdomain.example.com',
      ];

      validEmails.forEach((email) => {
        const form = {
          name: 'John Doe',
          email,
          subject: '',
          message: 'Hello',
        };

        const errors = validateContactForm(form);

        expect(Object.keys(errors)).toHaveLength(0);
      });
    });

    it('should fail validation when message is empty', () => {
      const form = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: '',
        message: '',
      };

      const errors = validateContactForm(form);

      expect(errors.message).toBe('Message is required');
    });

    it('should fail validation when message is only whitespace', () => {
      const form = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: '',
        message: '   \n  \t  ',
      };

      const errors = validateContactForm(form);

      expect(errors.message).toBe('Message is required');
    });

    it('should return multiple errors when multiple fields are invalid', () => {
      const form = {
        name: '',
        email: 'invalid-email',
        subject: '',
        message: '',
      };

      const errors = validateContactForm(form);

      expect(errors.name).toBe('Name is required');
      expect(errors.email).toBe('Enter a valid email address');
      expect(errors.message).toBe('Message is required');
      expect(Object.keys(errors)).toHaveLength(3);
    });

    it('should trim whitespace before validation', () => {
      const form = {
        name: '  John Doe  ',
        email: 'john@example.com', // Email validation doesn't auto-trim in the regex
        subject: '',
        message: '  Hello there  ',
      };

      const errors = validateContactForm(form);

      // Should pass because trim() is applied before checking empty/whitespace
      expect(Object.keys(errors)).toHaveLength(0);
    });

    it('should allow names with special characters', () => {
      const specialNames = [
        "O'Brien",
        "Jean-Pierre",
        "Müller",
        "José García",
      ];

      specialNames.forEach((name) => {
        const form = {
          name,
          email: 'john@example.com',
          subject: '',
          message: 'Hello',
        };

        const errors = validateContactForm(form);

        expect(errors.name).toBeUndefined();
      });
    });

    it('should allow very long messages', () => {
      const longMessage = 'A'.repeat(5000);
      const form = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: '',
        message: longMessage,
      };

      const errors = validateContactForm(form);

      expect(Object.keys(errors)).toHaveLength(0);
    });
  });
});
