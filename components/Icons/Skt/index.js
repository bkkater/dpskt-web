import React from "react";
import Image from "next/image";

// Resources
import SktIcon from "@/resources/skt.png";

function SktIconComponent() {
  return (
    <div className="absolute bottom-10 flex flex-col items-center gap-4">
      <Image
        src={SktIcon}
        className="w-28 self-center"
        alt="SKT city"
        priority
      />

      <span className="text-xs">DISCORD.GG/SKTCITY</span>
    </div>
  );
}

export default SktIconComponent;
