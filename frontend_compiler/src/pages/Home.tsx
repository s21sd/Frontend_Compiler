import Lottie from "lottie-react";
import Animation from "../assets/Animation - 1711031548093.json"
import { motion } from 'framer-motion';
import { transition1 } from "./Transition";
export const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition1} className="w-full text-white flex justify-between items-center mt-8 gap-3">

      <motion.div
        initial={{ opacity: 0, x: '-50%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, y: '-50%' }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
      >
        <h1 className="text-6xl font-bold text-center">Frontend Compiler</h1>
        <p className=" text-gray-500 text-center m-2 ml-4">
          Compiler HTML, CSS, JavaScript Code on the go and share it with your
          friends...
        </p>
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 ">
        <Lottie animationData={Animation} loop={true} />
      </motion.div>
    </motion.div>
  )
}
