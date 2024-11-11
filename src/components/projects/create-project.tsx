"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import ProjectForm from "./project-form";
import FormDialog from "@/components/ui/form-dialog";

const CreateProject = () => {
  return (
    <FormDialog
      trigger={
        <Button variant="outline" className="flex justify-between items-center">
          <PlusIcon className="w-4 h-4" />
          <span className="hidden md:block">Create a challenge</span>
        </Button>
      }
      title="Create a challenge"
      description="Create a challenge to help you stay motivated and achieve your goals."
    >
      {({ setOpen }) => <ProjectForm setOpen={setOpen} />}
    </FormDialog>
  );
};

export default CreateProject;
