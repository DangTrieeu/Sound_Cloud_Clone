'use client'
import WaveTrack from '@/components/track/wave.track'
import { Container } from '@mui/material'
import { useSearchParams } from 'next/navigation'

const DetailTrackPage = ({
    params,
}: {
    params: Promise<{ slug: string }>
}) => {
    const searchParams = useSearchParams()
    //lay theo key truyen tren url (o day key la audio)
    const search = searchParams.get('audio')
    // console.log(">>>check search param: ", search);

    return (
        <Container>
            <div>
                <WaveTrack />
            </div>
        </Container>
    )
}

export default DetailTrackPage;