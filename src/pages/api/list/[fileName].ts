import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import { dir } from '@shared/utils/dir';

export default async function route(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if(method !== 'GET'){
    res.status(405).end();
  }
  const { fileName } = req.query;
  const exists = existsSync(dir(fileName as string));

  if(!exists){
    return res
      .status(404)
      .send({ message: 'file not exists' });
  }

  const file = await fs.readFile(dir(fileName as string), { encoding: 'utf-8' });
  await fs.rm(dir(fileName as string));
  return res.status(200).send({ items: file });
}