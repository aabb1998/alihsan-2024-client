import { Suspense } from 'react'

function SubParent({ children }) {
  if(import.meta.env.SSR)
    throw new Error('Blocking No-SSR component from server-side render');
  return children;
}

export default function NoSSRSuspense({ children, fallback }) {
  return (
      <Suspense fallback={fallback}>
        <SubParent>
          {children}
        </SubParent>
      </Suspense>
  )
}
