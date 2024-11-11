import currentUser from "@/lib/current-user";
import { redirect } from "next/navigation";
import CreateProject from "@/components/projects/create-project";
import { getProjects } from "@/data/projects";
import ProjectCard from "@/components/projects/project-card";
import { ImageIcon } from "lucide-react";

export const dynamic = "force-dynamic";

const DashboardPage = async () => {
  const user = await currentUser();

  if (!user?.id) {
    redirect("/auth/login");
  }

  const projects = await getProjects(user.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold md:text-4xl">
            Your Active Challenges
          </h1>
          <p className="text-muted-foreground mt-2">
            Track your journey and achieve your goals.
          </p>
        </div>
        <CreateProject />
      </div>
      {projects.length === 0 ? (
        <div className="flex h-[50vh] items-center justify-center flex-col gap-4">
          <ImageIcon className="h-12 w-12 text-muted-foreground" />
          <p className="text-lg text-muted-foreground">
            No challenges found. Create your first challenge!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
