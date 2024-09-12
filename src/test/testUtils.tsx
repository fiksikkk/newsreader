import {faker} from '@faker-js/faker';

export const createUsers = (amount = 5) => {
  let result = [];
  for (let i = 0; i < amount; i++) {
    result.push({
      id: i,
      name: faker.internet.userName(),
      image: faker.image.url(),
    });
  }
  return result;
};
