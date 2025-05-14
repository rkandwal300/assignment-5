import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = ({
  className,
  hasSectionClassName,
  type,
  leftSection,
  rightSection,
  ...props
}) => {
  const hasSection = Boolean(leftSection) || Boolean(rightSection);
  const handleWheel = (e) => {
    e.currentTarget.blur(); // Prevent value change
    e.stopPropagation(); // Stop scrolling behavior
    setTimeout(() => e.currentTarget?.focus(), 0); // Refocus after the current execution cycle
    if (props.onWheel) props.onWheel(e);
  };
  let value = props.value;
  if (value === 0 && type === "number") {
    value = "";
  }

  return (
    <>
      {hasSection ? (
        <div
          className={cn(
            "flex h-9 items-center justify-center rounded-md border-0 bg-muted/50 ring-offset-background autofill:bg-background focus-within:ring-1 focus-within:ring-inset focus-within:ring-ring data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50 focus-visible:ring-inset lg:border lg:border-input lg:bg-transparent ",
            hasSectionClassName
          )}
          data-disabled={props.disabled}
        >
          {leftSection && (
            <div className={cn("items-center pl-2 text-muted-foreground")}>
              {leftSection}
            </div>
          )}
          <input
            type={type}
            onWheel={type == "number" ? handleWheel : props.onWheel}
            className={cn(
              "text-md file:text-md  flex h-full w-full rounded-md border-none bg-muted/50 py-2 shadow-none outline-none file:bg-transparent file:font-medium placeholder:text-muted-foreground focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none sm:text-sm sm:file:text-sm lg:bg-transparent",
              hasSection ? "px-4 focus-within:ring-0" : "",
              type == "number" ? " arrows-none text-right" : "",
              className
            )}
            {...props}
            value={value}
          />
          {rightSection && (
            <div className={cn("pr-2 text-muted-foreground")}>
              {rightSection}
            </div>
          )}
        </div>
      ) : (
        <input
          type={type}
          onWheel={type == "number" ? handleWheel : props.onWheel}
          className={cn(
            "text-md file:text-md flex h-9 w-full rounded-md border border-input bg-muted/50 px-4 py-2 file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground focus:ring-1 focus:ring-inset focus:ring-ring focus-visible:border-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm  sm:file:text-sm lg:border-input lg:bg-transparent",
            type == "number" ? " arrows-none text-right" : "",
            className
          )}
          {...props}
          value={value}
        />
      )}
    </>
  );
};
