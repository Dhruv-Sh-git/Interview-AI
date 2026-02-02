import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Terminal, Cpu, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/20">
      {/* Navigation */}
      <nav className="container mx-auto flex items-center justify-between p-6">
        <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Terminal size={18} />
          </div>
          InterviewAI
        </div>
        <div className="hidden items-center gap-6 md:flex">
          <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Pricing
          </Link>
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            For Recruiters
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            Sign In
          </Button>
          <Link href="/interview">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto flex flex-col items-center justify-center px-4 py-24 text-center md:py-32">
        <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
          <span className="mr-2 flex h-2 w-2">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            </span>
          </span>
          Now Live in India 🇮🇳
        </div>
        <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl">
          The AI Interviewer that <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
            Thinks Like a Senior Engineer
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Conduct unbiased DSA and System Design interviews at scale.
          Get instant, detailed feedback reports without burning engineering hours.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href="/interview">
            <Button size="lg" className="h-14 gap-2 px-8 text-base">
              Start Demo Interview <ArrowRight size={18} />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="h-14 px-8 text-base">
            View Sample Report
          </Button>
        </div>

        {/* Stats / Trust */}
        <div className="mt-16 flex w-full max-w-3xl flex-col items-center gap-8 border-y border-border py-8 md:flex-row md:justify-around">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">10k+</span>
            <span className="text-sm text-muted-foreground">Interviews Conducted</span>
          </div>
          <div className="hidden h-12 w-px bg-border md:block" />
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">85%</span>
            <span className="text-sm text-muted-foreground">Cost Reduction</span>
          </div>
          <div className="hidden h-12 w-px bg-border md:block" />
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">4.9/5</span>
            <span className="text-sm text-muted-foreground">Candidate Rating</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="bg-secondary/30 py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Everything you need to hire the best</h2>
            <p className="mt-4 text-muted-foreground">Automate your technical screening without compromising on quality.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<Cpu className="text-blue-500" />}
              title="Adaptive AI Engine"
              description="Questions adapt in real-time based on candidate performance, just like a human interviewer."
            />
            <FeatureCard
              icon={<Terminal className="text-violet-500" />}
              title="Live Coding Environment"
              description="Full-featured code editor with support for 20+ languages and execution capabilities."
            />
            <FeatureCard
              icon={<ShieldCheck className="text-green-500" />}
              title="Anti-Cheating & Proctoring"
              description="Advanced tab-switch detection and copy-paste tracking to ensure integrity."
            />
          </div>
        </div>
      </section>

      <footer className="mt-auto border-t border-border py-12">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2026 InterviewAI SaaS. Built for India.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="group rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-lg">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary group-hover:bg-primary/10">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
