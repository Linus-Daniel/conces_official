'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
  phone: z.string().min(1, 'Phone number is required'),
});

export default function CheckoutForm({ onSubmit }: { onSubmit: (values: z.infer<typeof formSchema>) => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      phone: '',
    },
  });

    console.log(form)
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-royal-dark mb-6">Shipping Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-royal-dark mb-1">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            {...form.register('firstName')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
            placeholder="John"
          />
          {form.formState.errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{form.formState.errors.firstName.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-royal-dark mb-1">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            {...form.register('lastName')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
            placeholder="Doe"
          />
          {form.formState.errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{form.formState.errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-royal-dark mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...form.register('email')}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
          placeholder="john@example.com"
        />
        {form.formState.errors.email && (
          <p className="mt-1 text-sm text-red-600">{form.formState.errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-royal-dark mb-1">
          Address
        </label>
        <input
          id="address"
          type="text"
          {...form.register('address')}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
          placeholder="123 Main St"
        />
        {form.formState.errors.address && (
          <p className="mt-1 text-sm text-red-600">{form.formState.errors.address.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-royal-dark mb-1">
            City
          </label>
          <input
            id="city"
            type="text"
            {...form.register('city')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
            placeholder="Lagos"
          />
          {form.formState.errors.city && (
            <p className="mt-1 text-sm text-red-600">{form.formState.errors.city.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-royal-dark mb-1">
            State
          </label>
          <input
            id="state"
            type="text"
            {...form.register('state')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
            placeholder="Lagos"
          />
          {form.formState.errors.state && (
            <p className="mt-1 text-sm text-red-600">{form.formState.errors.state.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-royal-dark mb-1">
            Postal Code
          </label>
          <input
            id="postalCode"
            type="text"
            {...form.register('postalCode')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
            placeholder="100001"
          />
          {form.formState.errors.postalCode && (
            <p className="mt-1 text-sm text-red-600">{form.formState.errors.postalCode.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-royal-dark mb-1">
            Country
          </label>
          <input
            id="country"
            type="text"
            {...form.register('country')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
            placeholder="Nigeria"
          />
          {form.formState.errors.country && (
            <p className="mt-1 text-sm text-red-600">{form.formState.errors.country.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-royal-dark mb-1">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            {...form.register('phone')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
            placeholder="+234 800 000 0000"
          />
          {form.formState.errors.phone && (
            <p className="mt-1 text-sm text-red-600">{form.formState.errors.phone.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-6 bg-royal-DEFAULT hover:bg-royal-dark text-white font-medium py-3 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-royal-DEFAULT focus:ring-offset-2"
      >
        Continue to Payment
      </button>
    </form>
  );
}