import React, { useState } from 'react';
import {
  Button, Field, FieldSet, Form, Input, useStyles,
} from '@grafana/ui';
import { Messages } from '../PrepareExplain.messages';
import PrepareExplainFingerPrint from '../PrepareExplainFingerprint/PrepareExplainFingerprint';
import { getStyles } from '../PrepareExplain.styles';
import { PrepareExplainFormProps, PrepareExplainFormValues } from './PrepareExplainForm.types';
import { prepareInputs } from './PrepareExplainForm.utils';

const PrepareExplainForm: React.FC<PrepareExplainFormProps> = ({ example, onPlaceholdersSubmit }) => {
  const styles = useStyles(getStyles);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const placeholders = prepareInputs(example.placeholders_count || 0);

  const handleSubmit = async ({ placeholders }: PrepareExplainFormValues) => {
    setIsSubmitting(true);
    await onPlaceholdersSubmit(placeholders);
    setIsSubmitting(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {({ register, watch }) => (
        <>
          <PrepareExplainFingerPrint
            placeholders={watch().placeholders}
            fingerprint={example.explain_fingerprint || ''}
          />
          <p className={styles.description}>{Messages.replace}</p>
          {!!placeholders.length && (
            <FieldSet>
              {placeholders.map((placeholder) => (
                <Field>
                  <Input
                    {...register(placeholder.fieldName)}
                    autoFocus
                    autoCapitalize="none"
                    placeholder={placeholder.label}
                  />
                </Field>
              ))}
              <Button type="submit" disabled={isSubmitting}>
                {Messages.submit}
              </Button>
            </FieldSet>
          )}
        </>
      )}
    </Form>
  );
};

export default PrepareExplainForm;
