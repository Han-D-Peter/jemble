import { css } from "@emotion/react";
import Box from "./layout/Box";
import Spinner from "./Spinner";

export default function SpinnerBox() {
  return (
    <Box>
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <Spinner size="lg" />
      </div>
    </Box>
  );
}
