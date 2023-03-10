import { metadataNamesTooltips } from './Metadata.constants';
import { LineMetadata } from './Metadata.types';

export const showMetadata = (metadata: string[]): LineMetadata[] => {
  const metadataToShow: LineMetadata[] = [];

  Object.entries(metadata).forEach(([k, v]) => {
    const line: LineMetadata = ({
      name: metadataNamesTooltips[k] ? metadataNamesTooltips[k].name : k,
      value: v,
      tooltip: metadataNamesTooltips[k] ? metadataNamesTooltips[k].tooltip : '',
    });

    metadataToShow.push(line);
  });

  return metadataToShow;
};
