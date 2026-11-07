const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  error?: string;
}

export interface ContactInfo {
  id?: number;
  documentId?: string;
  email: string;
  phone: string;
  address: string;
  businessHours: {
    monday_friday?: string;
    saturday?: string;
    sunday?: string;
    weekdays?: string;
  };
}

/**
 * Submit contact form
 */
export async function submitContactForm(data: ContactFormData): Promise<ContactResponse> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/contact-submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit form: ${response.statusText}`);
    }

    return {
      success: true,
      message: 'Message sent successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to send message',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Fetch contact information
 */
export async function getContactInfo(): Promise<ContactInfo> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/contact-info`, {
      next: { revalidate: 86400 },
    });
    if (response.ok) {
      const data = await response.json();
      if (data?.data) return data.data;
    }
  } catch (error) {
    console.error('Failed to fetch contact info:', error);
  }

  return {
    email: 'support@luminous.com',
    phone: '+1 (555) 123-4567',
    address: '123 Commerce St, New York, NY 10001',
    businessHours: {
      monday_friday: '9:00 AM - 6:00 PM EST',
      saturday: '10:00 AM - 4:00 PM EST',
      sunday: 'Closed'
    }
  };
}
