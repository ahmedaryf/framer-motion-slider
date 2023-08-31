import { useState } from "react";
import Left from "../../public/left.svg";
import Right from "../../public/right.svg";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";

// Array of image paths
const images = ["/image1.jpg", "/image2.jpg", "/image3.jpg"];

export default function Home() {
  // State to keep track of the current image index
  const [current, setCurrent] = useState(0);

  // State to manage hover focus on image container
  const [isFocus, setIsFocus] = useState(false);

  // Function to navigate to previous image
  const onPrevClick = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  // Function to navigate to next image
  const onClick = () => {
    if (current < images.length - 1) {
      setCurrent(current + 1);
    }
  };

  return (
    <main className='flex flex-col items-center justify-between p-24'>
      {/* Framer Motion configuration for transitions */}
      <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
        <div className='relative w-full max-w-[1000px] flex items-center'>
          {/* Presence of navigation buttons */}
          <AnimatePresence>
            {isFocus && (
              <motion.div
                onHoverStart={() => setIsFocus(true)}
                onHoverEnd={() => setIsFocus(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className='absolute left-2 right-2 flex justify-between z-20'>
                <button onClick={onPrevClick}>
                  <Left className='h-8 w-8' />
                </button>
                <button onClick={onClick}>
                  <Right className='h-8 w-8' />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Container for sliding images */}
          <motion.div
            className='flex flex-nowrap gap-4'
            animate={{ x: `calc(-${current * 100}% - ${current}rem)` }}
            onHoverStart={() => setIsFocus(true)}
            onHoverEnd={() => setIsFocus(false)}>
            {images.map((image, index) => (
              <motion.img
                animate={{ opacity: index === current ? 1 : 0.3 }}
                key={index}
                src={image}
                alt='Image'
                className='object-cover aspect-[16/9]'
              />
            ))}
          </motion.div>

          {/* Image indicator buttons */}
          <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2'>
            <div className='flex gap-3 px-3 py-2 bg-gray-400 opacity-80 rounded-full'>
              {images.map((_, index) => (
                <button key={index} onClick={() => setCurrent(index)}>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      index === current ? "bg-white" : "bg-slate-500"
                    }`}></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </MotionConfig>
    </main>
  );
}
