import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout';
import { Toaster } from './components/ui/sonner';

// Lazy load components for better performance
const HomePage = lazy(() => import('./components/HomePage').then(module => ({ default: module.HomePage })));
const TimeConverter = lazy(() => import('./components/TimeConverter').then(module => ({ default: module.TimeConverter })));
const UnitConverter = lazy(() => import('./components/UnitConverter').then(module => ({ default: module.UnitConverter })));
const JSONTools = lazy(() => import('./components/JSONTools').then(module => ({ default: module.JSONTools })));
const XMLTools = lazy(() => import('./components/XMLTools').then(module => ({ default: module.XMLTools })));
const PasswordGenerator = lazy(() => import('./components/PasswordGenerator').then(module => ({ default: module.PasswordGenerator })));
const ImageTools = lazy(() => import('./components/ImageTools').then(module => ({ default: module.ImageTools })));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
        <Route path="/" element={
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <HomePage />
            </Suspense>
          </Layout>
        } />
        <Route path="/time-converter" element={
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <TimeConverter />
            </Suspense>
          </Layout>
        } />
        <Route path="/unit-converter" element={
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <UnitConverter />
            </Suspense>
          </Layout>
        } />
        <Route path="/json-tools" element={
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <JSONTools />
            </Suspense>
          </Layout>
        } />
        <Route path="/xml-tools" element={
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <XMLTools />
            </Suspense>
          </Layout>
        } />
        <Route path="/password-generator" element={
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <PasswordGenerator />
            </Suspense>
          </Layout>
        } />
        <Route path="/image-tools" element={
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <ImageTools />
            </Suspense>
          </Layout>
        } />
        {/* Catch all route - redirect to home */}
        <Route path="*" element={
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <HomePage />
            </Suspense>
          </Layout>
        } />
      </Routes>
      <Toaster />
    </Router>
    </HelmetProvider>
  );
}
