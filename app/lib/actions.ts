'use server';

import { z } from 'zod';
// import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcryptjs from 'bcryptjs';
import postgres from 'postgres';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

import { signOut } from '@/auth';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const RegisterFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                return 'Invalid credentials.';
                default:
                return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function register(
  prevState: string | undefined,
  formData: FormData,
) {
  const validatedFields = RegisterFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return 'Missing Fields. Failed to Register.';
  }

  const { email, password } = validatedFields.data;

  try {
    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return 'User with this email already exists.';
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Insert new user
    await sql`
      INSERT INTO users ( email, password)
      VALUES ( ${email}, ${hashedPassword})
    `;

  } catch (error) {
    console.error('Registration Error:', error);
    return 'Database Error: Failed to register.';
  }

  // Redirect to login page after successful registration
  redirect('/login');
}

export async function handleSignOut() {
  // signOut уже содержит логику перенаправления (redirectTo: '/')
  await signOut({ redirectTo: '/' });
}