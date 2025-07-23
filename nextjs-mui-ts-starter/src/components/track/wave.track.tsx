'use client'
import { useEffect } from 'react'
import WaveSurfer from 'wavesurfer.js'

const WaveTrack = () => {

    useEffect(() => {
        const element = document.getElementById("track");
        if (element) {
            const wavesurfer = WaveSurfer.create({
                container: document.body,
                waveColor: 'rgb(200, 0, 200)',
                progressColor: 'rgb(100, 0, 100)',
                url: '/audio/hoidanit.mp3',
            })

        }

    }, [])

    return (
        <div id="track">
            wave track
        </div>
    )
}

export default WaveTrack;