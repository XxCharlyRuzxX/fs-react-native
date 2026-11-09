import { useQuery } from '@apollo/client/react';
import {
  GET_REPOSITORIES,
  GET_REPOSITORY,
} from '../graphql/queries';

export const useRepositories = (
  orderBy,
  orderDirection,
  searchKeyword
) => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy,
      orderDirection,
      searchKeyword,
    },
    fetchPolicy: 'cache-and-network',
  });

  return {
    repositories: data?.repositories,
    loading,
    error,
    refetch,
  };
};

export const useRepository = (id) => {
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: {
      repositoryId: id,
    },
    fetchPolicy: 'cache-and-network',
  });

  return {
    repository: data?.repository,
    loading,
    error,
  };
};