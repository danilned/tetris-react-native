import React from "react";
import TetrisContainer from "@src/components/Tetris/TetrisContainer";
import Score from "./Score/Score";
import Modal from "./Modals/Modal";

function Layout() {
  return (
    <>
      <Score />
      <TetrisContainer />
      <Modal />
    </>
  );
}

export default Layout;
