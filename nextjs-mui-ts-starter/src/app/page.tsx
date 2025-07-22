import MainSlider from "@/components/main/main.slider";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
export default async function HomePage() {

  // const getTracksTop = await fetch("http://localhost:8000/api/v1/tracks/top",
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       category: "CHILL",
  //       limit: 10
  //     })
  //   }
  // )
  // console.log(">>> check tracks: ", await getTracksTop.json())

  const getTracksTop = await sendRequest<IBackendRes<ITracksTop>>(
    {
      url: "http://localhost:8000/api/v1/tracks/top",
      method: "POST",
      body: { category: "CHILL", limit: 2 }
    }
  )
  console.log(">>> check tracks: ", getTracksTop)
  return (
    <Container>
      <MainSlider />
      <MainSlider />
      <MainSlider />
    </Container>
  );
}
