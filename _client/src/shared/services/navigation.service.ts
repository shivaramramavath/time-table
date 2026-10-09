let navigateFunction: ((path: string) => void) | null = null;

export const navigationService = {
  setNavigate: (navigate: (path: string) => void) => {
    navigateFunction = navigate;
  },

  navigate: (path: string) => {
    if (navigateFunction) {
      navigateFunction(path);
    }
  },
};
