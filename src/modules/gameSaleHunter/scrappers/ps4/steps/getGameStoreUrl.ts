import jsdom from 'jsdom';
import verror from '../../../../../proxies/verror';
import StepErrors from '../../../../../constants/errors/steps';

const { JSDOM } = jsdom;

async function getGameStoreUrl(psnGameUrl: string): Promise<string | null> {
  try {
    const page = await JSDOM.fromURL(psnGameUrl);
    const { document } = page.window;
    const allAnchorElementsInPage = document.querySelectorAll('a');
    const allAnchorElementsInPageIterable = Array.from(allAnchorElementsInPage);
    const gameStoreAnchorElement = findGameStoreAnchorElement(allAnchorElementsInPageIterable);

    let gameStoreUrl = null;
    if (gameStoreAnchorElement) {
      const gameStoreAnchorElementHref = gameStoreAnchorElement.getAttribute('href');
      const gameStoreAnchorElementDataHref = gameStoreAnchorElement.getAttribute('data-href');

      gameStoreUrl = gameStoreAnchorElementDataHref || gameStoreAnchorElementHref;
    }

    return gameStoreUrl as string | null;
  } catch (error) {
    throw verror.createError({
      name: StepErrors.GetGamesPrices.name,
      message: StepErrors.GetGamesPrices.message,
      cause: error,
      debugParams: { psnGameUrl },
    });
  }

  function findGameStoreAnchorElement(allAnchorElementsInPageIterable: HTMLElement[]): HTMLElement | undefined {
    const gameStoreAnchorElement = allAnchorElementsInPageIterable.find((anchorElement: HTMLElement) => {
      const href = anchorElement.getAttribute('href');
      const dataHref = anchorElement.getAttribute('data-href');
      const storeUrlBasUrl = 'https://store.playstation.com/?resolve';

      let doesUrlRedirectToStore = false;
      if (href) {
        doesUrlRedirectToStore = href.startsWith(storeUrlBasUrl);
      }

      // Sometimes the store link is inside the "data-href" attribute instead of the "href".
      // That's why we also need to look into that attribute.
      if (!doesUrlRedirectToStore && dataHref) {
        doesUrlRedirectToStore = dataHref.startsWith(storeUrlBasUrl);
      }

      return doesUrlRedirectToStore;
    });

    return gameStoreAnchorElement;
  }
}


export default getGameStoreUrl;
