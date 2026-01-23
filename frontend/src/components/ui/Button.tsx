import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "destructive" | "secondary" | undefined;
  size?: "small" | "big" | undefined;
  onClick?: () => void;
  title?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}

export default function Button({
  children,
  className,
  onClick,
  title,
  variant,
  size,
  disabled = false,
  type = "button",
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      title={title}
      type={type}
      className={clsx(
        "flex justify-center items-center gap-2 px-6 py-3 rounded-full",
        !variant && "bg-main-purple text-white",
        variant === "destructive" && "destructive",
        variant === "secondary" && "secondary",
        size === "small" && "h-10 text-body-l",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
