import Init from './init/init'
import { readConfig, writeConfig } from './utils/functions'

async function Home() {
  
  const config = await readConfig();

  return (
    <main className="flex items-center justify-center">
      <Init config={config} />
    </main>
  )

}

export default Home
