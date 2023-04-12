
import { Module, Global } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

const pubSub = {
    provide: 'PUB_SUB',
    useValue: new PubSub()
}

@Global()
@Module({
    providers: [pubSub],
    exports: [pubSub]
})
export class GlobalModule {}