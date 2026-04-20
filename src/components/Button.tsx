import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./Button.module.css";

type Variant = "primary" | "ghost" | "outline";

type Props = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
};

const variantClass = {
  primary: styles.primary,
  ghost: styles.ghost,
  outline: styles.outline,
} as Record<Variant, string>;

export function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
  disabled,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${styles.base} ${variantClass[variant]} ${className}`.trim()}
      whileHover={reduce || disabled ? undefined : { scale: 1.02 }}
      whileTap={reduce || disabled ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      {children}
    </motion.button>
  );
}
