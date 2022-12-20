import { motion } from "framer-motion"

type Props = {
    children: React.ReactNode,
    time?: number
}

const DelayShowElement: React.FC<Props> = ({ children, time }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: time ? time : 0.55 }}
        >
            {children}
        </motion.div>
    )
}

export default DelayShowElement