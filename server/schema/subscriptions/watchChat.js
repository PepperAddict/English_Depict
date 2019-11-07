const CHAT_ADDED = 'Chat Added';

module.exports = {
  Subscription: {
    chatAdded: {
      subscribe: () => pubsub.asyncIterator([CHAT_ADDED])
    }
  }
}