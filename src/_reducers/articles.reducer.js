import { articleConstants } from "../_constants";

export function articles(state = {}, action) {
  switch (action.type) {
    case articleConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case articleConstants.GETALL_SUCCESS:
      return {
        items: action.articles,
      };
    case articleConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case articleConstants.DELETE_REQUEST:
      // add 'deleting:true' property to article being deleted
      
      return {
        ...state,
        items: state.items.map((article) =>
          article.id === action.id ? { ...article, deleting: true } : article
        ),
      };

     
    case articleConstants.DELETE_SUCCESS:
      // remove deleted article from state
      return {
        items: state.items
          ? state.items.filter((article) => article.id !== action.id)
          : [],
      };
    case articleConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to article
      return {
        ...state,
        items: state.items.map((article) => {
          if (article.id === action.id) {
            // make copy of article without 'deleting:true' property
            const { deleting, ...articleCopy } = article;
            // return copy of article with 'deleteError:[error]' property
            return { ...articleCopy, deleteError: action.error };
          }

          return article;
        }),
      };
    case articleConstants.CREATE_REQUEST:
      return { creating: true };
    case articleConstants.CREATE_SUCCESS:
      return {};
    case articleConstants.CREATE_FAILURE:
      return { createError: action.error };

    case articleConstants.UPDATE_REQUEST:
      return {
        editing: true,
      };
    case articleConstants.UPDATE_SUCCESS:
      return {
        article: action.article,
      };
    case articleConstants.UPDATE_FAILURE:
      return {
        error: action.error,
      };

    default:
      return state;
  }
}
