// @flow
import UserService from '../DiscordUserService';

describe('UserService.getUser', () => {
  test('get my user', () => {
    const userService = new UserService();
    userService.getUser('some-random-id')
      .then(console.log);
  });
});
