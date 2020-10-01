export const Messages = {
  tabs: {
    xtradb: 'DB Cluster',
    kubernetes: 'Kubernetes Cluster',
  },
  kubernetes: {
    deleteAction: 'Delete',
    addAction: 'Add new Kubernetes Cluster',
    deleteModal: {
      cancel: 'Cancel',
      confirm: 'Proceed',
      confirmMessage: 'Are you sure that you want to permanently delete this cluster?',
      title: 'Confirm action'
    },
    deleteSuccess: 'Cluster successfully deleted',
    addModal: {
      title: 'Add Kubernetes cluster',
      confirm: 'Add',
      fields: {
        clusterName: 'Kubernetes Cluster Name',
        kubeConfig: 'Kubeconfig file'
      },
    },
    table: {
      nameColumn: 'Kubernetes Cluster Name',
      actionsColumn: 'Actions'
    },
    messages: {
      clusterAdded: 'Cluster was successfully added',
    }
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
      },
    },
    table: {
      nameColumn: 'Name',
    },
  },
};
