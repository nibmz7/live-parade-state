import { expect } from '@open-wc/testing';
import { compare, getInsertionIndex } from '../../model/user';
import { MockModel } from '../../data-mock/mock_data';
import Rank from '../../model/rank';
import User from '../../model/user';

describe('User', () => {
  it('Compare 2 users', () => {
    let difference = compare(MockModel.UserArray[0], MockModel.UserArray[1]);
    expect(difference).equal(-1);
  });

  it('Sort users', () => {
    let expectedResult = [
      MockModel.UserArray[0],
      MockModel.UserArray[1],
      MockModel.UserArray[2]
    ];
    MockModel.UserArray.sort(compare);
    expect(MockModel.UserArray).to.eql(expectedResult);
  });

  it('Insert new user index', () => {
    let user: User = {
      uid: '401',
      name: 'John',
      email: 'john4@lol.com',
      regular: true,
      rank: new Rank('CFC'),
      branch: MockModel.Branch,
      department: MockModel.Department
    };
    let index = getInsertionIndex(MockModel.UserArray, user);
    expect(index).equal(1);
  });
});
