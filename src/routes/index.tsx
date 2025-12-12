import { createFileRoute, redirect } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query';
import { getEvents } from '@/services/events'
import Artist from '@/components/Artist';
import AddArtist from "@/components/AddArtist"
import Loading from '@/components/Loading';

export const Route = createFileRoute('/')({
  beforeLoad: ({context}) => {
    if(!context.user) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: App,
});

function App() {
  const {data: events, isPending} = useQuery(
    {
      queryKey: ["events"],
      queryFn: getEvents
    }
  )

  return (
    <div>
      {isPending ? <Loading /> : 
      <>
        <span className="text-3xl font-semibold">Current Events</span>
        {events?.map((event) => {
          return (
            <>
              <Artist
                key={event.id}
                id={event.id} 
                artist={event.artist} 
                description={event.description}
                image={event.image}
              />
            </>
          )
        })}
        <AddArtist />
      </>}   
    </div>
  )
}
