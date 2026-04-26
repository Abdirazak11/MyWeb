import { z } from 'zod'

// ─────────────────────────────────────────────
//  STEP 1 SCHEMA — Name & Email
// ─────────────────────────────────────────────
export const step1Schema = z.object({
  full_name: z
    .string()
    .min(2, 'Full name must be at least 2 characters.')
    .max(80, 'Full name must be under 80 characters.')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Please enter a valid name.'),
  email: z
    .string()
    .email('Please enter a valid business email address.')
    .min(5, 'Email is required.')
    .max(254, 'Email address is too long.'),
})

export type Step1Data = z.infer<typeof step1Schema>

// ─────────────────────────────────────────────
//  STEP 2 SCHEMA — Service Interest
// ─────────────────────────────────────────────
export const step2Schema = z.object({
  service_interest: z.enum(['Software', 'Design', 'Automation', 'All'], {
    errorMap: () => ({ message: 'Please select a service that interests you.' }),
  }),
})

export type Step2Data = z.infer<typeof step2Schema>

// ─────────────────────────────────────────────
//  COMBINED SCHEMA
// ─────────────────────────────────────────────
export const fullFormSchema = step1Schema.merge(step2Schema)
export type FullFormData = z.infer<typeof fullFormSchema>
