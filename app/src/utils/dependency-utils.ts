export const isVersionOutdated = (
  currentVersion: string,
  latestVersion: string
): boolean => {
  let leadingSymbol = "";

  if (currentVersion.startsWith("~")) {
    leadingSymbol = "~";
    currentVersion = currentVersion.slice(1);
  } else if (currentVersion.startsWith("^")) {
    leadingSymbol = "^";
    currentVersion = currentVersion.slice(1);
  }

  const currentVersionParts = currentVersion.split(".").map(Number);
  const latestVersionParts = latestVersion.split(".").map(Number);

  // Pad the current version and latest version with 0s to make them the same length
  while (currentVersionParts.length < 3) currentVersionParts.push(0);
  while (latestVersionParts.length < 3) latestVersionParts.push(0);

  if (!leadingSymbol) {
    return semverCompare(currentVersion, latestVersion);
  }

  // If the leading symbol is ~, then the current version is outdated if either of the first two parts of the version are less than the latest version
  else if (leadingSymbol === "~") {
    // Compare major version
    if (currentVersionParts[0] !== latestVersionParts[0]) {
      return latestVersionParts[0] > currentVersionParts[0];
    }

    // Compare minor version
    if (currentVersionParts[1] !== latestVersionParts[1]) {
      return latestVersionParts[1] > currentVersionParts[1];
    }
    return false;
  }

  // If the leading symbol is ^, then the current version is outdated if the first part of the version is less than the latest version
  else if (leadingSymbol === "^") {
    // Compare major version
    if (currentVersionParts[0] !== latestVersionParts[0]) {
      return latestVersionParts[0] > currentVersionParts[0];
    }

    return false;
  }

  return false;
};

const semverCompare = (
  currentVersion: string,
  latestVersion: string
): boolean => {
  const comparison = latestVersion.localeCompare(currentVersion, undefined, {
    numeric: true,
  });

  // If the comparison is greater than 0, then the current version is outdated
  return comparison > 0;
};
