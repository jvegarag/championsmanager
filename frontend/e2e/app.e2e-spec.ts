import { AppPage } from './app.po';

describe('championsmanager App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('UEFA Champions Manager');
  });
});
