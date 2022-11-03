import React from 'react';
import {
  Button,
  Field,
  FieldSet,
  Form,
  Input,
  useStyles,
} from '@grafana/ui';
import { Messages } from '../PrepareExplain.messages';
import PrepareExplainFingerPrint from '../PrepareExplainFingerprint/PrepareExplainFingerprint';
import { getStyles } from '../PrepareExplain.styles';
import { PrepareExplainFormProps, PrepareExplainFormValues } from './PrepareExplainForm.types';
import { prepareInputs } from './PrepareExplainForm.utils';

const PrepareExplainForm: React.FC<PrepareExplainFormProps> = ({ example, onPlaceholdersSubmit }) => {
  const styles = useStyles(getStyles);
  const placeholders = prepareInputs(example.placeholders_count || 0);

  const handleSubmit = ({ placeholders }: PrepareExplainFormValues) => {
    onPlaceholdersSubmit(placeholders);
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
              <Button type="submit">{Messages.submit}</Button>
            </FieldSet>
          )}
        </>
      )}
    </Form>
  );
};

export default PrepareExplainForm;
