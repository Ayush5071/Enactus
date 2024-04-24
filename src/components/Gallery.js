import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import projectsData from "./data.json"; // Importing the data.json file

const Gallery = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const imagesPerPage = 8;
  const totalPages = Math.ceil(projectsData.projects.length / imagesPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className="w-screen bg-white" id="gallery">
      <motion.div>
        <div className="flex items-center justify-center h-[100px] ">
          <h1 className="text-7xl bebas">Gallery</h1>
        </div>
        <div className="flex flex-wrap gap-5 items-center justify-center my-8">
          {projectsData.projects
            .slice(
              currentPage * imagesPerPage,
              (currentPage + 1) * imagesPerPage
            )
            .map((project, index) => (
              <figure>
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-[400px] h-[300px] object-cover bg-black rounded-md"
                />
                <figcaption>{project.name}</figcaption>
              </figure>
            ))}
        </div>
        <div className="flex p-5 justify-center mt-4">
          {currentPage > 0 && (
            <button
              onClick={prevPage}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            >
              Previous
            </button>
          )}
          {currentPage < totalPages - 1 && (
            <button
              onClick={nextPage}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            >
              Next
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Gallery;
