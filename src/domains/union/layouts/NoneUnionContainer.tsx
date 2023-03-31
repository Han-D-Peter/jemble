import Box from "@/domains/shared/component/layout/Box";
import ModalButton from "@/domains/shared/component/ModalButton";
import { css } from "@emotion/react";
import JoinUnionModal from "./JoinUnionModal";

const unionContainerStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const buttonContainer = css`
  display: flex;
  margin-top: 22px;
  justify-content: space-around;
  width: 100%;
`;

export default function NoneUnionContainer() {
  return (
    <Box>
      <div
        css={[
          unionContainerStyle,
          css`
            height: 195px;
            flex-direction: column;
          `,
        ]}
      >
        <div
          css={css`
            width: 100%;
          `}
        >
          <div
            css={css`
              width: 100%;
              font-size: 20px;
            `}
          >
            유니온에 소속되지 않았습니다.
          </div>
          <div css={buttonContainer}>
            <ModalButton ModalComponent={JoinUnionModal} size="lg" outline>
              가입
            </ModalButton>
            <ModalButton ModalComponent={() => <div>hello</div>} size="lg">
              개설
            </ModalButton>
          </div>
        </div>
      </div>
    </Box>
  );
}
