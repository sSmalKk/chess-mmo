import React, { useMemo } from 'react';
import * as THREE from 'three';

const VoxelCube = ({ position, type, textures, id, clusterWidth, hasCubeLeft,
  hasCubeRight,
  hasCubeBottom,
  hasCubeFront,
  hasCubeBack }) => {
  const material = useMemo(() => new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load(textures[id]) }), [textures, id]);

  const geometry = useMemo(() => {
    let geom;
    switch (type) {
      case 'stairs':
        geom = new THREE.BufferGeometry();
        const vertices = new Float32Array([
          0, 0, 0,
          1, 0, 0,
          1, 1, 0,
          0, 1, 0,
          0, 1, 1,
          1, 1, 1,
          1, 0, 1,
          0, 0, 1,
        ]);
        const indices = [
          0, 1, 2, 0, 2, 3,
          4, 5, 6, 4, 6, 7,
          2, 1, 5, 2, 5, 4,
          3, 2, 4, 3, 4, 7,
          0, 3, 7, 0, 7, 6,
          1, 0, 6, 1, 6, 5
        ];
        geom.setIndex(indices);
        geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geom.computeVertexNormals();
        break;
      case 'circle':
        geom = new THREE.CircleGeometry(1, 32);
        break;
      default:
        geom = new THREE.BoxGeometry(1, 1, 1);
        break;
    }
    return geom;
  }, [type]);

  const edges = useMemo(() => {
    const edgesGeom = new THREE.EdgesGeometry(geometry);
    const edgesPositions = edgesGeom.attributes.position.array;
    const edgeVectors = [];
    for (let i = 0; i < edgesPositions.length; i += 3) {
      edgeVectors.push(new THREE.Vector3(edgesPositions[i], edgesPositions[i + 1], edgesPositions[i + 2]));
    }
    return edgeVectors;
  }, [geometry]);

  const lines = useMemo(() => {
    const lineMaterial = new THREE.LineBasicMaterial({ color: 'black' });
    const lineGeometries = [];
    for (let i = 0; i < edges.length; i += 2) {
      const lineGeom = new THREE.BufferGeometry().setFromPoints([edges[i], edges[i + 1]]);
      lineGeometries.push(
        <line key={i} geometry={lineGeom} material={lineMaterial} />
      );
    }
    return lineGeometries;
  }, [edges]);

  return (
    <group scale={clusterWidth} position={position}>
      <mesh geometry={geometry} material={material} />
      {lines}
    </group>
  );
};

export default VoxelCube;
