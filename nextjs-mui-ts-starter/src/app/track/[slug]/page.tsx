'use client'
import { useSearchParams } from 'next/navigation'

const DetailTrackPage = ({
    params,
}: {
    params: Promise<{ slug: string }>
}) => {
    const searchParams = useSearchParams()
    //lay theo key truyen tren url (o day key la audio)
    const search = searchParams.get('audio')
    //console.log(">>>check search param: ", search);

    return (
        <div> detail track page</div>
    )
}

export default DetailTrackPage;