import Lottie from "lottie-react";
import Animation from "../assets/Animation - 1711031548093.json"
export const Home = () => {
  return (
    <div className="w-full text-white flex justify-between items-center mt-8 gap-3">
      <div>
        <h1 className="text-6xl font-bold text-center">Frontend Compiler</h1>
        <p className=" text-gray-500 text-center m-2 ml-4">
          Compiler HTML, CSS, JavaScript Code on the go and share it with your
          friends...
        </p>
      </div>
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 ">
        <Lottie animationData={Animation} loop={true} />
      </div>
    </div>
  )
}
