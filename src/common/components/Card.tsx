import { Box, Typography } from '@mui/material';
import PlayButton from './PlayButton';

interface CardProps {
    name: string;
    image: string;
    artistName: string[] | undefined;
}

const Card = ({ name, image, artistName }: CardProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '160px',
                width: '100%',
                height: '100%',
                padding: '12px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '& .play-button': {
                        opacity: 1,
                        transform: 'translateY(0)',
                    },
                },
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '165px',
                    marginBottom: '8px',
                }}
            >
                <Box
                    component="img"
                    src={image}
                    alt={name}
                    sx={{
                        width: '100%',
                        aspectRatio: '1',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        display: 'block',
                    }}
                />
                <Box
                    className="play-button"
                    sx={{
                        position: 'absolute',
                        bottom: '8px',
                        right: '8px',
                        opacity: 0,
                        transform: 'translateY(8px)',
                        transition: 'opacity 0.2s ease, transform 0.2s ease',
                        // display: { xs: 'none', sm: 'block' },
                    }}
                >
                    <PlayButton />
                </Box>
            </Box>
            <Typography 
                variant="h2" 
                paddingTop="8px" 
                noWrap
                sx={{
                    width: '100%',
                    maxWidth: '165px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
            >
                {name}
            </Typography>
            <Typography 
                variant="body1" 
                color="textSecondary" 
                noWrap
                sx={{
                    width: '100%',
                    maxWidth: '165px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
            >
                {artistName?.join(', ')}
            </Typography>
        </Box>
    )
}

export default Card
