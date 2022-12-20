import { theme } from "@styles/theme"
import { motion } from "framer-motion"
import React from "react"

type Props = {
    children: React.ReactNode
}
const RightPageTransition: React.FC<Props> = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            style={{ height: "100%", backgroundColor: theme.color.N0 }}>
            {children}
        </motion.div>
    )
}

export default RightPageTransition