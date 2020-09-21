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
