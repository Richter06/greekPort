import {motion,useScroll,useSpring} from 'motion/react'
import './ProgressBar.css'
export default function ProgressBar(){const{scrollYProgress}=useScroll();const scaleX=useSpring(scrollYProgress,{stiffness:110,damping:30,restDelta:.001});return <motion.div className="progress-bar" style={{scaleX}} aria-hidden="true"/>}