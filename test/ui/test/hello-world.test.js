"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const hello_world_1 = require("../hello-world");
describe('Hello World Test', () => {
    it('Say hello', () => {
        assert_1.default.equal(hello_world_1.sayHello(), 'Hello World!');
    });
});
