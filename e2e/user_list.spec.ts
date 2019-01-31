import { ReactSelector } from 'testcafe-react-selectors';
import { waitForReact } from 'testcafe-react-selectors';
import { currentPageUrl } from './_helper';

fixture('User list page')
  .page('http://localhost:3000')
  .beforeEach(async () => {
    await waitForReact();
  });

test('Show 10 users', async (t) => {
  const userCards = ReactSelector('UserCard');
  await t.expect(userCards.count).eql(10);

  await t
    .expect(userCards.nth(0).find('div.header').innerText)
    .eql('Leanne Graham');
  await t
    .expect(userCards.nth(9).find('div.header').innerText)
    .eql('Clementina DuBuque');
});

test('Go to user detail page when clicked', async (t) => {
  const userCard = ReactSelector('UserCard').withProps({ id: 1 });
  await t.click(userCard.findReact('Card'));

  await t.expect(currentPageUrl()).contains('/user/1');
});
