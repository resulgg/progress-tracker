import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { format } from "date-fns";
import Link from "next/link";
import { projects, categories } from "@/db/schema";

type ProjectFrequency = 3600 | 86400 | 604800 | 2592000 | number;

const getFrequencyText = (frequency: ProjectFrequency) => {
  switch (frequency) {
    case 3600:
      return "Hourly";
    case 86400:
      return "Daily";
    case 604800:
      return "Weekly";
    case 2592000:
      return "Monthly";
    default:
      return format(new Date(frequency * 1000), "'Every' EEEE");
  }
};

type Project = typeof projects.$inferSelect & {
  category: typeof categories.$inferSelect;
};

const ProjectCard = ({ project }: { project: Project }) => (
  <Card className="group overflow-hidden transition-all hover:shadow-lg">
    <Link href={`/dashboard/${project.id}`}>
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold tracking-tight">
            {project.title}
          </CardTitle>
        </div>
        <CardDescription className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <h3 className="text-primary font-medium">Frequency</h3>
            <p className="text-sm">{getFrequencyText(project.frequency)}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-primary font-medium">End Date</h3>
            <p className="text-sm">{project.endDate?.toLocaleDateString()}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-primary font-medium">Category</h3>
            <p className="text-sm">{project.category.name}</p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${project.coverImage}`}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </CardContent>
    </Link>
  </Card>
);

export default ProjectCard;
