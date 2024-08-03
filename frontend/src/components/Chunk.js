import React from 'react';
import VoxelCube from './VoxelCube';

const Chunk = ({ position, cubesArray, textures, clusterWidth }) => {
  return (
    <group position={position}>
      {cubesArray.map(([x, y, z, id]) => {
        const hasCubeLeft = cubesArray.some(([cx, cy, cz]) => cx === x - 1 && cy === y && cz === z);
        const hasCubeRight = cubesArray.some(([cx, cy, cz]) => cx === x + 1 && cy === y && cz === z);
        const hasCubeTop = cubesArray.some(([cx, cy, cz]) => cx === x && cy === y + 1 && cz === z);
        const hasCubeBottom = cubesArray.some(([cx, cy, cz]) => cx === x && cy === y - 1 && cz === z);
        const hasCubeFront = cubesArray.some(([cx, cy, cz]) => cx === x && cy === y && cz === z + 1);
        const hasCubeBack = cubesArray.some(([cx, cy, cz]) => cx === x && cy === y && cz === z - 1);

        return (
          <VoxelCube
            key={`${x}-${y}-${z}-${id}`} // Garante que a chave seja única combinando posição e id
            position={[x, y, z]}
            textures={textures}
            hasCubeLeft={hasCubeLeft}
            hasCubeRight={hasCubeRight}
            hasCubeTop={hasCubeTop}
            hasCubeBottom={hasCubeBottom}
            hasCubeFront={hasCubeFront}
            hasCubeBack={hasCubeBack}
            clusterWidth={clusterWidth}
            id={id}
          />
        );
      })}
    </group>
  );
};

export default Chunk;
