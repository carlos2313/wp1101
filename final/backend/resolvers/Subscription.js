const Subscription = {
  /**
   * Subscribe for grade update
   */
  gradeUpdated: {
    subscribe: (parent, args, { pubSub }) => {
      return pubSub.asyncIterator("GRADE_UPDATED");
    },
  },
};

export default Subscription;
