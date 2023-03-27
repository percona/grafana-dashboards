import { LineMetadata } from './Metadata.types';

export const showMetadata = (metadata: string[]): LineMetadata[] => {
  const metadataToShow: LineMetadata[] = [];

  Object.entries(metadata).forEach(([k, v]) => {
    const line: LineMetadata = ({
      name: k,
      value: v,
    });

    metadataToShow.push(line);
  });

  metadataToShow.sort((a, b) => a.name.localeCompare(b.name));

  return metadataToShow;
};
