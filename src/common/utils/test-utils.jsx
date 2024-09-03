import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import store from '@/app/store'
import HomePage from '@/pages/HomePage'
import StoryPage from '@/pages/StoryPage'
import NotFound from '@/pages/NotFound'
import routes from './routes'

export function renderWithProvider(ui) {
  const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>

  return {
    store,
    ...render(ui, { wrapper: Wrapper }),
  }
}

export function renderWithRouterProvider(ui, { initialRoute } = {}) {
  const Wrapper = () => (
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path={routes.STORY} element={<StoryPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  )

  return {
    store,
    ...render(ui, { wrapper: Wrapper }),
  }
}
