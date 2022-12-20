import { motion } from "framer-motion"
import React from "react"

type Props = {
    children: React.ReactNode
}
const DefaultPageTransition: React.FC<Props> = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ height: "100%" }}>
            {children}
        </motion.div>
    )
}

export default DefaultPageTransition