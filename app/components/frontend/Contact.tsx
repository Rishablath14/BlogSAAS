"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import ContactImage from "@/public/contact.jpg";
import axios from "axios";
import React, { useState } from "react";

type ErrorT = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};
export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<ErrorT>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const validate = () => {
    const errors:ErrorT = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.phone) errors.phone = 'Phone number is required';
    else if (formData.phone.length !== 10) errors.phone = 'Phone number should be 10 digits long';
    else if (!/^\d+$/.test(formData.phone)) errors.phone = 'Phone number should only contain digits';
    if (!formData.message) errors.message = 'Message is required';
    return errors;
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await axios.post('/api/contact', formData, {
          headers: {
            'Content-Type': 'application/json',
          },});

        if (response.status === 200) {
          setSubmitMessage('Your message has been sent successfully.');
          setFormData({ name: '', email: '', phone: '', message: '' });
        } else {
          setSubmitMessage('There was an error sending your message. Please try again.');
        }
      } catch (error) {
        setSubmitMessage('An error occurred. Please try again.');
      } finally {
        setIsSubmitting(false);
        setTimeout(() => {
          setSubmitMessage('');
        }, 2000);
      }
    }
  };
  return (
    <section className="py-8 md:py-16 my-4" id="contact">
      <div className="container mx-auto px-6 text-gray-700 dark:text-gray-300">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Get in Touch with Us</h2>
          <p className="mt-4 text-lg">
            Have questions or need support? Fill out the form below, and we&apos;ll get back to you within 24 hours.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-12 md:mb-0">
            <Image src={ContactImage} alt="Contact Us" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
          <div className="w-full md:w-1/2 px-4">
          <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        type="text"
        name="name"
        placeholder="Your Name"
        required
        value={formData.name}
        onChange={handleChange}
        className="w-full p-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {errors.name && <p className="text-red-500">{errors.name}</p>}

      <Input
        type="email"
        name="email"
        placeholder="Your Email"
        required
        value={formData.email}
        onChange={handleChange}
        className="w-full p-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {errors.email && <p className="text-red-500">{errors.email}</p>}

      <Input
        type="number"
        name="phone"
        placeholder="Your Phone Number"
        required
        value={formData.phone}
        onChange={handleChange}
        className="w-full p-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {errors.phone && <p className="text-red-500">{errors.phone}</p>}

      <Textarea
        name="message"
        rows={4}
        placeholder="Your Message"
        required
        value={formData.message}
        onChange={handleChange}
        className="w-full p-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {errors.message && <p className="text-red-500">{errors.message}</p>}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-primary text-white rounded-lg shadow-lg hover:bg-primary-dark transition duration-200"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>

      {submitMessage && submitMessage=="Your message has been sent successfully."?<p className="text-green-500">{submitMessage}</p>:<p className="text-red-500">{submitMessage}</p>}
    </form>
          </div>
        </div>
      </div>
    </section>
  );
}
