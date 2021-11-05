import d3 from 'd3';

export default function(scheme) {
  return d3.interpolateRgbBasis(scheme[scheme.length - 1]);
}
