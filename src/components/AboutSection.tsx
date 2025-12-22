import { motion } from 'framer-motion';
import { Shield, Code2, Terminal, Globe, Database, Lock } from 'lucide-react';

const skills = [
  {
    category: 'Offensive Security',
    icon: Shield,
    items: [
      { name: 'Penetration Testing', level: 95 },
      { name: 'API Security', level: 90 },
      { name: 'Auth Bypass', level: 88 },
      { name: 'IDOR/BOLA Detection', level: 85 },
    ],
  },
  {
    category: 'Programming',
    icon: Code2,
    items: [
      { name: 'Python', level: 92 },
      { name: 'JavaScript/Node.js', level: 85 },
      { name: 'Bash Scripting', level: 88 },
      { name: 'Go', level: 75 },
    ],
  },
  {
    category: 'Tools & Frameworks',
    icon: Terminal,
    items: [
      { name: 'Burp Suite Pro', level: 95 },
      { name: 'Nuclei', level: 90 },
      { name: 'FFUF', level: 92 },
      { name: 'Nmap', level: 88 },
    ],
  },
];

const expertiseAreas = [
  {
    icon: Globe,
    title: 'Web Application Security',
    description: 'Deep expertise in identifying and exploiting web vulnerabilities including XSS, SQLi, SSRF, and business logic flaws.',
  },
  {
    icon: Database,
    title: 'API & Backend Security',
    description: 'Specialized in REST/GraphQL API testing, authentication bypasses, and data exposure vulnerabilities.',
  },
  {
    icon: Lock,
    title: 'Automation & Tool Development',
    description: 'Building custom security tools for reconnaissance, fuzzing, and vulnerability detection at scale.',
  },
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
            Self-taught security researcher with a passion for breaking systems
            and building tools to make the internet more secure.
          </p>
        </motion.div>

        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            I'm <span className="text-primary font-semibold">Aftab Ahomod Riyad</span>, 
            known as <span className="text-accent font-mono">izumi</span> in the security community. 
            With <span className="text-primary">5+ years</span> of hands-on experience in offensive security, 
            I specialize in API security testing, building custom automation tools, and delivering 
            high-impact bug bounty reports.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            My approach combines deep technical expertise with creative problem-solving. 
            I've built enterprise-grade security platforms, delivered successful client projects 
            internationally, and continuously push the boundaries of what's possible in security automation.
          </p>
        </motion.div>

        {/* Expertise Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
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
              <h3 className="text-xl font-bold mb-3">{area.title}</h3>
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
              'Burp Suite Pro', 'Metasploit Pro', 'Acunetix Pro', 'Nessus Pro', 
              'Nmap', 'FFUF', 'Nuclei', 'Docker', 'Kubernetes', 
              'React', 'Node.js', 'GraphQL'
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
