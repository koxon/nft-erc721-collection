import React, { FC } from "react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import BaseToast from "./Toast";

interface InfoToastProps {
  text: string | React.ReactElement;
}

export const InfoToastToast: FC<InfoToastProps> = ({ text }) => <BaseToast text={text} icon={<InformationCircleIcon />} />;

export default InfoToastToast;
