import { DBClusterStatus } from './components/DBCluster/DBCluster.types';

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
  },
  dbcluster: {
    addAction: 'Create DB Cluster',
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
    },
    table: {
      nameColumn: 'Name',
      databaseTypeColumn: 'Database Type',
      connectionColumn: 'Connection',
      clusterStatusColumn: 'Cluster Status',
      actionsColumn: 'Actions',
      connection: {
        host: 'Host',
        port: 'Port',
        username: 'Username',
        password: 'Password',
      },
      actions: {
        deleteCluster: 'Delete',
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
