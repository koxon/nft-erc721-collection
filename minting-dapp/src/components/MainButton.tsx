type MainButtonProps = {
  title: string;
  className?: string;
  onClick?: () => void;
};

export default function MainButton({ title, className, onClick }: MainButtonProps) {
  return (
    <button className={`main-button , ${className}`} onClick={onClick}>
      {title}
    </button>
  );
}
