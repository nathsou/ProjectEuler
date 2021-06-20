
export const createLogger = (initialState: 'on' | 'off' = 'on') => {
  let isActive = initialState === 'on';

  const log = (msg: string): void => {
    if (isActive) {
      console.log(msg);
    }
  };

  const turn = (state: 'on' | 'off'): void => {
    isActive = state === 'on';
  };

  return { log, turn };
};