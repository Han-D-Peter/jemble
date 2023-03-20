import { css } from "@emotion/react";
import { forwardRef, HTMLAttributes, LegacyRef, ReactNode } from "react";
import { centeredStyle } from "@/styles/sharedStyles";

interface DefaultModal extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function DefaultModal(
  { children, ...args }: DefaultModal,
  ref: LegacyRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      css={[
        css`
          position: absolute;
          top: 0;
          width: 100vw;
          height: 100vh;
          background: #e8e8e882;
        `,
        centeredStyle,
      ]}
      {...args}
    >
      {children}
    </div>
  );
}

export default forwardRef(DefaultModal);
