import Cardstartup , {CardstartupType} from "@/components/Cardstartup";
import Designlayout from "@/components/Designlayout";
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
      <section className=" w-full bg-primary h-[450px] pattern flex justify-center items-center flex-col  ">
        <div
          className="pattern  bg-primary-500  h-screen w-full relative "
        >
          <Designlayout/>
          <Searchform query={query} /> 
        </div>
        </section>
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
      <SanityLive />
    </>
  );
}
