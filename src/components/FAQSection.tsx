import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What types of security assessments do you offer?",
    answer: "I offer comprehensive penetration testing, web application security assessments, API security testing, mobile app security reviews, and network vulnerability assessments. Each engagement is tailored to your specific needs and compliance requirements."
  },
  {
    question: "How long does a typical security assessment take?",
    answer: "Timeline varies based on scope. A basic web app pentest typically takes 1-2 weeks, while a full enterprise assessment may require 3-4 weeks. I'll provide a detailed timeline during our initial consultation."
  },
  {
    question: "What deliverables will I receive?",
    answer: "You'll receive a comprehensive report including an executive summary, detailed technical findings with severity ratings, proof-of-concept exploits, and actionable remediation recommendations. I also offer post-assessment calls to walk through findings."
  },
  {
    question: "Do you offer retesting after vulnerabilities are fixed?",
    answer: "Yes! All engagements include one free retest within 30 days of the initial report. This ensures your fixes are properly implemented and no new issues were introduced during remediation."
  },
  {
    question: "What's your approach to responsible disclosure?",
    answer: "I follow strict ethical guidelines and NDAs. All findings are confidential and shared only with authorized personnel. For bug bounty work, I adhere to program policies and coordinate disclosure timelines with vendors."
  },
  {
    question: "How do we get started?",
    answer: "Simply reach out via the contact form or email. We'll schedule a free 30-minute consultation to discuss your security needs, scope the engagement, and provide a detailed proposal with pricing."
  }
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 px-4 bg-background/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">&gt;</span> Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Common questions about security services and the engagement process
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-primary/20 rounded-lg px-6 bg-card/50 backdrop-blur-sm data-[state=open]:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-left hover:text-primary hover:no-underline py-5">
                  <span className="text-primary mr-3 font-mono">[{String(index + 1).padStart(2, '0')}]</span>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 pl-12">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
