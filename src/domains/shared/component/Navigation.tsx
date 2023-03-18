import { centeredStyle } from "@/styles/sharedStyles";
import { css } from "@emotion/react";
import GameIcon from "public/icons/CodeSandboxOutlined.svg";
import NotiIcon from "public/icons/BellOutlined.svg";
import UnionIcon from "public/icons/CrownOutlined.svg";
import ProfileIcon from "public/icons/UserOutlined.svg";
import IconButton from "./IconButton";
import { useRouter } from "next/router";
import useRouting from "../hooks/useRouting";

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
          <IconButton
            icon={<GameIcon />}
            text="Game"
            onClick={() => moveTo("/game")}
          />
          <IconButton
            icon={<NotiIcon />}
            text="Noti"
            onClick={() => moveTo("/notification")}
          />
          <IconButton
            icon={<UnionIcon />}
            text="Union"
            onClick={() => moveTo("/union")}
          />
          <IconButton
            icon={<ProfileIcon />}
            text="Profile"
            onClick={() => moveTo("myprofile")}
          />
        </nav>
      </section>
    </footer>
  );
}
