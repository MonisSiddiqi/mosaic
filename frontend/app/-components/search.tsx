import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, XIcon } from "lucide-react";
import { Dispatch, FC, SetStateAction, useState } from "react";

type Props = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  placeholder?: string;
};

export const Search: FC<Props> = ({ query, setQuery, placeholder }) => {
  const [search, setSearch] = useState(query);

  return (
    <div className="mb-6 h-fit w-full rounded border-8 border-white p-2 pb-5 shadow lg:w-fit lg:p-5">
      <div className="flex w-full gap-4 lg:w-fit">
        <div className="relative w-full lg:w-fit">
          <div className="w-full lg:w-fit">
            <SearchIcon className="absolute left-2 top-2 size-5" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setQuery(search)}
              placeholder={placeholder ? placeholder : "Search..."}
              className="w-full pl-9 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-ring lg:w-80"
            />
          </div>
        </div>

        {query ? (
          <Button
            onClick={() => {
              setQuery("");
              setSearch("");
            }}
            variant={"secondary"}
            className="w-20 gap-1"
          >
            <XIcon /> Clear
          </Button>
        ) : (
          <Button onClick={() => setQuery(search)} className="w-20">
            Search
          </Button>
        )}
      </div>
    </div>
  );
};
