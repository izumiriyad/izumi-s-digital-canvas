import { motion } from 'framer-motion';
import { Briefcase, Award, GraduationCap, Download, Mail, MapPin, ExternalLink, Shield, Target, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const experience = [
  {
    title: 'Offensive Security Engineer (Independent Consultant)',
    period: '2017 - Present',
    description: 'Specialized in red team engagements, API security assessments, and offensive security automation for mid-to-large organizations across fintech, SaaS, healthcare, and eCommerce sectors.',
    achievements: [
      'Conducted 50+ full-scope penetration tests across web applications, APIs, cloud infrastructure, and mobile backends',
      'Identified 100+ high/critical findings including authentication bypass, chained IDOR exploitation, and SSRF→RCE pivots',
      'Maintained 98% post-remediation success rate with zero repeat vulnerabilities',
      'Discovered critical payment gateway vulnerabilities saving clients $500K+ in potential fraud',
      'Built UltraAPI framework reducing API testing time by 70%',
      'Developed automated recon systems processing 10,000+ subdomains in minutes',
    ],
  },
];

const keyAchievements = [
  {
    icon: Shield,
    title: '50+ Pentests',
    description: 'Comprehensive penetration tests across fintech, healthcare, SaaS, and eCommerce',
  },
  {
    icon: Target,
    title: '100+ Vulnerabilities',
    description: 'High/critical vulnerabilities identified and responsibly disclosed',
  },
  {
    icon: Trophy,
    title: 'Top 5% TryHackMe',
    description: 'Global ranking on offensive security platform',
  },
  {
    icon: Award,
    title: '98% Success Rate',
    description: 'Post-remediation success with zero repeat vulnerabilities',
  },
];

const keyProjects = [
  {
    title: 'UltraAPI Framework',
    subtitle: 'API Security Testing',
    description: 'Advanced API exploitation framework with JWT/OAuth detection, automated fuzzing, and BOLA/IDOR scanning. Adopted by 5+ security teams.',
  },
  {
    title: 'Recon Automation System',
    subtitle: 'Attack Surface Mapping',
    description: 'Comprehensive attack surface discovery integrating Amass, Subfinder, nuclei. Reduced recon time from 6+ hours to 15 minutes.',
  },
  {
    title: 'Payment Gateway Suite',
    subtitle: 'Security Testing Tool',
    description: 'Complete payment simulation with OTP/PIN verification, race condition testing, and webhook exploitation scenarios.',
  },
  {
    title: 'Web Security Scanner',
    subtitle: 'Custom DAST Tool',
    description: 'Automated vulnerability detection for XSS, SQLi, CSRF with detailed HTML reports and POC generation.',
  },
];

const certifications = [
  'Certified Ethical Hacker (CEH) — EC-Council',
  'Offensive Security OSCP Training (In Progress - 2025)',
  'CompTIA Network+ N10-008 — CompTIA',
  'PortSwigger Web Security Academy — Complete',
  'The Complete 2024 Web Development Bootcamp',
  'SANS SEC542 Web App Pentesting',
];

const technicalSkills = {
  'Security Tools': ['Burp Suite Pro', 'Metasploit Pro', 'Nessus Pro', 'OWASP ZAP', 'Nmap', 'Nuclei', 'ffuf'],
  'Programming': ['JavaScript/Node.js', 'Python 3', 'Bash', 'React.js', 'Express.js', 'GraphQL'],
  'Vulnerability Expertise': ['API Security', 'Auth Bypass', 'IDOR/BOLA', 'SSRF', 'JWT/OAuth Abuse', 'Payment Gateway'],
  'Platforms': ['HackerOne', 'Bugcrowd', 'TryHackMe', 'HackTheBox', 'Kali Linux', 'Docker'],
};

const ResumeSection = () => {
  const handleDownloadResume = () => {
    window.open('/resume.pdf', '_blank');
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
          <h3 className="text-3xl font-bold text-primary mb-2">Aftab Ahomod Riyad (Izumi)</h3>
          <p className="font-mono text-accent text-lg mb-4">
            Red Team & API Security Specialist | Security Automation Engineer | Offensive Security Researcher
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <span>aftabahomodriyad@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Dhaka, Bangladesh (GMT+6) • Remote Ready</span>
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

        {/* Key Achievements Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {keyAchievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary/50 transition-colors"
            >
              <achievement.icon className="w-8 h-8 text-primary mx-auto mb-2" />
              <h4 className="font-bold text-lg">{achievement.title}</h4>
              <p className="text-xs text-muted-foreground">{achievement.description}</p>
            </div>
          ))}
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
                Offensive Security Engineer and API Security Specialist with 6+ years of hands-on experience in red teaming, 
                web application pentesting, and advanced security automation. Specialized in discovering critical authentication 
                bypasses, API logic flaws, business logic vulnerabilities, and building automated reconnaissance systems that 
                reduce manual assessment time by 70%. Verified security researcher on HackerOne and Bugcrowd with disclosed 
                vulnerabilities including critical findings in payment platforms.
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
                    <p className="text-accent font-mono text-sm mb-2">{exp.period}</p>
                    <p className="text-muted-foreground text-sm mb-3">{exp.description}</p>
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
                <h4 className="text-xl font-bold text-primary">Key Projects & Offensive Tools</h4>
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

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-primary">Education</h4>
              </div>
              <div>
                <h5 className="font-bold">BSc in Computer Science & Engineering</h5>
                <p className="text-accent text-sm">American International University-Bangladesh (AIUB)</p>
                <p className="text-muted-foreground text-sm mt-1">In Progress • Focus: Cybersecurity, Network Security, Cryptography</p>
                <div className="mt-3 text-sm text-muted-foreground">
                  <p>• SSC: Golden GPA 5.0</p>
                  <p>• HSC: Golden GPA 5.0</p>
                </div>
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
