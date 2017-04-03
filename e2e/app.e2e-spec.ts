import { EventRecorderPage } from './app.po';

describe('event-recorder App', () => {
  let page: EventRecorderPage;

  beforeEach(() => {
    page = new EventRecorderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
