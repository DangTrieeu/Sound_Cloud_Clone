'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Settings } from "react-slick";
import { Box } from "@mui/material";
import Button from "@mui/material/Button/Button";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import Link from "next/link";

interface IProps {
    data: ITracksTop[]
    title: string
}

const MainSlider = (props: IProps) => {

    const { data, title } = props;

    const NextArrow = (props: any) => {
        return (
            <Button variant="contained" color="inherit"
                onClick={props.onClick}
                sx={{
                    position: "absolute",
                    right: 0,
                    top: "25%",
                    zIndex: 2,
                    minWidth: 30,
                    width: 35,
                }}
            >
                <ChevronRightIcon />
            </Button>
        )
    }

    const PrevArrow = (props: any) => {
        return (
            <Button variant="contained" color="inherit"
                onClick={props.onClick}
                sx={{
                    position: "absolute",
                    top: "25%",
                    zIndex: 2,
                    minWidth: 30,
                    width: 35,
                }}
            >
                <ChevronLeftIcon />
            </Button>
        )
    }

    const settings: Settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    //box === div
    return (

        <Box
            sx={{
                margin: "0 50px",
                ".tracks": {
                    padding: "0 10px",

                    "img": {
                        height: 150,
                        width: 150
                    },

                    "a": {
                        color: "unset",
                        textDecoration: "unset"
                    }
                },
                "h3": {
                    border: "1px solid #ccc",
                    padding: "20px",
                    height: "200px",

                }
            }}
        >
            <h2> {title} </h2>

            <Slider {...settings}>
                {
                    data.map(track => {
                        return (
                            <div className="tracks" key={track._id}>
                                <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track.imgUrl}`} alt="img" />
                                <Link href={`/track/${track._id}?audio=${track.trackUrl}`}>
                                    <h4>{track.title}</h4>
                                </Link>
                                <h5>{track.description}</h5>
                            </div>
                        )
                    })
                }
            </Slider>
            <Divider />
        </Box>

    );
}

export default MainSlider;