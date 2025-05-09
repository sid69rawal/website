
'use server';

import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  project: z.string().min(1, { message: "Project type is required." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormSchemaType = z.infer<typeof contactFormSchema>;

export async function handleContactFormSubmission(formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    email: formData.get('email'),
    project: formData.get('project'),
    message: formData.get('message'),
  };

  const validatedFields = contactFormSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    let errorMessage = "Please correct the following errors:\n";
    
    // Correctly iterate over fieldErrors
    (Object.keys(errors) as Array<keyof typeof errors>).forEach((field) => {
      if (errors[field]) {
        errorMessage += `- ${field.charAt(0).toUpperCase() + field.slice(1)}: ${errors[field]!.join(', ')}\n`;
      }
    });
    
    return {
      success: false,
      error: errorMessage.trim(),
    };
  }

  // Simulate sending an email or saving to a database
  console.log("Received contact form submission:", validatedFields.data);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // In a real application, you would integrate with an email service (e.g., Resend, SendGrid)
  // or save the data to your database here.

  // For this example, we'll assume success.
  return {
    success: true,
    message: 'Your message has been sent successfully!',
  };
}
