import React from "react";

function HeaderLinks() {
  return (
    <ul className="flex items-center gap-14 text-lg text-primary-foreground font-medium">
      {["Products", "Solutions", "Resources & Support", "Shop"].map((val) => (
        <li
          key={val}
          className=" hover:underline decoration-primary-foreground underline-offset-8 cursor-pointer decoration-2"
        >
          {val}
        </li>
      ))}
    </ul>
  );
}

export default HeaderLinks;

