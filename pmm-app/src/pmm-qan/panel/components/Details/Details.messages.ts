export const Messages = {
  noExamplesFound: 'Sorry, no examples found for this query',
  noClassicExplain: 'No classic explain found',
  noJsonExplain: 'No JSON explain found',
  noVisualExplain: 'No visual explain found',
  cantExtractTables: 'No table info from example nor explain',
  noDataFound: 'No data found',
  closeDetails: 'Close',
  isDML: 'Couldn\'t build explain with original query and it was replaced with equivalent SELECT query',
  tabs: {
    details: {
      tab: 'Details',
      sections: {
        timeDistribution: 'Query time distribution',
        metrics: 'Metrics',
        histogram: 'Histogram',
        topQuery: 'Top Query',
      },
    },
    examples: {
      tab: 'Examples',
    },
    explains: {
      tab: 'Explain',
    },
    tables: {
      tab: 'Tables',
      sections: {
        table: 'Table',
        indexes: 'Indexes',
        status: 'Status',
      },
    },
    plan: {
      tab: 'Plan',
    },
  },
};
