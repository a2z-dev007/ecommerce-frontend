"use client"
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PrimaryButtonProps extends HTMLMotionProps<'button'> {
    children: React.ReactNode;
    iconClassName?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    children,
    className,
    iconClassName,
    ...props
}) => {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "group flex items-center bg-[#6B4A2D] text-white p-1.5 pr-8 rounded-full shadow-lg hover:bg-[#5A3E25] transition-all duration-300 w-fit",
                className
            )}
            {...props}
        >
            <motion.div
                className={cn(
                    "w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#F5F1E9] flex items-center justify-center mr-5 group-hover:bg-white transition-colors duration-300",
                    iconClassName
                )}
                initial={false}
            >
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-[#6B4A2D]" />
            </motion.div>
            <span className="text-base md:text-lg font-semibold tracking-wide uppercase">{children}</span>
        </motion.button>
    );
};

export default PrimaryButton;
