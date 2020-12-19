import { FormApi } from 'final-form';
import { Kubernetes } from '../../../Kubernetes/Kubernetes.types';
import { Databases } from '../../../../../shared/core';

export interface DBClusterBasicOptionsProps {
  kubernetes: Kubernetes[];
  form: FormApi;
}

export enum Operators {
  xtradb = 'xtradb',
  psmdb = 'psmdb',
}

export interface DatabaseOption {
  value: Databases;
  label: string;
}
