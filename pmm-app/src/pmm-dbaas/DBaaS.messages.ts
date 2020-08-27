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
        `Are you sure that you want to permanently delete ${selected} cluster${selected !== 1 ? 's' : ''}?`
      ),
      title: 'Confirm action'
    },
    getDeletionStatus: (deleted: number, total: number) => (
      `${deleted} of ${total} clusters successfully deleted`
    ),
    table: {
      nameColumn: 'Kubernetes Cluster Name'
    },
  }
};
