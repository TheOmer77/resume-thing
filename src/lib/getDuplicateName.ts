const COPY_SUFFIX = 'Copy';

export const getDuplicateName = (name: string) => {
  const trimmedName = name.trim();
  const regex = new RegExp(`(.*) \\(${COPY_SUFFIX}(?: (\\d+))?\\)$`),
    match = trimmedName.match(regex);
  if (!match) return `${trimmedName} (${COPY_SUFFIX})`;

  const baseName = match[1],
    currentCount = match[2] ? parseInt(match[2], 10) : 1;
  return `${baseName} (${COPY_SUFFIX} ${currentCount + 1})`;
};
