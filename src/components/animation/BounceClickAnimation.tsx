import { motion } from "framer-motion"
import React from "react"

type Props = {
    children: React.ReactNode
}
const BounceClickAnimation: React.FC<Props> = ({ children }) => {
    return (
        <motion.div
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}>
            {children}
        </motion.div>
    )
}

export default BounceClickAnimation