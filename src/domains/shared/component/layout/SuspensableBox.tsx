import { forwardRef, HTMLAttributes, ReactNode, Ref, Suspense } from "react";
import Spinner from "../Spinner";
import Box from "./Box";

interface SuspensableBoxProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  fallback?: ReactNode;
  title?: string;
}

function SuspensableBox(
  { children, fallback = <Spinner />, ...args }: SuspensableBoxProps,
  ref: Ref<HTMLDivElement>
) {
  return (
    <Box ref={ref} {...args}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </Box>
  );
}

export default forwardRef(SuspensableBox);
