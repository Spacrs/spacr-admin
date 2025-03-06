const Button = ({
  className = "",
  text,
  onClick,
  type,
}: {
  className?: string;
  text: string;
  onClick: () => void;
  type:
    | "primary"
    | "secondary"
    | "danger"
    | "warning"
    | "dark"
    | "light"
    | "lightBlue";
}) => {
  const baseStyles = `px-4 py-2 rounded-md focus:outline-none transition`;

  const typeStyles: Record<string, string> = {
    primary: "bg-primary text-white",
    secondary: "bg-gray-600 text-white",
    danger: "bg-red-600 text-white",
    warning: "bg-yellow-500 text-black",
    dark: "bg-gray-900 text-white",
    light: "bg-gray-200 text-black",
    lightBlue: "bg-lightBlue text-primary",
  };

  return (
    <button
      className={`${baseStyles} ${typeStyles[type]} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
