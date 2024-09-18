import clsx from "clsx";

type MainButtonProps = {
  title: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function MainButton({ title, className, onClick, disabled }: MainButtonProps) {
  return (
    <button className={clsx(`main-button , ${className}  `, { disabled: disabled })} onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
}
