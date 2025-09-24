import Cardstartup , {CardstartupType} from "@/components/Cardstartup";
import Navbar from "@/components/Navbar";
import Searchform from "@/components/Searchform";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { startup_query } from "@/sanity/lib/query";

export default async function  Home({ searchParams, }: {
  searchParams : Promise<{query?:string}>
})
{
  // wait for searchParams promise
  const query = (await searchParams).query; // might be undefined

  // create an object with search key
  const params = { search: query || null }; // if query is falsy, use null

  // fetch data from sanity and rename 'data' to 'posts'
  const { data: posts } = await sanityFetch({ query: startup_query, params });

  console.log(posts);

  return (
    <>
      <section>
        <div
          className=" bg-primary-500  h-screen w-full  "
        >
          <h1
          className="uppercase text-3xl md:text-4xl leading-10 md:leading-12 bold text-center text-white bg-black max-w-3xl mx-auto h-fit px-2 md:px-4  py-2 md:py-4 "
          >
            pitch your startup,<br />
            connect with entrepreneurs
          </h1>
          <p
          className="text-white my-4 text-center"
          >
            Submit ideas vote on Pitches and Get Noticed in Virtual competitiond
          </p>
          <Searchform query={query} />
          
          <section>
            <div className="max-w-7xl px-auto px-2 md:px-4 lg:px-6">
              <h2>
                {query ? `Search results for ${query}` : 'All Startup'}
              </h2>
              <ul className="grid ">
                {posts?.length > 0 ? (
                  posts.map((post:CardstartupType)=>(
                    <Cardstartup key={post._id} {...post} />
                ))
                ) : (
                <p> No startup Found</p>
                )
              }
              </ul>
            </div>
          </section>
        </div>
      </section>
      <SanityLive />
    </>
  );
}
