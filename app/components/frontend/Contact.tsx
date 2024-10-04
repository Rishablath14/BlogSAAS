"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import ContactImage from "@/public/home.png";

export default function ContactSection() {
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
            <form className="space-y-6">
              <Input type="text" placeholder="Your Name" className="w-full p-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              <Input type="email" placeholder="Your Email" className="w-full p-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              <Textarea rows={4} placeholder="Your Message" className="w-full p-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              <Button type="submit" className="w-full py-4 bg-primary text-white rounded-lg shadow-lg hover:bg-primary-dark transition duration-200">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
