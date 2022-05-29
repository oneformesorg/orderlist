import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import { generateId } from '@shared/utils/generateId';
import { dir } from '@shared/utils/dir';

export default async function route(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if(method !== 'POST'){
    res.status(405).end();
  }
  const { items } = req.body;
  if(!items){
    res.status(400).end();
  }
  const folderExists = existsSync(dir());
  const fileName = generateId();

  const json = Buffer.from(items, 'base64');
  const itemJSON = json.toString('utf-8');

  if(folderExists){
    await fs.writeFile(dir(fileName), itemJSON);
    return res.status(200).send({ fileName: fileName });
  }
  
  await fs.mkdir(dir());
  await fs.writeFile(dir(fileName), itemJSON);
  
  return res.status(200).send({ fileName: fileName });
}