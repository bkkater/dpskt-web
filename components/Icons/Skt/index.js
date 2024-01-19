import React from "react";
import Image from "next/image";

// Resources
import SktIcon from "@/resources/skt.png";

function SktIconComponent() {
  return (
    <div className="skt absolute bottom-10">
      <Image
        src={SktIcon}
        className="w-28 self-center"
        alt="SKT city"
        priority
      />

      <span>DISCORD.GG/SKTCITY</span>
    </div>
  );
}

export default SktIconComponent;
