/**
 * Common Motion Props Reference
 * 
 * Animation Props:
 * - initial: Starting state (e.g., { opacity: 0 })
 * - animate: Target state (e.g., { opacity: 1 })
 * - exit: State when component is removed (requires AnimatePresence)
 * - transition: Configuration object for animation timing
 *   {
 *     duration: number (seconds),
 *     delay: number (seconds),
 *     ease: string ("linear", "easeIn", "easeOut", "easeInOut"),
 *     type: string ("tween", "spring", "inertia")
 *   }
 * 
 * Gesture Props:
 * - whileHover: Animation state during hover
 * - whileTap: Animation state during tap/click
 * - whileFocus: Animation state during focus
 * - whileDrag: Animation state during drag
 * - whileInView: Animation state when in viewport
 * 
 * Layout Props:
 * - layout: Boolean to enable layout animations
 * - layoutId: String to enable shared layout animations
 * 
 * Example:
 * <motion.div
 *   initial={{ opacity: 0 }}
 *   animate={{ opacity: 1 }}
 *   transition={{ duration: 0.5 }}
 *   whileHover={{ scale: 1.1 }}
 *   whileTap={{ scale: 0.9 }}
 *   layout
 * />
 */

/**
 * Motion animation variants for text elements
 * Uses Framer Motion's animation capabilities
 * @param {number} delay - The delay before animation starts (in seconds)
 * @returns {Object} Animation variants object with 'hidden' and 'show' states
 * Example usage:
 * <motion.text
 *   variants={textVariant(0.5)}
 *   initial="hidden"
 *   animate="show"
 * />
 */
export const textVariant = (delay) => {
    return {
      hidden: {
        y: -50,
        opacity: 0,
      },
      show: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          duration: 1.25,
          delay: delay,
        },
      },
    };
  };
  
  /**
   * Creates a fade-in animation from a specified direction
   * @param {string} direction - The direction of fade ("left", "right", "up", "down")
   * @param {string} type - Animation type (e.g., "spring", "tween")
   * @param {number} delay - Delay before animation starts
   * @param {number} duration - Duration of the animation
   * @returns {Object} Animation variants object
   * Example usage:
   * <motion.div
   *   variants={fadeIn("left", "spring", 0.5, 1)}
   *   initial="hidden"
   *   animate="show"
   * />
   */
  export const fadeIn = (direction, type, delay, duration) => {
    return {
      hidden: {
        x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
        y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
        opacity: 0,
      },
      show: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          type: type,
          delay: delay,
          duration: duration,
          ease: "easeOut",
        },
      },
    };
  };
  
  /**
   * Creates a zoom-in animation effect
   * @param {number} delay - Delay before animation starts
   * @param {number} duration - Duration of the animation
   * @returns {Object} Animation variants object
   * Example usage:
   * <motion.div
   *   variants={zoomIn(0.5, 1)}
   *   initial="hidden"
   *   animate="show"
   * />
   */
  export const zoomIn = (delay, duration) => {
    return {
      hidden: {
        scale: 0,
        opacity: 0,
      },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          type: "tween",
          delay: delay,
          duration: duration,
          ease: "easeOut",
        },
      },
    };
  };
  
  /**
   * Creates a slide-in animation from a specified direction
   * @param {string} direction - The direction to slide from ("left", "right", "up", "down")
   * @param {string} type - Animation type (e.g., "spring", "tween")
   * @param {number} delay - Delay before animation starts
   * @param {number} duration - Duration of the animation
   * @returns {Object} Animation variants object
   * Example usage:
   * <motion.div
   *   variants={slideIn("left", "tween", 0.5, 1)}
   *   initial="hidden"
   *   animate="show"
   * />
   */
  export const slideIn = (direction, type, delay, duration) => {
    return {
      hidden: {
        x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
        y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
      },
      show: {
        x: 0,
        y: 0,
        transition: {
          type: type,
          delay: delay,
          duration: duration,
          ease: "easeOut",
        },
      },
    };
  };
  
  /**
   * Creates a stagger effect for child elements animation
   * @param {number} staggerChildren - Delay between each child animation
   * @param {number} delayChildren - Initial delay before children start animating
   * @returns {Object} Animation variants object
   * Example usage:
   * <motion.div
   *   variants={staggerContainer(0.1, 0.5)}
   *   initial="hidden"
   *   animate="show"
   * >
   *   {children} // Each child should have its own variants
   * </motion.div>
   */
  export const staggerContainer = (staggerChildren, delayChildren) => {
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