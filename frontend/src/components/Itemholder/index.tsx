import React from "react";

interface ItemProps {
  className?: string;
  id: string;
  color: string;
  title: string;
  text: string;
  number: number;
  img: string;  
  imgHolder: string;  
  imageSize: number;
  holderSize: number;  
  config: {
    data: Location[];  // Atualizado para receber uma array de locais
    textPosition: 'bottom' | 'top' | 'left' | 'right'|'none';
    showNumber: boolean;
    showId: boolean;
    showHolder: boolean;
    border: boolean;    
    borderColor: string;
    hoverEffect: 'bottom' | 'top' | 'left' | 'right'|'none';
  };
  onClick: (location: Location) => void; // Atualizado para enviar um objeto de localização
}

const SlotItem: React.FC<ItemProps> = ({ color, className, text, number, img, imgHolder = "", imageSize, holderSize = 0, config }) => {
  const imageSrc = img || "images/default_image.svg";
  const imageHolderSrc = imgHolder || "images/default_image.svg";

  const borderStyle = config.border ? `2px solid ${config.borderColor}` : 'none';
  if (imgHolder === '' || imgHolder === null) {
    if (holderSize === 0 || holderSize === null) {
      return (
        <div style={{ color: `${color}`, width: `${imageSize}px`, height: `(${imageSize})px` }}>
                    {config.textPosition === 'top' && (<p>{text}</p>)}

          <div style={{ color: `${color}`, backgroundImage: `url(${imageSrc})`, maxWidth: `${imageSize}px`, maxHeight: `${imageSize}px`,minWidth: `${imageSize}px`, minHeight: `${imageSize}px`, backgroundSize: 'contain', border: borderStyle }}>
          </div>
          {config.textPosition === 'top' && (<p>{text}</p>)}
        </div>
      );
    } else {
      return (
        <div style={{ color: `${color}`, maxWidth: `${holderSize}px`, maxHeight: `${holderSize}px` , minWidth: `${holderSize}px`, minHeight: `${holderSize}px` }}>
        
        {config.textPosition === 'top' && (<p>{text}</p>)}

          <div style={{ color: `${color}`, backgroundImage: `url(${imageSrc})`, maxWidth: `${imageSize}px`, maxHeight: `${imageSize}px`, minWidth: `${imageSize}px`, minHeight: `${imageSize}px`, backgroundSize: 'contain', border: borderStyle }}>
          </div>
          {config.textPosition === 'bottom' && (<p>{text}</p>)}
        </div>  
      );
    }
  }
  else {
    if (holderSize === 0 || holderSize === null) {
      return (
        <div style={{ color: `${color}`, backgroundImage: `url(${imageHolderSrc})`, maxWidth: `${imageSize}px`, maxHeight: `${imageSize}px` , minWidth: `${imageSize}px`, minHeight: `${imageSize}px` }}>
                {config.textPosition === 'top' && (<p>{text}</p>)}

          <div style={{ color: `${color}`, backgroundImage: `url(${imageSrc})`, maxWidth: `${imageSize}px`, maxHeight: `${imageSize}px`, minWidth: `${imageSize}px`, minHeight: `${imageSize}px`, backgroundSize: 'contain', border: borderStyle }}>
          </div>
          {config.textPosition === 'bottom' && (<p>{text}</p>)}
        </div>
      );
    } else {
      return (
        <div style={{ color: `${color}`, backgroundImage: `url(${imageHolderSrc})`, maxWidth: `${holderSize}px`, maxHeight: `${holderSize}px`,minWidth: `${holderSize}px`, minHeight: `${holderSize}px`, backgroundSize: 'contain' }}>
                             {config.textPosition === 'top' && (<p>{text}</p>)}

          <div style={{ backgroundImage: `url(${imageSrc})`, maxWidth: `${imageSize}px`, maxHeight: `${imageSize}px`,minWidth: `${imageSize}px`, minHeight: `${imageSize}px`, backgroundSize: 'contain', border: borderStyle }}>
          </div>
          {config.textPosition === 'bottom' && (<p>{text}</p>)}


       </div>
      );
    }
  }
};

export default SlotItem;