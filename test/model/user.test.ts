import { expect } from '@open-wc/testing';
import { MockModel } from '../../data-mock/mock_data';
import Rank from '../../model/rank';
import User from '../../model/user';

describe('User', () => {
  it('Compare 2 users', () => {
    let difference = User.compare(MockModel.UserArray[0], MockModel.UserArray[1]);
    expect(difference).equal(-1);
  });

  it('Sort users', () => {
    let expectedResult = [
      MockModel.UserArray[0],
      MockModel.UserArray[1],
      MockModel.UserArray[2]
    ];
    MockModel.UserArray.sort(User.compare);
    expect(MockModel.UserArray).to.eql(expectedResult);
  });

  it('Insert new user index', () => {
    let user = new User({
      uid: '401',
      name: 'John',
      email: 'john4@lol.com',
      regular: true,
      rank: new Rank('CFC'),
      branchid: MockModel.Branch.id,
      departmentid: MockModel.Department.id
    });
    let index = User.getInsertionIndex(MockModel.UserArray, user);
    expect(index).equal(1);
  });
});
