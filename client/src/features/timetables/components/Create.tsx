import { ArrowUpRightIcon } from "lucide-react";

import {
  CraftButton,
  CraftButtonIcon,
  CraftButtonLabel,
} from "@/shared/components/ui/craft-button";

const Create = () => {
  return (
    <CraftButton size="default">
      <CraftButtonLabel>Create</CraftButtonLabel>

      <CraftButtonIcon>
        <ArrowUpRightIcon className="size-3 stroke-2 text-foreground transition-transform duration-500 group-hover:rotate-45" />
      </CraftButtonIcon>
    </CraftButton>
  );
};

export default Create;
