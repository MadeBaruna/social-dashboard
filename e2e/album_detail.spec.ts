import { ReactSelector } from 'testcafe-react-selectors';
import { waitForReact } from 'testcafe-react-selectors';
import { currentPageUrl } from './_helper';
import { Selector } from 'testcafe';

fixture('Album detail page')
  .page('http://localhost:3000/user/1/albums')
  .beforeEach(async () => {
    await waitForReact();
  });

test('Click album image and show album detail page with 50 photos', async (t) => {
  const albumCards = ReactSelector('AlbumCard');
  await t.click(albumCards.nth(0));

  await t.expect(currentPageUrl()).contains('/album/1');

  const photoCards = ReactSelector('PhotoCard');
  await t.expect(photoCards.count).eql(50);
});

test('Show photo detail', async (t) => {
  await t.navigateTo('/album/1');
  const photoCard = ReactSelector('PhotoCard').nth(0);
  await t.click(photoCard);

  await t
    .expect(Selector('.ui.image>img').getAttribute('src'))
    .eql('https://via.placeholder.com/600/92c952')
    .expect(Selector('p').innerText)
    .eql('accusamus beatae ad facilis cum similique qui sunt');
});
