import React, { useMemo } from 'react';
import {
  Button, Field, Input, useStyles,
} from '@grafana/ui';
import { Form, Field as FinalField } from 'react-final-form';
import validators from 'shared/components/helpers/validators';
import { Messages } from './PlaceholdersForm.messages';
import PrepareExplainFingerPrint from '../QueryFingerprint';
import { getStyles } from './PlaceholdersForm.styles';
import { PlaceholdersFormProps, PlaceholdersFormValues } from './PlaceholdersForm.types';
import { prepareInputs } from './PlaceholdersForm.utils';

const PlaceholdersForm: React.FC<PlaceholdersFormProps> = ({ onSubmit, example }) => {
  // recreate initial values if example changes to reset the form
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialValues = useMemo<PlaceholdersFormValues>(() => ({ placeholders: [] }), [example]);
  const styles = useStyles(getStyles);
  const placeholders = prepareInputs(example.placeholders_count || 0);

  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, submitting, handleSubmit }) => (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.container}>
            <div className={styles.follow}>{Messages.follow}</div>
            <PrepareExplainFingerPrint
              placeholders={values.placeholders}
              fingerprint={example.explain_fingerprint || ''}
            />
            <p className={styles.description}>{Messages.replace}</p>
            <div>
              {placeholders?.map((placeholder) => (
                <FinalField
                  name={placeholder.fieldName}
                  validate={validators.required}
                  render={({ input, meta }) => (
                    <Field invalid={meta.error && meta.touched} error={meta.error}>
                      <Input {...input} autoFocus autoCapitalize="none" placeholder={placeholder.label} />
                    </Field>
                  )}
                />
              ))}
              <Button type="submit" onClick={handleSubmit} disabled={submitting}>
                {Messages.submit}
              </Button>
            </div>
          </div>
        </form>
      )}
    </Form>
  );
};

export default PlaceholdersForm;
