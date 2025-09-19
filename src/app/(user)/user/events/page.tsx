import EventsComponent from "@/components/Events";
import { authOptions } from "@/lib/next-auth";
import Chapter from "@/models/Chapter";
import { getServerSession } from "next-auth";


const page = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const chapterData = await Chapter.findOne({ _id: user?.chapter });
  const chapterName = chapterData && chapterData.chapterName

  console.log("User in events page:", user);
  return(

    <div>
    <EventsComponent chapter={chapterName} />
  </div>
  )
};

export default page;
