import { motion } from 'framer-motion';
import { Shield, Code2, Terminal, Globe, Database, Lock, Target, Zap } from 'lucide-react';

const skills = [
  {
    category: 'Offensive Security & Pentesting',
    icon: Shield,
    items: [
      { name: 'Web & API Penetration Testing', level: 95 },
      { name: 'Authentication Bypass', level: 92 },
      { name: 'Red Team Simulation (MITRE ATT&CK)', level: 88 },
      { name: 'Business Logic Exploitation', level: 90 },
    ],
  },
  {
    category: 'Security Automation',
    icon: Terminal,
    items: [
      { name: 'Automated Reconnaissance', level: 95 },
      { name: 'Custom Fuzzing Toolkits', level: 90 },
      { name: 'Browser Automation (Puppeteer)', level: 88 },
      { name: 'API Endpoint Discovery', level: 92 },
    ],
  },
  {
    category: 'Programming & Development',
    icon: Code2,
    items: [
      { name: 'JavaScript/Node.js', level: 92 },
      { name: 'Python 3', level: 90 },
      { name: 'Bash Scripting', level: 88 },
      { name: 'React.js/Express.js', level: 85 },
    ],
  },
];

const expertiseAreas = [
  {
    icon: Globe,
    title: 'Web & API Security',
    description: 'OWASP Top 10, API Security Top 10, GraphQL security testing, JWT/OAuth exploitation, and payment gateway security assessment.',
  },
  {
    icon: Target,
    title: 'Vulnerability Research',
    description: 'Verified researcher on HackerOne & Bugcrowd. Specialized in auth bypass, IDOR chains, SSRF→RCE pivots, and rate-limit abuse.',
  },
  {
    icon: Database,
    title: 'Infrastructure Security',
    description: 'Cloud security (AWS/GCP), container escape techniques, subdomain takeover, and microservices architecture analysis.',
  },
  {
    icon: Lock,
    title: 'Tool Development',
    description: 'Built 15+ custom offensive security tools including UltraAPI framework, reducing API testing time by 70%.',
  },
];

const platforms = [
  { name: 'HackerOne', status: 'Verified Researcher' },
  { name: 'Bugcrowd', status: 'Active Contributor' },
  { name: 'TryHackMe', status: 'Top 5% Global' },
  { name: 'HackTheBox', status: 'Intermediate+' },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">
            <span className="text-gradient">About Me</span>
          </h2>
          <p className="section-subtitle">
            Offensive Security Engineer specializing in red teaming, API security, and security automation.
          </p>
        </motion.div>

        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            I'm <span className="text-primary font-semibold">Aftab Ahomod Riyad</span>, 
            known as <span className="text-accent font-mono">Izumi</span> in the security community. 
            With <span className="text-primary">6+ years</span> of hands-on experience in offensive security, 
            I specialize in discovering critical authentication bypasses, API logic flaws, and business logic 
            vulnerabilities while building automated reconnaissance systems that reduce manual assessment time by 70%.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Highly skilled in creating custom offensive tooling using <span className="text-accent">Puppeteer, Node.js, Python, and Bash</span> for 
            offensive workflows, endpoint enumeration, session manipulation, and JWT/OAuth exploitation. 
            Proven expertise in <span className="text-primary">fintech security</span>, payment gateway analysis, and GraphQL security testing.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Currently pursuing <span className="text-primary">BSc in Computer Science & Engineering</span> at AIUB while actively 
            engaged in bug bounty programs, red team simulation exercises, and security research aligned with 
            real-world threat models and the MITRE ATT&CK framework.
          </p>
        </motion.div>

        {/* Platform Rankings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary/50 transition-colors"
            >
              <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
              <h4 className="font-bold">{platform.name}</h4>
              <p className="text-xs text-accent">{platform.status}</p>
            </div>
          ))}
        </motion.div>

        {/* Expertise Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 text-center card-hover"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <area.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-3">{area.title}</h3>
              <p className="text-muted-foreground text-sm">{area.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-center mb-12">
            <span className="text-gradient">Technical Skills</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((skillGroup, groupIndex) => (
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.1 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <skillGroup.icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-bold">{skillGroup.category}</h4>
              </div>

              <div className="space-y-4">
                {skillGroup.items.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: groupIndex * 0.1 + skillIndex * 0.05 }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">{skill.name}</span>
                      <span className="text-sm font-mono text-primary">{skill.level}%</span>
                    </div>
                    <div className="progress-bar">
                      <motion.div
                        className="progress-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h4 className="text-center text-muted-foreground mb-8">Tools & Technologies</h4>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Burp Suite Pro', 'Metasploit Pro', 'Nessus Pro', 'OWASP ZAP',
              'Nmap', 'Nuclei', 'ffuf', 'Amass', 'Subfinder',
              'Puppeteer', 'Selenium', 'Docker', 'Kali Linux',
              'React.js', 'Node.js', 'Express.js', 'GraphQL', 'MongoDB'
            ].map((tool, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="skill-tag"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
