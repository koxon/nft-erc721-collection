import { FC, ReactElement } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import Toast from "./Toast";

interface WarningToastProps {
  text: string | ReactElement;
}

export const WarningToast: FC<WarningToastProps> = ({ text }) => <Toast text={text} icon={<ExclamationTriangleIcon />} />;

export default WarningToast;
