const steps = [
  {
    title: "Create Account",
    description: "Sign up in seconds and customize your profile",
  },
  {
    title: "Set Your Goals",
    description: "Define what you want to achieve",
  },
  {
    title: "Track Progress",
    description: "Monitor your journey to success",
  },
];

export default function HowItWorks() {
  return (
    <section className="container mx-auto px-4 py-24 bg-muted/50">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get started with Progress Tracker in three simple steps
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={step.title} className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">
                {index + 1}
              </span>
            </div>
            <h3 className="font-semibold mb-2">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 