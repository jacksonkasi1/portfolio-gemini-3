import { motion } from 'framer-motion';

export const SectionTitle = ({ title }: { title: string }) => {
    return (
        <div className="relative mb-16 overflow-hidden">
            <div className="flex items-center gap-4">
                <motion.div
                    className="h-[1px] bg-red-600"
                    initial={{ width: 0 }}
                    whileInView={{ width: 60 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
                <motion.h2
                    className="text-4xl md:text-6xl font-medium tracking-tight uppercase text-white"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    {title}
                </motion.h2>
            </div>
        </div>
    );
};
