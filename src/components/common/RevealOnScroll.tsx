"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

export const RevealOnScroll = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      className="overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};
