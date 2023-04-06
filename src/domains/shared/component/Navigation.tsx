import { centeredStyle } from "@/styles/sharedStyles";
import { css } from "@emotion/react";
import GameIcon from "public/icons/CodeSandboxOutlined.svg";
import NotiIcon from "public/icons/BellOutlined.svg";
import UnionIcon from "public/icons/CrownOutlined.svg";
import ProfileIcon from "public/icons/UserOutlined.svg";
import GhostButton from "./GhostButton";
import useRouting from "../hooks/useRouting";
import IconWithText from "./IconWithText";
import { useRouter } from "next/router";

export default function Navigation() {
  const moveTo = useRouting("push");
  const router = useRouter();
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
            <IconWithText
              color={router.pathname === "/game" ? "#4B7FF0" : "#000000"}
              icon={
                <GameIcon
                  fill={router.pathname === "/game" ? "#4B7FF0" : "black"}
                />
              }
              bottomText="Game"
            />
          </GhostButton>
          <GhostButton onClick={() => moveTo("/notification")}>
            <IconWithText
              color={
                router.pathname === "/notification" ? "#4B7FF0" : "#000000"
              }
              icon={
                <NotiIcon
                  fill={
                    router.pathname === "/notification" ? "#4B7FF0" : "black"
                  }
                />
              }
              bottomText="Noti"
            />
          </GhostButton>
          <GhostButton onClick={() => moveTo("/union")}>
            <IconWithText
              color={router.pathname === "/union" ? "#4B7FF0" : "#000000"}
              icon={
                <UnionIcon
                  fill={router.pathname === "/union" ? "#4B7FF0" : "black"}
                />
              }
              bottomText="Union"
            />
          </GhostButton>
          <GhostButton onClick={() => moveTo("/")}>
            <IconWithText
              color={router.pathname === "/" ? "#4B7FF0" : "#000000"}
              icon={
                <ProfileIcon
                  fill={router.pathname === "/" ? "#4B7FF0" : "black"}
                />
              }
              bottomText="Profile"
            />
          </GhostButton>
        </nav>
      </section>
    </footer>
  );
}
