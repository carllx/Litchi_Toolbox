import { PObj } from "../sample/GES/clipboard.js";
const outputCSVFilePath = "sample/GES/clipboard_OUT.csv";
import { parseCsv, parseJsonToCSV } from "../utitls/csvParse.js";

const AltitudeOffTakeOff = 41;
const adjustMSLBetweenStudioAndPro = 4

const toCSV = async (elev) => {
  // read the source to JSON
  const kfs = PObj["clipboard"]["keyframes"];

  // type:rotationY (0° - 180°)
  // Studio:Tilt/ Gimbal Pitch (30° - -90°)
  const Pitchs = kfs
    .filter((o) => o.type === "rotationY")
    .map((o) => map_range(o.absoluteValue % 360, 0, 180, -90,90));// (-90,30)

  // type:rotationX (-∞° - ∞°)
  // Studio:Pan/ Heading (0° - 360°)
  const Headings = kfs
    .filter((o) => o.type === "rotationX")
    .map((o) => {
      let v = o.absoluteValue % 360;
      if (v < 0) return 360 + v;
      return v;
    });

  // type:altitude
  // maxValueRange: 65117481
  // minValueRange: 1
  const Altitudes = kfs
    .filter((o) => o.type === "altitude")
    .map((o) => o.absoluteValue - elev);

  // type:latitude
  const Lat = kfs
    .filter((o) => o.type === "latitude")
    .map((o) => o.absoluteValue);
  // type:longitude
  const Lon = kfs
    .filter((o) => o.type === "longitude")
    .map((o) => o.absoluteValue);
  // to csv
  let CSV = [];
  for (let i = 0; i < Lat.length; i++) {
    const element = Lat[i];
    const o = {
      latitude: Lat[i],
      longitude: Lon[i],

      "altitude(m)": Altitudes[i].toFixed(1),
      "heading(deg)": Headings[i].toFixed(), // 没有小数点
      "curvesize(m)": 0,
      rotationdir: 0, //0 for clockwise, 1 for counterclockwise
      gimbalmode: 2, //0 for disabled, 1 for focus poi, 2 for interpolate

      gimbalpitchangle: Pitchs[i].toFixed(), // 没有小数点

      // -------- 固定参数 ------------

      actiontype1: -1,
      actionparam1: 0,
      actiontype2: -1,
      actionparam2: 0,
      actiontype3: -1,
      actionparam3: 0,
      actiontype4: -1,
      actionparam4: 0,
      actiontype5: -1,
      actionparam5: 0,
      actiontype6: -1,
      actionparam6: 0,
      actiontype7: -1,
      actionparam7: 0,
      actiontype8: -1,
      actionparam8: 0,
      actiontype9: -1,
      actionparam9: 0,
      actiontype10: -1,
      actionparam10: 0,
      actiontype11: -1,
      actionparam11: 0,
      actiontype12: -1,
      actionparam12: 0,
      actiontype13: -1,
      actionparam13: 0,
      actiontype14: -1,
      actionparam14: 0,
      actiontype15: -1,
      actionparam15: 0,
      altitudemode: 0, //0 for AboveTakeOff or 1 for AboveGround
      "speed(m/s)": 0, // 巡航速度
      poi_latitude: 0,
      poi_longitude: 0,
      "poi_altitude(m)": 0,
      poi_altitudemode: 0, //0 for AboveTakeOff or 1 for AboveGround
      photo_timeinterval: -1,
      photo_distinterval: -1,
    };
    CSV.push(o);
  }

  parseJsonToCSV(CSV, outputCSVFilePath);
};
const map_range = (value, low1, high1, low2, high2) => {
//   return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
  return (((value - low1) * (high2 - low2)) / (high1 - low1)) + low2;
};

// // test sample tan.ai
// const poiA = [222.5 ,279.5 ]
// const poi00 = [89,442]
// const Radius = 100
// console.log( angleCutIn (poiA,poi00,Radius))

//
toCSV(AltitudeOffTakeOff); //Radius,Shots
