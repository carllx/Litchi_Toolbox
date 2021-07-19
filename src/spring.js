const inputCSVFilePath = 'sample/spring/input.csv'
const outputCSVFilePath = 'sample/spring/out.csv'
const csv = require('csvtojson')
const CheapRuler = require('cheap-ruler')


// run()



// 计算两点连线的倾斜角
// 参考 https://blog.pfan123.com/2016/10/24/%E6%96%9C%E7%8E%87%E8%AE%A1%E7%AE%97/
const angleCutIn  = (poiA,poi00,Radius)=>{
    const angleD = Math.atan( Math.abs(poi00[1] - poiA[1])  /Math.abs(poi00[0] - poiA[0]));  //得到弧度值
    const AB =  Math.sqrt(  Math.pow(poiA[0]-poi00[0],2) +  Math.pow(poiA[1]-poi00[1],2)  )
    const angleC = Math.acos( Radius  /AB);  // 
    console.log(`angleD: ${radians_to_degrees(angleD)}`)
    console.log(`angle2: ${radians_to_degrees(angleC)+radians_to_degrees(angleD)}`)
    // const angleE = 180 - radians_to_degrees(angleC) - radians_to_degrees(angleD)
    const radiant  = Math.PI - angleC - angleD
    // const Angle = radians_to_degrees(angleE)  //获取角度值
    return radiant
}

// const angleCutIn  = (poiA,poi00,Radius)=>{
//     const angleD = Math.atan( (poi00[1] - poiA[1])  /(poi00[0] - poiA[0]));  //得到弧度值
//     const AB =  Math.sqrt(  Math.pow(poiA[0]-poi00[0],2) +  Math.pow(poiA[1]-poi00[1],2)  )
//     const angleC = Math.acos( Radius  /AB);  // 
//     console.log(`angleD: ${radians_to_degrees(angleD)}`)
//     console.log(`angle2: ${radians_to_degrees(angleC)+radians_to_degrees(angleD)}`)
//     const angleE = 180 - radians_to_degrees(angleC) - radians_to_degrees(angleD)
//     // const Angle = radians_to_degrees(angleE)  //获取角度值
//     return angleE
// }


const  radians_to_degrees = (radians)=>{
  const pi = Math.PI;
  return radians * (180/pi);
}
const  degrees_to_radians = (degrees)=>{
    const pi = Math.PI;
    return degrees * (pi/180);
}


/**
 * Height: Math.abs(Altitude_start - Altitude_end)
 * 
 * 
 * ---------
 * cut_in_angle(radiant)
 * Center [lat(x), lug(y)] 中心
 * radius 半径
 * Altitude [Altitude_start,Altitude_end] 底和高
 * 
 * 参考 Drawing a spiral https://subscription.packtpub.com/book/web_development/9781849691369/1/ch01lvl1sec16/drawing-a-spiral
 * 根据平均xy 密度内定 
 * (x)num_of_circles多少圈? 
 * (y)num_of_circle_pts每圈多少个pts 构成?
 */
 const Spring = ( Center, Altitudes,radius, num_of_Shots,cut_in_angle  )=>{
    const num_of_circle_pts = num_of_circles = Math.round(Math.sqrt(num_of_Shots))
    const actual_shots = num_of_circle_pts*num_of_circles // 实际拍摄次数
    console.log(`实际拍摄${actual_shots}次\n ${num_of_circles} (circles) x ${num_of_circle_pts} (p/t/circles))`)
    const height = Math.abs(Altitudes[0] - Altitudes[1])
    const altPerShot = height/actual_shots
    const rotPerShot = Math.PI/num_of_circle_pts; 
    let RUSULT = []
    let alt = 0;
    let ang = cut_in_angle?cut_in_angle:0
    for (let i = 0; i < actual_shots; i++) {
        alt += altPerShot
        ang += rotPerShot
        const x = Center[0] + radius * Math.cos(ang);
        const y = Center[1] + radius * Math.sin(ang);
        RUSULT.push([x,y,alt])
        
    }
    return RUSULT
}

const createSpring = async(Radius,Shots)=>{
    // read the source to JSON
    const wPOIs = await csv().fromFile(inputCSVFilePath);
    const radius_in_km = Radius / 1000

    // 切入点
    const wPOI_last = wPOIs[wPOIs.length -1]
    const poiA = [wPOI_last['latitude'],wPOI_last['longitude']]
    const poi00 = [wPOI_last['poi_latitude'],wPOI_last['poi_longitude']]
    const cut_in_ang = angleCutIn (poiA,poi00,Radius) // radiant
    const altitudes = [wPOI_last['altitude(m)'] ,wPOI_last['poi_altitude(m)']]
    
    // 计算 spring , (Center, Altitudes,radius, num_of_Shots,cut_in_angle)

    Spring(poi00,altitudes,Radius,Shots,cut_in_ang)
    // alt.toFixed(1);// 单位(m)保留小数点1位
    // lat,lug.toFixed(13) es:11.2534470866087

    var ruler = new CheapRuler(43.7, 'meters'); //calculations around latitude 35
    debugger
    
    
}


// // test sample tan.ai
// const poiA = [222.5 ,279.5 ]
// const poi00 = [89,442]
// const Radius = 100
// console.log( angleCutIn (poiA,poi00,Radius))


//
createSpring(20,150)//Radius,Shots