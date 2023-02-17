import React, { FC } from 'react';
import { IconName } from '@grafana/ui';
import { Resource } from '../Resource/Resource';
import { PerconaUpgradeLevel } from '../PerconaUpgradeLevel/PerconaUpgradeLevel';
import resourcesData from './data/resources.json';

export const ResourcesContainer: FC = () => (
  <div>
    <PerconaUpgradeLevel />
    {resourcesData.map((r) => (
      <Resource
        icon={r.icon as IconName}
        title={r.title}
        text={r.text}
        buttonText={r.buttonText}
        url={r.url}
      />
    ))}
  </div>
);
