const inputCSVFilePath = 'sample/spring/input.csv'
const outputCSVFilePath = 'sample/spring/out.csv'
const csv=require('csvtojson')

const run = async()=>{
    // read the source to JSON
    const wps = await csv().fromFile(inputCSVFilePath);
    const wp_last = wps[wps.length -1]
    const center = [wp_last['latitude'],wp_last['longitude']]
    spring(center,300)
    
    
}
// run()
/**
 * (x)numOfCircles多少圈? 
 * (y)numOfCirclePts每圈多少个pts 构成?
 * Height: Math.abs(Altitude_start - Altitude_end)
 * 
 * 
 * ---------
 * 
 * Center [lat(x), lug(y)] 中心
 * radius 半径
 * Altitude [Altitude_start,Altitude_end]
 * 
 */
const Spring = (Center, Altitude, numOfShots, radius )=>{
    const numOfCirclePts = numOfCircles = Math.round(Math.sqrt(numOfShots))
    const shots = numOfCirclePts*numOfCircles
    console.log(`共次拍摄${shots}次`)
    const height = Math.abs(Altitude[0] - Altitude[1])

    const altPerShot = (height/shots).toFixed(1);// 单位(m)保留小数点1位
    for (let i = 0; i < shots; i++) {
        debugger
        
    }
}


// 计算两点连线的倾斜角
// 参考 https://blog.pfan123.com/2016/10/24/%E6%96%9C%E7%8E%87%E8%AE%A1%E7%AE%97/
const tanAngle = (pA,pB,Radius)=>{
    const angleD = Math.atan( Math.abs(pB[1] - pA[1])  /Math.abs(pB[0] - pA[0]));  //得到弧度值
    const AB =  Math.sqrt(  Math.pow(pA[0]-pB[0],2) +  Math.pow(pA[1]-pB[1],2)  )
    const angleC = Math.acos( Radius  /AB);  // 
    console.log(`angleD: ${radians_to_degrees(angleD)}`)
    console.log(`angle2: ${radians_to_degrees(angleC)+radians_to_degrees(angleD)}`)
    const angleE = 180 - radians_to_degrees(angleC) - radians_to_degrees(angleD)
    // const Angle = radians_to_degrees(angleE)  //获取角度值
    return angleE
}

// const tanAngle = (pA,pB,Radius)=>{
//     const angleD = Math.atan( (pB[1] - pA[1])  /(pB[0] - pA[0]));  //得到弧度值
//     const AB =  Math.sqrt(  Math.pow(pA[0]-pB[0],2) +  Math.pow(pA[1]-pB[1],2)  )
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

const pA = [222.5 ,279.5 ]
const pB = [89,442]
const Radius = 100
console.log( tanAngle(pA,pB,Radius))
// debugger