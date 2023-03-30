import { centeredStyle } from "@/styles/sharedStyles";
import { css } from "@emotion/react";
import GameIcon from "public/icons/CodeSandboxOutlined.svg";
import NotiIcon from "public/icons/BellOutlined.svg";
import UnionIcon from "public/icons/CrownOutlined.svg";
import ProfileIcon from "public/icons/UserOutlined.svg";
import GhostButton from "./GhostButton";
import useRouting from "../hooks/useRouting";
import IconWithText from "./IconWithText";

export default function Navigation() {
  const moveTo = useRouting("push");
  return (
    <footer>
      <section
        css={css`
          position: fixed;
          bottom: 0;
          width: 100vw;
          height: 90px;
          border-radius: 10px;
          background-color: #ffffff;
        `}
      >
        <nav
          css={[
            centeredStyle,
            css`
              height: 100%;
              justify-content: space-around;
            `,
          ]}
        >
          <GhostButton onClick={() => moveTo("/game")}>
            <IconWithText icon={<GameIcon />} bottomText="Game" />
          </GhostButton>
          <GhostButton onClick={() => moveTo("/notification")}>
            <IconWithText icon={<NotiIcon />} bottomText="Noti" />
          </GhostButton>
          <GhostButton onClick={() => moveTo("/union")}>
            <IconWithText icon={<UnionIcon />} bottomText="Union" />
          </GhostButton>
          <GhostButton onClick={() => moveTo("/")}>
            <IconWithText icon={<ProfileIcon />} bottomText="Profile" />
          </GhostButton>
        </nav>
      </section>
    </footer>
  );
}
