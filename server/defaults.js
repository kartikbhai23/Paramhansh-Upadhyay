// Seed content for the CMS. Written to server/data/content.json on first start.
module.exports = {
  profile: {
    name: 'Adv. Paramhansh Upadhyay',
    designation: 'Founder, Safar Legal Trust',
    tagline: 'Safar Legal Trust is a legal and social organisation dedicated to creating awareness, opportunity, and support for law students, young legal professionals, and communities across India.',
    experience: '10+',
    bio: 'Adv. Paramhansh Upadhyay is the Founder of Safar Legal Trust, an organisation committed to promoting legal awareness, education, justice, and social empowerment.\n\nThrough the Trust, he aims to create meaningful opportunities for law students, young advocates, and communities to understand their rights and responsibilities. His vision is to build a strong network of legal minds that can contribute towards a more informed, accessible, and responsible society.\n\nWith a focus on knowledge, advocacy, and community development, Adv. Paramhansh Upadhyay seeks to bridge the gap between law and society. Safar Legal Trust represents his vision of creating positive change through law, awareness, and collective action.',
    photo: 'assets/paramhansh-upadhyay.png',
    facebook: 'https://www.facebook.com/ParamIAS700',
    instagram: 'https://www.instagram.com/paramhanshupadhyay/',
    youtube: 'https://www.youtube.com/@paramhanshupadhyay',
    twitter: '',
    linkedin: ''
  },
  pillars: [
    { title: 'Knowledge', description: 'Creating widespread legal awareness and literacy. Demystifying complex laws for students, young professionals, and citizens so they fully understand their constitutional rights and responsibilities.', tags: 'Legal Literacy, Workshops, Rights Education' },
    { title: 'Justice', description: 'Promoting accessible, fair, and responsible legal advocacy. Championing ethical legal practice and standing by underprivileged communities to make the justice system equitable for every individual.', tags: 'Accessible Justice, Ethical Advocacy, Pro Bono Guidance' },
    { title: 'Opportunity', description: 'Providing mentorship, practical training, research internships, and networking platforms for law students and budding advocates to help them thrive and lead the legal profession forward.', tags: 'Student Mentorship, Internships, Skill Bootcamps' },
    { title: 'Social Impact', description: 'Bridging the gap between law and society through grassroots community action, citizen outreach campaigns, and collaborative efforts that spark tangible, positive social change.', tags: 'Community Outreach, Citizen Rights, Collective Action' }
  ],
  practice: [
    { title: 'Law Student Mentorship', description: 'Structured guidance, court observation, research internships, and moot court training designed to prepare young legal aspirants for successful careers.' },
    { title: 'Community Rights Awareness', description: 'Grassroots workshops educating citizens on fundamental rights, consumer protections, cyber law basics, and everyday legal remedies.' },
    { title: 'Pro Bono Legal Guidance', description: 'Connecting underprivileged citizens and vulnerable families with reliable, compassionate advice and institutional legal aid pathways.' },
    { title: 'Young Advocates Network', description: 'A collaborative peer forum fostering knowledge-exchange, research roundtables, professional ethics, and leadership in litigation.' },
    { title: 'Legal Research & Policy', description: 'Publishing accessible legal briefs, comparative insights, and actionable policy whitepapers to support law reforms and social justice.' },
    { title: 'Digital Legal Literacy', description: 'Creating engaging video tutorials, explanatory legal guides, and social media campaigns to make the law accessible to every household.' }
  ],
  cases: [
    { title: 'Pan-India Legal Literacy Drive', description: 'Conducted interactive workshops empowering citizens and students with fundamental constitutional and statutory rights.' },
    { title: 'Youth Advocacy & Mentorship Bootcamps', description: 'Mentored law graduates and students in trial advocacy, procedural drafting, and ethical litigation practice.' },
    { title: 'Grassroots Community Aid & Support', description: 'Assisted underprivileged families in accessing legal aid and understanding administrative dispute mechanisms.' }
  ],
  testimonials: [
    { title: 'Priya Sharma (Law Student)', description: 'Safar Legal Trust provided the exact mentorship and clarity I needed as a first-generation law student. Adv. Paramhansh Upadhyay’s guidance on courtroom drafting transformed my outlook.' },
    { title: 'Rajesh Verma (Social Worker)', description: 'The community legal camp organized by Safar Legal Trust enlightened hundreds of residents in our locality about basic consumer rights and legal aid procedures. Truly inspiring work!' },
    { title: 'Adv. Amit K. (Young Advocate)', description: 'A visionary platform bridging theory and real-world legal advocacy. The Trust is fostering an ethical, dedicated network of young legal professionals across India.' }
  ],
  team: [
    { title: 'Adv. Paramhansh Upadhyay', role: 'Founder & Chairman', photo: 'assets/paramhansh-upadhyay.png', description: 'Founder of Safar Legal Trust, leading the vision to bridge law and society through education, legal awareness, and youth empowerment.' },
    { title: 'Adv. Ananya Mehra', role: 'Head of Legal Aid & Research', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80', description: 'Oversees community legal outreach, constitutional rights research, and pro bono legal assistance for marginalized individuals.' },
    { title: 'Rohan Kapoor', role: 'Director of Youth & Student Mentorship', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80', description: 'Leads nationwide student bootcamps, court observation initiatives, and skill development programs for aspiring legal professionals.' }
  ],
  education: [],
  experience: [],
  stats: [
    { value: '10,000+', label: 'Students & Citizens Reached', description: 'Across workshops & awareness drives', order: '1' },
    { value: 'Pan-India', label: 'Community Outreach', description: 'Active youth and advocate network', order: '2' },
    { value: '4 Pillars', label: 'Core Commitments', description: 'Knowledge • Justice • Opportunity • Impact', order: '3' }
  ],
  media: [
    {
      name: 'gallery-library.jpg',
      data: 'assets/gallery-library.jpg',
      caption: "Advocate's Association Library & Case Law Analysis",
      tag: 'Research & Precedent',
      order: 1
    },
    {
      name: 'gallery-drafting.jpg',
      data: 'assets/gallery-drafting.jpg',
      caption: 'Chamber Drafting Masterclass & Petition Review',
      tag: 'Procedural Lab',
      order: 2
    },
    {
      name: 'gallery-community.jpg',
      data: 'assets/gallery-community.jpg',
      caption: 'Constitutional Literacy & Citizen Rights Workshop',
      tag: 'Grassroots Outreach',
      order: 3
    },
    {
      name: 'hero-courtroom.jpg',
      data: 'assets/hero-courtroom.jpg',
      caption: 'Chambers & Trial Courtroom Decorum Study',
      tag: 'Courtroom Procedure',
      order: 4
    }
  ],
  settings: {
    title: 'Safar Legal Trust | Legal Education & Mentorship',
    email: 'contact@safarlegaltrust.org',
    phone: '+91 98765 43210',
    address: 'New Delhi, India',
    footer: 'Empowering Law. Inspiring Change. Knowledge • Justice • Opportunity • Social Impact',
    logo: '',
    heroImage: 'assets/hero-courtroom.jpg',
    aboutImage: 'assets/gallery-library.jpg',
    mapEmbed: '',
    visionText: '“To build a stronger and more inclusive legal community where knowledge of law becomes a tool for empowerment and positive social change.”',
    visionSlogan: 'Join the Safar. Shape the Future.',
    gallerySort: 'custom',
    galleryMaxRows: '2',
    announcementEnabled: 'true',
    announcementText: '🚨 Admissions Open for Chamber Mentorship Program 2026!\nUpcoming Constitutional Literacy Camp in Delhi\nRegister for Drafting & Pleadings Intensive Workshop',
    announcementSeparator: '•',
    announcementSpeed: '25s'
  },
  announcements: [
    '🚨 Admissions Open for Chamber Mentorship Program 2026!',
    'Upcoming Constitutional Literacy Camp in Delhi',
    'Register for Drafting & Pleadings Intensive Workshop'
  ],
  sections: {
    pillars: {
      eyebrow: 'CORE FOUNDATION',
      title: 'The Four Pillars',
      tagline: 'The guiding principles that shape the vision and initiatives of Safar Legal Trust.'
    },
    practice: {
      eyebrow: 'OUR SERVICES',
      title: 'Practice Areas',
      tagline: 'Core focus areas of Safar Legal Trust — from mentorship and legal aid to community outreach and digital awareness.'
    },
    team: {
      eyebrow: 'LEADERSHIP & GUIDANCE',
      title: 'Our Team',
      tagline: ''
    },
    articles: {
      eyebrow: 'ARTICLES & LEGAL INSIGHTS',
      title: 'Articles & Legal Insights',
      tagline: 'Perspectives, commentary, and field notes from Safar Legal Trust on constitutional rights, advocacy, and community legal literacy.'
    },
    gallery: {
      eyebrow: 'ARCHIVAL & FIELD DOCUMENTATION',
      title: 'Institutional Gallery',
      tagline: 'Documentary glimpses of practical chamber research, drafting masterclasses, and community literacy camps.'
    },
    testimonials: {
      eyebrow: 'CLIENT & STUDENT FEEDBACK',
      title: 'Student & Community Perspectives',
      tagline: "Reflections from law students, young advocates, and community leaders who have experienced the Trust's guidance."
    },
    contact: {
      eyebrow: 'OFFICE & REACH',
      title: 'Contact & Trust Secretariat',
      tagline: 'Connect with Safar Legal Trust for inquiries, admissions, and institutional collaborations.'
    }
  },
  activity: []
};
