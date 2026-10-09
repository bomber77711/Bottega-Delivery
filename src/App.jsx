import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { Navigate } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { lazyPage, preloadAllPages } from './lib/lazyPage';
// Route-level code splitting: each page ships as its own chunk.
const Recipes = lazyPage(() => import('./pages/Recipes'));
const RecipeDetail = lazyPage(() => import('./pages/RecipeDetail'));
const TasteMap = lazyPage(() => import('./pages/TasteMap'));
const Ingredient = lazyPage(() => import('./pages/Ingredient'));
const Regions = lazyPage(() => import('./pages/Regions'));
const RegionDetail = lazyPage(() => import('./pages/RegionDetail'));
const CreatorProfile = lazyPage(() => import('./pages/CreatorProfile'));
const TasteMaps = lazyPage(() => import('./pages/TasteMaps'));
const ProducerDetail = lazyPage(() => import('./pages/ProducerDetail'));
const Checkout = lazyPage(() => import('./pages/Checkout'));

// After the first page has loaded, quietly download the code for the other pages in the
// background so the first click on Regions/Producers/… is instant (skipped on data-saver / 2G).
function usePrefetchPages() {
  useEffect(() => {
    const c = navigator.connection;
    if (c && (c.saveData || /2g/.test(c.effectiveType || ''))) return;
    const run = () => preloadAllPages();
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1));
    const t = setTimeout(() => idle(run), 1500);
    return () => clearTimeout(t);
  }, []);
}

function PageFallback() {
  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ width: 26, height: 26, border: '3px solid #C8E6C9', borderTopColor: '#2E7D32', borderRadius: '50%', animation: 'spin 0.9s linear infinite' }} />
    </div>
  );
}

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children, currentPageName }) => {
  const content = <Suspense fallback={<PageFallback />}>{children}</Suspense>;
  return Layout ? <Layout currentPageName={currentPageName}>{content}</Layout> : content;
};

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={
        <LayoutWrapper currentPageName={mainPageKey}>
          <MainPage />
        </LayoutWrapper>
      } />
      {Object.entries(Pages).map(([path, Page]) => (
        <Route
          key={path}
          path={`/${path}`}
          element={
            <LayoutWrapper currentPageName={path}>
              <Page />
            </LayoutWrapper>
          }
        />
      ))}
      <Route path="/Recipes" element={<LayoutWrapper currentPageName="Recipes"><Recipes /></LayoutWrapper>} />
      <Route path="/recipes/:id" element={<LayoutWrapper currentPageName="Recipes"><RecipeDetail /></LayoutWrapper>} />

      <Route path="/TasteMap" element={<LayoutWrapper currentPageName="TasteMap"><TasteMap /></LayoutWrapper>} />
      <Route path="/ExploreMap" element={<Navigate to="/" replace />} />
      <Route path="/explore-map" element={<Navigate to="/" replace />} />
      <Route path="/ingredients/:id" element={<LayoutWrapper currentPageName="Ingredients"><Ingredient /></LayoutWrapper>} />
      <Route path="/regions" element={<LayoutWrapper currentPageName="Regions"><Regions /></LayoutWrapper>} />
      <Route path="/regions/:id" element={<LayoutWrapper currentPageName="Regions"><RegionDetail /></LayoutWrapper>} />
      <Route path="/creators/:id" element={<LayoutWrapper currentPageName="Discover"><CreatorProfile /></LayoutWrapper>} />
      <Route path="/taste-maps" element={<LayoutWrapper currentPageName="TasteMaps"><TasteMaps /></LayoutWrapper>} />
      <Route path="/producers/:id" element={<LayoutWrapper currentPageName="Producers"><ProducerDetail /></LayoutWrapper>} />
      <Route path="/checkout" element={<LayoutWrapper currentPageName="Checkout"><Checkout /></LayoutWrapper>} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {
  usePrefetchPages();

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
