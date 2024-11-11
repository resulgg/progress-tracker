import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, Target, Sparkles } from "lucide-react";

const features = [
  {
    icon: <BarChart2 className="h-6 w-6 text-primary" />,
    title: "Track Progress",
    description: "Monitor your journey with intuitive progress tracking tools",
  },
  {
    icon: <Target className="h-6 w-6 text-primary" />,
    title: "Set Goals",
    description: "Define and achieve your personal and professional goals",
  },
  {
    icon: <Sparkles className="h-6 w-6 text-primary" />,
    title: "Stay Motivated",
    description: "Get insights and motivation to keep pushing forward",
  },
];

export default function Features() {
  return (
    <section className="container mx-auto px-4 py-24">
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="border-none shadow-lg bg-card/50 backdrop-blur"
          >
            <CardHeader>
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
} 