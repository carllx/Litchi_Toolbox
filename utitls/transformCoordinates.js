import proj4 from 'proj4';

// from https://epsg.io/3857
const PSEUDO_MERC_DATUM = "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs";

// from https://epsg.io/4326
const WGS84_DATUM = "+proj=longlat +datum=WGS84 +no_defs";

const toNumPair=(pair)=>{
    return pair.map((n)=>Number(n))
}

const xyCoordsToLatLong = (xy_pair) => {
    xy_pair = toNumPair(xy_pair)
    return proj4(PSEUDO_MERC_DATUM, WGS84_DATUM, xy_pair);
}

const LonglatCoordsToXY = (latlong_pair) => {
    latlong_pair = toNumPair(latlong_pair)
    return proj4(WGS84_DATUM, PSEUDO_MERC_DATUM, latlong_pair);
}

const toxy = LonglatCoordsToXY
const tolatlng = xyCoordsToLatLong

export  {toxy ,tolatlng}
// const r = LonglatCoordsToXY([11.2513616,43.7751315])
// console.log(r)
