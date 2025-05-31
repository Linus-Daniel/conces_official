'use client';

import { ChangeEvent, FormEvent, useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  paymentMethod: string;
}

type Props = {
  onSubmit: (formData: FormData) => void;
};

export default function CheckoutForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: 'Nigeria',
    paymentMethod: 'card',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-conces-blue">Contact Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-conces-blue focus:border-conces-blue"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-conces-blue focus:border-conces-blue"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-conces-blue focus:border-conces-blue"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-conces-blue focus:border-conces-blue"
        />
      </div>

      <h2 className="text-xl font-semibold text-conces-blue pt-4">Shipping Address</h2>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-conces-blue focus:border-conces-blue"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-conces-blue focus:border-conces-blue"
          />
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-conces-blue focus:border-conces-blue"
          />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-conces-blue focus:border-conces-blue"
          >
            <option>Nigeria</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-conces-blue pt-4">Payment Method</h2>
      <div className="space-y-2">
        {['card', 'transfer', 'payondelivery'].map((method) => (
          <div className="flex items-center" key={method}>
            <input
              id={method}
              name="paymentMethod"
              type="radio"
              value={method}
              checked={formData.paymentMethod === method}
              onChange={handleChange}
              className="focus:ring-conces-blue h-4 w-4 text-conces-blue border-gray-300"
            />
            <label htmlFor={method} className="ml-3 block text-sm font-medium text-gray-700 capitalize">
              {method === 'card'
                ? 'Credit/Debit Card'
                : method === 'transfer'
                ? 'Bank Transfer'
                : 'Pay on Delivery'}
            </label>
          </div>
        ))}
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-conces-blue text-white py-2 px-4 rounded-md hover:bg-conces-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-conces-blue"
        >
          Complete Order
        </button>
      </div>
    </form>
  );
}
