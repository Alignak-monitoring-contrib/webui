import { TotoPage } from './app.po';

describe('toto App', function() {
  let page: TotoPage;

  beforeEach(() => {
    page = new TotoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
