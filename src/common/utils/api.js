const API_BASE = 'https://hacker-news.firebaseio.com/v0'

const API = {
  ITEM: (id) => `${API_BASE}/item/${id}.json`,
  NEW_STORIES: () => `${API_BASE}/newstories.json`,
  TOP_STORIES: () => `${API_BASE}/topstories.json`,
  BEST_STORIES: () => `${API_BASE}/beststories.json`,
}

export default API
