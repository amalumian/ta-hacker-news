import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import store from '@/app/store'

export function renderWithProvider(ui) {
  const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>

  return {
    store,
    ...render(ui, { wrapper: Wrapper }),
  }
}

export function renderWithRouterProvider(ui, { id } = {}) {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/story/${id}`]}>
        <Routes>
          <Route path='/story/:id' element={children} />
        </Routes>
      </MemoryRouter>
    </Provider>
  )

  return {
    store,
    ...render(ui, { wrapper: Wrapper }),
  }
}
