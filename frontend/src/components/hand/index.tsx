import React, { useState } from 'react';
import SlotItem from 'components/Itemholder';

interface ItemProps {
  setShowItem: () => void; // Atualizado para enviar um objeto de localização
}

const Hand = ({ xmouse,ymouse,id, color, title, text, number, img, imgHolder, imageSize, holderSize, config, onClick, setShowItem }) => {
 
  return (
    <>
      <div >
        <div style={{ position: 'fixed', left: xmouse, top: ymouse ,zIndex:99}}>
          {setShowItem && (
            <SlotItem
              id={id}
              color={color}
              title={title}
              text={text}
              number={number}
              img={img}
              imgHolder={imgHolder}
              imageSize={imageSize}
              holderSize={holderSize}
              config={config}
              onClick={onClick}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Hand;
