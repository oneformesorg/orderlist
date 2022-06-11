import path from 'path';

export function dir(filename?:string){
  if(filename){
    return path.join(__dirname,`../../_temp/${filename}.json`);
  }
  return path.join(__dirname,'../../_temp');
}