import { motion } from "framer-motion";
import { Award, Shield } from "lucide-react";

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
            <span className="text-primary">&gt;</span> Certifications
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Industry-recognized security certifications
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
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
      </div>
    </section>
  );
};

export default CertificationsSection;
