import './App.css'
import FirstSection from './pages/FirstSection'
import DocumentationSection from './pages/DocumentationSection'
import Snowfall from 'react-snowfall';

function App() {


  return (
    <>
      {/* <div>
      <Logo />
    </div>
      <Editor /> */}
      <div style={{ height: '100dvh', width: '100vw', position: 'relative' }}>
        {/* Your content here */}
        <Snowfall
          color="white"
          snowflakeCount={80}
          speed={[0, 0.2]} // Range of speed for snowflakes
        />
        <FirstSection />
        <DocumentationSection />
      </div>
    </>
  )
}

export default App
