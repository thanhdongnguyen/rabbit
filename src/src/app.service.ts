import { Injectable } from '@nestjs/common';
import { extract } from './rabbit';

@Injectable()
export class AppService {

  getRabbit(id: string): any {
    if (!id) {
      return {};
    }

    return extract(id);
  }
}
