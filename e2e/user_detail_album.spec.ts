import { ReactSelector } from 'testcafe-react-selectors';
import { waitForReact } from 'testcafe-react-selectors';
import { currentPageUrl } from './_helper';

fixture('User detail page, album section')
  .page('http://localhost:3000/user/1')
  .beforeEach(async () => {
    await waitForReact();
  });

test('Open album page with 10 album cards', async (t) => {
  await t.click(ReactSelector('Button').withText('Albums'));

  const albumCards = ReactSelector('AlbumCard');
  await t.expect(albumCards.count).eql(10);
  await t.expect(currentPageUrl()).contains('/user/1/albums');
});
