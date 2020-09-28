export const onPressed = (
  callback: (e: Event) => any,
  options?: { autoBlur?: boolean; debounce?: boolean }
) => {
  let autoBlur = options?.autoBlur || true;
  let debounce = options?.debounce || true;
  let isRunning = false;

  return (e: Event) => {
    if (isRunning) return;
    if (debounce) {
      isRunning = true;
      setTimeout(() => (isRunning = false), 1000);
    }
    if (autoBlur) {
      let element = e.currentTarget as HTMLElement;
      element.blur();
    }
    let eventType = e.type;
    if (eventType === 'click') callback(e);
    else if (eventType === 'keydown') {
      let key = (e as KeyboardEvent).key;
      if (key === 'Enter' || key === ' ') {
        callback(e);
      }
    }
  };
};

export const onScroll = (callback: (e: Event) => any, debounce = 500) => {
  let isRunning = false;
  let timer;
  return (e: Event) => {
    if (isRunning) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        isRunning = false;
        callback(e);
      }, debounce);
    } else {
      isRunning = true;
      callback(e);
      timer = setTimeout(() => {
        isRunning = false;
      }, debounce);
    }
  };
};

export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);
