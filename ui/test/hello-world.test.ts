import assert from 'assert';
import { sayHello } from '../hello-world';

describe('Hello World Test', () => {
    it('Say hello', () => {
        assert.equal(sayHello(), 'Hello World!');
    })
});
