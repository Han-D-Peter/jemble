import { ReactNode, Suspense } from "react";
import Box from "./Box";

interface SuspensableBoxProps {
  children: ReactNode;
  fallback: ReactNode;
  title?: string;
}

export default function SuspensableBox({
  children,
  fallback,
  ...args
}: SuspensableBoxProps) {
  return (
    <Box {...args}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </Box>
  );
}
