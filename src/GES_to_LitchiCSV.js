
import {PObj} from '../sample/GES/clipboard.js'
const outputCSVFilePath = '../sample/spring/clipboard_OUT.csv'
import {parseCsv,parseJsonToCSV} from   '../utitls/csvParse.js'


const createSpring = async(Radius,Shots)=>{
    // read the source to JSON
    const kfs = PObj['clipboard']['keyframes']

    // rotationY -- 
    // rotationX
    // altitude
    // latitude
    // longitude

    // to csv 
    const o_spring = springs.map(s=>{
        const latlng = tolatlng([s[0],s[1]])
        return(
            {
                ...wPOI_last,
                "latitude":latlng[1],
                "longitude":latlng[0],
                "altitude(m)":s[2].toFixed(1),
                // "heading(deg)":wPOI_last["heading(deg)"],
                // "curvesize(m)":wPOI_last["curvesize(m)"],
                // "rotationdir":wPOI_last["rotationdir"],//0 for clockwise, 1 for counterclockwise
                "gimbalmode":1,//0 for disabled, 1 for focus poi, 2 for interpolate
                // "gimbalpitchangle":wPOI_last["gimbalpitchangle"],
                "altitudemode":1,//0 for AboveTakeOff or 1 for AboveGround
                // "speed(m/s)":wPOI_last["speed(m/s)"],
                // "poi_latitude":wPOI_last['poi_latitude'],
                // "poi_longitude":wPOI_last['poi_longitude'],
                "poi_altitude(m)":alt_mid,
                "poi_altitudemode":1,//0 for AboveTakeOff or 1 for AboveGround
                // "photo_timeinterval":wPOI_last["photo_timeinterval"],
                // "photo_distinterval":wPOI_last["photo_distinterval"]
            }
        )
    })

    wPOIs = wPOIs.concat(o_spring)
    parseJsonToCSV(wPOIs,outputCSVFilePath);
    
    
}


// // test sample tan.ai
// const poiA = [222.5 ,279.5 ]
// const poi00 = [89,442]
// const Radius = 100
// console.log( angleCutIn (poiA,poi00,Radius))


//
createSpring(15,81)//Radius,Shots