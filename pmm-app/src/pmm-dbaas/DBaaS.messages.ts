import { DBClusterStatus } from './components/DBCluster/DBCluster.types';
import { KubernetesClusterStatus } from './components/Kubernetes/OperatorStatusItem/KubernetesOperatorStatus/KubernetesOperatorStatus.types';

export const Messages = {
  tabs: {
    dbcluster: 'DB Cluster',
    kubernetes: 'Kubernetes Cluster',
  },
  kubernetes: {
    deleteAction: 'Unregister',
    addAction: 'Register new Kubernetes Cluster',
    deleteModal: {
      cancel: 'Cancel',
      confirm: 'Proceed',
      confirmMessage: 'Are you sure that you want to unregister this cluster?',
      title: 'Confirm action',
      labels: {
        force: 'Ignore errors; unregister anyway',
        forceWrapper: 'Force mode',
      },
    },
    deleteSuccess: 'Cluster successfully unregistered',
    addModal: {
      title: 'Register Kubernetes Cluster',
      confirm: 'Register',
      fields: {
        clusterName: 'Kubernetes Cluster Name',
        kubeConfig: 'Kubeconfig file',
      },
    },
    table: {
      nameColumn: 'Kubernetes Cluster Name',
      actionsColumn: 'Actions',
    },
    messages: {
      clusterAdded: 'Cluster was successfully registered',
    },
    operatorStatus: {
      [KubernetesClusterStatus.ok]: 'Installed',
      [KubernetesClusterStatus.unsupported]: 'Not supported',
      [KubernetesClusterStatus.unavailable]: 'How to install?',
      [KubernetesClusterStatus.invalid]: 'Invalid',
      errorMessage: 'Cluster creation failed',
    },
  },
  dbcluster: {
    addAction: 'Create DB Cluster',
    publicAddressWarningBegin:
      'If you want to use monitoring, you need to set your PMM installation public address in',
    publicAddressWarningLink: 'settings',
    publicAddressWarningEnd: 'before cluster creation',
    addModal: {
      title: 'Create Cluster',
      confirm: 'Create Cluster',
      fields: {
        clusterName: 'Cluster Name',
        kubernetesCluster: 'Kubernetes Cluster',
        databaseType: 'Database Type',
        topology: 'Topology',
        nodes: 'Number of Nodes',
        resources: 'Resources per Node',
        memory: 'Memory (GB)',
        cpu: 'CPU',
        disk: 'Disk (GB)',
      },
      steps: {
        basicOptions: 'Basic Options',
        advancedOptions: 'Advanced Options',
      },
      topology: {
        cluster: 'Cluster',
        single: 'Single Node',
      },
      resources: {
        small: 'Small',
        medium: 'Medium',
        large: 'Large',
        custom: 'Custom',
      },
      validationMessages: {
        clusterName: 'Cluster name should start with a letter, be alphanumeric, and may contain a dash',
      },
    },
    deleteModal: {
      cancel: 'Cancel',
      confirm: 'Proceed',
      confirmMessage: 'Are you sure that you want to delete this cluster?',
      title: 'Confirm action',
    },
    editModal: {
      confirm: 'Save changes',
    },
    table: {
      nameColumn: 'Name',
      databaseTypeColumn: 'Database Type',
      connectionColumn: 'Connection',
      clusterParametersColumn: 'DB Cluster Parameters',
      clusterStatusColumn: 'Cluster Status',
      actionsColumn: 'Actions',
      connection: {
        host: 'Host',
        port: 'Port',
        username: 'Username',
        password: 'Password',
      },
      parameters: {
        clusterName: 'K8s cluster name',
        cpu: 'CPU',
        memory: 'Memory',
        disk: 'Disk',
      },
      actions: {
        deleteCluster: 'Delete',
        editCluster: 'Edit',
        restartCluster: 'Restart',
      },
      status: {
        [DBClusterStatus.changing]: 'Pending',
        [DBClusterStatus.deleting]: 'Deleting',
        [DBClusterStatus.failed]: 'Failed',
        [DBClusterStatus.invalid]: 'Invalid',
        [DBClusterStatus.ready]: 'Active',
        errorMessage: 'Cluster creation failed',
      },
    },
  },
};
