import { useQuery } from '@apollo/client/react';
import { GET_ME } from '../graphql/queries';

const useMe = (includeReviews = false) => {
  const { data, loading, error , refetch} = useQuery(GET_ME, {
    variables: {
      includeReviews,
    },
    fetchPolicy: 'cache-and-network',
  });

  return {
    me: data?.me,
    loading,
    error,
    refetch
  };
};

export default useMe;