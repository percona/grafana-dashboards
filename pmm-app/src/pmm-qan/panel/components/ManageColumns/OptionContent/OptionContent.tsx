import React, { FC } from 'react';
import { cx } from 'emotion';
import { styles } from './OptionContent.styles';

interface OptionContentProps {
  title: string;
  description: string;
  tags: string[];
  disabled?: boolean;
}

export const OptionContent: FC<OptionContentProps> = ({
  title, description, tags, disabled
}) => (
  <div className={cx(styles.optionWrapper, !disabled ? styles.disabledMetric : null)}>
    <div className={styles.optionText}>
      <span className={styles.optionTitle}>{title}</span>
      <span className={styles.optionDescription}>{description}</span>
    </div>
    <div className={styles.tagWrapper}>
      {tags.map((tag) => (
        <span key={tag} className={styles.tag}>
          {tag}
        </span>
      ))}
    </div>
  </div>
);
