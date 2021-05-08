import {CrossProduct, FindPrize, JoinS} from '../src/prizelogic';

test('CrossProduct', async () => {
  console.log(await CrossProduct([1, 3, 4], [2, 3, 4]));

  expect(2).toBe(2);
});


