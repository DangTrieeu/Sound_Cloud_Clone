import MainSlider from "@/components/main/main.slider";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export default async function HomePage() {

  const session = await getServerSession(authOptions);
  console.log(">>>check session: ", session);

  const getTracksTopCHILL = await sendRequest<IBackendRes<ITracksTop[]>>(
    {
      url: "http://localhost:8000/api/v1/tracks/top",
      method: "POST",
      body: { category: "CHILL", limit: 10 }
    }
  )
  const getTracksTopWORKOUT = await sendRequest<IBackendRes<ITracksTop[]>>(
    {
      url: "http://localhost:8000/api/v1/tracks/top",
      method: "POST",
      body: { category: "WORKOUT", limit: 10 }
    }
  )
  const getTracksTopPARTY = await sendRequest<IBackendRes<ITracksTop[]>>(
    {
      url: "http://localhost:8000/api/v1/tracks/top",
      method: "POST",
      body: { category: "PARTY", limit: 10 }
    }
  )
  //console.log(">>> check tracks: ", getTracksTop)
  return (
    <Container>
      <MainSlider
        data={getTracksTopCHILL?.data ? getTracksTopCHILL.data : []}
        title="Top chill"
      />
      <MainSlider
        data={getTracksTopWORKOUT?.data ? getTracksTopWORKOUT.data : []}
        title="Top workout"
      />
      <MainSlider
        data={getTracksTopPARTY?.data ? getTracksTopPARTY.data : []}
        title="Top party"
      />
    </Container>
  );
}
