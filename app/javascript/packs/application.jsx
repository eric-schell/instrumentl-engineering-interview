import React, { useState} from 'react'
import ReactDOM from 'react-dom/client'
import 'src/index.css'

import App from 'src/components/App'

const load = () => {
  const container = document.body.appendChild(document.createElement('div'))
  const root = ReactDOM.createRoot(container)
  root.render(<App />)
}

if (document.readyState != 'complete') {
  document.addEventListener('DOMContentLoaded', load)
} else {
  load()
}
