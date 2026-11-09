import { render, screen, within } from "@testing-library/react-native";
import { RepositoryListContainer } from "../RepositoryList";

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', async () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      await render(<RepositoryListContainer repositories={repositories} />);

      const repositoryItems = screen.getAllByTestId("repositoryItem");
      expect(repositoryItems).toHaveLength(2);

      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      expect(firstRepositoryItem).toHaveTextContent(/jaredpalmer\/formik/);
      expect(firstRepositoryItem).toHaveTextContent(
        /Build forms in React, without the tears/
      );
      expect(firstRepositoryItem).toHaveTextContent(/TypeScript/);
      expect(within(firstRepositoryItem).getByText("1.6k")).toBeTruthy();
      expect(within(firstRepositoryItem).getByText("21.9k")).toBeTruthy();
      expect(within(firstRepositoryItem).getByText("88")).toBeTruthy();
      expect(within(firstRepositoryItem).getByText("3")).toBeTruthy();

      expect(secondRepositoryItem).toHaveTextContent(/async-library\/react-async/);
      expect(secondRepositoryItem).toHaveTextContent(
        /Flexible promise-based React data loader/
      );
      expect(secondRepositoryItem).toHaveTextContent(/JavaScript/);
      expect(within(secondRepositoryItem).getByText("69")).toBeTruthy();
      expect(within(secondRepositoryItem).getByText("1.8k")).toBeTruthy();
      expect(within(secondRepositoryItem).getByText("72")).toBeTruthy();
      expect(within(secondRepositoryItem).getByText("3")).toBeTruthy();
    });
  });
});