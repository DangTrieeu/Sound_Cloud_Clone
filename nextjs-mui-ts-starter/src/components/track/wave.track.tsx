'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import WaveSurfer from 'wavesurfer.js'

const WaveTrack = () => {

    const searchParams = useSearchParams()
    //lay theo key truyen tren url (o day key la audio)
    const fileName = searchParams.get('audio')


    const currentRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const element = currentRef.current
        if (element) {
            const wavesurfer = WaveSurfer.create({
                container: element,
                waveColor: 'rgb(200, 0, 200)',
                progressColor: 'rgb(100, 0, 100)',
                url: `/api?audio=${fileName}`,
            })

        }

    }, [])

    return (
        <div ref={currentRef}>
            wave track
        </div>
    )
}

export default WaveTrack;