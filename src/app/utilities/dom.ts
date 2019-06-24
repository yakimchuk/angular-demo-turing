type Size = {
  width: number,
  height: number
}

export function getElementVisibleSize(element: HTMLElement): Size {

  let bounds = element.getBoundingClientRect();

  let sizes = {
    element: {
      width: bounds.width,
      height: bounds.height
    },
    screen: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  };

  let fact: Size = {
    width: 0,
    height: 0
  };

  // Height
  if (bounds.top >= 0 && bounds.bottom <= sizes.screen.height) {
    fact.height = sizes.element.height;
  } else if (bounds.top < 0) {

    let sum = bounds.top + sizes.element.height;

    if (sum > 0 && sum < sizes.screen.height) {
      fact.height = sum;
    } else if (sum > 0 && sum > sizes.screen.height) {
      fact.height = sizes.screen.height;
    }

  } else if (bounds.bottom > sizes.screen.height && bounds.top < sizes.screen.height) {
    fact.height = sizes.screen.height - bounds.top;
  }

  // Width
  if (bounds.left >= 0 && bounds.right <= sizes.screen.width) {
    fact.width = sizes.element.width;
  } else if (bounds.left < 0) {

    let sum = bounds.left + sizes.element.width;

    if (sum > 0 && sum < sizes.screen.width) {
      fact.width = sum;
    } else if (sum > 0 && sum > sizes.screen.width) {
      fact.width = sizes.screen.width;
    }

  } else if (bounds.right > sizes.screen.width && bounds.left < sizes.screen.width) {
    fact.width = sizes.screen.width - bounds.left;
  }

  return fact;
}
