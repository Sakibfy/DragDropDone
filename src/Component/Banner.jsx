// Banner.jsx
import { Link } from "react-router-dom";
import bannerbg from "../../src/assets/App Logo with Cool Blue and Green Design.png";
import { FaLongArrowAltRight } from "react-icons/fa";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <section className="max-w-6xl mx-auto p-6 flex flex-col-reverse md:flex-row items-center gap-8">
      {/* Left – Animated Text */}
      <motion.div
        className="flex-1 text-left space-y-6"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Boost Productivity with Smart Task Management
        </h1>
        <p className="text-lg text-gray-600">
          Organize your workflow effortlessly with our intuitive Kanban‑style board.
        </p>
        <Link to="/addtask">
          <button className="inline-flex items-center gap-2 px-6 mt-5 py-3 bg-[#2c918b] text-white font-medium rounded-2xl transition">
            Get Started <FaLongArrowAltRight className="text-xl" />
          </button>
        </Link>
      </motion.div>

      {/* Right – Animated Image */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
      >
        <img
          src={bannerbg}
          alt="Banner graphic"
          className="w-full h-auto rounded-lg shadow-lg object-cover object-left lg:object-center"
        />
      </motion.div>
    </section>
  );
};

export default Banner;
