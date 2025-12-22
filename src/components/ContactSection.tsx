import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Mail, 
  Send, 
  Github, 
  Linkedin, 
  Youtube, 
  Briefcase,
  Clock,
  MapPin,
  Shield,
  Code,
  Search,
  CreditCard,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const services = [
  {
    icon: Shield,
    title: 'Penetration Testing',
    description: 'Web apps, APIs, and custom security assessments',
  },
  {
    icon: Code,
    title: 'Custom Tool Development',
    description: 'Recon scripts, automation bots, and security tools',
  },
  {
    icon: Search,
    title: 'OSINT & Crypto Recon',
    description: 'Intelligence gathering and threat analysis',
  },
  {
    icon: CreditCard,
    title: 'Payment Gateway Simulation',
    description: 'Fake PSP systems for security testing',
  },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/izumiriyad', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/zeroizumi/', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://www.youtube.com/@learnearning24', label: 'Learning Channel' },
  { icon: Youtube, href: 'https://www.youtube.com/@techgothacked', label: 'Tech Channel' },
  { icon: Youtube, href: 'https://www.youtube.com/@godgameplay_', label: 'Gaming Channel' },
  { icon: Briefcase, href: 'https://www.upwork.com/freelancers/~012d71f9fb100a123f', label: 'Upwork' },
  { icon: Mail, href: 'mailto:amiizumi00@gmail.com', label: 'Email' },
];

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xeokbqbq', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: 'Message sent!',
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try emailing directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">
            <span className="text-gradient">Let's Build Something Great</span>
          </h2>
          <p className="section-subtitle">
            Ready to break or build something securely? Let's discuss your next security 
            project or automation challenge.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Project inquiry"
                />
              </div>
              <div>
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="form-input resize-none"
                  placeholder="Tell me about your project, security challenge, or automation needs..."
                />
              </div>
              <Button
                type="submit"
                variant="neon"
                size="lg"
                className="w-full"
                disabled={isSubmitting || isSubmitted}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" />
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle2 className="mr-2" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Right Side Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Social Links */}
            <div>
              <h4 className="text-lg font-bold mb-4">Connect With Me</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    title={link.label}
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-primary">Services Available</h4>
              <div className="grid grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card border border-border rounded-lg p-4 card-hover"
                  >
                    <service.icon className="w-6 h-6 text-accent mb-2" />
                    <h5 className="font-medium text-sm mb-1">{service.title}</h5>
                    <p className="text-xs text-muted-foreground">{service.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <div className="flex items-center gap-2 text-primary font-semibold mb-3">
                <Clock className="w-5 h-5" />
                Availability
              </div>
              <p className="text-muted-foreground text-sm mb-2">
                <span className="text-foreground font-medium">Status:</span> Freelance | Part-Time | On-demand
              </p>
              <p className="text-muted-foreground text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                GMT+6 (Dhaka, Bangladesh)
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                <span className="text-foreground font-medium">Preferred contact:</span> Email or LinkedIn DM
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
