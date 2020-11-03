import { XtraDBClusterStatus } from './components/XtraDB/XtraDB.types';

export const Messages = {
  tabs: {
    xtradb: 'DB Cluster',
    kubernetes: 'Kubernetes Cluster',
  },
  kubernetes: {
    deleteAction: 'Unregister',
    addAction: 'Register new Kubernetes Cluster',
    deleteModal: {
      cancel: 'Cancel',
      confirm: 'Proceed',
      confirmMessage: 'Are you sure that you want to delete this cluster?',
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
  xtradb: {
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
        [XtraDBClusterStatus.changing]: 'Pending',
        [XtraDBClusterStatus.deleting]: 'Deleting',
        [XtraDBClusterStatus.failed]: 'Failed',
        [XtraDBClusterStatus.invalid]: 'Invalid',
        [XtraDBClusterStatus.ready]: 'Active',
        errorMessage: 'Cluster creation failed',
      },
    },
  },
};
