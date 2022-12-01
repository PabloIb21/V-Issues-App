import { useQuery } from '@tanstack/vue-query';

import { githubApi } from 'src/api/githubApi';
import { Label } from 'src/issues/interfaces/label';
import { useIssuesStore } from 'src/stores/issues';
import { storeToRefs } from 'pinia';

const getLabels = async (): Promise<Label[]> => {
  const { data } = await githubApi('/labels?per_page=100', {
    // headers: { Authorization: null },
  });
  return data;
};

const useLabels = () => {
  const issuesStore = useIssuesStore();
  const { labels } = storeToRefs(issuesStore);

  const labelsQuery = useQuery(['labels'], getLabels, {
    staleTime: 1000 * 60 * 60, // Una hora
  });

  return {
    labelsQuery,

    // Getters
    selectedLabels: labels,

    // Methods
    toggleLabel: issuesStore.toggleLabel,
  };
};

export default useLabels;
