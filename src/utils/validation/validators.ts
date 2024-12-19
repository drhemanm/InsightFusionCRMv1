```typescript
import { z } from 'zod';

// Common validation schemas
export const EmailSchema = z.string()
  .email('Invalid email format')
  .min(5, 'Email is too short')
  .max(255, 'Email is too long');

export const PasswordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export const PhoneSchema = z.string()
  .regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone number format')
  .optional();

// Data validation functions
export const validateUserInput = (data: unknown) => {
  const UserSchema = z.object({
    email: EmailSchema,
    password: PasswordSchema,
    firstName: z.string().min(2, 'First name is too short'),
    lastName: z.string().min(2, 'Last name is too short'),
    phone: PhoneSchema,
  });

  return UserSchema.safeParse(data);
};

export const validateContactData = (data: unknown) => {
  const ContactSchema = z.object({
    email: EmailSchema,
    firstName: z.string().min(2, 'First name is too short'),
    lastName: z.string().min(2, 'Last name is too short'),
    phone: PhoneSchema,
    company: z.string().optional(),
    jobTitle: z.string().optional(),
  });

  return ContactSchema.safeParse(data);
};
```