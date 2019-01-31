import { ReactSelector } from 'testcafe-react-selectors';
import { waitForReact } from 'testcafe-react-selectors';
import { currentPageUrl } from './_helper';
import { Selector } from 'testcafe';

fixture('Post detail page')
  .page('http://localhost:3000/user/1')
  .beforeEach(async () => {
    await waitForReact();
  });

test('Open post detail page with 5 comments', async (t) => {
  const postCards = ReactSelector('PostCard');
  await t.click(postCards.nth(0).find('button').withText('Show Comments'));

  await t.expect(currentPageUrl()).contains('/post/10');

  const postCardDetail = ReactSelector('PostCard');
  await t.expect(postCardDetail.innerText).contains('optio molestias id quia eum');

  const commentCards = ReactSelector('CommentCard');
  await t
    .expect(commentCards.nth(0).find('div.header').innerText)
    .eql('dolorum soluta quidem ex quae occaecati dicta aut doloribus');
  await t
    .expect(commentCards.nth(4).find('div.header').innerText)
    .eql('dignissimos et deleniti voluptate et quod');
});

test('Create a new comment', async (t) => {
  await t.navigateTo('/post/10');

  const input = Selector('input');
  const textArea = Selector('textarea');
  const submitButton = Selector('button').withText('Submit Comment');

  const name = 'Test User';
  const email = 'email@example.com';
  const body = 'A new comment body\nwith a new line';

  await t
  .typeText(input.nth(0), name)
  .expect(input.nth(0).value)
  .eql(name);

  await t
  .typeText(input.nth(1), email)
  .expect(input.nth(1).value)
  .eql(email);

  await t
  .typeText(textArea, body)
  .expect(textArea.value)
  .eql(body);

  await t.click(submitButton);

  const commentCards = ReactSelector('CommentCard');
  await t.expect(commentCards.count).eql(6);
  await t.expect(commentCards.nth(0).innerText).contains(name);
  await t.expect(commentCards.nth(0).innerText).contains(email);
  await t.expect(commentCards.nth(0).innerText).contains(body);
});

test('Edit comment', async (t) => {
  await t.navigateTo('/post/10');

  const commentCard = ReactSelector('CommentCard').nth(0);
  await t.click(commentCard.find('button').nth(0));

  const input = commentCard.find('input');
  const textArea = commentCard.find('textarea');
  const saveButton = commentCard.find('button').withText('Save Comment');

  const name = 'Test User Update';
  const email = 'emailupdate@example.com';
  const body = 'A updated comment body\nwith a new line';

  await t
  .typeText(input.nth(0), name, { replace: true })
  .expect(input.nth(0).value)
  .eql(name);

  await t
  .typeText(input.nth(1), email, { replace: true })
  .expect(input.nth(1).value)
  .eql(email);

  await t
  .typeText(textArea, body, { replace: true })
  .expect(textArea.value)
  .eql(body);

  await t.click(saveButton);

  await t.expect(commentCard.innerText).contains(name);
  await t.expect(commentCard.innerText).contains(email);
  await t.expect(commentCard.innerText).contains(body);
});

test('Delete post', async (t) => {
  await t.navigateTo('/post/10');

  const commentCard = ReactSelector('CommentCard').nth(0);
  await t.click(commentCard.find('button').nth(1));

  const commentsCard = ReactSelector('CommentCard');
  await t.expect(commentsCard.count).eql(5);
});
