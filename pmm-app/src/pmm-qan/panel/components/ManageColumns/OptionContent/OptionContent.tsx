import React, { FC } from 'react';
import { cx } from 'emotion';
import { styles } from './OptionContent.styles';

interface OptionContentProps {
    title: string;
    description: string;
    tags: string[];
    isMetricAvailable?: boolean;
}

export const OptionContent: FC<OptionContentProps> = ({
  title, description, tags, isMetricAvailable
}) => (
  <div className={styles.optionWrapper}>
    <div className={cx(styles.optionText, !isMetricAvailable ? styles.disabledMetric : null)}>
      <span className={styles.optionTitle}>{title}</span>
      <span className={styles.optionDescription}>{description}</span>
    </div>
    <div className={styles.tagWrapper}>
      {tags.map((tag) => (
        <span key={tag} className={styles.tag}>{tag}</span>
      ))}
    </div>
  </div>
);
