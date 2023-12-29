import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { issueLabels } from "@/data/constants";
import { useState } from "react";

interface Props {
  updateQueryParams: (key: string, value: string) => void;
  labelValue: string;
}

export function LabelComboBox({ updateQueryParams, labelValue }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
        >
          {labelValue
            ? issueLabels.find((label) => label.value === labelValue)?.label
            : "Select label"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search label..." className="h-9" />
          <CommandEmpty>No label found.</CommandEmpty>
          <CommandGroup>
            {issueLabels.map((label) => (
              <CommandItem
                key={label.value}
                value={label.value}
                onSelect={(currentValue) => {
                  updateQueryParams(
                    "label",
                    currentValue === labelValue ? "" : currentValue
                  );
                  setOpen(false);
                }}
              >
                {label.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    labelValue === label.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
