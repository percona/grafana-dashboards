import React, { useEffect } from 'react';
import { Button, Field, FieldSet, Input, useStyles } from '@grafana/ui';
import { Messages } from './PlaceholdersForm.messages';
import PrepareExplainFingerPrint from '../QueryFingerprint';
import { getStyles } from './PlaceholdersForm.styles';
import { PlaceholdersFormProps } from './PlaceholdersForm.types';
import { prepareInputs } from './PlaceholdersForm.utils';

const PlaceholdersForm: React.FC<PlaceholdersFormProps> = ({ form, example }) => {
  const { register, watch } = form;
  const styles = useStyles(getStyles);
  const placeholders = prepareInputs(example.placeholders_count || 0);

  useEffect(() => {
    form.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [example]);

  return (
    <div className={styles.container}>
      <div className={styles.follow}>{Messages.follow}</div>
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
    </div>
  );
};

export default PlaceholdersForm;
