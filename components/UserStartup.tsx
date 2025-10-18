import React from "react";
import { client } from "@/sanity/lib/client";
import { startup_by_author_query } from "@/sanity/lib/query";
import Cardstartup, { CardstartupType } from "./Cardstartup";

const UserStartup = async ({ id }: { id: string }) => {
  const startups: CardstartupType[] = await client.fetch(startup_by_author_query, { id });

  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup:CardstartupType) => (
          <Cardstartup key={startup._id} {...startup} />
        ))
      ) : (
        <p>No posts yet</p>
      )}
    </>
  );
};

export default UserStartup;
