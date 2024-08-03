import InventoryGrid from 'components/itemGrid';
import SlotItem from 'components/Itemholder';
import React from 'react';

interface   bottommid{
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
interface   bottomleft{
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
interface   bottomright{
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
interface   topmid{
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

interface   topright{
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

interface   topleft{
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
  topleft: topleft[];
  topright: topright[];
  topmid: topmid[];
  bottomleft: bottomleft[];
  bottommid: bottommid[];
  bottomright: bottomright[];

}

const Inventory: React.FC<Props> = ({ bottomleft,bottomright,bottommid,topleft,topright,topmid}) => {
  return (
    <div> {/* Adiciona uma classe para estilização */}
      <div style={{justifyContent:'center'}} className="bg-white border border-solid border-black-900 flex">
      <InventoryGrid equippedItems={topleft} hasClose={false} />
      <InventoryGrid  equippedItems={topmid} hasClose={false} />
      <InventoryGrid equippedItems={topright} hasClose={false} />
      </div>
      <div style={{justifyContent:'center'}} className="bg-white border border-solid border-black-900 flex">
      <InventoryGrid equippedItems={bottomleft} hasClose={false} />
      <InventoryGrid equippedItems={bottommid} hasClose={false} />
      <InventoryGrid equippedItems={bottomright} hasClose={false} />
      </div>
    </div>
  );
}

export default Inventory;
