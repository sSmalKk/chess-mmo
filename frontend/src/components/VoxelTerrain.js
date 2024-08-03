import React from 'react';
import Chunk from './Chunk';
import VoxelCube from './VoxelCube';

const VoxelTerrain = ({ chunks = [], textures, clusterWidth, fullrender }) => {
  console.log('VoxelTerrain props:', { chunks, textures, clusterWidth });

  return (
    <group>
      {fullrender ? (
        chunks.map((chunk, index) => (
          <Chunk
            key={index}
            position={chunk.position}
            cubesArray={chunk.cubesArray}
            textures={textures}
            clusterWidth={clusterWidth}
          />
        ))
      ) : (
        chunks.map((chunk, index) => (
          <VoxelCube
            key={index}
            position={chunk.position}
            cubesArray={chunk.cubesArray}
            textures={textures}
            clusterWidth={clusterWidth*10}
          />
        ))
      )}
    </group>
  );
};

export default VoxelTerrain;
