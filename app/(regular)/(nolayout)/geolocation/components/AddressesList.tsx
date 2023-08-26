'use client'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

interface Location {
  name: string;
  latitude: string;
  longitude: string;
}

interface AddressesListProps {
  locations: Location[];
  onSelect: (selectedLocation: Location) => void;
}

const AddressesList: React.FC<AddressesListProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>("");

  const copyLocation = () => {
    navigator.clipboard.writeText(value);
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value || "Select location..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search location..." />
          <CommandEmpty>No location found.</CommandEmpty>
          <CommandGroup>
            {props.locations.map((loc, index) => (
              <CommandItem
                key={index}
                onSelect={() => {
                  const selectedLocation = props.locations[index];
                  setValue(selectedLocation.name);
                  setOpen(false);
                  if (props.onSelect) {
                    props.onSelect(selectedLocation);
                  }
                }}
              >
                <Check
                  className={value === loc.name ? "opacity-100 mr-2 h-4 w-4" : "opacity-0 mr-2 h-4 w-4"}
                />
                <span onClick={copyLocation}>{loc.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AddressesList;
