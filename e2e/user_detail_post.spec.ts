import { ReactSelector } from 'testcafe-react-selectors';
import { waitForReact } from 'testcafe-react-selectors';
import { Selector } from 'testcafe';

fixture('User detail page, post section')
  .page('http://localhost:3000/user/1')
  .beforeEach(async () => {
    await waitForReact();
  });

test('Show 10 post', async (t) => {
  const postCards = ReactSelector('PostCard');
  await t.expect(postCards.count).eql(10);

  await t
    .expect(postCards.nth(0).find('div.header').innerText)
    .eql('optio molestias id quia eum');
  await t
    .expect(postCards.nth(9).find('div.header').innerText)
    .eql(
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    );
});

test('Create new post', async (t) => {
  const input = Selector('input');
  const textArea = Selector('textarea');
  const submitButton = Selector('button').withText('Submit');

  const title = 'Test A New Post Title';
  const body = 'A new post body\nwith a new line';

  await t
    .typeText(input, title)
    .expect(input.value)
    .eql(title);

  await t
    .typeText(textArea, body)
    .expect(textArea.value)
    .eql(body);

  await t.click(submitButton);

  const postCards = ReactSelector('PostCard');
  await t.expect(postCards.count).eql(11);
  await t.expect(postCards.nth(0).innerText).contains(title);
  await t.expect(postCards.nth(0).innerText).contains(body);
});

test('Edit post', async (t) => {
  const postCard = ReactSelector('PostCard').nth(0);
  await t.click(postCard.find('button').nth(1));

  const input = postCard.find('input');
  const textArea = postCard.find('textarea');
  const saveButton = postCard.find('button').withText('Save');

  const title = 'Test A New Post Title Update';
  const body = 'A updated post body\nwith a new line!!';

  await t
    .typeText(input, title, { replace: true })
    .expect(input.value)
    .eql(title);

  await t
    .typeText(textArea, body, { replace: true })
    .expect(textArea.value)
    .eql(body);

  await t.click(saveButton);

  await t.expect(postCard.innerText).contains(title);
  await t.expect(postCard.innerText).contains(body);
});

test('Delete post', async (t) => {
  const postCard = ReactSelector('PostCard').nth(0);
  await t.click(postCard.find('button').nth(2));

  const postCards = ReactSelector('PostCard');
  await t.expect(postCards.count).eql(10);
});
