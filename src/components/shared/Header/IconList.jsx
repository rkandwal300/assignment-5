import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Globe, User, Search, ShoppingCart } from "lucide-react";
import React from "react";

const IconList = () => (
  <div className="flex justify-center items-center text-primary-foreground ml-auto">
    <Button variant={"ghost"} className={"ml-[27px]"}>
      <User size={16} />
    </Button>
    <Button variant={"ghost"} className={"ml-[27px]"}>
      <Globe size={16} />
    </Button>
    <Button variant={"ghost"} className={"ml-[27px]"}>
      <Search size={16} />
    </Button>
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} className={"ml-[27px]"}>
          <ShoppingCart size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent className={'md:max-w-[500px] max-w-[100%] w-full'}></SheetContent>
    </Sheet>
  </div>
);

export default IconList;
