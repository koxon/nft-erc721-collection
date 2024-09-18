import { FC, ReactElement } from "react";

interface MintToastProps {
  icon?: ReactElement;
  text: string | ReactElement;
}

export const Toast: FC<MintToastProps> = ({ text, icon }) => (
  <div className="custom-toast">
    {icon}
    <div className="descriptions">
      <span className="toast-title">{text}</span>
    </div>
  </div>
);

export default Toast;
