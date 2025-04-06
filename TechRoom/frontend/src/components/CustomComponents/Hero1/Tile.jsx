import React from "react";
import { motion } from "framer-motion";

function Tile() {
  return (
    <motion.div
      className="aspect-square rounded-md border -skew-y-6 border-dashed border-neutral-200 transition-colors hover:bg-cyan-200 "
    />
  );
}

export default Tile;
