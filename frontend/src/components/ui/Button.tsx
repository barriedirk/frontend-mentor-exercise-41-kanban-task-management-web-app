import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  title?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

export default function Button({
  children,
  className,
  onClick,
  title,
  type = "button",
}: ButtonProps) {
  return (
    <button
      title={title}
      type={type}
      className={clsx(
        "flex justify-center items-center gap-2 px-6 py-3 rounded-full bg-main-purple text-white",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
