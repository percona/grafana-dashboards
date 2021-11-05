import d3 from 'd3';

const RGB = 'RGB';
const HSL = 'HSL';
const HCL = 'HCL';
const LAB = 'LAB';
const CUBEHELIX = 'CUBEHELIX';

export const colorSpacesMap = [
  { name: 'RGB', value: RGB },
  { name: 'HSL', value: HSL },
  { name: 'HCL', value: HCL },
  { name: 'Lab', value: LAB },
  { name: 'Cubehelix', value: CUBEHELIX }
];

export const interpolationMap = {
  [RGB]: d3.interpolateRgb,
  [HSL]: d3.interpolateHsl,
  [HCL]: d3.interpolateHcl,
  [LAB]: d3.interpolateLab,
  [CUBEHELIX]: d3.interpolateCubehelix
};

export default {
  RGB,
  HSL,
  HCL,
  LAB,
  CUBEHELIX
};