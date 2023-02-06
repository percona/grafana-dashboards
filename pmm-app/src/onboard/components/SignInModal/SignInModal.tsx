import React, { FC } from 'react';
import {
  Button, HorizontalGroup, Modal, useStyles2, Input, VerticalGroup, Checkbox,
} from '@grafana/ui';
import { SignInModalTypes } from './SignInModal.types';
import { getStyles } from './SignInModal.styles';

export const SignInModal: FC<SignInModalTypes> = ({
  isOpen,
}) => {
  const styles = useStyles2(getStyles);

  return (
    <>
      <Modal title="" isOpen={isOpen}>
        <HorizontalGroup width="100%" spacing="lg" align="flex-start">
          <div className={styles.leftPane}>
            <img
              alt="percona-logo"
              className={styles.leftPaneLogo}
              src="/graph/public/plugins/pmm-app/img/modal-sign-in.svg"
            />
            <h4 className={styles.leftPaneTitle}>Get more power with a quick sign in</h4>
            <p>
              <li className={styles.liStyle}>
                Get more Advisors to automatically check your system against misconfigurations,
                low performance and security vulnerabilities.How to use Advisors
              </li>
              <li>
                Get more templates to strengthen your Alerts Templates library.How to use Alert Templates
              </li>
              <li>
                But you get way more! Visit our Premium Plans to uncover all benefits.
              </li>
            </p>
          </div>
          <div className={styles.rightPane}>
            <h4>Percona Account sign in</h4>
            <VerticalGroup spacing="md">
              <div className={styles.rightPaneGroup}>
                <label className={styles.labelTitle}>Work email</label>
                <Input
                  className={styles.inputStyle}
                  disabled={false}
                  type="text"
                  placeholder="Email address"
                />
              </div>
              <div className={styles.rightPaneGroup}>
                <label className={styles.labelTitle}>Password</label>
                <Input
                  disabled={false}
                  type="password"
                  placeholder="Password"
                />
                <label className={styles.labelTitle}>
                  <a className={styles.linkStyle} href="#">Forgot your password</a>
                </label>
              </div>
              <Checkbox label="Remember me" />
              <Button fullWidth>
                Sign in
              </Button>
              <div className={styles.divider} />
            </VerticalGroup>
          </div>
        </HorizontalGroup>
      </Modal>
    </>
  );
};
