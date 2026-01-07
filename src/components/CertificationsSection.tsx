import { motion } from "framer-motion";
import { Award, Shield, Trophy, Star, ExternalLink } from "lucide-react";

const certifications = [
  {
    name: "OSCP",
    fullName: "Offensive Security Certified Professional",
    icon: Shield,
    color: "from-red-500 to-orange-500",
  },
  {
    name: "CEH",
    fullName: "Certified Ethical Hacker",
    icon: Award,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "eWPT",
    fullName: "Web Application Penetration Tester",
    icon: Shield,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "CRTP",
    fullName: "Certified Red Team Professional",
    icon: Award,
    color: "from-primary to-accent",
  },
];

const hallOfFame = [
  {
    company: "Google",
    type: "Security Researcher",
    year: "2024",
  },
  {
    company: "Microsoft",
    type: "MSRC Contributor",
    year: "2023",
  },
  {
    company: "Meta",
    type: "Bug Bounty Hunter",
    year: "2023",
  },
  {
    company: "PayPal",
    type: "Security Researcher",
    year: "2024",
  },
];

const platformStats = [
  {
    platform: "HackerOne",
    rank: "Top 100",
    reputation: "2,500+",
    color: "bg-gradient-to-r from-[#494649] to-[#6b6b6b]",
  },
  {
    platform: "Bugcrowd",
    rank: "P1 Hunter",
    reputation: "Elite",
    color: "bg-gradient-to-r from-orange-600 to-orange-400",
  },
  {
    platform: "Synack",
    rank: "Red Team",
    reputation: "Verified",
    color: "bg-gradient-to-r from-red-600 to-red-400",
  },
];

const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-20 px-4 bg-background/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">&gt;</span> Credentials & Recognition
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Industry certifications and acknowledgments from leading tech companies
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Award className="text-primary" size={20} />
            <span className="font-mono text-primary">//</span> Certifications
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-20 rounded-xl blur-xl group-hover:opacity-40 transition-opacity"
                  style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }}
                />
                <div className="relative bg-card/80 backdrop-blur-sm border border-primary/20 rounded-xl p-6 text-center group-hover:border-primary/50 transition-all">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${cert.color} p-0.5`}>
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                      <cert.icon className="text-primary" size={28} />
                    </div>
                  </div>
                  <h4 className="font-bold text-lg mb-1">{cert.name}</h4>
                  <p className="text-xs text-muted-foreground leading-tight">{cert.fullName}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hall of Fame */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Trophy className="text-accent" size={20} />
            <span className="font-mono text-primary">//</span> Hall of Fame
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hallOfFame.map((entry, index) => (
              <motion.div
                key={entry.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="bg-card/50 backdrop-blur-sm border border-accent/20 rounded-lg p-4 hover:border-accent/50 transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <Star className="text-accent" size={16} fill="currentColor" />
                  <span className="text-xs text-muted-foreground font-mono">{entry.year}</span>
                </div>
                <h4 className="font-bold text-foreground group-hover:text-accent transition-colors">{entry.company}</h4>
                <p className="text-xs text-muted-foreground">{entry.type}</p>
                <ExternalLink className="w-3 h-3 text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Platform Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Shield className="text-primary" size={20} />
            <span className="font-mono text-primary">//</span> Platform Rankings
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {platformStats.map((platform, index) => (
              <motion.div
                key={platform.platform}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-xl"
              >
                <div className={`${platform.color} p-0.5 rounded-xl`}>
                  <div className="bg-background/95 backdrop-blur-sm rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-lg">{platform.platform}</h4>
                      <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-mono rounded">
                        {platform.rank}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-sm">Reputation:</span>
                      <span className="text-accent font-semibold">{platform.reputation}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
