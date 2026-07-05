import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';

@Injectable()
export class HtmlService {

  load(html: string) {
    return cheerio.load(html);
  }

}