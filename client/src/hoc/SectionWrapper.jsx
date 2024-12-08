import React from "react";
import { motion } from "framer-motion";
import DivideLine from "../components/DivideLine";

const SectionWrapper = (Component, title, Icon, noDiv) =>
  function HOC(props) {
    const staggerContainer = (staggerChildren, delayChildren) => {
      return {
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerChildren,
            delayChildren: delayChildren || 0,
          },
        },
      };
    };

    return (
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.25 }}
        className="max-w-5xl mx-auto relative z-0"
      >
        <Component {...props} />
        {!noDiv && <DivideLine text={title} Icon={Icon} />}
      </motion.section>
    );
  };

export default SectionWrapper;
