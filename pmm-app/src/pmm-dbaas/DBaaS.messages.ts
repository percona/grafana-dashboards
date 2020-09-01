import pluralize from 'pluralize';

export const Messages = {
  tabs: {
    manageDB: 'Manage DB Cluster',
    kubernetes: 'Kubernetes Cluster Inventory',
  },
  kubernetes: {
    deleteAction: 'Delete',
    deleteModal: {
      cancel: 'Cancel',
      confirm: 'Proceed',
      getConfirmMessage: (selected: number) => (
        `Are you sure that you want to permanently delete ${pluralize('cluster', selected, true)}?`
      ),
      title: 'Confirm action'
    },
    getDeletionStatus: (deleted: number, total: number) => (
      `${deleted} of ${pluralize('cluster', total, true)} successfully deleted`
    ),
    table: {
      nameColumn: 'Kubernetes Cluster Name'
    },
  }
};
