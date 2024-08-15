const API_BASE = 'https://hacker-news.firebaseio.com/v0'
const JSON_SUFFIX = '.json?print=pretty'

const API = {
  ITEM: (id) => `${API_BASE}/item/${id}${JSON_SUFFIX}`,
  NEW_STORIES: () => `${API_BASE}/newstories${JSON_SUFFIX}`,
  TOP_STORIES: () => `${API_BASE}/topstories${JSON_SUFFIX}`,
  BEST_STORIES: () => `${API_BASE}/beststories${JSON_SUFFIX}`,
}

export default API
