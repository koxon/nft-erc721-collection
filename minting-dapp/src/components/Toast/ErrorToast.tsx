import React, { FC } from "react";
import { XCircleIcon } from "@heroicons/react/20/solid";
import BaseToast from "./Toast";

interface ErrorToastProps {
  text: string | React.ReactElement;
}

export const ErrorToastToast: FC<ErrorToastProps> = ({ text }) => <BaseToast text={text} icon={<XCircleIcon />} />;

export default ErrorToastToast;
