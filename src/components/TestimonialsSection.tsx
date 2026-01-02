import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, Shield, Code, Bug } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  type: 'pentest' | 'bugbounty' | 'development' | 'consulting';
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CTO",
    company: "TechVault Inc.",
    content: "Exceptional penetration testing work. Discovered critical vulnerabilities that our previous auditors missed. Professional, thorough, and delivered comprehensive reports.",
    rating: 5,
    type: 'pentest'
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Security Director",
    company: "FinSecure",
    content: "Outstanding bug bounty hunter. Found and responsibly disclosed multiple high-severity vulnerabilities in our platform. Highly recommend for any security assessment.",
    rating: 5,
    type: 'bugbounty'
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Founder",
    company: "StartupX",
    content: "Built our entire security infrastructure from scratch. Clean code, excellent documentation, and always available for questions. A true professional.",
    rating: 5,
    type: 'development'
  },
  {
    id: 4,
    name: "David Kim",
    role: "VP Engineering",
    company: "CloudNative Labs",
    content: "Provided invaluable security consulting for our cloud migration. Identified potential attack vectors and helped us implement robust security measures.",
    rating: 5,
    type: 'consulting'
  },
  {
    id: 5,
    name: "Alexandra Petrov",
    role: "CEO",
    company: "CryptoShield",
    content: "Aftab's expertise in web application security is unmatched. His detailed vulnerability reports helped us secure our platform before launch.",
    rating: 5,
    type: 'pentest'
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Lead Developer",
    company: "DevOps Pro",
    content: "Collaborated on multiple security-focused projects. Always delivers quality work on time. Great communication and technical skills.",
    rating: 5,
    type: 'development'
  }
];

const typeIcons = {
  pentest: Shield,
  bugbounty: Bug,
  development: Code,
  consulting: Quote
};

const typeColors = {
  pentest: 'text-neon-green',
  bugbounty: 'text-neon-blue',
  development: 'text-neon-purple',
  consulting: 'text-neon-orange'
};

const TestimonialsSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);
  return (
    <section id="testimonials" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-neon-green">&lt;</span>
            Client_Testimonials
            <span className="text-neon-green">/&gt;</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Feedback from clients and collaborators on security assessments and development projects
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial) => {
                const TypeIcon = typeIcons[testimonial.type];
                return (
                  <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="group h-full">
                      <div className="h-full p-6 rounded-lg border border-neon-green/20 bg-background/50 backdrop-blur-sm hover:border-neon-green/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,65,0.1)] relative overflow-hidden">
                        {/* Decorative corner */}
                        <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-neon-green/30 rounded-tr-lg" />
                        
                        {/* Quote Icon */}
                        <Quote className="w-8 h-8 text-neon-green/30 mb-4" />
                        
                        {/* Content */}
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic min-h-[100px]">
                          "{testimonial.content}"
                        </p>
                        
                        {/* Rating */}
                        <div className="flex gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-neon-orange text-neon-orange" />
                          ))}
                        </div>
                        
                        {/* Author Info */}
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                            <p className="text-xs text-muted-foreground">
                              {testimonial.role} @ {testimonial.company}
                            </p>
                          </div>
                          <div className={`${typeColors[testimonial.type]}`}>
                            <TypeIcon className="w-5 h-5" />
                          </div>
                        </div>
                        
                        {/* Bottom line accent */}
                        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-green/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="flex items-center justify-center gap-4 mt-8">
              <CarouselPrevious className="static translate-y-0 border-neon-green/30 hover:border-neon-green hover:bg-neon-green/10 hover:text-neon-green" />
              
              {/* Dot Indicators */}
              <div className="flex gap-2">
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === current
                        ? 'bg-neon-green w-6 shadow-[0_0_10px_rgba(0,255,65,0.5)]'
                        : 'bg-neon-green/30 hover:bg-neon-green/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <CarouselNext className="static translate-y-0 border-neon-green/30 hover:border-neon-green hover:bg-neon-green/10 hover:text-neon-green" />
            </div>
          </Carousel>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground text-sm">
            Want to work together?{' '}
            <a href="#contact" className="text-neon-green hover:underline">
              Get in touch
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
