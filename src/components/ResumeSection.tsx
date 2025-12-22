import { motion } from 'framer-motion';
import { Briefcase, Award, GraduationCap, Download, Mail, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const experience = [
  {
    title: 'Freelance Security Researcher & Tool Developer',
    period: '2019 - Present',
    achievements: [
      'Delivered $200 UAE crypto intelligence recon project with repeat client orders',
      'Built Phantom Backend Cloud v4.0 - Enterprise-grade recon platform with ML threat scoring',
      'Developed Bug Bounty Hunter Pro automation suite with multi-threaded payloads',
      'Created realistic bKash payment gateway simulation system for security testing',
      'Scanned 200+ targets using custom bounty hunting toolkit',
      'Built LinkedIn Smart Apply Bot with advanced form automation',
    ],
  },
];

const keyProjects = [
  {
    title: 'Phantom Backend Cloud v4.0',
    subtitle: 'Enterprise Security Platform',
    description: 'ML-based threat scoring platform with subdomain enumeration, API leak detection, passive recon engine, and CVE fetching capabilities.',
  },
  {
    title: 'UAE Crypto OSINT Project',
    subtitle: 'Client Commission - $200',
    description: 'Delivered comprehensive crypto wallet leak tracking system using breach databases and dark web scanning for international client.',
  },
  {
    title: 'Bug Bounty Hunter Pro',
    subtitle: 'Automation Suite',
    description: 'End-to-end bounty hunting automation with auth bypass, token brute-forcing, and X-Forwarded logic implementation.',
  },
  {
    title: 'Fake bKash Gateway Suite',
    subtitle: 'Payment Simulation System',
    description: 'Complete PSP simulation with frontend/backend, client branding, callback logic, and API key management.',
  },
];

const certifications = [
  'Attacking Network Protocols (James Forshaw) - Feb 2025',
  'Complete 2024 Web Dev Bootcamp - Dec 2024',
  'CompTIA Network+ N10-008 - Jun 2024',
  'Complete Cyber Security Course - Nov 2022',
  'SANS SEC542 Web App Pentesting - Jul 2022',
  'Website Hacking / Penetration Testing - Oct 2020',
];

const technicalSkills = {
  'Programming Languages': ['Python', 'JavaScript', 'Node.js', 'Bash', 'Go'],
  'Security Tools': ['Burp Suite', 'FFUF', 'Nmap', 'Nuclei', 'Metasploit Pro', 'Acunetix Pro', 'Nessus Pro'],
  'Specializations': ['API Security', 'Auth Bypass', 'Automation', 'OSINT', 'Payment Gateway Spoofing'],
  'Technologies': ['React', 'Express', 'Docker', 'Kubernetes', 'GraphQL', 'REST APIs'],
};

const ResumeSection = () => {
  const handleDownloadResume = () => {
    // Create resume content
    const resumeContent = `
AFTAB AHOMOD RIYAD (IZUMI)
Security Researcher • Offensive Engineer • Automation Architect

CONTACT
Email: amiizumi00@gmail.com
LinkedIn: linkedin.com/in/zeroizumi
GitHub: github.com/izumiriyad
Location: Dhaka, Bangladesh (GMT+6)

PROFESSIONAL SUMMARY
Self-taught security researcher with 5+ years of experience in offensive security, 
API testing, and automation development. Expert in reverse engineering, auth bypass 
techniques, and full-stack security implementations.

EXPERIENCE
Freelance Security Researcher & Tool Developer (2019 - Present)
• Delivered $200 UAE crypto intelligence recon project
• Built Phantom Backend Cloud v4.0 - Enterprise-grade recon platform
• Developed Bug Bounty Hunter Pro automation suite
• Created bKash payment gateway simulation system
• Scanned 200+ targets using custom toolkit

CERTIFICATIONS
• Attacking Network Protocols (James Forshaw) - Feb 2025
• Complete 2024 Web Dev Bootcamp - Dec 2024
• CompTIA Network+ N10-008 - Jun 2024
• SANS SEC542 Web App Pentesting - Jul 2022

SKILLS
Programming: Python, JavaScript, Node.js, Bash, Go
Security Tools: Burp Suite, FFUF, Nmap, Nuclei, Metasploit
Specializations: API Security, Auth Bypass, Automation, OSINT
    `.trim();

    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Aftab_Ahomod_Riyad_Resume.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="resume" className="py-24 relative bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">
            <span className="text-gradient">Resume</span>
          </h2>
          <p className="section-subtitle">
            My professional journey, achievements, and technical expertise in cybersecurity.
          </p>
        </motion.div>

        {/* Resume Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-xl p-8 mb-8 text-center"
        >
          <h3 className="text-3xl font-bold text-primary mb-2">Aftab Ahomod Riyad</h3>
          <p className="font-mono text-accent text-lg mb-4">
            Security Researcher | Offensive Engineer | Automation Architect
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <span>amiizumi00@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Dhaka, Bangladesh (GMT+6)</span>
            </div>
            <a
              href="https://www.linkedin.com/in/zeroizumi/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-primary" />
              <span>LinkedIn</span>
            </a>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Professional Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-primary">Professional Summary</h4>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Self-taught security researcher with 5+ years of experience in offensive security, 
                API testing, and automation development. Specializes in building custom tools for 
                bug bounty hunting, creating payment gateway simulations, and delivering client-targeted 
                OSINT projects. Expert in reverse engineering, auth bypass techniques, and full-stack 
                security implementations.
              </p>
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-primary">Experience</h4>
              </div>

              <div className="timeline">
                {experience.map((exp, index) => (
                  <div key={index} className="timeline-item">
                    <h5 className="font-bold text-lg">{exp.title}</h5>
                    <p className="text-accent font-mono text-sm mb-3">{exp.period}</p>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Key Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-primary">Key Projects</h4>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {keyProjects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-secondary/50 border border-border rounded-lg p-4 card-hover"
                  >
                    <h5 className="font-bold mb-1">{project.title}</h5>
                    <p className="text-accent text-sm mb-2">{project.subtitle}</p>
                    <p className="text-muted-foreground text-sm">{project.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Technical Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-primary">Technical Skills</h4>
              </div>

              <div className="space-y-6">
                {Object.entries(technicalSkills).map(([category, skills], index) => (
                  <div key={index}>
                    <h5 className="font-medium text-sm text-muted-foreground mb-2">{category}</h5>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, i) => (
                        <span key={i} className="skill-tag text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-primary">Certifications</h4>
              </div>

              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="text-sm text-muted-foreground border-l-2 border-primary/30 pl-3 hover:border-primary transition-colors"
                  >
                    {cert}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Download Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Button
                variant="neon"
                size="lg"
                onClick={handleDownloadResume}
                className="w-full"
              >
                <Download className="mr-2" />
                Download Full Resume
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
