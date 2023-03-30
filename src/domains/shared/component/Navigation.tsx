import { centeredStyle } from "@/styles/sharedStyles";
import { css } from "@emotion/react";
import GameIcon from "public/icons/CodeSandboxOutlined.svg";
import NotiIcon from "public/icons/BellOutlined.svg";
import UnionIcon from "public/icons/CrownOutlined.svg";
import ProfileIcon from "public/icons/UserOutlined.svg";
import IconButton from "./IconButton";
import { useRouter } from "next/router";
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
          <IconButton onClick={() => moveTo("/game")}>
            <IconWithText icon={GameIcon} bottomText="Game" />
          </IconButton>
          <IconButton onClick={() => moveTo("/notification")}>
            <IconWithText icon={NotiIcon} bottomText="Noti" />
          </IconButton>
          <IconButton onClick={() => moveTo("/union")}>
            <IconWithText icon={UnionIcon} bottomText="Union" />
          </IconButton>
          <IconButton onClick={() => moveTo("/")}>
            <IconWithText icon={ProfileIcon} bottomText="Profile" />
          </IconButton>
        </nav>
      </section>
    </footer>
  );
}
