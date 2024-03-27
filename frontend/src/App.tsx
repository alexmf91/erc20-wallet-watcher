import { Route, Routes } from 'react-router-dom'
import { PrivateRoutesGuard } from './components/guards'
import { AppLayout } from './components/ui/layouts'
import { Dashboard, Home, NotFound } from './pages'
import { PrivateRoutes, PublicRoutes } from './utils/routes'

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path={PublicRoutes.HOME} element={<Home />} />
        <Route path={PublicRoutes.NOT_FOUND} element={<NotFound />} />
        <Route element={<PrivateRoutesGuard />}>
          <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
        </Route>
      </Routes>
    </AppLayout>
  )
}
