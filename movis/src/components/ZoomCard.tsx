import React, { useState } from "react";
import Modal from "./Modal";
import { ImEnlarge, ImShrink } from "react-icons/im";

interface IProps {
  title?: string;
  children?: React.ReactNode;
}

const ZoomCard: React.FC<IProps> = (props) => {
  const [isZoom, setIsZoom] = useState(false);

  const Header = () => {
    return (
      <div className="flex items-center justify-between">
        <h3 className="font-bold">{props.title}</h3>
        <button onClick={() => setIsZoom((prev) => !prev)}>
          {isZoom ? <ImShrink /> : <ImEnlarge />}
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 text-lg text-white hover:bg-white/20">
        <Header />
        {props.children}
      </div>
      <Modal isOpen={isZoom} setIsOpen={setIsZoom}>
        <div className="flex flex-col gap-4 rounded-xl bg-gray-500 p-4 text-2xl text-white hover:bg-gray-400">
          <Header />
          Larger Children Data Here
          {props.children}
        </div>
      </Modal>
    </>
  );
};

export default ZoomCard;
