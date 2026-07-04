const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const bcrypt = require('bcryptjs');

const adapter = new PrismaBetterSqlite3({
  url: 'file:./dev.db'
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding started...');
  // Clear existing data
  try {
    await prisma.adminUser.deleteMany();
    await prisma.lead.deleteMany();
    await prisma.caseStudy.deleteMany();
    await prisma.blogPost.deleteMany();
    await prisma.testimonial.deleteMany();
    console.log('Cleared existing tables.');
  } catch (err) {
    console.log('Error clearing tables (they might be empty):', err.message);
  }

  // Create default admin user
  const passwordHash = await bcrypt.hash('adminpassword', 10);
  const admin = await prisma.adminUser.create({
    data: {
      email: 'admin@aetheric.ai',
      name: 'Aetheric Administrator',
      passwordHash,
    },
  });
  console.log('Created admin account:', admin.email);

  // Create testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        clientName: 'Sarah Jenkins',
        company: 'Vortex FinTech',
        quote: 'Aetheric AI revolutionized our high-frequency trading platform. Their custom reinforcement learning models boosted our execution efficiency by 32%. Highly recommend!',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        rating: 5,
      },
      {
        clientName: 'David Chen',
        company: 'BioCompute Labs',
        quote: 'The full-stack bio-simulation dashboard built by Aetheric is spectacular. Fluid glassmorphic visuals, zero latency, and solid architecture. A masterclass in software engineering.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        rating: 5,
      },
      {
        clientName: 'Elena Rostova',
        company: 'Apex Logistics',
        quote: 'Their AI agent workflows automated our entire supply chain dispatching. We reduced operational overhead by 45% within three months. Incredible work.',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
        rating: 5,
      },
    ],
  });
  console.log('Testimonials seeded.');

  // Create Case Studies
  await prisma.caseStudy.createMany({
    data: [
      {
        title: 'Project BioGlow: AI-Driven Drug Discovery',
        slug: 'project-bioglow',
        summary: 'Developing a high-throughput virtual screening engine leveraging graph convolutional neural networks.',
        content: 'Our team partnered with BioGlow to build a machine learning model capable of predicting molecular binding affinities. By implementing custom deep learning pipelines, we cut virtual screening time from weeks to hours, allowing researchers to isolate 14 high-probability lead compounds.',
        coverImage: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800',
        tags: 'AI/ML,Deep Learning,BioTech',
      },
      {
        title: 'NovaFlow: Intelligent Logistical Dispatch',
        slug: 'novaflow-dispatch',
        summary: 'An autonomous agent fleet management system coordinating thousands of intermodal cargo movements.',
        content: 'NovaFlow required a real-time routing optimization engine that could react dynamically to port congestions, weather, and driver duty limits. We engineered a reactive microservices mesh powered by temporal graph neural networks, reducing transport delays by 18% globally.',
        coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
        tags: 'AI Automation,Enterprise Software,Optimization',
      },
      {
        title: 'StellarSaaS: Next-Generation Workspace Analytics',
        slug: 'stellarsaas-analytics',
        summary: 'A high-performance real-time data visualizer handling millions of events per second with sub-millisecond query speed.',
        content: 'Built from the ground up utilizing Next.js, Rust-based edge workers, and a distributed columnar database. Features advanced real-time charts, predictive forecasting models, and end-to-end telemetry tracking with beautiful canvas visualizations.',
        coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        tags: 'Full-Stack,SaaS,Real-Time',
      },
    ],
  });
  console.log('Case studies seeded.');

  // Create Blog Posts
  await prisma.blogPost.createMany({
    data: [
      {
        title: 'The Future of AI Agent Workflows in Enterprise SaaS',
        slug: 'future-ai-agent-workflows',
        content: 'AI is shifting from passive assistants (chatbots) to active agents that run background tasks, query databases, make API calls, and coordinate with other agents. In this post, we explore how to build reliable multi-agent systems using state charts and structured schema validations.',
        coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
        tags: 'AI Automation,SaaS,Future Tech',
      },
      {
        title: 'Optimizing Canvas Rendering for High-DPI 4K Screens',
        slug: 'optimizing-canvas-4k-screens',
        content: 'Rendering 10,000 active particles at 60fps on 4K screens requires careful memory management, double-buffering, and minimizing garbage collection. We walkthrough how Aetheric engineers optimize HTML5 Canvas visualizers using spatial hash grids and typed arrays.',
        coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
        tags: 'Frontend,Performance,WebGL',
      },
    ],
  });
  console.log('Blog posts seeded.');

  // Create a default lead
  await prisma.lead.create({
    data: {
      name: 'John Doe',
      email: 'john@vortex.com',
      company: 'Vortex FinTech',
      projectType: 'AI/ML Tools',
      budget: '$50,000 - $100,000',
      message: 'Looking to integrate predictive analytics in our existing banking terminal client.',
      status: 'new',
    },
  });
  console.log('Default lead seeded.');
  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
