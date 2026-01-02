import { motion } from 'framer-motion';
import { Shield, Code, Terminal, Database, Globe, Lock } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface SkillCategory {
  title: string;
  icon: typeof Shield;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Security Tools',
    icon: Shield,
    skills: [
      { name: 'Burp Suite Professional', level: 95, category: 'security' },
      { name: 'Metasploit Framework', level: 90, category: 'security' },
      { name: 'Nmap / Masscan', level: 92, category: 'security' },
      { name: 'Nuclei / FFUF', level: 88, category: 'security' },
      { name: 'OWASP ZAP', level: 85, category: 'security' },
    ],
  },
  {
    title: 'Programming',
    icon: Code,
    skills: [
      { name: 'Python', level: 92, category: 'programming' },
      { name: 'JavaScript / Node.js', level: 88, category: 'programming' },
      { name: 'Bash / Shell', level: 90, category: 'programming' },
      { name: 'React.js', level: 82, category: 'programming' },
      { name: 'SQL', level: 85, category: 'programming' },
    ],
  },
  {
    title: 'Automation',
    icon: Terminal,
    skills: [
      { name: 'Puppeteer / Playwright', level: 90, category: 'automation' },
      { name: 'Selenium', level: 88, category: 'automation' },
      { name: 'Custom Fuzzing Tools', level: 85, category: 'automation' },
      { name: 'CI/CD Security', level: 80, category: 'automation' },
      { name: 'Docker', level: 82, category: 'automation' },
    ],
  },
  {
    title: 'API Security',
    icon: Globe,
    skills: [
      { name: 'REST API Testing', level: 95, category: 'api' },
      { name: 'GraphQL Security', level: 88, category: 'api' },
      { name: 'JWT / OAuth Exploitation', level: 92, category: 'api' },
      { name: 'WebSocket Testing', level: 80, category: 'api' },
      { name: 'API Fuzzing', level: 87, category: 'api' },
    ],
  },
  {
    title: 'Vulnerability Classes',
    icon: Lock,
    skills: [
      { name: 'Authentication Bypass', level: 94, category: 'vuln' },
      { name: 'IDOR / BOLA', level: 92, category: 'vuln' },
      { name: 'SSRF / XXE', level: 88, category: 'vuln' },
      { name: 'SQL Injection', level: 90, category: 'vuln' },
      { name: 'Business Logic Flaws', level: 93, category: 'vuln' },
    ],
  },
  {
    title: 'Databases & Infrastructure',
    icon: Database,
    skills: [
      { name: 'MongoDB', level: 85, category: 'infra' },
      { name: 'PostgreSQL / MySQL', level: 82, category: 'infra' },
      { name: 'Redis', level: 78, category: 'infra' },
      { name: 'AWS Security', level: 75, category: 'infra' },
      { name: 'Linux Administration', level: 88, category: 'infra' },
    ],
  },
];

const SkillBar = ({ skill, index }: { skill: Skill; index: number }) => {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-foreground">{skill.name}</span>
        <span className="text-xs font-mono text-primary">{skill.level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary via-primary to-accent"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{
            boxShadow: '0 0 10px rgba(0, 255, 136, 0.5)',
          }}
        />
      </div>
    </div>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 relative">
      {/* Background Effects */}
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">
            <span className="text-gradient">Technical Proficiency</span>
          </h2>
          <p className="section-subtitle">
            6+ years of hands-on experience in offensive security, automation, and tool development
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold">{category.title}</h3>
              </div>

              {/* Skills */}
              <div>
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar key={skill.name} skill={skill} index={skillIndex} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Security Tools Mastered', value: '20+' },
            { label: 'Programming Languages', value: '5+' },
            { label: 'Custom Tools Built', value: '15+' },
            { label: 'Years Experience', value: '6+' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-4 rounded-lg bg-card/30 border border-border"
            >
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
