# 🎯 Izumi's P.Portfolio

A modern, cyberpunk-themed portfolio website showcasing offensive security expertise, projects, and professional experience. Built with React, TypeScript, and Tailwind CSS.

**Live Site:** [https://izumi-s-digital-portfoliocanvas.vercel.app/](https://izumi-s-digital-portfoliocanvas.vercel.app/)

---

## 🚀 Features

### 🎨 Design & UX
- **Cyberpunk Hacker Theme** with neon green & electric blue accents
- **Matrix Rain Animation** background effect
- **Smooth Animations** powered by Framer Motion
- **Interactive Terminal** component with command execution
- **Responsive Design** optimized for all devices
- **Loading Screen** with animated progress indicators
- **Floating Hire Button** for easy contact access

### 📱 Sections
1. **Hero Section** - Dynamic introduction with typing effects and animated counters
2. **Projects Arsenal** - Showcase of custom security tools and frameworks
3. **Blog & Writeups** - Security research, CVE disclosures, and technical deep-dives
4. **Testimonials** - Client feedback carousel with ratings
5. **About Me** - Professional summary with skills breakdown
6. **Technical Skills** - Animated skill bars across multiple categories
7. **Certifications** - Industry-recognized security certifications
8. **Resume** - Comprehensive professional experience and education
9. **Pricing** - Transparent security service packages with comparison table
10. **FAQ** - Common questions about services and engagement process
11. **Contact** - Integrated contact form with Formspree

### 🛠️ Technical Highlights
- **React 18.3** with TypeScript
- **Tailwind CSS** with custom cyberpunk theme
- **Framer Motion** for advanced animations
- **shadcn/ui** component library
- **React Router** for navigation
- **Formspree** integration for contact forms
- **Embla Carousel** for testimonials
- **Lucide React** icon library

---

## 📦 Installation

### Prerequisites
- **Node.js** 18+ and npm/yarn/pnpm
- Git

### Clone Repository
```bash
git clone https://github.com/izumiriyad/portfolio.git
cd portfolio
```

### Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Run Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The site will be available at `http://localhost:8080`

### Build for Production
```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Preview Production Build
```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

---

## 🎨 Customization

### Color Theme
Edit `src/index.css` to modify the cyberpunk color scheme:

```css
:root {
  /* Neon Green Primary */
  --primary: 152 100% 50%;
  
  /* Electric Blue Accent */
  --accent: 207 100% 50%;
  
  /* Dark Background */
  --background: 0 0% 4%;
}
```

### Personal Information
Update content in:
- `src/components/HeroSection.tsx` - Name and tagline
- `src/components/AboutSection.tsx` - Bio and achievements
- `src/components/ProjectsSection.tsx` - Project portfolio
- `src/components/ResumeSection.tsx` - Professional experience
- `src/components/ContactSection.tsx` - Contact details

### Profile Photo
Replace the profile image:
```bash
src/assets/izumi-profile.jpg
```

### Project Images
Add project screenshots to:
```bash
src/assets/projects/
```

### Contact Form
Configure Formspree endpoint in `src/components/ContactSection.tsx`:
```typescript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  // ...
});
```

---

## 🗂️ Project Structure

```
portfolio/
├── public/
│   ├── placeholder.svg
│   ├── robots.txt
│   └── google1570fbd488120a71.html
├── src/
│   ├── assets/
│   │   ├── hero-bg.jpg
│   │   ├── izumi-profile.jpg
│   │   └── projects/
│   │       ├── ultra-api-scanner.png
│   │       ├── phantom-backend.png
│   │       └── ...
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── AboutSection.tsx
│   │   ├── AnimatedCounter.tsx
│   │   ├── BlogSection.tsx
│   │   ├── CertificationsSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── FAQSection.tsx
│   │   ├── FloatingHireButton.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── MatrixRain.tsx
│   │   ├── Navbar.tsx
│   │   ├── PricingSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ResumeSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── Terminal.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── TypingEffect.tsx
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── components.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## 🚢 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Deploy automatically on every push

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/izumiriyad/portfolio)

### Netlify
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### GitHub Pages
1. Update `vite.config.ts` with base path
2. Run `npm run build`
3. Deploy `dist/` to `gh-pages` branch

---

## 🛡️ Security Features Showcased

- **UltraAPI Framework** - Advanced API security testing tool
- **Phantom Recon System** - Attack surface mapping and subdomain enumeration
- **Payment Gateway Security Suite** - OTP/PIN verification testing platform
- **UAE Crypto OSINT Dashboard** - Breach intelligence monitoring
- **LinkedIn Automation Bot** - Browser automation with anti-detection
- **Bug Bounty Pro Toolkit** - Comprehensive security testing scripts

---

## 📊 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, Custom CSS animations |
| **UI Components** | shadcn/ui, Radix UI |
| **Animation** | Framer Motion |
| **Icons** | Lucide React |
| **Forms** | React Hook Form, Zod validation |
| **Routing** | React Router v6 |
| **Carousel** | Embla Carousel |
| **Fonts** | Inter (Sans), JetBrains Mono (Monospace) |
| **Deployment** | Vercel |

---

## 🎯 Performance Optimizations

- **Code Splitting** via React lazy loading
- **Image Optimization** with proper formats and lazy loading
- **CSS Purging** with Tailwind's JIT compiler
- **Minification** in production builds
- **Tree Shaking** to remove unused code
- **Gzip Compression** on Vercel
- **CDN Distribution** via Vercel Edge Network

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is **MIT licensed**. Feel free to use it for your own portfolio!

---

## 📧 Contact

**Aftab Ahomod Riyad (Izumi)**

- 📧 Email: aftabahomodriyad@gmail.com
- 💼 LinkedIn: [linkedin.com/in/zeroizumi](https://linkedin.com/in/zeroizumi)
- 🐙 GitHub: [github.com/izumiriyad](https://github.com/izumiriyad)
- 🌐 Website: [izumi-s-digital-portfoliocanvas.vercel.app](https://izumi-s-digital-portfoliocanvas.vercel.app/)

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for the icon set
- [Formspree](https://formspree.io/) for form handling

---

## 🎨 Design Philosophy

This portfolio embraces a **cyberpunk hacker aesthetic** with:
- **Neon color palette** (green & blue) representing code and digital security
- **Monospace typography** evoking terminal interfaces
- **Matrix-inspired animations** creating an immersive tech atmosphere
- **Grid overlays and scanlines** adding retro-futuristic depth
- **Glitch effects** subtly emphasizing the hacking theme
- **Terminal components** showcasing command-line proficiency

The design balances **visual impact** with **professional credibility**, ensuring the portfolio stands out while maintaining a serious security researcher aesthetic.

---

<div align="center">

**Built with 💚 by Izumi**

*Securing the digital frontier, one exploit at a time.*

</div>
