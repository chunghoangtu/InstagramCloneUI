import React from 'react'
import { Navigation } from './components/Navigation'

export const App = () => {
  return (
    <div className='icu-app'>
      <Navigation />
      <main className="icu-main">
        <section className="icu-wall">
          <div className="icu-wall__stories"></div>
          <div className="icu-wall__posts"></div>
        </section>
        <section className="icu-user-info">
        </section>
      </main>
    </div>
  )
}