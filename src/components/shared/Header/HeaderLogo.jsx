import React from "react";

const HeaderLogo = () => (
  <div className="flex justify-center items-center w-[112px] md:w-[192px] h-[34px] object-cover">
    <img
      src="amd-header-logo.svg"
      alt="AMD Logo"
      title="AMD Logo"
      width={110}
      className="hidden lg:block"
      role="img"
    />
    <img src="amd-header-logo.svg" alt="amd" className="lg:hidden" width={90} />
  </div>
);

export default HeaderLogo;
