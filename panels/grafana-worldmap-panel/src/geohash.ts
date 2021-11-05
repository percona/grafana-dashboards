export default function decodeGeoHash(geohash) {
  if (!geohash || geohash.length === 0) {
    throw new Error('Missing geohash value');
  }
  const BITS = [16, 8, 4, 2, 1];
  const BASE32 = '0123456789bcdefghjkmnpqrstuvwxyz';
  let isEven = true;
  const lat: number[] = [];
  const lon: number[] = [];
  lat[0] = -90.0;
  lat[1] = 90.0;
  lon[0] = -180.0;
  lon[1] = 180.0;
  let base32Decoded;

  geohash.split('').forEach((item) => {
    base32Decoded = BASE32.indexOf(item);
    BITS.forEach((mask) => {
      if (isEven) {
        refineInterval(lon, base32Decoded, mask);
      } else {
        refineInterval(lat, base32Decoded, mask);
      }
      isEven = !isEven;
    });
  });
  const latCenter = (lat[0] + lat[1]) / 2;
  const lonCenter = (lon[0] + lon[1]) / 2;

  return { latitude: latCenter, longitude: lonCenter};
}

function refineInterval(interval, base32Decoded, mask) {
  /* tslint:disable no-bitwise*/
  if (base32Decoded & mask) {
    interval[0] = (interval[0] + interval[1]) / 2;
  } else {
    interval[1] = (interval[0] + interval[1]) / 2;
  }
}
