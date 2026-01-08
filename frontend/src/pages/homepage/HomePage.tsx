import { useMusicStore } from '@/stores/useMusicStore'
import { useEffect } from 'react'
import Topbar from '../../components/topbar'
import FeaturedSection from './components/FeaturedSection'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import SectionGrid from './components/SectionGrid'
import { usePlayerStore } from '@/stores/usePlayerStore'
const HomePage = () => {
  const { featuredSongs, trendingSongs, madeForYouSongs, fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs, isLoading } = useMusicStore()

  const { initializeQueue } = usePlayerStore();

  useEffect(() => {
    fetchFeaturedSongs()
    fetchMadeForYouSongs()
    fetchTrendingSongs()
  },[fetchFeaturedSongs,fetchTrendingSongs,fetchMadeForYouSongs])

  useEffect(() => {
    if(madeForYouSongs.length > 0 && trendingSongs.length > 0 && featuredSongs.length > 0) {
      const allSongs = [...featuredSongs,...trendingSongs,...madeForYouSongs];

      initializeQueue(allSongs);
    }
  },[madeForYouSongs, trendingSongs, featuredSongs, initializeQueue])

  return <div className='rounded-md overflow-hidden h-full bg-linear-to-b from-zinc-800 to-zinc-900'>
    <Topbar /> 
    <ScrollArea className='h-[calc(100vh-180px)]'>

        <div className="p-4 sm:p-6">

          <h1 className='text-2xl sm:text-3xl font-bold mb-6'> 
              Good afternoon
          </h1>
          <FeaturedSection />

          <div className='space-y-8'>

            <SectionGrid title="Made for You" songs= {madeForYouSongs} isLoading={isLoading} />
            <SectionGrid title="trending" songs= {trendingSongs} isLoading={isLoading} />

          </div>
        </div>
    </ScrollArea>
    
  </div>
}

export default HomePage