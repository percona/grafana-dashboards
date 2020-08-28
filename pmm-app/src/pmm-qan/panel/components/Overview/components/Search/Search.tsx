import React, { FC } from 'react';
import { Field, Form } from 'react-final-form';
import {
  useTheme, Input, Button, Icon
} from '@grafana/ui';
import { Messages } from 'pmm-qan/panel/QueryAnalytics.messages';
import { getStyles } from './Search.styles';
import { SearchProps } from './Search.types';

export const Search: FC<SearchProps> = ({
  dataQa,
  initialValue,
  handleSearch,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const { search: { placeholder } } = Messages;

  return (
    <Form
      onSubmit={handleSearch}
      initialValues={{ search: initialValue }}
      render={({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className={styles.searchWrapper}
          data-qa={dataQa}
        >
          <Field
            name="search"
            render={({ input }) => (
              <Input
                {...input}
                placeholder={placeholder}
                className={styles.searchInput}
              />
            )}
          />
          <Button
            type="submit"
            className={styles.searchButton}
          >
            <Icon name="search" />
          </Button>
        </form>
      )}
    />
  );
};
