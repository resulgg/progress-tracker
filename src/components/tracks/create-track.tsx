"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import FormDialog from "@/components/ui/form-dialog";
import TrackForm from "./track-form";

const CreateTrack = ({ projectId }: { projectId: string }) => {
  return (
    <FormDialog
      trigger={
        <Button variant="outline" className="flex justify-between items-center">
          <PlusIcon className="w-4 h-4" />
          <span className="hidden md:block">Add track</span>
        </Button>
      }
      title="Add a new track"
      description="Add a new track to your challenge to track different aspects of your progress."
    >
      {({ setOpen }) => <TrackForm projectId={projectId} setOpen={setOpen} />}
    </FormDialog>
  );
};

export default CreateTrack;
