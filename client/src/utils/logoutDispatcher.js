let logoutCallback = null;

export const registerLogout = (fn) => {
  logoutCallback = fn;
};

export const triggerLogout = () => {
  if (logoutCallback) {
    logoutCallback(true); // skipServer = true
  } else {
    console.warn("Logout callback not registered.");
  }
};
