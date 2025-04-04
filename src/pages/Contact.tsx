
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We will get back to you soon.",
    });
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50 to-white islamic-pattern">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 mt-8">
            <h1 className="text-4xl font-bold text-emerald-800 mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-emerald-700">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-emerald-800">Get in Touch</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about the Darood Counter, suggestions for improvement, 
                or would like to contribute to our mission, please feel free to reach out.
              </p>
              <div className="mt-6">
                <div className="mb-4">
                  <h3 className="font-semibold text-emerald-800">Email</h3>
                  <p className="text-gray-700">contact@daroodcounter.org</p>
                </div>
                <div className="mb-4">
                  <h3 className="font-semibold text-emerald-800">Social Media</h3>
                  <div className="flex space-x-4 mt-2">
                    <a href="#" className="text-emerald-600 hover:text-emerald-800">Twitter</a>
                    <a href="#" className="text-emerald-600 hover:text-emerald-800">Facebook</a>
                    <a href="#" className="text-emerald-600 hover:text-emerald-800">Instagram</a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-emerald-800">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-emerald-800 mb-1">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-emerald-800 mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-emerald-800 mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-emerald-800 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-emerald-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Darood Counter. All rights reserved.</p>
          <p className="text-emerald-200 text-sm mt-2">
            Designed with love for the Muslim Ummah.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
