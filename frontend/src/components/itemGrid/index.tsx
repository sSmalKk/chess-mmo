import React, { useState, useEffect } from 'react';
import SlotItem from 'components/Itemholder';

interface EquippedItem {
  name: string;
  value: number;
  x: number;
  y: number;
  img: string;
  innerimg: string;
  storage: {
    name: string;
    value: number;
    x: number;
    y: number;
    img: string;
  }[];
}

interface Props {
  equippedItems: EquippedItem[];
  hasClose: boolean;
  onCloseButtonClick?: () => void;
}

const InventoryGrid: React.FC<Props> = ({ equippedItems, hasClose, onCloseButtonClick }) => {
  const [, setShowEmptyGrid] = useState(false);
  const [, setClickedItemIndex] = useState(-1);

  useEffect(() => {
    // Definindo o index assim que o componente aparecer na tela
    setClickedItemIndex(0);
  }, []); // executar somente na montagem do componente

  const handleEmptyGridClose = () => {
    if (onCloseButtonClick) {
      onCloseButtonClick(); // Chama a função de retorno de chamada fornecida pelo componente pai, se existir
    }
  };

  return (
    <>
      <div className='flex flex-wrap'>
        {equippedItems.map((equippedItem, index) => (
          <div key={index} className="flex justify-center items-center">
            <div
              className={`border border-solid border-black-900 overflow-hidden overflow-y-auto`}
              style={{
                background: equippedItem.innerimg.startsWith("#")
                  ? equippedItem.innerimg
                  : `url(${equippedItem.innerimg})`,
                backgroundRepeat: equippedItem.innerimg.startsWith("#") ? 'repeat' : 'no-repeat',
                maxHeight: '300px',
                width: `${equippedItem.y * 32}px`, // Define a largura do contêiner com base no tamanho dos itens
              }}
            >
              <div className={`grid grid-cols-${equippedItem.y}`}>
                {/* Render empty slots for equipped items */}
                {Array.from({ length: equippedItem.x * equippedItem.y }, (_, i) => {
                  const storedItem = equippedItem.storage.find(item => item.x === i % equippedItem.x && item.y === Math.floor(i / equippedItem.x));
                  return (
                    <div key={i} style={{maxWidth:'32px'}}>
                      {storedItem ? (
                        <SlotItem
                          id={storedItem.name}
                          color={'#5555ff'}
                          title={''}
                          text={storedItem.name}
                          number={storedItem.value}
                          img={storedItem.img}
                          imgHolder={''}
                          imageSize={32}
                          holderSize={32}
                          config={{
                            data: [],
                            textPosition: 'none',
                            showNumber: true,
                            showId: true,
                            showHolder: true,
                            border: true,
                            borderColor: '#ff55ff',
                            hoverEffect: 'right'
                          }}
                          onClick={function (): void {
                            throw new Error('Function not implemented.');
                          }} />
                      ) : (
                        <SlotItem
                          id={''}
                          color={''}
                          title={''}
                          text={''}
                          number={0}
                          img={'/images/default_image.svg'}
                          imgHolder={'empty'}
                          imageSize={32}
                          holderSize={32}
                          config={{
                            data: [],
                            textPosition: 'none',
                            showNumber: true,
                            showId: true,
                            showHolder: true,
                            border: false,
                            borderColor: '#ffff55',
                            hoverEffect: 'right'
                          }}
                          onClick={function (): void {
                            throw new Error('Function not implemented.');
                          }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            {hasClose && <button onClick={handleEmptyGridClose} className="mt-4 p-2 bg-gray-300 hover:bg-gray-400">Close</button>}
          </div>
        ))}
      </div>
    </>
  );
}

export default InventoryGrid;