# Hacker News

[![test](https://github.com/amalumian/ta-hacker-news/actions/workflows/test.yml/badge.svg)](https://github.com/amalumian/ta-hacker-news/actions/workflows/test.yml) [![Netlify Status](https://api.netlify.com/api/v1/badges/062ec3d4-f133-44c9-b8ea-86c27a8f1110/deploy-status)](https://app.netlify.com/sites/ta-hacker-news/deploys)

The test assignment is an interface for the [Hacker News](https://news.ycombinator.com/news) website, consisting of two pages.

## Local Run

```bash

npm install
npm run dev

```

## Product requirements

### Home page

- Shows news as a list sorted by date, most recent at the top
- Infinite roll is implemented
- It is possible to filter news by New, Top, Best
- Saves the news filter to local storage
- Each news contains:
  - title
  - rating
  - author's nickname
  - date of publication
  - number of comments
- Clicking on a news item takes you to the news page
- The list of news should be automatically updated every 5 minutes without user's participation
- There should be a button on the page for forced updating of the news list

### News page

- Should contain:
  - news link
  - news headline
  - date
  - author
  - comment count
  - the last 25 comments in the form of a tree
- Root comments are loaded immediately when you enter the page, subcomments — by clicking on the root comment
- The page should have a button to return to the news list

## Technical Requirements

- React
- React Router
- Redux Toolkit + React-Redux
- Ant Design
- Vitest + React Testing Library + Mock Service Worker
- Vite
- npm
- Netlify
- CI
- [Hacker News API](https://github.com/HackerNews/API)

### Additional libraries

- axios
- lodash (.\_debounce())
- p-limit (Run multiple promise-returning & async functions with limited concurrency)
- uuid (v4)
