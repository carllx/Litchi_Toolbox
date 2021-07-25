import Papa from 'papaparse'
import fs from'fs';


const  parseCsv =  async (file)=>{
  const f = fs.createReadStream(file);
    return new Promise((resolve, reject) => {
      Papa.parse(f, {
        header: true,
        skipEmptyLines: true,
        transform: (value) => {
          return value.trim();
        },
        complete: (results) => {
          return resolve(results);
        },
        error: (error) => {
          return reject(error);
        },
      });
    });
  }
const  parseJsonToCSV =   (data,file)=>{
    
      const csv = Papa.unparse(data)
      fs.writeFile(file ,csv,function(err,res){
        if(err){
            console.log("err while saving");
            console.log(err)
        }
        else{
            console.log("File saved");
            console.log(res);
        }
    });
  
  }





export{parseCsv,
  parseJsonToCSV}