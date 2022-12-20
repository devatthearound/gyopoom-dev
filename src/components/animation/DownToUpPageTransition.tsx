import { motion } from "framer-motion"

type Props = {
    children: React.ReactNode
}
const DownToUpPageTransition: React.FC<Props> = ({ children }) => {
    return (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ height: "100%" }}>
            {children}
        </motion.div>
    )
}

export default DownToUpPageTransition
