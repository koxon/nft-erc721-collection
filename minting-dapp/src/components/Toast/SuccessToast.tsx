import { FC, ReactElement } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Toast from "./Toast";

interface SuccessToastProps {
  text: string | ReactElement;
}

export const SuccessToast: FC<SuccessToastProps> = ({ text }) => <Toast text={text} icon={<CheckCircleIcon className="success-toast-icon" />} />;

export default SuccessToast;
