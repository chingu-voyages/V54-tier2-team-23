import { AnimationProps, Input } from "@/type";
import { easeInOut } from "motion";
import { motion } from "motion/react";

const variants = {
	hidden: { opacity: 0, y: 50, scale: 0.95, rotateX: -10 },
	visible: {
		opacity: 1,
		y: 0,
		rotateX: 0,
		transition: { duration: 0.8, delay: 0.2, easeInOut },
	},
};

export default function AnimationContainer({
	children,
	input,
	idx,
}: AnimationProps) {
	return (
		<motion.div
			key={input.title}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: false, amount: 0.5 }}
			variants={variants}
			// className={`${
			//   idx === 0 ? "h-[90vh]" : "h-[100vh]"
			// } w-full flex flex-col justify-center`}

			className="w-full h-[100vh]"
			ref={input.inputRef}
		>
			{children}
		</motion.div>
	);
}
