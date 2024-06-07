import { Injectable } from '@nestjs/common';
import { main } from './rabbit';

@Injectable()
export class AppService {

  getRabbit(id: string): any {
    if (!id) {
      return {};
    }

    console.log({ data: 'asdasd' });

    return main(id);
  }
}
